export type IBook = {
  id: string,
  authors: string[],
  categories: string[],
  description: string,
  title: string,
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string,
  }
}
