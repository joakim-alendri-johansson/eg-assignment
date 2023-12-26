import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { PropsWithChildren, useEffect } from 'react';
import { useFilmStore } from '../store/filmStore';
import ErrorNotice from './ErrorNotice';

describe('Error notice', () => {
  it('Error notice should show when store has error set', async () => {
    const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
      const setError = useFilmStore((state) => state.setError);
      useEffect(() => {
        setError('test error');
      }, [setError]);

      return <>{children}</>;
    };
    const { getByTestId } = render(
      <Wrapper>
        <ErrorNotice />
      </Wrapper>,
    );
    expect(getByTestId('error-notice')).toBeTruthy();
  });
  it('Error notice should not show when store has no error set', async () => {
    const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
      const setError = useFilmStore((state) => state.setError);
      useEffect(() => {
        setError(undefined);
      }, [setError]);

      return <>{children}</>;
    };
    const { getByTestId } = render(
      <Wrapper>
        <ErrorNotice />
      </Wrapper>,
    );

    expect(() => getByTestId('error-notice')).toThrow();
  });
});
