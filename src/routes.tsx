import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

const Router: React.FunctionComponent = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
