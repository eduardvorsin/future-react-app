import React, { ChangeEventHandler, FC, useId } from 'react';
import classes from './Switcher.module.css';

type SwitcherProps = {
  className?: string,
  labelText: string
  checked: boolean,
  inputLabels: [string, string],
  name: string,
  value: [string, string],
  onChange: ChangeEventHandler<HTMLInputElement>,
}

const Switcher: FC<SwitcherProps> = ({
  className,
  labelText,
  checked,
  name,
  value,
  inputLabels,
  onChange,
}) => {
  const id = useId();

  return (
    <fieldset
      className={`${classes.switcher} ${className}`}
    >
      <legend
        className={`${classes.switcher__label} sr-only`}
      >
        {labelText}
      </legend>
      <label
        className={`${classes['switcher__input-label']} sr-only`}
        htmlFor={`${id}-input-first`}
      >
        {inputLabels[0]}
      </label>
      <input
        id={`${id}-input-first`}
        className={classes.switcher__radio}
        name={name}
        role='switch'
        type='radio'
        value={value[0]}
        checked={checked}
        onChange={onChange}
      />
      <label
        className={`${classes['switcher__input-label']} sr-only`}
        htmlFor={`${id}-input-second`}
      >
        {inputLabels[1]}
      </label>
      <input
        id={`${id}-input-second`}
        className={classes.switcher__radio}
        name={name}
        role='switch'
        type='radio'
        value={value[1]}
        checked={!checked}
        onChange={onChange}
      />
      <span className={classes.switcher__status}></span>
    </fieldset>
  );
};

export default Switcher;
