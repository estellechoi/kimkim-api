/** @memo wip */
import { ReactNode } from 'react';
import { ErrorBoundary } from '@sentry/nextjs';

export type FallbackProps = {
  error: Error | string;
  resetErrorBoundary: (...args: unknown[]) => void;
};

export type ErrorBoundaryProps = {
  fallbackComponent: React.ComponentType<FallbackProps>;
  onReset?: (...args: unknown[]) => void;
};

const SentryErrorBoundary = ({ children, fallbackComponent, onReset }: { children: ReactNode } & ErrorBoundaryProps) => {
  /**
   *
   * @description this is to follow typescript rule for react component to be in upper case
   */
  const FallbackComponent = fallbackComponent;

  return (
    <ErrorBoundary
      beforeCapture={(scope) => {
        scope.setLevel('fatal');
      }}
      fallback={({ eventId }) => {
        return (
          <FallbackComponent
            error={eventId}
            resetErrorBoundary={() => {
              onReset?.();
            }}
          />
        );
      }}>
      {children}
    </ErrorBoundary>
  );
};

export default SentryErrorBoundary;
