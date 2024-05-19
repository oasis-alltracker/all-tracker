import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthRedirect from "./AuthRedirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth-redirect" element={<AuthRedirect />} />
        <Route
          path="/"
          element={
            <>
              <div>
                <h1>Page Coming Soon!</h1>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
