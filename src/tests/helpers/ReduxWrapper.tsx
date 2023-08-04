import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { RootState, setupStore } from '../../store/store';

type ReduxWrapperProps = {
  children: ReactNode,
  preloadedState?: PreloadedState<RootState>,
}

const ReduxWrapper: FC<ReduxWrapperProps> = ({
  children,
  preloadedState,
}) => {
  const store = setupStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
