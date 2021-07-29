import NavigationBar from "./navigation/NavigationBar";
import {Route} from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/Login";
import CreatePage from "./pages/Create";
import ChatPage from "./pages/Chat";
import Post from "./pages/Post";
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
      <Route path = "/newpost">
        <Post></Post>
      </Route>
    </NavigationBar>
  );
}

export default App;
