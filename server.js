import fetch from "node-fetch";
import { load } from "cheerio";

const url = "https://www.camera.it/leg19/46";

const response = await fetch(url);
const body = await response.text();

let $ = load(body);

let items = $("#tabGruppi > tbody tr");
items.each((_, e, i) => {
  console.log(_, i);
  let cells = $(e).find("td");
  let attrs = cells.attr();
  console.log("attrs", attrs.class);
  console.log("nome", $(cells[0]).text().trim());
  console.log("numero", $(cells[1]).text());
});
