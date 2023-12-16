import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import SurveyPage from "./pages/SurveyPage";
import SurveyForm from "./pages/Survey";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<PrivateRoute> <HomePage /></PrivateRoute>} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/survey/form" element={<SurveyForm />} />
        {/* <Route path="/confession/:id" element={<SingleConfessionPage />} /> */}
        {/* <Route path="/add-confession" element={<AddConfessionPage />} /> */}
        {/* <Route path="/api-endpoints" element={<ApiPage />} /> */}
        {/* <Route path="/add-book" element={<AddBook />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
