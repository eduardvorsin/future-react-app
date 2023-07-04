export type IBook = VolumeInfo & AccessInfo & SaleInfo;
export type IBookPartial = {
  id: string,
  maturityRating: 'NOT_MATURE' | 'MATURE',
  title: string,
  authors?: string[],
  imageLinks?: {
    smallThumbnail: string,
    thumbnail: string,
    extraLarge?: string,
    large?: string,
    medium?: string,
    small?: string,
  },
  retailPrice?: {
    amount: number,
    currencyCode: string,
  },
};
