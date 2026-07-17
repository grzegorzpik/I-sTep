/*
 * Statyczne dane modułów i lekcji. Węzły bez pola `question`/`questions`
 * są celowo puste — reprezentują treść jeszcze nieopisaną (zasada "nie
 * projektuj na zapas" z koncepcji), mapa renderuje je jako zablokowane.
 */
window.IStepContent = {
  modules: [
    {
      id: 'modul-0',
      title: 'Jak działa internet',
      eyebrow: 'MODUŁ 0 · INTERNET',
      accent: '#4E8FC4',
      accentDark: '#3A6A94',
      lessons: [
        {
          id: 'api',
          label: 'Czym jest API',
          eyebrowLesson: 'MODUŁ 0 · MIKROLEKCJA 1',
          title: 'Czym jest API?',
          xp: 10,
          body: 'API to <b>umówiony sposób</b>, w jaki jedna aplikacja może poprosić drugą o dane albo działanie — bez wiedzy, co dzieje się „w środku” tej drugiej.',
          analogy: 'To jak kelner w restauracji. Nie idziesz do kuchni gotować sam — mówisz kelnerowi, czego chcesz, on przekazuje to kuchni, a potem przynosi Ci gotowe danie. Nie musisz wiedzieć, co dokładnie dzieje się w kuchni.',
          question: 'Co najlepiej opisuje rolę API w Twojej aplikacji do pogody?',
          options: [
            { text: 'To baza danych, w której trzymasz historię pomiarów', correct: false },
            { text: 'To „kelner” pośredniczący między Twoją apką a serwerem pogodowym', correct: true },
            { text: 'To wygląd graficzny ekranu pogody', correct: false },
          ],
          feedbackCorrect: 'Dokładnie tak — API pośredniczy w rozmowie, nie jest samą treścią.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: wróć do analogii wyżej — kto tam nie gotuje sam, tylko przekazuje zamówienie do kuchni i przynosi gotowe danie?',
        },
        {
          id: 'klient-serwer',
          label: 'Co to klient?',
          eyebrowLesson: 'MODUŁ 0 · MIKROLEKCJA 2',
          title: 'Co to klient?',
          xp: 10,
          body: 'Klient to <b>ten, kto pyta</b> — aplikacja albo przeglądarka, z której korzystasz. To ona wysyła zapytanie i czeka na odpowiedź, ale sama nie przechowuje danych ani nie wykonuje głównej logiki — tym zajmuje się serwer po drugiej stronie.',
          analogy: 'To jak dzwonienie na infolinię. Ty (klient) dzwonisz i pytasz o coś, konsultant (serwer) sprawdza w swoim systemie i mówi Ci odpowiedź. Nie widzisz, co dzieje się w tym systemie — zadajesz pytanie i odbierasz odpowiedź.',
          question: "Otwierasz swoją aplikację pogodową na telefonie. Co w tym układzie jest „klientem”?",
          options: [
            { text: 'Twoja aplikacja na telefonie, która wysyła zapytanie o pogodę', correct: true },
            { text: 'Serwer pogodowy, który przechowuje dane historyczne', correct: false },
            { text: 'Internet jako całość', correct: false },
          ],
          feedbackCorrect: 'Dokładnie — klient to strona, która inicjuje zapytanie i wyświetla wynik, nie ta, która przechowuje dane.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: klient to zawsze ten, kto pyta pierwszy i czeka na odpowiedź — pomyśl, co robi pierwszy krok, gdy otwierasz apkę.',
        },
        {
          id: 'request-response',
          label: 'Request & response',
          eyebrowLesson: 'MODUŁ 0 · MIKROLEKCJA 3',
          title: 'Request & response',
          xp: 10,
          body: 'Każda wymiana danych między klientem a serwerem to para: <b>request</b> (zapytanie, które wysyłasz — co chcesz i skąd) i <b>response</b> (odpowiedź, która wraca). Bez requestu nie ma na co odpowiedzieć; bez response nie wiesz, czy dotarł.',
          analogy: 'To jak SMS z pytaniem i odpowiedź zwrotna. Twoje pytanie to request, wiadomość, która przychodzi później, to response. Dopóki nie wyślesz pytania, druga strona nie wie, o co pytasz — a Ty czekasz, aż coś wróci.',
          question: 'Otwierasz stronę sklepu internetowego i widzisz listę produktów. Co w tym momencie było „response”?',
          options: [
            { text: 'Kliknięcie w link do sklepu', correct: false },
            { text: 'Lista produktów, która wróciła z serwera i wyświetliła się na ekranie', correct: true },
            { text: 'Adres strony wpisany w przeglądarce', correct: false },
          ],
          feedbackCorrect: 'Tak — response to zawsze dane, które wracają z serwera i lądują na ekranie.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: response to zawsze to, co przychodzi z powrotem — nie to, co Ty wysyłasz albo klikasz.',
        },
        {
          id: 'json',
          label: 'JSON',
          eyebrowLesson: 'MODUŁ 0 · MIKROLEKCJA 4',
          title: 'Co to JSON?',
          xp: 10,
          body: '<b>JSON</b> to popularny format zapisu danych — lekki, czytelny tekst z parami „klucz: wartość”. To nim najczęściej posługują się request i response, kiedy przesyłają dane między klientem a serwerem.',
          analogy: 'To jak wypełniona metryczka na paczce: „nadawca: Kasia”, „waga: 2kg”, „zawartość: książki”. Każda informacja ma swoją nazwę (klucz) i wartość, więc obie strony wiedzą, co czytają — mimo że to zwykły tekst.',
          question: 'Serwer pogodowy odsyła aplikacji odpowiedź: {"temperatura": 18, "miasto": "Kraków"}. Czym jest ten zapis?',
          options: [
            { text: 'To JSON — sposób zapisania danych, który obie strony rozumieją', correct: true },
            { text: 'To adres API, pod który wysłano zapytanie', correct: false },
            { text: 'To kod źródłowy aplikacji pogodowej', correct: false },
          ],
          feedbackCorrect: 'Zgadza się — JSON to tylko format zapisu danych, nie mechanizm ich przesyłania (tym zajmuje się API).',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: szukasz nazwy dla samego zapisu danych w nawiasach klamrowych, nie dla mechanizmu, który je przesyła.',
        },
        {
          id: 'endpoint',
          label: 'Endpoint',
          eyebrowLesson: 'MODUŁ 0 · MIKROLEKCJA 5',
          title: 'Co to endpoint?',
          xp: 10,
          body: '<b>Endpoint</b> to konkretny „adres” w obrębie API, pod który wysyłasz zapytanie o określony rodzaj danych albo działanie. Jedno API zwykle ma wiele endpointów — każdy odpowiada za coś innego.',
          analogy: 'To jak konkretne okienko w urzędzie: „okienko 3 — sprawy paszportowe”, „okienko 5 — meldunki”. Sam budynek (API) obsługuje wiele spraw, ale do każdej trzeba zgłosić się pod właściwe okienko (endpoint).',
          question: 'Aplikacja pogodowa korzysta z jednego API, ale osobno pobiera „aktualną pogodę” i osobno „prognozę na tydzień”. Czym różnią się te dwa zapytania?',
          options: [
            { text: 'To dwa różne endpointy tego samego API — każdy zwraca inny rodzaj danych', correct: true },
            { text: 'To dwa różne, niezależne od siebie API', correct: false },
            { text: 'To ten sam endpoint, tylko wysłany dwa razy', correct: false },
          ],
          feedbackCorrect: 'Dokładnie — jeden serwis, ale różne „okienka” pod różne rodzaje danych.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: pomyśl o jednym urzędzie z wieloma okienkami do różnych spraw.',
        },
      ],
      // Checkpoint, not a mikrolekcja — sits right before the beacon and only
      // unlocks once every lesson above is done. Questions revisit concepts
      // from real (built) lessons via new scenarios, never the same example
      // twice, so it can't be passed by memorizing wording.
      quiz: {
        id: 'quiz-modul-0',
        label: 'Quiz: sprawdzian modułu',
        eyebrowLesson: 'MODUŁ 0 · QUIZ',
        title: 'Sprawdzian: Jak działa internet',
        xp: 20,
        questions: [
          {
            question:
              'Piszesz do znajomego wiadomość w komunikatorze. W układzie klient-serwer, czym w tym momencie jest Twoja aplikacja komunikatora?',
            options: [
              { text: 'Klientem — inicjuje wysłanie wiadomości i czeka na potwierdzenie', correct: true },
              { text: 'Serwerem — przechowuje wszystkie wiadomości na stałe', correct: false },
              { text: 'Protokołem — ustala zasady przesyłania danych', correct: false },
            ],
            feedbackCorrect: 'Zgadza się — apka, z której korzystasz, zawsze jest stroną inicjującą, czyli klientem.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: klient to zawsze ten, kto pyta pierwszy — kto w tej sytuacji zaczyna działanie?',
          },
          {
            question:
              'Aplikacja do zamawiania jedzenia pokazuje na mapie pozycję kuriera w czasie rzeczywistym. Co najlepiej opisuje mechanizm, który dostarcza jej te dane z systemu firmy kurierskiej?',
            options: [
              { text: 'API firmy kurierskiej, przez które aplikacja pyta o aktualną pozycję', correct: true },
              { text: 'JSON, czyli sam format danych, w którym trzymana jest pozycja', correct: false },
              { text: 'Klient, czyli aplikacja na Twoim telefonie', correct: false },
            ],
            feedbackCorrect: 'Dokładnie — to API pośredniczy w tej wymianie, niezależnie w jakim formacie dane wracają.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: szukasz mechanizmu „kelnera” między dwiema aplikacjami, nie samego klienta ani formatu danych.',
          },
          {
            question:
              'Wpisujesz frazę w wyszukiwarkę i naciskasz Enter. Zanim zobaczysz wyniki na ekranie, coś wraca z serwera wyszukiwarki. Jak nazywa się to, co wraca?',
            options: [
              { text: 'Response — dane, które wracają i stają się widocznymi wynikami', correct: true },
              { text: 'Request — bo dopiero pojawia się na ekranie', correct: false },
              { text: 'Endpoint — miejsce, do którego wysłano zapytanie', correct: false },
            ],
            feedbackCorrect: 'Tak — to, co wraca i ląduje na ekranie, zawsze jest response’em.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: pytanie to jedna strona pary request/response, wynik na ekranie to druga.',
          },
          {
            question:
              'Twoja aplikacja fitness zapisuje trening jako {"dystans": 5.2, "czas": "32min"}. Do czego służy taki zapis?',
            options: [
              { text: 'Do przedstawienia danych w formie, którą łatwo odczyta i klient, i serwer', correct: true },
              { text: 'Do ukrycia danych przed niepowołanym dostępem', correct: false },
              { text: 'Do wysyłania zapytań do API', correct: false },
            ],
            feedbackCorrect: 'Zgadza się — to format danych (JSON), nie mechanizm bezpieczeństwa ani sposób wysyłania zapytań.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: pytanie dotyczy tego, CZYM jest ten zapis, nie do czego służy samo zapytanie.',
          },
          {
            question:
              'Aplikacja bankowa w jednym miejscu pokazuje saldo konta, a w innym historię przelewów — mimo że korzysta z jednego API banku. Co pozwala jej rozróżnić te dwa rodzaje danych?',
            options: [
              { text: 'Dwa różne endpointy — każdy zwraca inny wycinek danych', correct: true },
              { text: 'Dwa różne JSON-y niezależne od API', correct: false },
              { text: 'Dwóch różnych klientów działających równolegle', correct: false },
            ],
            feedbackCorrect: 'Dokładnie — różne endpointy tego samego API, każdy odpowiedzialny za inny rodzaj danych.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: szukasz pojęcia opisującego konkretny „adres” w obrębie jednego API.',
          },
        ],
      },
      beacon: { id: 'bootcamp-0', label: 'Bootcamp:<br>integracja API' },
    },
  ],
};
