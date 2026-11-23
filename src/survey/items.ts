// The temporary choice page (/wybor/): what the owner's wife is asked. Lives only on a deploy
// preview; her summary comes back into docs/backlog.md. Rows of docs/research/comparison.md are
// referred to by their number.

interface Item {
  id: string;
  title: string;
  /** One or two sentences: what it is, in kitchen words. */
  text?: string;
  /** The answers; the default is Tak / Może / Nie. */
  options?: readonly string[];
  /** Which answer the agent would pick, by its label. */
  rec?: string;
  /** Who else has it, from the comparison. */
  seen?: string;
}

export interface Section {
  id: string;
  title: string;
  intro: string;
  items: Item[];
}

export const YES_NO = ['Tak', 'Może', 'Nie'] as const;
const KEEP = ['Podoba się', 'Do poprawy', 'Niepotrzebne'] as const;

export const SECTIONS: Section[] = [
  {
    id: 'jest',
    title: 'Co już jest na stronie',
    intro: 'Tak strona działa dziś. Zaznacz, co zostawić, a co poprawić. Szczegóły w uwadze.',
    items: [
      {
        id: 'finder',
        title: 'Wyszukiwarka „Co mam w domu?”',
        text: 'Na liście przepisów zaznaczasz produkty, a lista układa przepisy od tych, którym brakuje najmniej.',
        options: KEEP,
      },
      {
        id: 'list',
        title: 'Lista przepisów od A do Z',
        text: 'Wszystkie przepisy na jednej stronie, z podziałem na posiłki.',
        options: KEEP,
      },
      {
        id: 'page',
        title: 'Strona przepisu',
        text: 'Na górze tytuł i krótki opis, potem składniki i przygotowanie. Na komputerze składniki są obok kroków.',
        options: KEEP,
      },
      {
        id: 'tick',
        title: 'Odhaczanie składników',
        text: 'Dotknięty składnik się przekreśla, widać, co już jest odmierzone.',
        options: KEEP,
      },
      {
        id: 'print',
        title: 'Przycisk „Drukuj przepis”',
        text: 'Na kartce tylko przepis: bez menu i stopki.',
        options: KEEP,
      },
      {
        id: 'facts',
        title: 'Czas i porcje',
        text: 'Ile minut pracy, ile w sumie i na ile osób.',
        options: KEEP,
      },
      {
        id: 'spice',
        title: 'Jak ostre',
        text: 'Od „łagodne” do „bardzo ostre”, wpisane przez nas po ugotowaniu.',
        options: KEEP,
      },
      {
        id: 'kids',
        title: 'Czy dzieciom smakowało',
        text: 'Smakowało, tak sobie, nie smakowało. Do czasu ugotowania: „jeszcze nie wiemy”.',
        options: KEEP,
      },
      {
        id: 'draft',
        title: 'Znaczek „Do sprawdzenia”',
        text: 'Przepis z internetu, którego jeszcze nie gotowaliśmy. Pod nim są źródła.',
        options: KEEP,
      },
      {
        id: 'look',
        title: 'Wygląd zeszytu',
        text: 'Jasny papier, granatowy atrament, czerwony margines, duża czytelna czcionka.',
        options: KEEP,
      },
    ],
  },
  {
    id: 'decyzje',
    title: 'Decyzje do podjęcia',
    intro: 'Tu jest kilka możliwości do wyboru. Polecana jest zawsze pierwsza.',
    items: [
      {
        id: 'entry',
        title: 'Jak dodawać przepisy',
        text: 'Ani Ty, ani Kuba nie musicie pisać kodu. Pytanie, jak przepis trafia na stronę.',
        options: [
          'Wysyłam Kubie (tekst, zdjęcie z zeszytu, link)',
          'Wypełniam formularz w osobnej aplikacji',
          'Wklejam cokolwiek na naszej stronie, strona sama układa przepis',
          'Nie wiem, pokażcie mi',
        ],
        rec: 'Wysyłam Kubie (tekst, zdjęcie z zeszytu, link)',
      },
      {
        id: 'name',
        title: 'Nazwa strony',
        text: 'Dziś: „Nasza kuchnia”. Inną nazwę wpisz w uwadze.',
        options: ['Nasza kuchnia', 'Inna'],
      },
      {
        id: 'owner',
        title: 'Czyja to strona (w stopce)',
        text: 'Dziś w stopce jest Kuba.',
        options: ['Kuba', 'Ja', 'Oboje', 'Nazwisko rodziny'],
      },
      {
        id: 'versions',
        title: 'Kilka wersji jednego dania',
        text: 'Na przykład ser z nerkowców z dwóch różnych stron.',
        options: [
          'Jedna strona, wersje jedna pod drugą (jak Dżem wiśniowy)',
          'Osobne strony, połączone linkiem',
        ],
        rec: 'Jedna strona, wersje jedna pod drugą (jak Dżem wiśniowy)',
      },
      {
        id: 'products',
        title: 'Długa lista produktów w wyszukiwarce',
        text: 'Przy 26 przepisach jest już 90 produktów i na telefonie trzeba długo przewijać.',
        options: [
          'Pole do wpisania produktu',
          'Produkty w grupach (warzywa, nabiał, mięso)',
          'Zostaw jak jest',
        ],
        rec: 'Pole do wpisania produktu',
      },
      {
        id: 'pantry',
        title: 'Co jest zawsze w domu',
        text: 'Tego nie trzeba zaznaczać: sól, pieprz, olej, woda, cukier. Co dopisać, wpisz w uwadze.',
        options: ['Tak zostaw', 'Dopisz więcej'],
      },
      {
        id: 'dark',
        title: 'Ciemny wygląd strony na wieczór',
        options: ['Nie', 'Tak'],
      },
    ],
  },
  {
    id: 'przepis',
    title: 'Co jeszcze w przepisie',
    intro:
      'Rzeczy, które mają inne strony z przepisami. Przy każdej: ile z 18 przeczytanych stron to ma.',
    items: [
      {
        id: 'photo',
        title: 'Zdjęcie dania, naszego',
        seen: 'prawie wszystkie mają zdjęcia, nikt waszych',
        rec: 'Tak',
      },
      {
        id: 'scale',
        title: 'Przeliczanie na liczbę osób',
        text: 'Wpisujesz 2 zamiast 4 i ilości same się zmieniają.',
        seen: 'nikt; Moje Wypieki przeliczają ciasto na inną blachę',
        rec: 'Tak',
      },
      {
        id: 'screen',
        title: 'Ekran nie gaśnie przy gotowaniu',
        text: 'Jeden przycisk na stronie przepisu, telefon nie wygasza się z brudnymi rękami.',
        seen: '2 z 18 (Moje Wypieki, Moja Delicja)',
        rec: 'Tak',
      },
      {
        id: 'cups',
        title: 'Szklanki i łyżki obok gramów',
        text: '„200 g (ok. 1,5 szklanki)” bez szukania wagi.',
        seen: '2 z 18 (AniaGotuje, Moja Delicja)',
        rec: 'Tak',
      },
      {
        id: 'storage',
        title: 'Jak przechowywać i jak długo',
        text: 'Jedna linijka tam, gdzie to ważne: dżem, ser, baklawa.',
        seen: '2 z 18',
        rec: 'Tak',
      },
      { id: 'subs', title: 'Czym zastąpić składnik', seen: '2 z 18, kilka częściowo', rec: 'Tak' },
      {
        id: 'difficulty',
        title: 'Trudność',
        text: 'Na przykład „łatwe” albo „wymaga wprawy”.',
        seen: '2 z 18 (Lidl, Kuchnie Orientalne)',
        rec: 'Może',
      },
      {
        id: 'subrecipe',
        title: 'Link do przepisu na sos albo dodatek',
        text: 'Gdy w przepisie jest „sos jogurtowy” i mamy jego przepis.',
        seen: '3 z 18',
        rec: 'Tak',
      },
      { id: 'related', title: 'Podobne przepisy pod spodem', seen: '9 z 18', rec: 'Może' },
      {
        id: 'history',
        title: 'Skąd się wzięło danie, jedno zdanie',
        seen: '1 z 18, kilka częściowo',
        rec: 'Może',
      },
      { id: 'where', title: 'Gdzie kupić nietypowy składnik', seen: '3 z 18', rec: 'Może' },
      {
        id: 'mistakes',
        title: 'Co może pójść nie tak',
        seen: '1 z 18 (Kuchnie Orientalne)',
        rec: 'Może',
      },
      {
        id: 'notes',
        title: 'Własna notatka przy przepisie',
        text: 'Zapisana w telefonie, widzisz ją tylko Ty.',
        seen: '2 z 18 (Kwestia Smaku, AniaGotuje)',
        rec: 'Może',
      },
    ],
  },
  {
    id: 'strona',
    title: 'Co jeszcze na stronie',
    intro: 'Rzeczy dla całej strony: Twoje i Kuby pomysły, moje i to, co mają inni.',
    items: [
      {
        id: 'shopping',
        title: 'Lista zakupów z kilku przepisów',
        text: 'Wybierasz przepisy na kilka dni i dostajesz jedną listę, zsumowaną.',
        seen: 'nikt; AniaGotuje kopiuje składniki jednego przepisu',
        rec: 'Tak',
      },
      {
        id: 'week',
        title: 'Plan obiadów na tydzień',
        text: 'Razem z jedną listą zakupów.',
        seen: 'nikt',
        rec: 'Może',
      },
      {
        id: 'log',
        title: 'Dziennik gotowania',
        text: 'Kiedy robiliśmy, dla kogo (goście, urodziny), co zmieniliśmy.',
        seen: 'nikt',
        rec: 'Tak',
      },
      {
        id: 'tags',
        title: 'Znaczki: wegetariańskie, na szybko, dla gości, z piekarnika, na zapas',
        seen: 'kilka stron ma znaczki diet',
        rec: 'Tak',
      },
      {
        id: 'ingredient',
        title: 'Strona składnika: co z niego zrobić',
        seen: '5 z 18',
        rec: 'Tak',
      },
      { id: 'search', title: 'Szukanie przepisu po nazwie', seen: 'prawie wszystkie', rec: 'Może' },
      {
        id: 'leftovers',
        title: '„Co zrobić z resztek”: ugotowany ryż, czerstwy chleb',
        seen: 'nikt',
        rec: 'Może',
      },
      {
        id: 'season',
        title: 'Co jest teraz w sezonie',
        seen: '1 z 18 (Magiczny Składnik)',
        rec: 'Może',
      },
      {
        id: 'knowledge',
        title: 'Ściąga kuchenna',
        text: 'Techniki, zamienniki, ile gramów w szklance.',
        seen: 'Kwestia Smaku ma przelicznik',
        rec: 'Tak',
      },
      {
        id: 'want',
        title: '„Chcemy spróbować”',
        text: 'Lista przepisów, które czekają na ugotowanie.',
        seen: 'ulubione na 5 stronach, ale z kontem',
        rec: 'Tak',
      },
      {
        id: 'random',
        title: '„Co dziś na obiad?”: jeden losowy przepis',
        seen: 'nikt',
        rec: 'Może',
      },
      {
        id: 'timer',
        title: 'Minutnik w kroku',
        text: 'Przy „gotuj 10 minut” przycisk, który odlicza.',
        seen: 'nikt',
        rec: 'Może',
      },
      {
        id: 'share',
        title: 'Wyślij przepis z telefonu',
        text: 'Przycisk otwiera WhatsAppa, SMS albo maila, jak przy zdjęciach.',
        rec: 'Tak',
      },
      {
        id: 'kidsver',
        title: 'Łagodniejsza wersja dla dzieci, w uwadze',
        seen: 'nikt',
        rec: 'Może',
      },
      {
        id: 'scan',
        title: 'Zdjęcie odręcznego przepisu obok',
        text: 'Dla przepisów ze starych zeszytów.',
        seen: 'nikt',
        rec: 'Może',
      },
      { id: 'newest', title: '„Ostatnio dodane” na stronie głównej', rec: 'Może' },
      {
        id: 'book',
        title: 'Wydruk wybranych przepisów jako zeszyt, na prezent',
        seen: 'nikt',
        rec: 'Może',
      },
    ],
  },
];

export const STORAGE_KEY = 'kuchnia-wybor-v1';
