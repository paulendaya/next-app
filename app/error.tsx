"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("ErrorPage", error);
  return (
    <div>
      <h1>Error</h1>
      <p>An error occurred</p>
      <button className="btn mt-3" onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
