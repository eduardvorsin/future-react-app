import React, { ChangeEventHandler, FC } from 'react';
import classes from './Switcher.module.css';

type SwitcherProps = {
  className?: string,
  labelText: string
  checked: boolean,
  inputLabels: [string, string],
  name: string,
  value: string[],
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
}) => (
  <fieldset
    className={`${classes.switcher} ${className}`}
  >
    <legend
      className={`${classes.switcher__label} sr-only`}
    >
      {labelText}
    </legend>
    <input
      className={classes.switcher__radio}
      name={name}
      role='switch'
      type='radio'
      value={value[0]}
      checked={checked}
      onChange={onChange}
    />
    <input
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

export default Switcher;
