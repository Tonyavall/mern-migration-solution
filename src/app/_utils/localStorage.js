/*
  Changes are due to localStorage being undefined initially.
  This way, even if we are misusing localStorage, it is error resistant 
*/

export const getSavedBookIds = 
(typeof window !== 'undefined') ? 
  () => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : [];

    return savedBookIds;
  }
  :
  () => undefined;

export const saveBookIds = 
(typeof window !== 'undefined') ? 
  (bookIdArr) => {
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  }
  :
  () => undefined;

export const removeBookId = 
(typeof window !== 'undefined') ? 
  (bookId) => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : null;

    if (!savedBookIds) {
      return false;
    }

    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

    return true;
  }
  :
  () => undefined;
