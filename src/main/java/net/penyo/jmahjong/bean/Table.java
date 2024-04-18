package net.penyo.jmahjong.bean;

import net.penyo.jmahjong.type.TileState;

import java.util.Collections;
import java.util.LinkedList;
import java.util.Set;


/**
 * 牌桌
 *
 * <p>
 * 牌桌兼具了控制游戏全局的功能。
 * </p>
 *
 * @author Penyo
 */
public record Table(Set<Player> players) {
    /**
     * 清空旧牌、引入新牌，洗牌、发牌。
     */
    public void deal() {
        LinkedList<Tile> suit = Tile.getNewSuit();
        Collections.shuffle(suit);

        for (Player player : players) {
            player.tiles().clear();

            for (int i = 0; i < 13; i++)
                player.tiles().put(suit.poll(), TileState.HIDDEN);
        }
    }
}
