import { Route, Routes } from "react-router-dom";

import Issue from "./pages/Issue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Issue />} />
    </Routes>
  );
}

export default App;
