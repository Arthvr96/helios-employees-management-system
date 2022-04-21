export const adminUpdatesAppInfo = [
  {
    ver: '1.3',
    date: '21.04.2022',
    changeLog: [
      {
        title: 'Dodano "Dni pracy kina"',
        description: `Podczas tworzenia nowego cyklu, pod wyborem dni ktore sa maratonowe dodano nowe menu wyboru : "Dni pracy kina". 
        Domyslnie zaznaczone sa wszystkie dni z okresu czyli w kazdy dzien kino jest otwarte. Odznaczenie jakiegos dnia równa sie z uniemozliwieniem wyslania na ten dzien dyspozycji.`,
      },
      {
        title: 'Dodano "kolorowanie kolumn dni wolnych od pracy" w archiwum wyslanych dyspozycji',
        description: `Dni ktore zostana oznaczone jako wolne od pracy zmienia kolor na ciemny szary (cala kolumna z dniem)`,
      },
      {
        title: 'Naprawiono: "Blad z kolorowaniem wiadomosci na zielono"',
        description: `W tabeli z archiwum dyspo, komorki z oznaczeniem czy wiadomosc wyslano czy nie (tak/nie) zmienialy kolor jesli wiadomosc zostala wyslana.
        Osoby ktore mialy uprwanienia na kawiarnie (czyli ich wers w tabeli mial kolor szary) gdy wyslaly wiadomosc pole z wiadomoscia nie zmienialo koloru.
        Teraz zmienia.`,
      },
      {
        title: 'System logowania',
        description: `System logowania zostal usprawniony`,
      },
    ],
  },
];
