import React from "react";
import { Form, Button } from "react-bootstrap"
import { useState } from "react";

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.trim() && room.trim()) {
            joinRoom(user.trim(), room.trim());
        }
    };

    return (
    <Form className='lobby' onSubmit={handleSubmit}>
        <Form.Group>
            <br/>
            <Form.Label htmlFor="username"><b>Nombre:</b></Form.Label>
            <Form.Control 
                id="username" 
                onChange={e => setUser(e.target.value)} 
                value={user}
                required
            />
            <br/>
            <Form.Label htmlFor="room"><b>Sala:</b></Form.Label>
            <Form.Control 
                id="room" 
                onChange={e => setRoom(e.target.value)} 
                value={room}
                required
            />
        </Form.Group>
        <br/>
        <Button 
            variant='success' 
            type='submit' 
            disabled={!user.trim() || !room.trim() }>Unirse a una Sala</Button>
    </Form>
    );
};

export default Lobby;