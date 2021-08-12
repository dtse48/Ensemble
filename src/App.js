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
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import SuccessfulPost from "./pages/SuccessfulPost";
import Template from "./pages/Template";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, set_Username] = useState("");
  const [password, set_Password] = useState("");
  const [searchInput,set_searchInput] = useState("");
  const [userId,set_UserId] = useState("");
  const [profilePicture,set_ProfilePicture] = useState("");
  return (
    <UserContext.Provider value={{loggedIn,setLoggedIn,username,set_Username,password,set_Password,searchInput,set_searchInput,userId,set_UserId,profilePicture,set_ProfilePicture}}>
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
        <Route path="/searchresults">
          <SearchResults></SearchResults>
        </Route>
        <Route path="/settings">
          <Settings></Settings>
        </Route>
        <Route path="/successfulpost">
          <SuccessfulPost></SuccessfulPost>
        </Route>
        <Route path="/template">
          <Template></Template>
        </Route>
      </NavigationBar>
    </UserContext.Provider>
  );
}

export default App;
