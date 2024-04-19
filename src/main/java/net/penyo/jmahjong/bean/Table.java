package net.penyo.jmahjong.bean;

import net.penyo.jmahjong.type.TileState;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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
public class Table {

    public List<Player> players;

    public List<Tile> tiles;

    public Player maker;

    public Player turn;

    public int finishedTurn = 0;

    public Table(Set<Player> players) {
        this.players = new ArrayList<>(players);
        tiles = Tile.getNewSuite();
        deal();
        maker = this.players.get(0);
        turn = this.players.get(0);
    }

    /**
     * 抽牌。
     */
    public Tile getTile() {
        return tiles.isEmpty() ? null : tiles.remove(0);
    }

    /**
     * 尾部抽牌。
     */
    public Tile getLastTile() {
        return tiles.isEmpty() ? null : tiles.remove(tiles.size() - 1);
    }

    /**
     * 清空旧牌、引入新牌，洗牌、发牌。
     */
    public void deal() {
        Collections.shuffle(tiles);

        for (Player player : players) {
            player.tiles().clear();

            for (int i = 0; i < 13; i++)
                player.tiles().put(getTile(), TileState.HIDDEN);
        }
    }

    /**
     * 下一位玩家行动。
     */
    public void next() {
        boolean flag = false;
        for (int i = 0; i < players.size() - 1; i++)
            if (players.get(i).equals(turn)) {
                turn = players.get(i + 1);
                flag = true;
            }

        if (!flag) turn = players.get(0);

        finishedTurn++;
    }
}
