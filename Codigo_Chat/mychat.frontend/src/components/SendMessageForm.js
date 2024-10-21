import React from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";

function SendMessageForm({sendMessage}) {

    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();
        if (message.trim()){
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <FormControl 
                    placeholder="Escribir mensaje ..."
                    onChange={e => setMessage(e.target.value)} 
                    value={message} 
                    aria-label="Message input"
                />
                <Button variant="primary" type="submit" disabled={!message.trim()}>
                    Enviar
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SendMessageForm;

