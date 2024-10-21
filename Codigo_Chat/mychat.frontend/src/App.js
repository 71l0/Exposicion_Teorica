import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState, useEffect } from 'react';
import Chat from './components/Chat';


const App = () => {

  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); //Manejo de los errores

  const joinRoom = async(user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7222/chat", {
          withCredentials: true
        })
        .configureLogging(LogLevel.Information)
        .build();

      //Lista que muestra a los usuarios conectados
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });
          

      //Recibir mensajes que se desarrollo en el Visual Studio
      // Sera el mensaje que se le envia a todos los usuarios que se encuentran en la sala 
      connection.on("ReceiveMessage", (user, newMessage) => {
        setMessages((prevMessages) => [...prevMessages, {user, message: newMessage}]);
      });

      connection.onclose((e) => {
        if (e) {
          setError("La conexion se cerro inesperadamente");
        }
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      console.log('Conexion realizada con signalR');

      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
      setError(null);

    }
    catch (e) {
      console.error('Conexion fallida', e);
      setError("Falla en la conexion con el servidor, intente nuevamente");
    }
  };

  //Accion para salir de una sala de chat
  const closeConnection = async () => {
    try{
      await connection.stop();
    }catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);


  //Accion de enviar mensaje
  const sendMessage = async (message) => {
    try{
      await connection.invoke("SendMessage", message);
      setError(null);
    }catch (e) {
      console.error('Envio de mensaje fallido', e);
      setError("No se pudo enviar el mensaje, intente nuevamente");
    }
  };
 
  return (
    <div className='app'>
    <h1>Salas de Chat</h1>
    {error && <div className="alert alert-danger">{error}</div>}
    <hr/>

    {!connection 
      ? <Lobby joinRoom={joinRoom} />
      : <Chat 
        messages={messages} 
        sendMessage={sendMessage} 
        closeConnection={closeConnection}
        users={users}/>
    }
  </div>
  );

};

export default App;
