export const isValidHeadingLevel = (value: number): boolean => value >= 1 && value <= 7;

export const getPageIndex = (page: number) => {
  const booksPerPage = 40;
  return page * booksPerPage;
};
