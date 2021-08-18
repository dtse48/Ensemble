import { useContext,useEffect,useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ResultList from "../components/Result";

function Test2() {
    const context = useContext(UserContext);
    const [token,setToken] = useState("");
    const [searchResult,setSearchResult] = useState("");
    useEffect(() => {
        axios("https://accounts.spotify.com/api/token", {
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":"Basic "+btoa("3eea88e0a13f4b12ab5b868524abd167"+":"+"3e7ffc17f9b5420a8226a93fe1199349")
            },
            data: "grant_type=client_credentials",
            method: "POST"
        })
        .then(tokenResponse => {
            setToken(tokenResponse.data.access_token);
            axios("https://api.spotify.com/v1/search?q="+context.searchInput+"&type="+context.searchInputType, {
                method:"GET",
                headers:{"Authorization":"Bearer "+tokenResponse.data.access_token}
            })
            .then(searchResponse => {
                if (context.searchInputType === "track") {
                    setSearchResult(searchResponse.data.tracks.items);
                    console.log(searchResponse.data.tracks.items);
                }
                else if (context.searchInputType === "album") {
                    setSearchResult(searchResponse.data.albums.items);
                    console.log(searchResponse.data.albums.items);
                }
                else if (context.searchInputType === "artist") {
                    setSearchResult(searchResponse.data.artists.items);
                    console.log(searchResponse.data.artists.items);
                }
            })
        })
    },[]);
    return (
        <div>{searchResult}</div>
    );
}
export default Test2;