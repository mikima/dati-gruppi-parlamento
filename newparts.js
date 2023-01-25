// this module can be used to write files
import * as fs from "fs";

// call the second page to get colors

async function coloriGruppiDeputati() {
  const colorUrl = "https://www.camera.it/leg19/1220";

  const response = await fetch(colorUrl);
  const body = await response.text();

  let $ = load(body);

  let items = $("#legenda li");

  items.each((_, e) => {
    let attrs = $(e).find(".colore").attr();

    console.log($(e).text().trim());
    console.log(attrs.class.split(" ")[1]);

    // let result = {};
    // result.type = attrs.class;
    // result.name = $(cells[0]).text().trim();
    // result.number = $(cells[1]).text() * 1;

    // results.push(result);
  });

  // check how to parse css
  // https://stackoverflow.com/questions/10963997/css-parser-for-javascript

  // get colors from:
  // https://documenti.camera.it/leg19/dati_dovesiedono/css/gruppi.css
  // https://documenti.camera.it/leg19/dati_dovesiedono/css/componenti.css
}
