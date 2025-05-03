import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout";
import HomePage from "./app/pages/home";
import SurveyPage from "./app/pages/survey";
import PoliciesPage from "./app/pages/privacy";
import NotFound from "./app/pages/not-found";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/" >
        <Route index element={<HomePage />} />
        <Route path='/survey' element={<SurveyPage />} />
        <Route path='/policies' element={<PoliciesPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
