import React from 'react';
import classes from './Spinner.module.css';

type SpinnerProps = {
  className?: string,
  size: number,
};

export interface SpinnerStyles extends React.CSSProperties {
  '--size': string;
}

export interface RingStyles extends React.CSSProperties {
  '--ring-size': string;
}

const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = 60,
}) => {
  const spinnerClasses = [
    classes.spinner,
    className,
  ].join(' ');

  const spinnerStyles: SpinnerStyles = {
    '--size': `${size}px`,
  };

  const ringStyles: RingStyles = {
    '--ring-size': `${0.8 * size}px`,
  };

  return (
    <div
      className={spinnerClasses}
      aria-label="loading spinner"
      style={spinnerStyles}
      title="loading spinner"
    >
      <div
        className={classes.spinner__ring}
        style={ringStyles}
      />
      <div
        className={classes.spinner__ring}
        style={ringStyles}
      />
      <div
        className={classes.spinner__ring}
        style={ringStyles}
      />
      <div
        className={classes.spinner__ring}
        style={ringStyles}
      />
    </div>
  );
};

export default Spinner;
