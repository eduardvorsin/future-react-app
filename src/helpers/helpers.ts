export const isValidHeadingLevel = (value: number): boolean => value >= 1 && value <= 7;

export const getPageIndex = (page: number) => {
  const booksPerPage = 40;
  return page * booksPerPage;
};

export const saveVerticalScrollPosition = (): void => {
  sessionStorage.setItem('scrollY', window.scrollY.toString());
};

export const getVerticalScrollPosition = (): string | null => sessionStorage.getItem('scrollY');

export const resetVerticalScrollPosition = (): void => {
  sessionStorage.setItem('scrollY', '0');
};
