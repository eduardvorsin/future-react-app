import { AccessInfo, SaleInfo, VolumeInfo } from '../API/BooksAPI/bookTypes';

export type IBook = VolumeInfo & AccessInfo & SaleInfo;

export type IBookPartial =
  {
    id: string,
    clientId: string,
  } &
  Pick<VolumeInfo, 'authors' | 'maturityRating' | 'title' | 'imageLinks'> & Pick<SaleInfo, 'retailPrice'>;
