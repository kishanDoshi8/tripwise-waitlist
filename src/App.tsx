import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout";
import LandingPage from "./components/landing-page";
import Survey from "./components/survey";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/" >
        <Route index element={<LandingPage />} />
        <Route path='/survey' element={<Survey />} />
      </Route>
    </Routes>
  );
}

export default App;
