import React from "react";
import { useEffect, useRef } from "react";

const MessageContainer = ({ messages }) => {

    //Cunado se agrega un nuevo mensaje la pantalla baja para que se pueda ver
    const messageRef = useRef();
    
    useEffect(() => {
        if(messageRef && messageRef.current) { 
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({left: 0, top: scrollHeight - clientHeight, 
                behavior: 'smooth'
            });
        }
    }, [messages]);
    
    //Mostrar el mensaje
    return (
    <div ref={messageRef} className="message-container" role="log" aria-live="polite">
        {messages.map((m, index) => 
            <div key={index} className="user-message">
                <div className="message bg-primary">{m.message}</div>
                <div className="from-user">{m.user}</div>
            </div>

        )}
    </div>
    );
}

export default MessageContainer;