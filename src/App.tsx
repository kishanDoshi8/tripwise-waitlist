import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout";
import Survey from "./components/survey";
import Home from "./app/pages/home";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/" >
        <Route index element={<Home />} />
        <Route path='/survey' element={<Survey />} />
      </Route>
    </Routes>
  );
}

export default App;
