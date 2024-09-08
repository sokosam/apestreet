import HomePage from "./Components/HomePage";
import UserProfile from "./Components/UserProfile";
import NotFound404 from "./Components/NotFound404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user/:id" element={<UserProfile></UserProfile>}></Route>
        <Route path="*" element={<NotFound404></NotFound404>}></Route>
      </Routes>
    </Router>
  );
};
export default App;
