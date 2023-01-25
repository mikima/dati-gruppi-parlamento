import fetch from "node-fetch";
import { load } from "cheerio";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// define the port where client files will be provided
let port = process.env.PORT || 3000;

// prepare endpoint for camera data
app.get("/camera", async (req, res) => {
  let data = await gruppiDeputati();
  res.send(data);
});

// prepare endpoint for senato data
app.get("/senato", async (req, res) => {
  let data = await gruppiSenatori();
  res.send(data);
});

app.listen(port, () => console.log("App ready"));

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
  const url = "https://www.senato.it/leg/19/BGT/Schede/Gruppi/Grp.html";

  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body);

  let items = $(
    "#content > div.sxSmall > div.testoCenter > div > table > tbody tr"
  );

  let results = [];

  items.each((_, e) => {
    let cells = $(e).find("td");
    let name = $(cells[0]).text();
    let number = $(cells[1]).text() * 1;
    results.push({ name, number });
  });

  return results.filter((d) => d.name != "Totale");
}
