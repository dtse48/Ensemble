import { useContext,useState } from "react";
import ResultList from "../components/ResultList";
import { UserContext } from "../context/UserContext";
import { Card } from "semantic-ui-react";

function ChooseCategory() {
    const context = useContext(UserContext);
    const [showResults,setShowResults] = useState(false);
    const [searchType,setSearchType] = useState("");
    return (
        <div>
        {console.log(searchType)}
        {!showResults ?
            <Card.Group centered style={{marginTop:"50px",textAlign:"center"}}>
                <Card link onMouseOver={()=>setSearchType("track")}>
                    <Card.Content>
                        {context.searchResults.tracks.items.length} results in Tracks
                    </Card.Content>
                </Card>
                <Card link>
                    <Card.Content>
                        {context.searchResults.albums.items.length} results in Albums
                    </Card.Content>
                </Card>
                <Card link>
                    <Card.Content>
                        {context.searchResults.artists.items.length} results in Artists
                    </Card.Content>
                </Card>
            </Card.Group>
        :
            <ResultList></ResultList>
        }
            
        </div>
    );
}

export default ChooseCategory;