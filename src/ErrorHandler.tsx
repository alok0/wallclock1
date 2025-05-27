import type { ErrorInfo } from "preact";
import { useErrorBoundary } from "preact/hooks";
import React, { useEffect, useState } from "react";
import classes from "./ErrorHandler.module.css";

const Fallback: React.FC<{
  error: { error: unknown; errorInfo: ErrorInfo };
}> = ({ error }) => {
  useEffect(() => {
    console.warn(error);
    const h = setTimeout(() => {
      window.location.reload();
    }, 60_000);
    return () => {
      clearTimeout(h);
    };
  }, [error]);

  return (
    <div className={classes["error"]}>
      <h1>Unexpected Error</h1>
      <p>{String(error.error)}</p>
      <p>
        {JSON.stringify(
          error.error,
          Object.getOwnPropertyNames(error.error),
          2,
        )}
      </p>
      {error.error instanceof Error && (
        <>
          <p className={classes["small"]}>{String(error.error.stack)}</p>
        </>
      )}
      <p className={classes["small"]}>{error.errorInfo?.componentStack}</p>
    </div>
  );
};

export const ErrorHandler: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [err, setErr] = useState<{
    error: unknown;
    errorInfo: ErrorInfo;
  } | null>(null);
  useErrorBoundary((error: unknown, errorInfo) => setErr({ error, errorInfo }));

  if (err) {
    return <Fallback error={err} />;
  }

  return <>{children}</>;
};
