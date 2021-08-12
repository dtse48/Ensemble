import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card,Image,Icon } from "semantic-ui-react";
import classes from "./WelcomeCardHeaders.module.css";

function WelcomePage() {
    const context = useContext(UserContext);
    console.log(context.username);
    console.log(context.password);
    console.log(context.loggedIn);
    return (
        <div style={{marginTop:"50px",textAlign:"center"}}>
            <Card.Group centered>
                <Card style={{width:"15%",height:"400px",backgroundColor:"#18db9d"}} className={classes.cards}>
                    <Image style={{width:"auto",height:"300px"}} src="https://images-na.ssl-images-amazon.com/images/I/71DQrKpImPL._SL1400_.jpg"></Image>
                    <Card.Content>
                        <Card.Header style={{color:"white"}}>Discuss your favorite music</Card.Header>
                        <Icon name="comments outline" size="big" color="black" style={{marginTop:"10px"}}></Icon>
                    </Card.Content>
                </Card>
                <Card style={{width:"15%",height:"400px",backgroundColor:"#f7e131"}} className={classes.cards}>
                    <Image style={{width:"auto",height:"300px"}}src="https://images.squarespace-cdn.com/content/v1/5d823758ae5d25282cd8cf65/1596482748203-DUX3TWALS92R2RC6BZZ1/odd+future.jpg?format=1000w"></Image>
                    <Card.Content>
                        <Card.Header style={{color:"white"}}>Find friends with similar taste</Card.Header>
                        <Icon name="handshake outline" size="big" color="black" style={{marginTop:"10px"}}></Icon>
                    </Card.Content>
                </Card>
                <Card style={{width:"15%",height:"400px",backgroundColor:"#0077ff"}} className={classes.cards}>
                    <Image  style={{width:"auto",height:"300px"}} src="https://static.billboard.com/files/2021/07/Olivia-Rodrigo-2021-Press-cr-Courtesy-of-Geffen_Interscope-Records-1-bb10-2021-billboard-1548-1626206323-compressed.jpg"></Image>
                    <Card.Content>
                        <Card.Header style={{color:"white"}}>See what others are saying</Card.Header>
                        <Icon name="search" size="big" color="black" style={{marginTop:"10px"}}></Icon>
                    </Card.Content>
                </Card>
            </Card.Group> 
        </div>
    );
}
export default WelcomePage;