package net.penyo.jmahjong.bean;

import net.penyo.jmahjong.type.TileState;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

/**
 * 玩家
 *
 * @author Penyo
 */
public record Player(String id, Map<Tile, TileState> tiles) {
    /**
     * 快速工厂。
     */
    public static Player as(String id) {
        return new Player(id, new HashMap<>());
    }

    /**
     * 理牌。
     */
    public List<Tile> sort() {
        Stream<Tile> hiddenTiles = tiles.keySet().stream().filter(tile -> tiles.get(tile) == TileState.HIDDEN).sorted();
        return hiddenTiles.toList();
    }

    /**
     * 摸牌。
     */
    public void draw(Tile tile) {
        tiles.put(tile, TileState.HIDDEN);
    }

    /**
     * 弃牌。
     */
    public Tile discard(Tile tile) {
        tiles.put(tile, TileState.LOCKED);
        return tile;
    }
}
