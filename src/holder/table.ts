import { LocalRules } from "../basic-def/local-rules";
import { Tile } from "../basic-def/tile";
import { Player } from "./player";

export class Table {
  /** 游戏是否已结束 */
  isEnd = false;

  /** 摸牌堆 */
  drawingPile: Tile[] = [];
  /** 弃牌堆 */
  discardPile: [...Tile[][]] & { length: 4 } = [[], [], [], []];

  /** 玩家 */
  players: [...Player[]] & { length: 4 } = [
    new Player(),
    new Player(),
    new Player(),
    new Player(),
  ];
  /** 活跃玩家 */
  activePlayerID: 0;

  constructor(rules?: LocalRules[]) {
    for (let i = 1; i <= 136; i++) this.drawingPile.push(new Tile(i));
    this.shuffle();
    for (let i = 0; i < 3; i++)
      this.players.forEach((p) => {
        for (let j = 0; j < 4; j++) p.draw(this.drawingPile.pop() as Tile);
      });
    this.players.forEach((p) => {
      p.draw(this.drawingPile.pop() as Tile);
    });
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
   * 结束当前玩家的回合。
   */
  next() {}

  /**
   * 结束游戏并冻结结果。
   */
  end() {
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
    return true;
  }
}
