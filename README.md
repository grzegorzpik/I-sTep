# reSave it! — Budżet z Odzysku

Aplikacja mobilna (PWA, single-file HTML) do zarządzania budżetem domowym
opartym na „odzysku": sprzedajesz niepotrzebne rzeczy z garażu/szafy,
a odzyskane pieniądze przesuwasz na konkretne cele.

## Uruchomienie

Otwórz `index.html` w przeglądarce (albo dodaj do ekranu głównego jako PWA).
Aplikacja nie wymaga serwera ani backendu — całość działa lokalnie.

- **PIN startowy:** `1989` (zmienialny w Profil → Administracja → Zmień PIN)
- **Dane:** IndexedDB w przeglądarce (`salvage_db`), zdjęcia jako Blob
- **Backup:** Profil → Administracja → Backup / Import (plik JSON)

## Struktura repo

| Ścieżka | Zawartość |
|---|---|
| `index.html` | Cała aplikacja (HTML + CSS + JS w jednym pliku) |
| `docs/AUDIT.md` | Audyt działania mechanizmów + lista poprawek |
| `docs/koncepcja-apki-edukacyjnej.md` | Koncepcja aplikacji edukacyjnej I-sTep |
| `docs/README-HANDOFF.md` | Notatki handoff do prototypów |
| `prototypy/` | Wcześniejsze prototypy HTML (I-sTep, logo, onboarding) |

## Główne moduły

- **Budżet** — kategorie z limitami, koszty, elastyczne łatanie przekroczeń
- **Garaż** — przedmioty do sprzedaży (zdjęcie, cena, status), powiązanie z celami
- **Cele** — cele oszczędnościowe z ratą miesięczną i rezerwą w budżecie
- **Start** — dashboard: pozostały budżet, trend vs poprzedni miesiąc, dni do wypłaty
- **Profil** — XP, poziomy, odznaki, nagrody (pakty), backup/reset
