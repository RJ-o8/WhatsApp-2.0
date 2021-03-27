import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";


function Message({user,message}) {
    const [userloggedin] = useAuthState(auth);

    const TypeOfMsg = user === userloggedin.email ? Sender : Reciver;



    return (
        <Container>
            <TypeOfMsg>
                {message.message}
                <Timestamp>
                    {message.timestamp? moment(message.timestamp).format('LT'):'...'}
                </Timestamp>
            </TypeOfMsg>
        </Container>
    )
}



export default Message

const Container = styled.div``; 

const MessageElement =styled.p`
    width:fit-content;
    padding:15px;
    border-radius:8px;
    margin:10px;
    min-width:60px;
    padding-bottom:26px;
    position:relative;
    text-align:right;

`;

const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color:lightblue;
`;
const Reciver = styled(MessageElement)`
    background-color:whitesmoke;
    text-align:left;
`;

const Timestamp = styled.span`
    color:gray;
    padding:10px;
    font-size:9px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;

`;