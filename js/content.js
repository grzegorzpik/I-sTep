/*
 * Statyczne dane modułów i lekcji. Węzły bez pola `question` są celowo
 * puste — reprezentują mikrolekcje jeszcze nieopisane (zasada "nie
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
        { id: 'klient-serwer', label: 'Co to klient?' },
        { id: 'request-response', label: 'Request & response' },
        { id: 'json', label: 'JSON' },
        { id: 'endpoint', label: 'Endpoint' },
      ],
      beacon: { id: 'bootcamp-0', label: 'Bootcamp:<br>integracja API' },
    },
  ],
};
