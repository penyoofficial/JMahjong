import { Table } from "./holder/table";

const game = new Table();
game.players.forEach((p) => {
  console.log(
    p.tiles.map((t) => {
      return t.getName();
    }),
  );
});
