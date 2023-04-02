import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  let { error, status, statusText } = useRouteError();
  console.error(error);
  return (
    <div className="h-screen flex justify-center flex-col text-center p-2 md:p-4 min-h-max bg-slate-800 text-white">
      <h2 className="text-white font-semibold text-lg leading-tight">
        {status}: {statusText}
      </h2>
      <p className="opacity-50">{error.message}</p>
    </div>
  );
}
