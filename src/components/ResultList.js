import Result from "./Result";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function ResultList(props) {
    const history = useHistory();
    function redirect() {
        history.push("/");
    }
    return (
        <div>
            {props.searchResult.length === 0 ?
            <div style={{textAlign:"center",marginTop:"50px"}}>
                Your search returned 0 results!
                <div style={{marginTop:"20px"}}>
                    <Button onClick={redirect}>Try again</Button>
                </div>
            </div>
            :
            <ul>
                {props.searchInputType === "track" ?
                <div>
                {props.searchResult.map(result => 
                    <Result
                        songName={result.name}
                        artistName={result.artists[0].name}
                        imageUrl={result.album.images[1].url}
                        searchInputType="track"
                    />
                )}
                </div>
                :null}
                {props.searchInputType === "album" ?
                <div>
                {props.searchResult.map(result => 
                    <Result
                        albumName={result.name}
                        artistName={result.artists[0].name}
                        imageUrl={result.images[1].url}
                        searchInputType="album"
                    />
                )}
                </div>
                :null} 
                {props.searchInputType === "artist" ?
                <div>
                {props.searchResult.map(result => 
                    <Result
                        artistName={result.name}
                        imageUrl={result.images}
                        searchInputType="artist"
                    />
                )}
                </div>
                :null}  
            </ul>
            }
            
        </div>
        
    )
}

export default ResultList;