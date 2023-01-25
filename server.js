import fetch from "node-fetch";
import { load } from "cheerio";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// prepare endpoint for camera data
app.get("/camera", async (req, res) => {
  let test = await gruppiDeputati();
  res.send(test);
});

//app.listen(3000, () => console.log("Example app listening on port 3000!"));

async function gruppiDeputati() {
  const url = "https://www.camera.it/leg19/46";

  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body);

  let items = $("#tabGruppi > tbody tr");

  let results = [];

  items.each((_, e) => {
    // find table cells
    let cells = $(e).find("td");
    let attrs = cells.attr();

    let result = {};
    result.type = attrs.class;
    result.name = $(cells[0]).text().trim();
    result.number = $(cells[1]).text() * 1;

    results.push(result);
  });

  //fs.writeFileSync("groups.json", JSON.stringify(results));

  return results
    .filter((d) => d.type != "totale")
    .filter((d) => d.name != "MISTO");
}

async function gruppiSenatori() {
  const url = "https://www.senato.it/leg/19/BGT/Schede/MappaAula/00000000.htm";

  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body);

  let items = $("#content > div.dxSmall > div.divBoxColDx dd");

  let results = [];

  items.each((_, e) => {
    let name = $(e).find("a").text();
    let num = $(e).find("strong").text() * 1;
    results.push({ name, num });
  });
  console.log(results);
}

gruppiSenatori();
