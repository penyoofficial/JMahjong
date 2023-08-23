import { Tile } from "@/basic-def/tile";
import { Table } from "@/holder/table";

/**
 * 游戏遮罩，将玩家与游戏以事件驱动的方式结合在一起。
 */
export class OverTable {
  /** 单局游戏 */
  game: Table;

  /** 最后一张被打出的牌 */
  lastTile: Tile | null = null;

  /**
   * 构造游戏遮罩。
   *
   * @param game 单局游戏
   */
  constructor(game: Table) {
    this.game = game;
  }
}
