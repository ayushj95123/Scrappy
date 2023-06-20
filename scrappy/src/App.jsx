import { BrowserRouter as Redirect, Route, Navigate, Routes } from 'react-router-dom';
import LoginPage from './Login';
import DashboardPage from './Dashboard';
import RegistrationForm from './RegistrationForm';

const isLoggedIn = () => {
  // Logic to check if the user is authenticated (e.g., check if access token exists)
  // Return true if authenticated, false otherwise
  // You can implement your own authentication logic here
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};

const App = () => {

  return (
    <div className="App">
        <Routes>
          <Route path = '/' element = {<LoginPage/>} exact = {true}/>
          <Route path = '/registration' element = {<RegistrationForm/>} exact = {true}/>
          <Route path = '/dashboard' element = {<DashboardPage/>} exact = {true}/>
        </Routes>
    </div>
  );
};

export default App;


