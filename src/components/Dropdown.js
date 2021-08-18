import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Dropdown(props) {
    const {set_searchInput} = useContext(UserContext);
    const {set_searchInputType} = useContext(UserContext);
    const context = useContext(UserContext);
    return (
        <div>
        {console.log(context.searchInput)}
            <form>
                <input type="text" onChange={e=>set_searchInput(e.target.value)}></input>
                <select>
                    <option value="track" onClick={e=>set_searchInputType(e.target.value)}>Song</option>
                    <option value="artist" onClick={e=>set_searchInputType(e.target.value)}>Artist</option>
                    <option value="album" onClick={e=>set_searchInputType(e.target.value)}>Album</option>
                </select>
                <Button as={Link} to="/test2" >search</Button>
            </form>
            {context.searchInputType}
        </div>
    );
}
export default Dropdown;