import { Tile } from "../basic-def/tile";

export class Player {
  /** 手牌 */
  tiles: Tile[] = [];

  /**
   * 摸牌。
   *
   * @param tile 所摸到的新牌
   */
  draw(tile: Tile) {
    this.tiles.push(tile);
    this.tiles.sort((a, b) => a.id - b.id);
  }

  /**
   * 打牌。并返回所打出的牌。
   *
   * @param id 所打出的牌的序号
   */
  discard(id: number) {
    let tile: Tile | undefined;
    this.tiles.forEach((t, i) => {
      if (t.id === id) return (tile = this.tiles.splice(i, 1)[0]);
    });
    return tile;
  }
}
