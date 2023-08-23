import { Tile } from "@/basic-def/tile";

/**
 * 玩家。
 */
export class Player {
  /** 手牌 */
  tiles: Tile[] = [];

  /** 是否活跃 */
  isActive = true;
  /** 钥匙 */
  private lockResolve: () => void = Promise.resolve;
  /** 锁 */
  private lockPromise = Promise.resolve();

  /**
   * 构造玩家实例。
   *
   * @param firstDrawing 初始摸 13 张牌。
   */
  constructor(firstDrawing: Tile[] & { length: 13 }) {
    (async () => {
      for (const t of firstDrawing) await this.draw(t);
      this.lock();
    })();
  }

  /**
   * 锁定（结束回合）。
   */
  lock() {
    this.isActive = false;
    this.lockPromise = new Promise((resolve) => (this.lockResolve = resolve));
  }

  /**
   * 解锁（进入回合）。
   */
  unlock() {
    this.isActive = true;
    this.lockResolve();
  }

  /**
   * 摸牌。
   *
   * @param tile 所摸到的新牌
   */
  async draw(tile: Tile) {
    if (!this.isActive) await this.lockPromise;

    this.tiles.push(tile);
    this.tiles.sort((a, b) => a.id - b.id);
  }

  /**
   * 打牌。并返回所打出的牌。
   *
   * @param id 所打出的牌的序号
   */
  async discard(id: number) {
    if (!this.isActive) await this.lockPromise;

    const index = this.tiles.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("An impossible tile is discarded!");
    return this.tiles.splice(index, 1)[0];
  }
}
