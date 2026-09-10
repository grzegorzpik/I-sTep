# Audyt aplikacji „reSave it!" — wrzesień 2026

Audyt objął całość `index.html` (7099 linii) — statycznie oraz przez uruchomienie
aplikacji w headless Chromium i przejście realnych ścieżek użytkownika
(PIN → onboarding → budżet → koszty → garaż → cele → profil → zamknięcie miesiąca).

**Wynik:** wszystkie trzy zgłoszenia potwierdzone i naprawione. Znaleziono
dodatkowo 4 błędy, w tym jeden krytyczny (utrata limitów kategorii).
Aplikacja nie zgłasza żadnych błędów JS w konsoli — problemy były logiczne,
nie awaryjne, dlatego nic ich wcześniej nie sygnalizowało.

---

## 1. Podsumowanie miesiąca nie działa w ogóle — KRYTYCZNY ✅ naprawione

**Objaw:** ekran „Nowy miesiąc / Zamknij miesiąc" nigdy się nie pokazuje.
Trend na dashboardzie na zawsze zostaje na „za wcześnie, by porównać".

**Przyczyna źródłowa — wyścig w kolejności startu:**

```
showApp()
  ├─ renderBudget()  →  recalcCatSpent()   ← zeruje cats[].spent
  └─ setTimeout(checkMonthlyReset, 1100)   ← czyta cats[].spent → zawsze 0
```

`recalcCatSpent()` przelicza `cat.spent` z rejestru wydatków, ale **tylko dla
bieżącego cyklu** (`if(new Date(e.ts) < cycleStart) return`). Po przekroczeniu
daty wypłaty wydatki minionego miesiąca wypadają z zakresu i wszystkie liczniki
lecą na 0. Sekundę później `checkMonthlyReset()` czyta te same liczniki, widzi
`totalSpent === 0` i wchodzi w gałąź *„nic nie wydano — zamknij po cichu"*.

Skutki łańcuchowe:
- nigdy nie zapisuje się `salvage_last_month_spent` → trend nie ma z czym porównywać
- nigdy nie zapisuje się `salvage_clean_month_just_closed` → odznaka
  **„Miesiąc bez przekroczeń" była niemożliwa do zdobycia**
- brak wpisu XP za zamknięcie miesiąca (+500 XP)
- modal Triumfu (rozdanie oszczędności na cele) nigdy się nie otwiera

**Poprawka:** zamknięcie miesiąca czyta teraz rejestr wydatków, nie liczniki.
Nowe funkcje `getCycleWindow(cycleId)`, `getCycleSpendByCat(cycleId)`,
`getCycleSpendTotal(cycleId)` liczą okno `[start, koniec)` zamykanego cyklu.
`doMonthClose()` dostaje id zamykanego cyklu i z niego wylicza sumę, oszczędności
oraz `wasClean` (porównanie per kategoria z jej limitem).

Dodatkowo: `salvage_clean_month_just_closed` jest teraz „lepkie" — raz zdobyty
czysty miesiąc nie jest kasowany przez kolejny, gorszy. Triumf dostaje
przekazaną kwotę oszczędności zamiast liczyć ją ponownie z wyzerowanych liczników.

---

## 2. Nie da się wyrównać przekroczonego budżetu — KRYTYCZNY ✅ naprawione

Trzy niezależne błędy nakładały się na siebie.

### 2a. Modal łatania był praktycznie nieosiągalny

`openPatchModal()` miał **dokładnie jedno** wywołanie w całej aplikacji:

```js
if(cat.spent>cat.limit){ setTimeout(()=>openPatchModal(catId),600); }   // submitCost()
```

Czyli: automatyczny pop-up 600 ms po dodaniu kosztu. Jeśli użytkownik go zamknął,
albo przekroczenie powstało inaczej (obniżenie limitu, przełom miesiąca, import
backupu) — **nie było już żadnej drogi do tego ekranu**. Test potwierdził:
0 elementów w DOM prowadzących do `openPatchModal`.

Karta kategorii zachęcała przy tym do czegoś innego:
> „Przekroczono o 350 zł — **dotknij ikony po historię**"

…a ikona otwiera historię wydatków, gdzie żadnej akcji wyrównania nie ma.

