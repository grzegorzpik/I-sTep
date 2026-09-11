# Wydatki cykliczne i historia zamkniętych miesięcy

---

## Wydatki cykliczne

Czynsz, abonamenty i raty to zwykle największe pozycje w budżecie, a dotąd
trzeba je było wpisywać ręcznie co miesiąc. Teraz dopisują się same.

### Jak to działa

Wpis cykliczny to **szablon, nie wydatek**. Raz na cykl, w dniu terminu lub
później, tworzy **jeden** prawdziwy wydatek w rejestrze i stempluje się
identyfikatorem tego cyklu. Dzięki temu dziesięciokrotne otwarcie aplikacji
tego samego dnia nie obciąży czynszu dziesięć razy.

```
salvage_recurring: [{ id, name, catId, amount, day(1-28), active, lastAppliedCycle }]
```

Sprawdzenie odpala się przy każdym otwarciu aplikacji (`showApp()`), zanim
cokolwiek policzy wydatki, oraz od razu po zapisaniu nowego wpisu.

### Cykl rozliczeniowy, nie miesiąc kalendarzowy

Jeśli budżet startuje 10. dnia (wypłata), cykl przechodzi przez granicę
miesiąca. Wpis „5. dnia" musi wtedy trafić na **5. przyszłego miesiąca**,
bo ta data leży w bieżącym cyklu — a wpis „15. dnia" na 15. bieżącego.

`getRecurringDueDate()` bierze obie kandydujące daty i wybiera tę wewnątrz
okna `[start, koniec)`. Przy dniu i dniu cyklu ograniczonych do 28 zawsze
dokładnie jedna z nich pasuje.

### Zakładanie wpisu, którego termin już minął

Jeśli dodajesz „Czynsz, 5." dwudziestego, aplikacja **nie** dopisuje go
wstecz — prawdopodobnie wpisałeś ten czynsz ręcznie. Wpis startuje od
przyszłego miesiąca, a formularz mówi to wprost, zanim zapiszesz.

Termin wypadający **dziś** liczy się jako aktualny, nie przegapiony.
Porównanie idzie po całych dniach: data terminu to północ, więc mierzenie jej
względem bieżącej godziny uznawałoby dzisiejszy termin za spóźniony.

### Wstrzymanie kontra usunięcie

Usuwanie proponuje najpierw **wstrzymanie**, bo zwykle o to chodzi —
zakończony abonament nie powinien wymazywać miesięcy, w których był realnie
płacony. W obu przypadkach wydatki już dopisane do budżetu zostają nietknięte;
znika tylko automatyczne powtarzanie.

Usunięcie kategorii kasuje też jej wpisy cykliczne, a okno potwierdzenia
o tym uprzedza.

---

## Historia zamkniętych miesięcy

Aplikacja pamiętała dotąd wyłącznie **sumę** ostatniego miesiąca
(`salvage_last_month_spent`), używaną do trendu na pulpicie. Cały rejestr
wydatków był na miejscu, ale nic z niego nie korzystało.

### Co się zapisuje

Przy zamknięciu miesiąca powstaje pełny wpis: suma, budżet, oszczędności,
liczba przekroczonych kategorii i podział na kategorie z limitami, jakie
obowiązywały w chwili zamknięcia.

```
salvage_month_history: [{ cycleId, label, closedAt, income, totalSpent,
                          saved, overCount, cats:[…], untouched }]
```

Wszystko liczone z rejestru wydatków, nie z liczników kategorii — te są
za moment przestawiane na nowy cykl. Historia trzyma 36 ostatnich miesięcy.

Wydatki, których kategoria już nie istnieje, trafiają do pozycji
**„Poza kategoriami"**, żeby podział zawsze sumował się do wykazanej kwoty.
Kategorie bez ani jednego wydatku nie zaśmiecają listy — na dole jest tylko
ich licznik.

Powtórne zamknięcie tego samego cyklu **nadpisuje** wpis zamiast go dublować.

### Gdzie to widać

Zakładka Budżet, pod kategoriami: trzy ostatnie miesiące z sumą, kwotą
zaoszczędzoną i informacją o przekroczeniach; reszta pod „Rozwiń".
Dotknięcie otwiera podział na kategorie — paski pokazują udział w wydatkach,
kolor i podpis mówią o limicie i przekroczeniu.

### Efekt uboczny: uczciwszy trend

Trend na pulpicie bierze teraz dane z historii, a ze starego klucza korzysta
tylko dla danych zapisanych, zanim historia powstała.

---

## Uwagi migracyjne

- Oba klucze dopisane do `LS_KEYS`, `BACKUP_KEYS` i listy resetu — backup
  i import obejmują je automatycznie.
- Nic nie wymaga migracji istniejących danych: brak wpisów cyklicznych to
  pusta lista, a historia zapełnia się od pierwszego zamkniętego miesiąca.
- `newExpenseId()` zastąpiło `Date.now()` przy tworzeniu wydatków. Partia
  wpisów cyklicznych powstaje w tej samej milisekundzie, więc bez tego
  dzieliłyby identyfikator — a ten służy też jako uchwyt do usuwania,
  czyli kasowanie jednego usuwałoby drugi.

---

## Weryfikacja

18 nowych asercji (`feat2.mjs`), wszystkie przechodzą:

```
PASS Termin zawsze wypada wewnątrz bieżącego cyklu     (dzień 5 przy cyklu od 10. → 5 października)
PASS Miniony termin nie obciąża wstecz bieżącego miesiąca
PASS Wydatek cykliczny dopisuje się raz na cykl        (3 × applyRecurring → 1 wpis)
PASS Wpis nosi nazwę wydatku cyklicznego
PASS W nowym cyklu dopisują się ponownie
PASS Identyfikatory wydatków są unikalne
PASS Wstrzymany wydatek cykliczny nie dopisuje się
PASS Usunięcie kategorii kasuje jej wydatki cykliczne
PASS Ostrzeżenie wspomina o wydatkach cyklicznych
PASS Zamknięcie miesiąca zapisuje wpis w historii
PASS Wpis zawiera sumę, budżet i oszczędności          (2250 / 6500 / 4250)
PASS Wpis zlicza przekroczone kategorie
PASS Wpis ma podział na kategorie posortowany malejąco
PASS Historia widoczna na zakładce Budżet
PASS Szczegóły miesiąca otwierają się z podziałem
PASS Ponowne zamknięcie tego samego cyklu nie dubluje wpisu
PASS Trend korzysta z historii, nie ze starego klucza
PASS Backup obejmuje nowe dane
```

Razem z wcześniejszymi zestawami: **74 asercje, 0 błędów, zero błędów JS.**
