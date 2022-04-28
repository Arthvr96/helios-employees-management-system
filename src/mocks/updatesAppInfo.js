export const adminUpdatesAppInfo = [
  {
    ver: '1.3.1',
    date: '28.04.2022',
    changeLog: [
      {
        title: 'Dodano "kreator kształtu grafiku"',
        description: `Feature potrzebny w przyszłości do generowania grafiku`,
      },
    ],
  },
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

export const userUpdatesAppInfo = [
  {
    ver: '1.3',
    date: '23.04.2022',
    changeLog: [
      {
        title: 'Dodano "Widok powitalny dla pracownika"',
        description: `Domylsnie teraz po zalogowaniu pojawi sie panel z powitaniem a nie widok z dyspozycja`,
      },
      {
        title: 'Dodano podglad ostataniej wyslanej dyspozycji',
        description: `W panelu wysylania dyspo gdy wysylanie zostanie zablokowane bedzie mozna podejrzec wyslana dyspozycje`,
      },
      {
        title: 'Dodano "archiwalne dyspozycje',
        description: `W menu pojawil sie nowy link prowadzacy do widoku z archiwalnymi dyspozycjami. Przechowywane jest 5 archiwalnych dyspozycji`,
      },
      {
        title: 'Zmiany w formularzu do wysylania dyspozycji',
        description: `1)Data jest od teraz w PL formacie (tj. dd-mm). 2)Dla dni na ktore przewidziany jest maraton dostaja specjalnie oznaczenie w postaci literki "M" przy dacie.`,
      },
    ],
  },
];
