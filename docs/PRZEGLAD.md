# Przegląd całej aplikacji — funkcje i UX

Drugie, szersze podejście: nie tylko zgłoszone objawy, ale przejście przez
wszystkie moduły, przypadki brzegowe i wygląd na ekranie telefonu (390×844).

Znaleziono **8 błędów** (w tym 3 istotne) i **6 braków UX**. Wszystkie naprawione.

---

## Błędy

### 1. Brak escapowania HTML — wstrzyknięcie kodu z pól tekstowych — ISTOTNY

Nazwy kategorii, celów i przedmiotów, opisy i komentarze do wydatków trafiały
prosto do `innerHTML` w **26 miejscach**, bez żadnego przetworzenia.

Wpisanie w nazwę kategorii:

```
<img src=x onerror="...">
```

wstawiało do DOM prawdziwy element `<img>` (potwierdzone testem). Przy otwarciu
aplikacji przez `file://` handler się nie wykonał, ale pod adresem http — tak.
Nie trzeba złej woli: wystarczy nazwa `Prąd & gaz` albo `Buty <do biegania>`,
żeby karta się rozjechała.

**Poprawka:** funkcja `esc()` obok `fmt()` i przepuszczenie przez nią każdego
tekstu od użytkownika — w kartach, w `showToast()` (który pisze `innerHTML`,
bo potrzebuje linku „Cofnij"), w oknie potwierdzenia usunięcia i w `<option>`
listy celów.

### 2. Usunięcie kategorii zostawiało jej wydatki w rejestrze — ISTOTNY

`catdDelete()` kasował kategorię, ale nie jej wydatki. Zostawały w
`salvage_expenses` na zawsze: niewidoczne w interfejsie, **ale nadal liczone
przez `getCycleSpendTotal()`**, czyli przez podsumowanie miesiąca.

Zmierzone: po usunięciu kategorii z wydatkiem 400 zł rejestr pokazywał
410 zł, a suma widoczna w budżecie 10 zł. Zamknięcie miesiąca raportowałoby
kwotę, której nie da się z niczym pogodzić.

To zresztą podnosi wagę poprzedniej naprawy: dopóki podsumowanie w ogóle nie
działało, nikt by tego nie zauważył.

**Poprawka:** usunięcie kategorii kasuje też jej wydatki, a okno potwierdzenia
mówi ile ich jest i na jaką kwotę — **zanim** dotkniesz „Usuń".

### 3. Wydatek z przyszłą datą liczony do bieżącego miesiąca

`recalcCatSpent()` odcinał wydatki starsze niż początek cyklu, ale nie miał
górnej granicy. `getCycleSpendByCat()` — używane przy zamykaniu miesiąca —
liczyło poprawnie okno `[start, koniec)`. Obie funkcje podawały inną liczbę.

Zmierzone: koszt z datą za dwa miesiące → licznik kategorii 300 zł,
rejestr bieżącego cyklu 0 zł.

**Poprawka:** `recalcCatSpent()` ogranicza się do bieżącego cyklu z obu stron,
kalendarz w oknie kosztu ma `max` = dzisiaj, a `submitCost()` odrzuca przyszłą
datę wpisaną z palca.

### 4. Podwójne dotknięcie „Zapisz koszt" dublowało wydatek

Zmierzone: dwa wywołania pod rząd → 2 wpisy, kategoria obciążona podwójnie.
Na telefonie z opóźnioną reakcją to się zdarza naprawdę.

**Poprawka:** blokada na 600 ms po zatwierdzeniu.

### 5. Brak górnego limitu kwoty

`999999999` zł było przyjmowane bez mrugnięcia; dashboard pokazywał potem
`−1 000 001 399 zł` i rozwalał kafelek. Klasyczna literówka (zgubiony przecinek).

**Poprawka:** limit 1 000 000 zł z czytelnym komunikatem.

### 6. Literówka w komentarzu CSS wyłączała styl nagłówka Garażu

```css
/* ══ GARAGE MODULE */ ══════════════════════════ */
                     ↑ komentarz zamyka się tutaj
```

Nadmiarowe `*/` zamykało komentarz w połowie, przez co reszta linii stawała się
błędnym CSS-em — a mechanizm odzyskiwania przeglądarki **połyka wtedy następną
regułę**. Ofiarą padło `.garaz-header{padding:20px 20px 16px;}`.

Efekt: tytuł „Garaż" przyklejony do samej góry ekranu (0 px zamiast 20 px),
na telefonie z wcięciem — pod paskiem stanu. W całym pliku 92 otwarcia
komentarza i 93 zamknięcia; to jedyne takie miejsce.

### 7. Poziom maksymalny XP wyglądał na błąd

Po osiągnięciu szczytu tabeli pasek postępu pokazywał **0%**, a podpis
obiecywał „do poz. 12", choć poziomów jest 11.

**Poprawka:** pasek 100%, podpis „poziom maksymalny".

### 8. Dashboard mógł pokazać nieaktualne wydatki

`renderStart()` czytał `cats[].spent` bez wywołania `recalcCatSpent()`, więc
przy renderze poza kolejnością potrafił podać kwotę, z którą zakładka Budżet
się nie zgadzała. Dodane to samo samonaprawianie, które ma budżet.

---

## UX — co poprawiłem

| Co | Dlaczego |
|---|---|
| **Wpłata prosto z karty celu** | Wpłacanie było schowane dwa dotknięcia głęboko (karta → szczegóły → Wpłać). Dla celu elastycznego wpłata **jest** całą interakcją. Przycisk pokazuje kwotę raty przy celu automatycznym, samo „Wpłać" przy elastycznym, i znika po osiągnięciu celu. |
| **Trend nie zgaduje na starcie cyklu** | Prognoza `wydatki/dzień × dni cyklu` w 1. dniu miesiąca robiła z jednych zakupów „+400% więcej". Teraz do 5. dnia pisze „tempo od 5. dnia cyklu”, a przy pierwszym miesiącu — „pierwszy miesiąc — brak porównania" zamiast enigmatycznego „za wcześnie, by porównać". |
| **„Celów" → „Celów spełnionych"** | Statystyka liczy cele **zrealizowane**, więc pokazywała 0 przy dwóch aktywnych celach i wyglądała na zepsutą. |
| **Usuwanie celu we własnym oknie** | Jedyne miejsce w aplikacji z natywnym `confirm()` przeglądarki — obce wizualnie, a w PWA na iOS wygląda jak błąd. Teraz ten sam styl co reszta, plus ostrzeżenie o odłożonej kwocie i o przedmiotach, które stracą powiązanie. |
| **Ostrzeżenia mówią, co się stanie** | Okno potwierdzenia przyjmuje dodatkową linię i podaje konkret: ile wydatków zniknie i za ile, ile złotych zapisu przepadnie. Wcześniej brzmiało tak samo niezależnie od skutków. |
| **Nagłówek Garażu** | Patrz błąd 6 — tytuł nie jest już przyklejony do krawędzi. |

---

## Co sprawdziłem i działa poprawnie

- Cofnięcie usunięcia wydatku (przywraca kwotę i wpis w rejestrze)
- Usunięcie celu odpina przedmioty z garażu zamiast je kasować
- Kwoty ujemne, zerowe i tekstowe odrzucane
- Suma przydziałów w Triumfie nie przekracza puli
- Dzień cyklu ograniczony do 28, więc istnieje też w lutym
- 800 wydatków: przeliczenie 3 ms, render historii 4 ms
- Import bez `_meta` odrzucany
- Obniżenie limitu poniżej wydatków daje dostęp do wyrównania
- Cel z kwotą docelową poniżej odłożonej traktowany jako spełniony
- Backup obejmuje wszystkie klucze z pamięci podręcznej

---

## Czego świadomie nie ruszałem

- **~620 linii martwego kodu** (`buildScene` — 568 linii, `drawAvatarSVG`,
  `renderPakty`, `renderPaktQueue`, `openCatCtx` i spółka). Bez wywołań,
  bez elementów docelowych w HTML. Usunięcie to osobna, czysta zmiana.
- **Nieznana kategoria garażowa cicho staje się „Elektroniką"**
  (`GARAGE_CATS[item.cat] || GARAGE_CATS.elektronika`). Przy dzisiejszym
  interfejsie nie da się wybrać złej wartości — problem tylko przy imporcie
  uszkodzonego pliku.
- **Odznaka „Rok bez długów"** ma warunek `false` — komplet 15/15 jest
  nieosiągalny z definicji.
- **PIN zapisany jawnie** w IndexedDB. Przy danych czysto lokalnych to bariera
  przed przypadkowym wzrokiem, nie zabezpieczenie kryptograficzne.

---

## Pomysły na później (nie wdrożone)

Kolejność wg stosunku wartości do nakładu:

1. **Wydatki cykliczne** — czynsz, abonamenty, raty. Dziś trzeba je wklepywać
   co miesiąc, a to zwykle największe pozycje w budżecie.
2. **Historia zamkniętych miesięcy** — aplikacja zapisuje tylko sumę ostatniego
   miesiąca. Lista „wrzesień: 4 210 zł, sierpień: 3 890 zł" z podziałem na
   kategorie kosztowałaby niewiele, bo cały rejestr już jest.
3. **Eksport CSV** — backup jest w JSON pod import. Do arkusza trzeba CSV.
4. **Wyszukiwanie wydatków** — przy 800 wpisach historia kategorii to długa
   lista bez filtra.
5. **Przypomnienie o wydatkach dnia** — aplikacja żyje z regularnego wpisywania,
   a nic o tym nie przypomina.
6. **Widok „ile mogę dziś wydać"** — pozostały budżet ÷ dni do wypłaty. Jedna
   liczba, która realnie zmienia decyzje przy kasie.

---

## Weryfikacja

57 asercji w headless Chromium, wszystkie przechodzą, zero błędów JS:

- `verify3.mjs` — 17 asercji na błędach i UX z tego przeglądu
- `verify.mjs` — 9 asercji z pierwszego audytu
- `regress.mjs` — 10 asercji regresyjnych na modułach nietkniętych
- `feat.mjs` — 20 asercji na PIN-ie i trybach finansowania celów
