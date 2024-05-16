import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Mainpage from "./Mainpage";
import Reset from "./Forgotpassword";
import Settings from "./Settings"

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("userName")

  if (!isLoggedIn) {
    return <Login/>;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage" element={<ProtectedRoute><Mainpage /></ProtectedRoute>} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
