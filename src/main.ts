import { Table } from "@/holder/table";

const game = new Table();
setTimeout(() => {
  game.players.forEach((p) => {
    console.log(
      p.tiles.map((t) => {
        return t.getName();
      }),
    );
  });
});
