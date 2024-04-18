package net.penyo.jmahjong.bean;

import net.penyo.jmahjong.type.TileState;

import java.util.HashMap;
import java.util.Map;

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
}
