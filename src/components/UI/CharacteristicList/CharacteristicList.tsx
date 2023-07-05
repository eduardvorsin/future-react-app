import React, { FC, useMemo } from 'react';
import classes from './CharacteristicList.module.css';
import { createCharacteristicsData } from '../../../helpers/helpers';
import { IBook } from '../../../model/IBook';

type CharacteristicListProps = {
  className?: string,
  bookData: IBook,
};

const CharacteristicList: FC<CharacteristicListProps> = ({
  className,
  bookData,
}) => {
  const characteristicListClasses = [
    classes['characteristic-list'],
    className,
  ].join(' ');

  const characteristics = useMemo(() => createCharacteristicsData(bookData), [bookData]);

  return (
    <ul
      className={characteristicListClasses}
    >
      {characteristics.map((characteristic) => (
        <li
          key={characteristic.name}
          className={classes['characteristic-list__item']}
        >
          <span
            className={classes['characteristic-list__property']}
          >
            {characteristic.name}
          </span>
          <span
            className={classes['characteristic-list__value']}
          >
            {characteristic.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CharacteristicList;
