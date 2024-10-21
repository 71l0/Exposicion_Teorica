import React from "react";
import { Button } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from './SendMessageForm';
import ListUsers from "./ListUsers";
import PropTypes from 'prop-types';

const Chat = ({messages,sendMessage,closeConnection,users}) => 

(
<div>
        <div className="leave-room"> 
            <Button variant="danger" onClick={closeConnection}>
                Abandonar la Sala
            </Button>
        </div>

        <ListUsers users={users}/>
        
        <div className="chat">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
</div>
);

Chat.propTypes = {

    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    closeConnection: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,

};

export default Chat;