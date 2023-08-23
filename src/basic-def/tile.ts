/**
 * 麻将牌。
 */
export class Tile {
  /** 牌序号 */
  id: number;

  /** 牌名称 */
  name:
    | {
        weight: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
        type: "万" | "条" | "饼";
      }
    | {
        weight: "东" | "南" | "西" | "北" | "中" | "发" | "板";
        type: "字";
      };

  /** 牌状态 */
  state:
    | {
        /** 是否已被锁定 */
        isLocked: boolean;
      }
    | {
        /** 是否已被锁定 */
        isLocked: true;
        /** 锁定类型 */
        lockType: "吃" | "碰" | "杠" | "和";
      };

  /**
   * 构造随机牌实例。
   */
  constructor();
  /**
   * 构造指定序号的牌实例。
   *
   * |序号段|牌类型|
   * |:-:|:-:|
   * |1~36|一万 到 九万|
   * |37~72|一条 到 九条|
   * |73~108|一饼 到 九饼|
   * |109~136|东西南北风 到 红中绿发白|
   *
   * @param id 牌序号。一副标准的麻将牌有 136 张，每个有效牌序号（1~136）都唯一指向了一张牌。
   */
  constructor(id: number);
  constructor(id?: number) {
    if (!id) id = Math.round(Math.random() * 136);
    else if (id < 1 || id > 136 || id % 1 !== 0)
      throw new Error("An invalid tile id is given!");

    const NumWeightArr = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const CharWeightArr = ["东", "南", "西", "北", "中", "发", "板"] as const;
    const TypeArr = [["万", "条", "饼"], ["字"]] as const;

    let names: (typeof Tile.prototype.name)[] = [];
    function pushName(
      weight: typeof Tile.prototype.name.weight,
      type: typeof Tile.prototype.name.type,
    ) {
      for (let i in [1, 2, 3, 4])
        names.push({
          weight: weight,
          type: type,
        } as typeof Tile.prototype.name);
    }

    TypeArr[0].forEach((t) => {
      NumWeightArr.forEach((nw) => {
        pushName(nw, t);
      });
    });
    TypeArr[1].forEach((t) => {
      CharWeightArr.forEach((cw) => {
        pushName(cw, t);
      });
    });

    this.id = id;
    this.name = names[id - 1];
    this.state = {
      isLocked: false,
    };
  }

  /**
   * 牌权值是否可以比较。
   */
  isComparable() {
    return this.name.type !== "字";
  }

  /**
   * 获取牌名称。
   */
  getName() {
    const NumWeightMap: Map<typeof Tile.prototype.name.weight, string> =
      new Map([
        [1, "一"],
        [2, "二"],
        [3, "三"],
        [4, "四"],
        [5, "伍"],
        [6, "六"],
        [7, "七"],
        [8, "八"],
        [9, "九"],
      ]);
    const CharWeightMap: Map<typeof Tile.prototype.name.weight, string> =
      new Map([
        ["东", "東风"],
        ["南", "南风"],
        ["西", "西风"],
        ["北", "北风"],
        ["中", "红中"],
        ["发", "绿發"],
        ["板", "白板"],
      ]);
    const TypeMap: Map<typeof Tile.prototype.name.type, string> = new Map([
      ["万", "萬"],
      ["条", "条"],
      ["饼", "饼"],
      ["字", ""],
    ]);

    if (this.isComparable())
      return ((NumWeightMap.get(this.name.weight) as string) +
        TypeMap.get(this.name.type)) as string;
    return CharWeightMap.get(this.name.weight) as string;
  }

  /**
   * 锁定该张牌。
   *
   * @param lockType 锁定类型
   */
  lock(lockType: "吃" | "碰" | "杠" | "和") {
    if (this.state.isLocked) return false;
    this.state = {
      isLocked: true,
      lockType: lockType,
    };
    return true;
  }
}
