# Zmiany funkcjonalne

## 1. PIN ustawiany na urządzeniu

**Było:** `const PIN = '1989'` zaszyte w kodzie. Każda instalacja aplikacji
miała ten sam kod, a `checkPin()` używał go jako wartości domyślnej —
zmiana PIN-u w Profilu tylko *nadpisywała* domyślny, więc dopóki użytkownik
tego nie zrobił, kod znany z repozytorium otwierał aplikację.

**Jest:** przy pierwszym uruchomieniu na danym urządzeniu klawiatura prosi
o ustawienie własnego 4-cyfrowego PIN-u i o jego powtórzenie. Nie ma żadnego
kodu domyślnego — `checkPin()` czyta `salvage_pin` bez wartości zapasowej.

Przebieg (ten sam numpad, trzy stany — `pinMode`):

```
brak salvage_pin  →  "Ustaw swój 4-cyfrowy PIN"
                  →  "Powtórz PIN, żeby potwierdzić"
                  →  zapis + wejście do onboardingu
salvage_pin jest  →  normalne odblokowanie
```

Niezgodne powtórzenie cofa do kroku pierwszego — potwierdzanie względem
błędnie wpisanego kodu zamknęłoby użytkownika za PIN-em, którego nigdy nie
chciał ustawić.

### Zapomniany PIN

Skoro nie ma już uniwersalnego kodu, pojawiło się realne ryzyko zablokowania
się we własnej aplikacji. Na ekranie blokady jest **„Nie pamiętam PIN-u"** →
okno, które mówi wprost: PIN istnieje wyłącznie na tym urządzeniu, nie ma
konta ani serwera, więc jedyne wyjście to skasowanie danych (potwierdzane
wpisaniem `KASUJ`). Jeśli istnieje plik backupu, po resecie wszystko wraca
importem.

Link jest ukryty w trakcie ustawiania PIN-u — nie ma jeszcze czego zapomnieć.

**Migracja:** kto do tej pory nie zmieniał PIN-u, nie ma zapisanego
`salvage_pin` i przy najbliższym uruchomieniu zostanie poproszony o ustawienie
własnego. **Dane pozostają nietknięte** — zmienia się tylko kod dostępu.

---

## 2. Cel: automatyczny albo elastyczny

**Było:** każdy niezrealizowany cel dokładał swoją ratę do rezerwy budżetu.
Na zakładce Budżet stała zablokowana karta „Cele · auto", która odgórnie
zajmowała pozycję i zmniejszała kwotę do dyspozycji. Nie dało się mieć celu
„odkładam, kiedy mam z czego".

**Jest:** przy zakładaniu (i edycji) celu wybierasz sposób finansowania:

| | Automatycznie | Elastycznie |
|---|---|---|
| Rata miesięczna | stała, wyliczana z terminu | brak |
| Pozycja w budżecie | rezerwuje ratę | **nic nie rezerwuje** |
| Termin | tak | brak |
| Wpłaty | zaplanowane + dowolne | wyłącznie dowolne |

W trybie elastycznym kalkulator spłaty znika z formularza — nie ma sensu
ustawiać raty ani terminu, których cel nigdy nie użyje. W jego miejsce
pojawia się wyjaśnienie, skąd taki cel bierze pieniądze: ze sprzedaży
w garażu, z nadwyżki na koniec miesiąca albo z dowolnej wpłaty.

Cel elastyczny widać na pierwszy rzut oka — plakietka **elastyczny** przy
nazwie i wiersz „Wpłaty · Dowolne — poza budżetem" zamiast terminu.
W szczegółach celu zamiast „Rata mies." / „Miesięcy" / „Termin" są dwa pola:
„Finansowanie: Elastyczne" i „W budżecie: Nie rezerwuje".

Tryb da się zmienić w każdej chwili przez edycję celu — przełączenie
na elastyczny natychmiast zwalnia pozycję w budżecie, przełączenie z powrotem
na automatyczny odtwarza ratę z pozostałej kwoty i terminu.

Cel elastyczny normalnie uczestniczy w rozdaniu nadwyżki na koniec miesiąca
i w przypisywaniu przedmiotów z garażu — te wpłaty i tak zawsze były dobrowolne.

### Szczegół implementacyjny

`isGoalAuto(goal)` zwraca `true` dla wszystkiego, co nie jest jawnie
`funding:'manual'`. Cele zapisane zanim ta opcja istniała nie mają tego pola,
więc zachowują dotychczasowe zachowanie bez żadnej migracji danych.

`getGoalMonthlyRate()` zwraca dla celu elastycznego `0`, przez co wszystkie
napisy „X zł/mies." w aplikacji znikają samoczynnie, a `depositToGoal()` ma
jawny wyjątek: nie zapisuje `months` ani `monthlyRate`, bo cicho przywróciłoby
to celowi kształt, z którego użytkownik świadomie zrezygnował.

---

## Weryfikacja

```
--- PIN ---
PASS  Pierwsze uruchomienie prosi o ustawienie PIN
PASS  Link "nie pamiętam" ukryty podczas ustawiania
PASS  Po 1. wpisie prosi o powtórzenie
PASS  Niezgodne PIN-y wracają do kroku 1
PASS  PIN zapisany na urządzeniu
PASS  Po ustawieniu PIN wchodzi do onboardingu
PASS  Po restarcie prosi o odblokowanie
PASS  Link "nie pamiętam PIN-u" widoczny przy odblokowaniu
PASS  Stary zaszyty 1989 odrzucony
PASS  Własny PIN odblokowuje

--- CELE ---
PASS  Cel automatyczny rezerwuje ratę w budżecie          (500 zł → rezerwa 500 zł)
PASS  Kalkulator ukryty w trybie elastycznym
PASS  Cel elastyczny NIE zajmuje pozycji w budżecie       (rezerwa bez zmian)
PASS  Cel elastyczny nie ma raty ani terminu
PASS  Dowolna wpłata na cel elastyczny działa             (1500 zł)
PASS  Wpłata nie tworzy harmonogramu ani rezerwy
PASS  Karta rezerwy liczy tylko cele automatyczne
PASS  Edycja otwiera zapisany tryb
PASS  Przełączenie na elastyczny zwalnia budżet           (500 → 0)
PASS  Stare cele bez pola funding działają jak automatyczne

=== JS ERRORS === (none)
```

Plus pełna regresja z audytu (21 asercji) — bez zmian, wszystko przechodzi.
