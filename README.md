# dati-gruppi-parlamento

App node + express che permette di avere la composizione dei gruppi di Camera e Senato aggiornati in tempo reale.

Una volta avviato il server, offre due endpoint:

`/camera` restuisce un array con la lista dei gruppi nella Camera. Ogni gruppo è un oggetto con tre proprietà:

```js
{
type: "gruppo",
name: "ALLEANZA VERDI E SINISTRA",
number: 11
}
```

`/senato` restuisce un array con la lista dei gruppi nel Senato. Ogni gruppo è un oggetto con due proprietà:

```js
{
name: "Azione-ItaliaViva-RenewEurope",
number: 9
}
```
