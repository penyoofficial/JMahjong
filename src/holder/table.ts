import { LocalRules } from "@/basic-def/local-rules";
import { Tile } from "@/basic-def/tile";
import { Player } from "@/holder/player";

/**
 * 牌桌。
 */
export class Table {
  /** 游戏是否已结束 */
  isEnd = false;

  /** 摸牌堆 */
  drawingPile: Tile[] = [];
  /** 弃牌堆 */
  discardPile: [...(Tile[][] & { length: 4 })] = [[], [], [], []];

  /** 玩家 */
  players: [...(Player[] & { length: 0 | 4 })] = [];
  /** 活跃玩家 ID */
  activePlayerID: 0 | 1 | 2 | 3 = 0;

  /**
   * 构造牌桌实例。
   *
   * @param rules 本地规则组
   */
  constructor(rules?: LocalRules[]) {
    for (let i = 1; i <= 136; i++) this.drawingPile.push(new Tile(i));
    this.shuffle();

    let players: Player[] = [];
    for (let j = 0; j < 4; j++)
      players.push(
        new Player(this.drawingPile.splice(0, 13) as Tile[] & { length: 13 }),
      );
    this.players = players;

    setTimeout(this.next);
  }

  /**
   * 打乱摸牌堆中的牌顺序。
   */
  shuffle() {
    for (let i = this.drawingPile.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.drawingPile[i], this.drawingPile[randomIndex]] = [
        this.drawingPile[randomIndex],
        this.drawingPile[i],
      ];
    }
  }

  /**
   * 获取当前活跃玩家。
   */
  getActivePlayer() {
    return this.players[this.activePlayerID];
  }

  /**
   * 进入下一回合。
   */
  next() {
    if (this.isEnd) return;
    const activeOne = this.getActivePlayer();
    activeOne.unlock();
    if (this.drawingPile.length > 0)
      activeOne.draw(this.drawingPile.splice(0, 1)[0]);
    else this.end("draw");
  }

  /**
   * 结束游戏并冻结结果。
   *
   * @param reason 游戏结束原因。只能是和牌或者流局。
   */
  end(reason: "hu" | "draw") {
    if (this.isEnd) return false;

    function deepFreeze(obj: any) {
      Object.freeze(obj);
      for (const key in obj)
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === "object" && value !== null) deepFreeze(value);
        }
    }

    this.isEnd = true;
    deepFreeze(this);
    console.log(reason);
    return true;
  }
}