**Poprawka:** przycisk **„Wyrównaj"** na czerwonej plakietce karty kategorii
(z zatrzymaniem propagacji, żeby nie kolidował z long-pressem do przeciągania)
oraz przycisk **„Wyrównaj budżet — brakuje X zł"** w panelu szczegółów kategorii,
widoczny tylko gdy kategoria faktycznie jest na minusie.

### 2b. Suwaki z krokiem 1 zł nie potrafiły pokryć groszy

```js
min="0" max="${avail}" step="1"
```

Deficyty prawie nigdy nie są okrągłe. Przy przekroczeniu o **47,49 zł**
maksimum, jakie dało się przesunąć, to **47 zł** — kategoria zostawała czerwona
na 0,49 zł i nie było sposobu, żeby to domknąć. To jest dosłownie objaw
zgłoszony przez użytkownika.

**Poprawka:** `step="0.01"`. Dodatkowo przycisk **„⚡ Wyrównaj automatycznie"**,
który zachłannie pokrywa deficyt od kategorii z największym zapasem — jedno
dotknięcie i bilans schodzi do zera, razem z groszami. Jeśli wolnych środków
jest za mało, modal mówi to wprost („zabraknie X zł") zamiast milczeć.

### 2c. Brak górnego limitu przesunięcia — KRYTYCZNY, utrata danych

`applyPatch()` przesuwał tyle, ile pokazywały suwaki, **bez porównania z deficytem**.
Zmierzony przypadek: deficyt **0,49 zł**, suwaki na maksimum → przesunięte
**4553 zł**, limit kategorii „Jedzenie" spadł z 800 zł do **0 zł**. Cicho,
bez potwierdzenia, bez cofnięcia.

**Poprawka:** trzy warstwy zabezpieczeń — `max` pojedynczego suwaka to
`min(zapas, deficyt)`, `onPatchSlider()` przycina przeciągany suwak tak, by suma
nigdy nie przekroczyła deficytu, a `applyPatch()` na koniec i tak twardo tnie
sumę do deficytu. Komunikat końcowy mówi prawdę: „bilans wyrównany" tylko gdy
faktycznie jest wyrównany, inaczej „zostało jeszcze X zł".

---

## 3. Odznaki nie zaczytują się zgodnie z przeznaczeniem — ✅ naprawione

Mechanizm odblokowania działał poprawnie — **zawodziło wyświetlanie**.

### 3a. Zdobyte odznaki chowały się pod „Rozwiń"

```js
const visibleBadges = badgesExpanded ? BADGES : BADGES.slice(0, BADGE_MAX_VISIBLE);
```

Zwinięta siatka pokazywała pierwszych 9 odznak **w kolejności deklaracji**,
niezależnie od tego, które są zdobyte. Odznaki „Pierwsza nagroda" (#11)
i „5 paktów" (#12) po odblokowaniu były niewidoczne — licznik pokazywał
**„2 / 15"**, a wszystkie widoczne kafelki były szare. Stąd wrażenie, że nic się
nie zaczytuje.

**Poprawka:** w widoku zwiniętym zdobyte odznaki idą na początek (kolejność
deklaracji zachowana wewnątrz grup). To, co obiecuje licznik, jest teraz widać.

### 3b. „Miesiąc bez przekroczeń" była nieosiągalna

Konsekwencja błędu #1 — warunek czytał flagę, która nigdy nie była ustawiana.
Naprawione razem z zamykaniem miesiąca (zweryfikowane: odznaka odblokowuje się
po zamknięciu czystego miesiąca).

### 3c. „7 dni z rzędu" przyznawana od pierwszego uruchomienia

```js
const last=parseInt(_cGet('salvage_last_green',0)||0);
if(now-last<WEEK) return;      // last=0 → warunek fałszywy → przechodzi od razu
```

Bez zapisanego znacznika (dane sprzed onboardingu, przywrócony backup, po
resecie) **pierwsze sprawdzenie natychmiast przyznawało pełny „zielony tydzień"**
— potwierdzone testem: `greenWeeks` 0 → 1 w jednym wywołaniu, bez upływu czasu.

**Poprawka:** brak znacznika = zainicjuj zegar i wyjdź. Pierwszy tydzień może
zostać przyznany dopiero po realnym tygodniu. Przy okazji kategorie bez limitu
nie blokują już passy (wcześniej `c.limit>0` w `every()` powodowało, że jedna
kategoria z limitem 0 uniemożliwiała zieloną strefę na zawsze).

### 3d. Odznaki passy sprawdzane w złym momencie

`checkWeeklyGreenZone()` podbijał licznik, ale nie wołał `evaluateBadges()` —
popup pojawiał się dopiero przy następnym wejściu w Profil, w oderwaniu od
zdarzenia. Dodane wywołanie zaraz po przyznaniu tygodnia.

---

## 4. Pozostałe znalezione błędy

| # | Problem | Status |
|---|---|---|
| 4a | `closeModal()` rzucał `TypeError` przy nieistniejącym id (brak guardu na `null`) | ✅ naprawione |
| 4b | `openPatchModal()` nie sprawdzał, czy kategoria istnieje i czy deficyt > 0 | ✅ naprawione |
| 4c | Dawcy z zapasem < 1 gr pokazywali się jako martwe wiersze z nieruchomym suwakiem | ✅ naprawione |
| 4d | `applyPatch()` nie odświeżał dashboardu (`renderStart()`) po zmianie limitów | ✅ naprawione |

---

## 5. Obserwacje bez zmian w kodzie

Rzeczy, które działają, ale warto o nich wiedzieć — świadomie **nie** ruszane,
żeby audyt nie zmienił zachowania poza zgłoszonym zakresem.

- **Martwy kod (~620 linii).** `buildScene()` (568 linii), `drawAvatarSVG()`,
  `renderPakty()`, `renderPaktQueue()`, `openCatCtx()`, `closeCatCtx()`,
  `ctxEdit()`, `ctxDelete()` nie mają żadnych wywołań, a elementy, których
  szukają (`#pakty-list`, `#pakty-queue`, `#avatar-svg`) nie istnieją w HTML.
  Aktywne implementacje to `renderRewards()` / `renderRewardHistory()`.
  Do usunięcia przy okazji sprzątania.
- **Odznaka „Rok bez długów"** ma `cond: s => false` — nieosiągalna z założenia.
  Wlicza się do mianownika „N / 15", więc komplet jest nieosiągalny.
- **„7 dni z rzędu" to próbka punktowa, nie passa.** Kod sprawdza raz w tygodniu,
  czy *w tym momencie* wszystkie kategorie są poniżej 60% limitu — nie weryfikuje
  siedmiu kolejnych dni. Nazwa obiecuje więcej niż mechanizm dowozi.
  To decyzja produktowa, nie błąd.
- **PIN trzymany jawnie** w IndexedDB (`salvage_pin`). Przy danych czysto
  lokalnych to bariera przed przypadkowym wzrokiem, nie zabezpieczenie —
  warto to komunikować wprost. *(Domyślny `1989` zaszyty w kodzie został
  usunięty — patrz `docs/ZMIANY.md`.)*
- **Zdjęcia w IndexedDB** rosną szybko. Baner ostrzegawczy pojawia się dopiero
  przy 85% zapełnienia, a jedyne wyjście to ręczne kasowanie albo reset.

---

## 6. Jak to zweryfikowano

Testy w headless Chromium (Playwright), pełna ścieżka od PIN-u po zamknięcie
miesiąca. Skrypty: `verify.mjs` (9 asercji na naprawionych ścieżkach),
`regress.mjs` (12 asercji na modułach nietkniętych bezpośrednio).

```
PASS  Przycisk "Wyrównaj" na karcie kategorii
PASS  Modal łatania otwiera się z karty
PASS  Deficyt ułamkowy wyrównany co do grosza      (47,49 → 0,00)
PASS  Przesunięcie nie przekracza deficytu         (0,49 zł deficyt → 0,49 zł ruch)
PASS  Prompt podsumowania miesiąca się pojawia     ("Zamknij sierpień 2026 · 197,49 zł")
PASS  Zapisano wydatki zamkniętego miesiąca        (+500 XP, odznaka clean_month)
PASS  Trend vs poprzedni miesiąc liczony
PASS  Zdobyte odznaki widoczne bez rozwijania      (3/3 widoczne przy liczniku 3/15)
PASS  Zielony tydzień nie jest przyznawany od razu (0 przy starcie, 1 po tygodniu)

PASS  Zakładki: start / cele / garaż / budżet / profil renderują się
PASS  Dodanie kategorii + koszt + usunięcie kosztu
PASS  Cele + wpłata + sprzedaż z garażu (XP naliczone)
PASS  Backup obejmuje kluczowe dane
PASS  Zmiana PIN działa
PASS  Brak dawców obsłużony bez błędu

=== JS ERRORS === (none)
```
