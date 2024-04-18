import net.penyo.jmahjong.bean.Player;
import net.penyo.jmahjong.bean.Table;
import org.junit.jupiter.api.Test;

import java.util.Set;

public class TableTest {
    @Test
    public void test() {
        Table table = new Table(Set.of(Player.as("兔宝"), Player.as("雀士1"), Player.as("雀士2"), Player.as("雀士3")));
        table.deal();
        System.out.println(table);
    }
}
