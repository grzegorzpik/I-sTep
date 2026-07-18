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
      beacon: {
        id: 'bootcamp-0',
        label: 'Bootcamp:<br>integracja API',
        title: 'Integracja z API',
        eyebrowLesson: 'MODUŁ 0 · BOOTCAMP',
        xp: 50,
        goal:
          'Dodaj lub przeanalizuj jedną integrację API w istniejącej aplikacji (np. reSave, Roślinna szłAppka). Po zakończeniu będziesz wiedział, co dokładnie dzieje się między kliknięciem a pojawieniem się danych na ekranie. Przy okazji dorzuć jeden nowy trik wizualny do tej zmiany.',
      },
    },
    {
      id: 'modul-1',
      title: 'Jak myśleć o danych',
      eyebrow: 'MODUŁ 1 · DANE',
      accent: '#C97B4A',
      accentDark: '#8F5230',
      lessons: [
        {
          id: 'obiekt',
          label: 'Co to obiekt?',
          eyebrowLesson: 'MODUŁ 1 · MIKROLEKCJA 1',
          title: 'Co to obiekt?',
          xp: 10,
          body: '<b>Obiekt</b> to sposób opisania jednej rzeczy za pomocą par „cecha: wartość” — np. jednego produktu, jednego użytkownika, jednego wpisu. Wszystkie jego właściwości są trzymane razem, w jednym miejscu.',
          analogy: 'To jak wizytówka jednej osoby — imię, telefon, firma — wszystko na jednej karcie, dotyczące jednej konkretnej osoby, nie całej książki telefonicznej.',
          question: 'Twoja aplikacja treningowa zapisuje jeden trening jako {"dystans": 5, "czas": "30min"}. Czym jest ten zapis?',
          options: [
            { text: 'Obiektem — opisem jednej konkretnej rzeczy (tego treningu)', correct: true },
            { text: 'Listą wszystkich Twoich treningów', correct: false },
            { text: 'Endpointem, pod który wysyłasz zapytanie', correct: false },
          ],
          feedbackCorrect: 'Dokładnie — obiekt opisuje jedną rzecz, nie kolekcję rzeczy.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: zastanów się, ile różnych treningów opisuje ten jeden zapis.',
        },
        {
          id: 'lista',
          label: 'Co to lista?',
          eyebrowLesson: 'MODUŁ 1 · MIKROLEKCJA 2',
          title: 'Co to lista?',
          xp: 10,
          body: '<b>Lista</b> to zbiór wielu obiektów tego samego typu, ułożonych jeden za drugim. Tam gdzie obiekt opisuje jedną rzecz, lista zbiera wiele takich rzeczy razem — np. wszystkie Twoje treningi, wszystkie produkty w sklepie.',
          analogy: 'To jak cała książka telefoniczna — zbiór wielu wizytówek, każda osobna, ale trzymane razem w jednym miejscu, żeby móc je przeglądać po kolei.',
          question: 'Ekran główny Twojej aplikacji treningowej pokazuje wszystkie zapisane treningi, jeden pod drugim. Czym jest ten zestaw danych?',
          options: [
            { text: 'Listą obiektów — każdy trening to osobny obiekt w zbiorze', correct: true },
            { text: 'Jednym dużym obiektem zawierającym wszystko naraz', correct: false },
            { text: 'Endpointem API', correct: false },
          ],
          feedbackCorrect: 'Tak — lista to uporządkowany zbiór osobnych obiektów tego samego typu.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: zastanów się, czy każdy trening ma swoje osobne dane, czy są zlepione w jedno.',
        },
        {
          id: 'id-obiektu',
          label: 'Co to ID?',
          eyebrowLesson: 'MODUŁ 1 · MIKROLEKCJA 3',
          title: 'Co to ID?',
          xp: 10,
          body: '<b>ID</b> (identyfikator) to unikalna „etykieta” jednego obiektu w liście — dzięki niej aplikacja wie, KTÓRY dokładnie obiekt ma pokazać, zmienić albo usunąć, nawet jeśli dwa obiekty mają identyczną resztę danych.',
          analogy: 'To jak numer zamówienia — dwie osoby mogą zamówić dokładnie to samo, ale numer jednoznacznie wskazuje, o które zamówienie dokładnie chodzi.',
          question: 'W Twojej liście treningów są dwa treningi zapisane tego samego dnia, o tym samym dystansie. Co pozwala aplikacji odróżnić je od siebie i np. usunąć tylko jeden?',
          options: [
            { text: 'ID — unikalny identyfikator przypisany do każdego z nich', correct: true },
            { text: 'Kolejność wyświetlania na ekranie', correct: false },
            { text: 'Nazwa aplikacji', correct: false },
          ],
          feedbackCorrect: 'Zgadza się — ID jednoznacznie wskazuje konkretny obiekt, niezależnie od tego, jak bardzo przypomina inne.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: szukasz czegoś unikalnego dla każdego obiektu, nawet jeśli reszta danych jest identyczna.',
        },
        {
          id: 'relacje',
          label: 'Co to relacja?',
          eyebrowLesson: 'MODUŁ 1 · MIKROLEKCJA 4',
          title: 'Co to relacja?',
          xp: 10,
          body: '<b>Relacja</b> to powiązanie między dwoma obiektami różnego typu — np. między „użytkownikiem” a „treningiem”, który do niego należy. Zamiast powtarzać dane użytkownika w każdym treningu, trening po prostu przechowuje ID użytkownika, do którego należy.',
          analogy: 'To jak numer stolika przypięty do zamówienia w restauracji — zamówienie nie musi zawierać całego opisu gościa, wystarczy numer stolika, żeby wiedzieć, do kogo należy.',
          question: 'Twoja aplikacja treningowa ma teraz wielu użytkowników. Każdy trening zawiera pole "userId": "u42" zamiast pełnych danych użytkownika. Co to jest?',
          options: [
            { text: 'Relacja — trening jest powiązany z użytkownikiem przez jego ID', correct: true },
            { text: 'Osobna lista, niezwiązana z użytkownikami', correct: false },
            { text: 'Błąd w danych', correct: false },
          ],
          feedbackCorrect: 'Dokładnie — to relacja: trening „wie”, do kogo należy, przez ID, bez duplikowania danych.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: pomyśl, po co przechowywać samo ID zamiast kopiować cały obiekt użytkownika za każdym razem.',
        },
        {
          id: 'stan-danych',
          label: 'Co to stan danych?',
          eyebrowLesson: 'MODUŁ 1 · MIKROLEKCJA 5',
          title: 'Co to stan danych?',
          xp: 10,
          body: '<b>Stan</b> (state) to dane, które aplikacja aktualnie trzyma „w pamięci” i pokazuje na ekranie. Gdy coś się zmienia (np. dodajesz trening), zmienia się stan, a ekran się odświeża, żeby to odzwierciedlić.',
          analogy: 'To jak tablica ogłoszeń w pokoju — pokazuje aktualny zestaw karteczek. Gdy ktoś dopnie nową albo zdejmie starą, tablica od razu wygląda inaczej — nie trzeba budować jej od zera.',
          question: 'Dodajesz nowy trening w swojej aplikacji i od razu widzisz go na liście, bez odświeżania strony. Co się właśnie zmieniło?',
          options: [
            { text: 'Stan danych aplikacji — lista w pamięci zaktualizowała się, a ekran podążył za nią', correct: true },
            { text: 'Endpoint API, pod który wysyłasz zapytania', correct: false },
            { text: 'ID wszystkich wcześniejszych treningów', correct: false },
          ],
          feedbackCorrect: 'Tak — to zmiana stanu: dane w pamięci apki się zaktualizowały, a interfejs to odzwierciedlił.',
          feedbackWrong: 'Niestety, to zła odpowiedź.',
          hint: 'Podpowiedź: szukasz pojęcia opisującego „aktualną wersję danych trzymaną przez apkę”, nie mechanizmu przesyłania czy identyfikacji.',
        },
      ],
      // Practical exercise — ordering, not multiple-choice. Sits right after
      // the mikrolekcje, before the quiz. `correctIndex` is the step's
      // position in the real flow; the UI shuffles and lets the ordering
      // mechanic (cwiczenie.js) check the placement.
      cwiczenie: {
        id: 'cwiczenie-modul-1',
        label: 'Ćwiczenie:<br>ułóż przepływ danych',
        eyebrowLesson: 'MODUŁ 1 · ĆWICZENIE PRAKTYCZNE',
        title: 'Ułóż przepływ danych',
        xp: 20,
        instruction: 'Dotknij kroków poniżej w takiej kolejności, w jakiej faktycznie dzieją się od momentu, gdy serwer odsyła dane, do momentu, gdy widzisz je na ekranie.',
        hint: 'Podpowiedź: co musi się wydarzyć z surowymi danymi, zanim aplikacja w ogóle będzie wiedziała, który obiekt jest który — i zanim cokolwiek trafi na ekran?',
        steps: [
          { id: 'a', text: 'Serwer zwraca listę surowych obiektów (danych)', correctIndex: 0 },
          { id: 'b', text: 'Aplikacja odczytuje ID każdego obiektu, żeby móc go później odróżnić', correctIndex: 1 },
          { id: 'c', text: 'Aplikacja zapisuje listę w swoim stanie (state)', correctIndex: 2 },
          { id: 'd', text: 'Aplikacja renderuje listę na ekranie na podstawie stanu', correctIndex: 3 },
        ],
      },
      // Same checkpoint role as Module 0's quiz — new scenarios, never the
      // mikrolekcja examples verbatim.
      quiz: {
        id: 'quiz-modul-1',
        label: 'Quiz: sprawdzian modułu',
        eyebrowLesson: 'MODUŁ 1 · QUIZ',
        title: 'Sprawdzian: Jak myśleć o danych',
        xp: 20,
        questions: [
          {
            question: 'Aplikacja sklepowa pokazuje szczegóły jednego produktu: {"nazwa": "Kubek", "cena": 25}. Czym jest ten zapis?',
            options: [
              { text: 'Obiektem — opisem jednej konkretnej rzeczy', correct: true },
              { text: 'Listą wszystkich produktów', correct: false },
              { text: 'API sklepu', correct: false },
            ],
            feedbackCorrect: 'Tak — to obiekt, opisuje jeden produkt, nie cały asortyment.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: zastanów się, ile różnych produktów opisuje ten jeden zapis.',
          },
          {
            question: 'Ekran koszyka w sklepie pokazuje pięć dodanych produktów, jeden pod drugim. Czym jest ten zestaw?',
            options: [
              { text: 'Listą obiektów — każdy produkt to osobna pozycja w zbiorze', correct: true },
              { text: 'Jednym obiektem zawierającym wszystko naraz', correct: false },
              { text: 'Endpointem koszyka', correct: false },
            ],
            feedbackCorrect: 'Zgadza się — to lista osobnych obiektów (produktów) trzymanych razem.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: zastanów się, czy każdy produkt ma swoje osobne dane, czy są zlepione w jedno.',
          },
          {
            question: 'W koszyku są dwa identyczne kubki, w tej samej cenie. Co pozwala aplikacji usunąć z koszyka tylko jeden z nich?',
            options: [
              { text: 'ID przypisane do każdej pozycji w koszyku', correct: true },
              { text: 'Kolejność dodania do koszyka', correct: false },
              { text: 'Nazwa produktu', correct: false },
            ],
            feedbackCorrect: 'Tak — ID jednoznacznie wskazuje konkretną pozycję, nawet gdy reszta danych jest identyczna.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: szukasz czegoś unikalnego dla każdej pozycji, nawet jeśli reszta danych jest taka sama.',
          },
          {
            question: 'Każde zamówienie w sklepie ma pole "customerId": "c17" zamiast pełnych danych klienta. Co to jest?',
            options: [
              { text: 'Relacja — zamówienie jest powiązane z klientem przez jego ID', correct: true },
              { text: 'Błąd w danych', correct: false },
              { text: 'Osobna, niepowiązana lista', correct: false },
            ],
            feedbackCorrect: 'Dokładnie — to relacja: zamówienie „wie”, czyje jest, przez ID, bez duplikowania danych klienta.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: pomyśl, po co przechowywać samo ID zamiast kopiować cały obiekt klienta za każdym razem.',
          },
          {
            question: 'Usuwasz produkt z koszyka i licznik produktów od razu się zmniejsza, bez przeładowania strony. Co się zmieniło?',
            options: [
              { text: 'Stan danych aplikacji', correct: true },
              { text: 'Endpoint API', correct: false },
              { text: 'ID pozostałych produktów', correct: false },
            ],
            feedbackCorrect: 'Tak — to zmiana stanu: dane w pamięci apki zaktualizowały się, a interfejs to odzwierciedlił.',
            feedbackWrong: 'Niestety, to zła odpowiedź.',
            hint: 'Podpowiedź: szukasz pojęcia opisującego „aktualną wersję danych trzymaną przez apkę”.',
          },
        ],
      },
      beacon: {
        id: 'bootcamp-1',
        label: 'Bootcamp:<br>przeprojektowanie danych',
        title: 'Przeprojektowanie danych',
        eyebrowLesson: 'MODUŁ 1 · BOOTCAMP',
        xp: 50,
        goal:
          'Weź fragment jednej z Twoich istniejących aplikacji i przeprojektuj sposób, w jaki przechowuje dane — np. zamień pojedyncze zmienne na listę obiektów z ID, albo dodaj relację między dwoma typami danych, które wcześniej nie były połączone. Po zakończeniu będziesz wiedział, dlaczego Twoje dane wyglądają tak, a nie inaczej. Przy okazji dorzuć jeden nowy trik wizualny do tej zmiany.',
      },
    },
  ],
};
