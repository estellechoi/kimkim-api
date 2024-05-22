import type { FallbackProps } from '@/components/SentryErrorBoundary';

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <main role="main">
      <div className="text-white">ErrorFallback</div>
      <div>
        <button type="button" onClick={() => resetErrorBoundary()}>
          Retry
        </button>
      </div>
    </main>
  );
};

export default Fallback;
