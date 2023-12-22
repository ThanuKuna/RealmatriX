import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Property from "./pages/admin/Property";
import Settings from "./pages/admin/Settings";
import UserPage from "./pages/admin/UserPage";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Settings/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/property" element={<Property/>} />
        <Route path="/user" element={<UserPage/>} />
      </Routes>
    </div>
  );
}

export default App;
