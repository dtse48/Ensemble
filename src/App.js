import NavigationBar from "./navigation/NavigationBar";
import {Route} from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/Login";
import CreatePage from "./pages/Create";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.css";
import {UserContext} from "./context/UserContext";
import {useState,useEffect} from "react";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import SuccessfulPost from "./pages/SuccessfulPost";
import Template from "./pages/Template";
import MyPosts2 from "./pages/MyPosts2";
import RoomPosts from "./pages/RoomPosts";
import ShowProfile from "./pages/ShowProfile";
import RecentRooms from "./pages/RecentRooms";
import CreatePrelim from "./pages/CreatePrelim";
import DesignPost from "./pages/DesignPost";
import ChooseCategory from "./pages/ChooseCategory";
import LinkResults from "./pages/LinkResults";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, set_Username] = useState("");
  const [password, set_Password] = useState("");
  const [searchInput,set_searchInput] = useState("");
  const [searchInputType,set_searchInputType] = useState("track");
  const [userId,set_UserId] = useState("");
  const [profilePicture,set_ProfilePicture] = useState("");
  const [numPosts,set_NumPosts] = useState(0);
  const [currentRoom,set_currentRoom] = useState("");
  const [currentProfile,set_currentProfile] = useState("");
  const [postInfo,set_postInfo] = useState("");
  const [searchResults,set_searchResults] = useState("");
  const [numTotalPosts,set_numTotalPosts] = useState(0);
  return (
    <UserContext.Provider value={{loggedIn,setLoggedIn,username,set_Username,password,set_Password,searchInput,set_searchInput,searchInputType,set_searchInputType,
    userId,set_UserId,profilePicture,set_ProfilePicture,numPosts,set_NumPosts,currentRoom,set_currentRoom,currentProfile,set_currentProfile,postInfo,set_postInfo,
    searchResults,set_searchResults,numTotalPosts,set_numTotalPosts}}>
      <NavigationBar>
        <Route path = "/" exact>
          <WelcomePage></WelcomePage>
        </Route>
        <Route path = "/login">
          <LoginPage></LoginPage>
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
        <Route path="/myposts">
          <MyPosts2></MyPosts2>
        </Route>
        <Route path="/roomposts">
          <RoomPosts></RoomPosts>
        </Route>
        <Route path="/showprofile">
          <ShowProfile></ShowProfile>
        </Route>
        <Route path="/recentrooms">
          <RecentRooms></RecentRooms>
        </Route>
        <Route path="/create">
          <CreatePrelim></CreatePrelim>
        </Route>
        <Route path="/designpost">
          <DesignPost></DesignPost>
        </Route>
        <Route path="/choosecategory">
          <ChooseCategory></ChooseCategory>
        </Route>
        <Route path="/linkresults">
          <LinkResults></LinkResults>
        </Route>
      </NavigationBar>
    </UserContext.Provider>
  );
}

export default App;
