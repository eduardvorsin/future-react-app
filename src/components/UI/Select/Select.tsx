import React, { SelectHTMLAttributes, memo } from 'react';
import classes from './Select.module.css';

type SelectOption = {
  value: string,
  label: string,
}
type SelectBaseProps = Partial<SelectHTMLAttributes<HTMLSelectElement>>;
interface SelectProps extends SelectBaseProps {
  className?: string,
  labelText: string,
  id: string,
  options: SelectOption[],
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>,
}

const Select: React.FC<SelectProps> = ({
  className,
  labelText,
  id,
  options,
  value,
  onChange,
}) => {
  const selectClasses = [
    className,
    classes.select,
  ].join(' ');

  const selectChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e);
  };

  return (
    <div
      className={selectClasses}
    >
      <label
        className={classes.select__label}
        htmlFor={id}
      >
        {labelText}
      </label>
      <div
        className={classes['select-wrapper']}
      >
        <select
          className={classes['select-wrapper__select']}
          value={value}
          onChange={selectChangeHandler}
          id={id}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const MemoSelect = memo(Select);

export default Select;
