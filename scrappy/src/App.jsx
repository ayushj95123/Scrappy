import { Route, Routes } from "react-router-dom";
import LoginPage from "./MainComponents/Authentication/Login";
import DashboardPage from "./MainComponents/Scrapboard/Dashboard";
import RegistrationForm from "./MainComponents/Authentication/RegistrationForm";
import Homepage from "./MainComponents/Homepage";

const isLoggedIn = () => {
  // Logic to check if the user is authenticated (e.g., check if access token exists)
  // Return true if authenticated, false otherwise
  // You can implement your own authentication logic here
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} exact={true} />
        <Route path="/login" element={<LoginPage />} exact={true} />
        <Route
          path="/registration"
          element={<RegistrationForm />}
          exact={true}
        />
        <Route path="/dashboard" element={<DashboardPage />} exact={true} />
      </Routes>
    </div>
  );
};

export default App;
