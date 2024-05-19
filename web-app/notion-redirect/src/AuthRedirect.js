import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function AuthRedirect() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  var code = null;
  var state = null;
  useEffect(() => {
    const getQueryStringParams = () => {
      code = searchParams.get("code");
      state = searchParams.get("state");
    };

    if (isLoading) {
      getQueryStringParams();
      console.log(code);
      console.log(state);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>Integration Complete!</h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p>You may now close this tab.</p>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>Something went wrong.</h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p>Please close this tab and try again.</p>
          </div>
        </>
      )}
    </>
  );
}

export default AuthRedirect;
