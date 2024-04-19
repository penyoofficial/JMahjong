import net.penyo.jmahjong.bean.Player;
import net.penyo.jmahjong.bean.Table;
import net.penyo.jmahjong.bean.Tile;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DraftTest {

    private Table getTable() {
        Set<Player> players = Set.of(Player.as("兔宝"), Player.as("雀士1"), Player.as("雀士2"), Player.as("雀士3"));
        Table table = new Table(players);
        table.deal();

        return table;
    }

    @Test
    public void tableTest() {
        Table table = getTable();
        assertEquals(4, table.players.size());
        for (Player player : table.players) {
            System.out.println(player.id() + "：\t" + player.sort());
            assertEquals(13, player.sort().size());
        }
    }

    @Test
    public void drawAndDiscardTest() {
        Table table = getTable();
        Player player = table.players.get(0);
        String oldTiles = player.tiles().keySet().toString();

        Tile tile = table.getTile();
        player.draw(tile);
        player.discard(tile);
        player.tiles().remove(tile);

        assertEquals(oldTiles, player.tiles().keySet().toString());
    }
}
