using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection > _connections;

        public ChatHub( IDictionary<string, UserConnection> connections) 
        {
            _botUser = "Sistema";
            _connections = connections;
        }


        //Lo que se busca con cada sala, es que al crearse una sala solo exista una con un nombre espcifico y que los mensajes no se filtren en otras salas
        public async Task SendMessage(string message) 
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection? userConnection)) 
            { 
                await Clients.Groups(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        //Enviar un mensaje a todos los clientes
        //En este caso seria enviar un mensaje de conexion de un usuario a una habitacion a los participantes de una habitacion
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;
            
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser ,
                $"{userConnection.User} se a unido a la sala {userConnection.Room}");
            
            await SendConnectedUsers(userConnection.Room);
            
        }

        //Enviar mensaje de que un usuario abandono la sala a todos los miembros de la sala
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, value: out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} a abandonado la sala");

                SendConnectedUsers(userConnection.Room);

            }

            return base.OnDisconnectedAsync(exception);
        }

        //Listado de usuarios que se encuentran en la sala
        public Task SendConnectedUsers(string room) 
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

    }
}
