package net.penyo.jmahjong.bean;

import net.penyo.jmahjong.type.TileType;

import java.util.LinkedList;
import java.util.List;

/**
 * 牌
 *
 * @author Penyo
 */
public record Tile(TileType type, int value, int id) implements Comparable<Tile> {
    /**
     * 获得全新套牌。
     */
    public static List<Tile> getNewSuite() {
        List<Tile> tiles = new LinkedList<>();
        int id = 1;
        for (int i = 0; i < 5; i++) {
            int valueMax = switch (i) {
                case 0, 1, 2 -> 9;
                case 3 -> 4;
                default -> 3;
            };

            for (int j = 1; j <= valueMax; j++)
                for (int k = 0; k < 4; k++)
                    tiles.add(new Tile(TileType.values()[i], j, id++));
        }

        return tiles;
    }

    @Override
    public int compareTo(Tile o) {
        return (type.ordinal() - o.type.ordinal()) * 100 + (value - o.value);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder(List.of("一", "二", "三", "四", "五", "六", "七", "八", "九").get(value - 1));
        sb.append(switch (type) {
            case CIRCLE -> "饼";
            case BAMBOO -> "条";
            case CHARACTER -> "万";
            default -> "";
        });

        if (sb.length() != 2) {
            sb = new StringBuilder();
            if (type == TileType.WIND) sb.append(List.of("东", "南", "西", "北").get(value - 1)).append("风");
            else sb.append(List.of("白皮", "绿发", "红中").get(value - 1));
        }

        return sb.toString();
    }
}
