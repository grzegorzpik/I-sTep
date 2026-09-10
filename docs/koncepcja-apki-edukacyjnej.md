# Koncepcja: aplikacja do nauki podstaw IT przez tworzenie

## Cel projektu

Nie nauka programowania — nauka **swobodnego poruszania się** w świecie IT: rozumienia mechanizmów, możliwości i ograniczeń, na tyle żeby świadomie współpracować z AI i ludźmi technicznymi. Bez ambicji zawodowej zmiany kierunku (junior dev, tester itd.) — cel to (do)wolność, nie specjalizacja.

Odbiorca: szersze grono (nie tylko autor), ale bez zakładania konkretnej grupy docelowej na start.

Kontekst: to już **czwarty projekt** w tym stylu (reSave it!, Roślinna szłAppka, apka do treningu) — wszystkie wciąż w użyciu. To potwierdza, że model "buduj coś realnego, ucz się po drodze" działa.

---

## Fundamentalne zasady programu

**1. Nauka przez budowanie, nie przez kurs**
Fundamenty wplecione w tworzenie realnych rozwiązań, nie osobny moduł teoretyczny przed praktyką. AI pisze/tłumaczy kod na bieżąco, użytkownik podejmuje decyzje produktowe.

**2. Szkielet + własna kreatywność, nie projekt od zera za każdym razem**
Moduł dostarcza gotowy "silnik" (np. połączenie z API + zapis danych + wyświetlanie), użytkownik decyduje o warstwie zastosowania (jakie dane, jak interpretowane, po co). To utrzymuje tempo nauki bez rezygnacji z osobistego zaangażowania.

**3. Kontynuacja jako domyślna zasada, restart jako świadomy wyjątek**
Domyślnie: każdy nowy moduł dokłada funkcję do istniejącego, rosnącego projektu (głębia, realizm, przywiązanie).
Restart z nowym projektem/technologią uzasadniony wtedy, gdy pokazuje **nowy typ myślenia o problemie**, nie nową składnię tego samego mechanizmu (np. SQL — tak, bo to inny sposób myślenia o danych; kolejny język frontendowy — nie, bo to ta sama mechanika w innym ubraniu).

**4. Zakres: świat aplikacji mobilnych/webowych, nie cały IT**
Świadomie wąsko — nie "poznam wszystko", tylko "zrozumiem świat, w którym faktycznie tworzę". SQL/bazy danych mają wysoki priorytet (naturalna granica, na którą użytkownik i tak trafi przy skalowaniu własnych projektów). Python/analityka — poza zakresem, brak zastosowania.

**5. Rytm: hybryda, nie czysty Duolingo ani czysty bootcamp**
- Codzienne mikro-dawki (3–5 min): jedno pojęcie, jedno pytanie sprawdzające, czasem fragment kodu do przeczytania i wytłumaczenia.
- Weekendowe/wieczorne mikrobootcampy (1–3h): budowanie realnej funkcji na bazie pojęć zebranych w tygodniu.
Codzienne dawki karmią materiał pod najbliższy bootcamp — progresja wpisana w rytm, nie doklejona później.

**6. Świadomy łuk rozwoju, zaprojektowany, nie przypadkowy**
Eskalacja na trzech osiach jednocześnie:
- złożoność koncepcji (od pojedynczego pojęcia do łączenia kilku naraz),
- samodzielność decyzji (od "AI proponuje, Ty akceptujesz" do "Ty proponujesz, AI komentuje"),
- różnorodność typu zadania (nie ciągle to samo w kółko — raz CRUD, raz integracja zewnętrzna, raz coś z uprawnieniami/rolami).

**7. Automatyczny dziennik doświadczeń**
Po zamknięciu każdego modułu aplikacja sama generuje wpis: co wdrożono, jaki mechanizm poznano, kiedy. Rozwiązuje napięcie między głębią (jeden rosnący projekt) a widocznością progresji (osobne, czytelne kroki) — bez dodatkowej pracy dokumentacyjnej po godzinach. Dodatkowo: wyszukiwalna baza własnych doświadczeń ("czy ja już to testowałem?").

**8. Test na dryf w stronę "ładnego portfolio"**
Przy każdym wyborze modułu/kierunku: *czy zrobiłbym to, gdyby nikt nigdy tego nie zobaczył?* Jeśli tak — kontynuować niezależnie od tego, czy "dobrze wygląda". Jeśli nie — sygnał, że motywacja zewnętrzna zaczyna sterować wyborem tematu.

**9. Weryfikacja sensu co kilka modułów**
Po każdym module (i regularnie w dzienniku): co się nauczyłem, co działało, czy to nadal ma sens. Jeśli po kilku modułach brak odpowiedzi na "po co to robię" — sygnał do zmiany kursu, nie kontynuowania siłą.

