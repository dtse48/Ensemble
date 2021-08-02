import NavigationBar from "./navigation/NavigationBar";
import {Route} from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/Login";
import CreatePage from "./pages/Create";
import ChatPage from "./pages/Chat";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
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
      <Route path = "/chat">
        <ChatPage></ChatPage>
      </Route>
      <Route path = "/createaccount">
        <CreateAccount></CreateAccount>
      </Route>
      <Route path = "/myprofile">
        <Profile></Profile>
      </Route>
    </NavigationBar>
  );
}

export default App;
