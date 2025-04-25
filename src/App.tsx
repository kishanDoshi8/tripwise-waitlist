import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<div className={`text-white`}>Home</div>} path="/" />
    </Routes>
  );
}

export default App;
