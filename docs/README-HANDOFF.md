# I-sTep — pakiet startowy do budowy

Ten folder zawiera komplet prototypów wizualnych i dokument koncepcyjny wypracowane w rozmowie z Claude (czat). Zadanie: spiąć to w jedną, działającą aplikację z realnym stanem (localStorage/IndexedDB).

## Dokument źródłowy
`koncepcja-apki-edukacyjnej.md` — pełna filozofia, zasady programu, format modułu, struktura dziennika, plan pierwszych dwóch modułów. **Przeczytaj to jako pierwsze.**

## Nazwa i marka
- Nazwa: **I-sTep** (gra słów: I jak litera z "IT" i jak cyfra 1 = pierwszy krok; "step" = krok)
- Hasło: *"Twój pierwszy krok w świecie IT."*
- Paleta: tło `#12101A`/`#1B1622` (atrament), tekst `#F3E9D6` (krem), akcent marki `#4ADE9A` (mięta), drugi akcent `#9C7FD4` (fiolet), obrysy `#0C0910`
- Typografia: Silkscreen (nagłówki), Press Start 2P (drobne etykiety, oszczędnie), Inter (treść), JetBrains Mono (dane/statystyki)
- Styl: płaski pixel-art, twarde obrysy i cienie (offset, bez rozmycia), zero emotikonów, zero gradientów/poświaty

## Ekrany (pliki HTML, samodzielne prototypy — do rozbicia na komponenty/routing)
1. `logo-animacja.html` — animacja startowa (nawias→góra, kompan wchodzi, wbija flagę, podtytuł)
2. `onboarding-prototyp.html` — nadanie imienia i koloru kompana (kolor edytowalny później, imię tylko przez reset)
3. `mapa-prototyp.html` — główny ekran, ścieżka z węzłami mikrolekcji/bootcampu, maskotka-kompan
4. `mikrolekcja-prototyp.html` — treść + pytanie sprawdzające, błąd → retry na głównym przycisku (bez ujawniania odpowiedzi), podpowiedź po 2. błędzie
5. `cwiczenie-prototyp.html` — mechanika układania kroków (jedna z kilku wymiennych mechanik — patrz koncepcja: dopasowywanie par, uzupełnianie luk też możliwe w tym samym szkielecie)
6. `bootcamp-prototyp.html` — cel + generowanie promptu do skopiowania (start i walidacja), przesyłanie dowodu
7. `retrospekcja-prototyp.html` — formularz dziennika, tylko 1. pole + ocena przydatności wymagane, reszta opcjonalna
8. `ukonczenie-modulu-prototyp.html` — ekran świętowania (konfetti, kompan tańczy), animowany licznik XP
9. `dziennik-prototyp.html` — zakładki Wpisy/Dyplomy, pusty stan, modal szczegółów dyplomu z kolorem modułu
10. `profil-prototyp.html` — poziom/XP z nazwanymi poziomami, kompan (kolor zmienialny po kliknięciu w portret), eksport/import/reset

## Logo (do wyboru/dopracowania)
`logo-koncepcje.html`, `logo-koncepcje-v2.html`, `logo-gora.html` — warianty przed finalną animacją. Finalny kierunek: sama góra (dawny nawias, obrócony) jako uniwersalna ikona.

## Kluczowe zasady mechaniki (ze zbioru ustaleń)
- **Kolory modułów**: każdy moduł ma własny ton (Moduł 0 = błękit, Moduł 1 = cieplejszy), niezależny od stałego koloru marki (mięta)
- **XP**: mikrolekcja +10, ćwiczenie praktyczne +20, bootcamp +50; poziomy mają nazwy (np. "Nowicjusz Sieci" → "Odkrywca Danych"), kolejne nazwy nie są odsłaniane z góry (bez spoilerów)
- **Dyplomy**: widok Pokédex — nieodblokowane moduły jako szare sylwetki z "???"
- **Kontynuacja vs restart projektu**: domyślnie rozbudowuj jeden projekt; świadomy restart tylko przy uzasadnionej zmianie (np. nowy język/mechanizm)
- **AI poza apką**: apka nie ma wbudowanego AI — generuje tylko gotowe prompty do skopiowania i wklejenia w osobnej rozmowie z Claude
- **Zasady ochronne** (z dokumentu): każdy moduł = jedna realna zmiana w istniejącej aplikacji; nie uczyć się rzeczy bez zastosowania w najbliższych miesiącach; regularna weryfikacja sensu

## Znane niedociągnięcia do dopracowania
- Ikony dyplomów nawiązujące tematycznie do modułów — jeszcze nie zaprojektowane
- Ekrany nie są connected — brak routingu/nawigacji między nimi, brak wspólnego stanu
- Format modułu i treść zaprojektowane szczegółowo tylko dla Modułu 0 (częściowo Moduł 1) — reszta celowo niezaprojektowana (zasada "nie projektuj na zapas")