**10. Warstwa wizualna/UI-UX jako równoległa nitka, nie etap na końcu**
Silne zainteresowanie: mechanika UI, animacje, micro-interactions, "lukrowanie" na bazie popularnych aplikacji — docelowy kierunek rozwoju.
Rozróżnienie: **UX jako myślenie o produkcie** użytkownik już ma (widoczne w decyzjach przy reSave, w pracy nad IA) — to nie wymaga nauki od zera, tylko przełożenia istniejącej intuicji na język techniczny. **Warstwa wizualna/animacyjna** (CSS, transitions, animations, biblioteki typu Framer Motion) to osobna, względnie "tania" fundamentalnie umiejętność — nie wymaga głębokiego zrozumienia danych/backendu, można rozwijać od startu.
Konsekwencja dla struktury: nie czekać z tym do końca ścieżki fundamentów. Każdy mikrobootcamp (niezależnie od głównego tematu modułu) kończy się dodatkową, świadomą rundą "dopieszczania" — jeden nowy trik wizualny/animacyjny dorzucany do już zbudowanej funkcji. Fundament merytoryczny rośnie w tle, warstwa wizualna rośnie widocznie z modułu na moduł — silny, namacalny ślad w dzienniku doświadczeń.

---

## Wstępne duże klocki programowe (do dalszego rozwinięcia)

1. **Jak działa internet** — klient, serwer, API, JSON, request/response
2. **Dane** — obiekt, lista, ID, relacja (fundament pod SQL)
3. **Logika** — czytanie (nie pisanie) if/else/for/funkcja/zmienna
4. **Wersjonowanie** — git jako "Ctrl+Z" projektu
5. **Architektura** — umiejętność narysowania przepływu (telefon → frontend → API → baza → pliki)
6. **Bazy danych / SQL** — inny sposób myślenia o danych niż localStorage/IndexedDB
7. **Backend / API własne** — co dzieje się "po drugiej stronie" aplikacji
8. **Proces publikacji aplikacji** (np. App Store) — zrozumienie mechanizmu dystrybucji, certyfikatów, review — nie z myślą biznesową, tylko domknięcie rozumienia świata

**Oś równoległa (nie osobny blok w kolejce, tylko element każdego mikrobootcampu):**
9. **Warstwa wizualna / UI-UX / animacje** — CSS, transitions, micro-interactions, wzorce z popularnych aplikacji. Rozwijana od pierwszego modułu, rosnąca z każdym kolejnym.

*(Kolejność i grupowanie bloków 1–8 w konkretne moduły — do ustalenia w następnym kroku.)*

---

## Otwarte pytania na kolejny etap

- Podział ośmiu bloków tematycznych na konkretne moduły z jasną kolejnością i zależnościami — **odłożone do etapu "duża retrospekcja po 6 tygodniach", świadomie**.

---

## Zamknięcie etapu filozoficznego

### Definicja sukcesu (po 6 miesiącach)
- Potrafię świadomie rozmawiać z AI o architekturze.
- Rozumiem większość decyzji technicznych w swoich aplikacjach.
- Czuję mniejszą "magię", większą sprawczość.

### Definicja porażki
- Uczę się rzeczy, których nigdy nie używam.
- Projekt zaczyna przypominać bootcamp programistyczny.
- Tracę przyjemność z budowania.

Od tego miejsca: **koniec rozbudowy filozofii.** Dalsze decyzje projektowe (kolejność bloków, dobór technologii, głębia poszczególnych tematów) podejmowane są dopiero na bazie danych z pierwszego eksperymentu, nie z góry.

---

## Format modułu (obowiązujący dla każdego modułu)

1. **Dlaczego to istnieje?** — konkretny, osobisty trigger (np. "AI ciągle proponuje mi ID i relacje, a ja nie wiem dlaczego").
2. **Mikrolekcje** — kilka pojęć, krótkie dawki.
3. **Jedno ćwiczenie praktyczne.**
4. **Jedna zmiana w prawdziwej, istniejącej aplikacji** (nie w oderwanym przykładzie).
5. **Jeden nowy trik wizualny/animacyjny** dorzucony do zmiany z pkt. 4 — warstwa wizualna rośnie z każdym modułem, nie czeka do końca ścieżki.
6. **Retrospekcja** (wpis w dzienniku doświadczeń).

## Struktura wpisu w dzienniku doświadczeń

```
Moduł: [nazwa]
Czego się nauczyłem?
Co zaczynam rozumieć?
Co nadal jest dla mnie niejasne?
Jak wykorzystałem to w swojej aplikacji?
Jaki trik wizualny/animacyjny dodałem?
Czy czuję większą sprawczość? (1–5)
```

## Trzy zasady ochronne

1. **Każdy moduł musi przełożyć się na jedną realną zmianę w istniejącej aplikacji.** Jeśli nie da się jej wskazać — moduł jest prawdopodobnie zbyt teoretyczny.
2. **Nie uczę się rzeczy, których nie spodziewam się użyć w najbliższych miesiącach.** Chroni przed "a może się przyda" (Dockery, Kubernetesy itp.).
3. **Po każdym module: czy następna funkcja, którą będę budował, będzie dzięki temu łatwiejsza lub bardziej świadoma?** Jeśli nie — to prawdopodobnie niewłaściwy następny temat.

