import { AccessInfo, SaleInfo, VolumeInfo } from '../API/bookTypes';

export type IBook = VolumeInfo & AccessInfo & SaleInfo;

export type IBookPartial =
  { id: string } &
  Pick<VolumeInfo, 'authors' | 'maturityRating' | 'title' | 'imageLinks'> & Pick<SaleInfo, 'retailPrice'>;
