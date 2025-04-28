import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout";
import HomePage from "./app/pages/home";
import SurveyPage from "./app/pages/survey";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/" >
        <Route index element={<HomePage />} />
        <Route path='/survey' element={<SurveyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