---

## Pierwszy eksperyment — Moduł 0 i Moduł 1 (i tylko one)

Świadomie **nie projektujemy dalszej ścieżki** niż te dwa moduły. Reszta ośmiu bloków tematycznych czeka na dane z eksperymentu.

### Moduł 0 — Jak działa internet
**Cel:** przestaję traktować API jak czarną skrzynkę.
**Mikrolekcje:** klient-serwer, request-response, API, JSON, endpoint.
**Bootcamp:** dodanie lub przeanalizowanie jednej integracji API w istniejącej aplikacji + jeden nowy trik wizualny przy okazji.

### Moduł 1 — Jak myśleć o danych
**Mikrolekcje:** obiekt, lista, ID, relacje, stan danych.
**Bootcamp:** przeprojektowanie fragmentu jednej z istniejących aplikacji + jeden nowy trik wizualny.

### Plan 6 tygodni
- **Tydzień 1:** zamknięcie filozofii (zrobione), format modułu (zrobiony), rozpisanie Modułu 0.
- **Tydzień 2:** przejście Modułu 0.
- **Tydzień 3:** retrospekcja, dopracowanie procesu, rozpisanie Modułu 1.
- **Tydzień 4–5:** przejście Modułu 1.
- **Tydzień 6:** duża retrospekcja — co działa, co nie, czy kontynuować, i dopiero wtedy projektowanie dalszej ścieżki (na bazie danych, nie hipotez).

---

## Mechanika aplikacji

### Wykonanie zadań — poza aplikacją, świadomie
Aplikacja to **tracker + struktura**, nie inteligencja. Nie ocenia, nie rozumie treści rozwiązań. Budowanie konkretnych rozwiązań (np. przykład pogoda+sen+energia) dzieje się w rozmowie z Claude — w tym czacie lub w nowej, czystej konwersacji z gotowym kontekstem (patrz niżej). To rozdzielenie ról jest celowe: aplikacja zamknięta w sobie (własna ocena, własny feedback) byłaby sprzeczna z założeniem "świadoma współpraca z AI", które przyświeca całemu projektowi.

### Nawigacja — mapa jak w Duolingo
- **Mapa główna** — moduły jako duże węzły na wspólnej ścieżce. Kolejne moduły zablokowane/wyszarzone do czasu odblokowania. Na start: tylko Moduł 0 i 1 aktywne, reszta świadomie niezaprojektowana.
- **Nitka modułu** — sekwencja węzłów: mikrolekcje (małe, odhaczane po kolei) → ćwiczenie praktyczne → bootcamp (węzeł-puchar, wyróżniony wizualnie) → retrospekcja/dyplom na końcu.
- Warstwa wizualna (punkt 10) ma tu naturalne pole do testowania: animowane odblokowywanie węzłów, przejścia, mikro-detale przy zamknięciu modułu.

### Przesłanie dowodu + prompt walidacyjny
Po zamknięciu bootcampu:
1. Ekran "Prześlij dowód" — załącznik (zrzut ekranu, plik, link do wdrożonej zmiany) jako potwierdzenie wykonania.
2. Aplikacja generuje **gotowy do wklejenia prompt walidacyjny**, złożony z szablonu + danych modułu: cel modułu, co miało zostać zbudowane/zmienione, jakie pojęcia miały zostać użyte, plus miejsce na własny komentarz użytkownika.
3. Użytkownik kopiuje prompt + załącznik do rozmowy z Claude (tej samej lub nowej, czystej — co dodatkowo daje świeże spojrzenie, niezależne od długiego, gęstniejącego wątku) i uzyskuje walidację/feedback z zewnątrz.
4. Wraca do aplikacji, zapisuje wnioski ręcznie w retrospekcji.

To utrzymuje całą "inteligencję" procesu w rozmowie z AI, a aplikacja tylko sprawnie przygotowuje kontekst pod nią — bez wbudowanego wywołania API.

### Ekran podsumowania modułu ("dyplom")
Nie plik do pobrania — **ekran w aplikacji**, wyświetlany po zamknięciu modułu, zbudowany z elementów, które i tak już powstały: cel modułu, poznane pojęcia, opis wprowadzonej zmiany w realnej aplikacji, skrót wniosków z walidacji/retrospekcji. Rozróżnienie od wpisu w dzienniku: dziennik jest procesowy (na bieżąco, w trakcie), ekran podsumowania jest końcowy i zwięzły (co już umiem, potwierdzone z zewnątrz). Zbiór takich podsumowań w czasie = naturalne portfolio, generowane jako efekt uboczny procesu, nie osobny wysiłek dokumentacyjny.
