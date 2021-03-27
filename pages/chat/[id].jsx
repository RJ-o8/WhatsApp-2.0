import Head from 'next/head';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ChatScreen from '../../Components/ChatScreen';
import Sidebar from '../../Components/Sidebar';
import { auth, db } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';

function Chat({chat,messages}) {
    const [user]= useAuthState(auth);

    return <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users,user)}</title>
        </Head>
        <Sidebar/>
        <ChatContainer>
            <ChatScreen chat={chat}messages={messages}/>
        </ChatContainer>
    </Container>;
}

export default Chat;

export async function getServerSideProps(context){
    const ref =db.collection("chats")
    .doc(context.query.id)

    //prep MSg on server
    const messageRes = await ref
    .collection("message")
    .orderBy("timestamp","asc")
    .get();

    const messages = messageRes.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
    })).map(msg=>({
        ...msg,
        timestamp: msg.timestamp.toDate().getTime()
    }))

    //prep the Chats
    const chatRes = await ref.get();
    const chat = {
        id:chatRes.id,
        ...chatRes.data()
    }
    return {
        props:{
            messages: JSON.stringify(messages),
            chat:chat
        },
    }
}


const Container = styled.div`
    display:flex;    
`;


const ChatContainer = styled.div`

    height:100vh;
    flex:1;
    overflow:scroll;
    ::-webkit-scrollbar{
        display:none;
    }
    --ms-overflow-style:none;
    scrollbar-width:none;
`;