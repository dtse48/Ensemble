import NavigationBar from "./navigation/NavigationBar";
import {Route} from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/Login";
import CreatePage from "./pages/Create";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.css";
import {UserContext} from "./context/UserContext";
import {useState} from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, set_Username] = useState("");
  const [password, set_Password] = useState("");
  return (
    <UserContext.Provider value={{loggedIn,setLoggedIn,username,set_Username,password,set_Password}}>
      <NavigationBar>
        <Route path = "/" exact>
          <WelcomePage></WelcomePage>
        </Route>
        <Route path = "/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path = "/create">
          <CreatePage></CreatePage>
        </Route>
        <Route path = "/createaccount">
          <CreateAccount></CreateAccount>
        </Route>
        <Route path = "/myprofile">
          <Profile></Profile>
        </Route>
      </NavigationBar>
    </UserContext.Provider>
  );
}

export default App;
