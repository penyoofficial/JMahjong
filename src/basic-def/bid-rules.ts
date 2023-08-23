import { Tile } from "@/basic-def/tile";

/**
 * 叫牌规则。
 */
export class BidRules {
  /**
   * 检查是否满足“吃”的条件。
   *
   * @param tiles 牌的元组
   */
  static canChow(tiles: [Tile, Tile, Tile]) {
    let flag = true;

    let tids: (typeof Tile.prototype.id)[] = [];
    tiles.forEach((t) => {
      if (t.isComparable() && !t.state.isLocked) tids.push(Math.ceil(t.id / 4));
      else return (flag = false);
    });
    tids.sort((a, b) => a - b);

    if (flag)
      if (!(tids[2] !== tids[0] && tids[2] + tids[0] === tids[1] * 2))
        flag = false;

    return flag;
  }

  /**
   * 执行“吃”并锁定相关牌。
   *
   * @param tiles 牌的元组
   */
  static chow(tiles: [Tile, Tile, Tile]) {
    if (BidRules.canChow(tiles))
      tiles.forEach((t) => {
        t.lock("吃");
      });
  }

  /**
   * 检查是否满足“碰”的条件。
   *
   * @param tiles 牌的元组
   */
  static canPung(tiles: [Tile, Tile, Tile]) {
    let flag = true;

    let tids: (typeof Tile.prototype.id)[] = [];
    tiles.forEach((t) => {
      if (!t.state.isLocked) tids.push(Math.ceil(t.id / 4));
      else return (flag = false);
    });
    tids.sort((a, b) => a - b);

    if (flag)
      if (!(tids[2] === tids[0] && tids[2] + tids[0] === tids[1] * 2))
        flag = false;

    return flag;
  }

  /**
   * 执行“碰”并锁定相关牌。
   *
   * @param tiles 牌的元组
   */
  static pung(tiles: [Tile, Tile, Tile]) {
    if (BidRules.canPung(tiles))
      tiles.forEach((t) => {
        t.lock("碰");
      });
  }

  /**
   * 检查是否满足“杠”的条件。
   *
   * @param tiles 牌的元组
   */
  static canKong(tiles: [Tile, Tile, Tile, Tile]) {
    let flag = true;

    let tids: (typeof Tile.prototype.id)[] = [];
    tiles.forEach((t) => {
      if (!t.state.isLocked) tids.push(Math.ceil(t.id / 4));
      else return (flag = false);
    });
    tids.sort((a, b) => a - b);

    if (flag)
      if (
        !(
          tids[3] === tids[0] &&
          tids[3] + tids[1] === tids[2] * 2 &&
          tids[2] + tids[0] === tids[1] * 2
        )
      )
        flag = false;

    return flag;
  }

  /**
   * 执行“杠”并锁定相关牌。
   *
   * @param tiles 牌的元组
   */
  static kong(tiles: [Tile, Tile, Tile, Tile]) {
    if (BidRules.canKong(tiles))
      tiles.forEach((t) => {
        t.lock("杠");
      });
  }

  /**
   * 检查是否满足“和”的条件。
   *
   * @param fullTiles 全部手牌的元组
   */
  static canHu(fullTiles: [...Tile[]] & { length: 14 }) {
    let flag = true;

    let tiles = fullTiles.filter((t) => !t.state.isLocked);

    if (tiles.length === fullTiles.length) {
      function isThirteenOrphans() {}

      function isSevenPairs() {}
    }
    let groupedTiles = tiles.reduce((result, t) => {
      const groupValue = t.name.type;
      if (!result[groupValue]) result[groupValue] = [];
      result[groupValue].push(t);
      return result;
    });

    // to be edited

    return flag;
  }

  /**
   * 执行“和”并锁定相关牌。
   *
   * @param fullTiles 全部手牌的元组
   */
  static hu(fullTiles: [...Tile[]] & { length: 14 }) {
    if (BidRules.canHu(fullTiles))
      fullTiles.forEach((t) => {
        t.lock("和");
      });
  }
}
