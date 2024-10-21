import React from "react";

function ListUsers ({users}) {
    const renderUsers = () => {
        if (users && users.length > 0) {
            return (
                <ul className="listausuario">
                    {users.map((u) => (
                        <li key={u} className="nomUsuario"><b>{u}</b></li>
                    ))}
                </ul>
            );
        }
        return <p>No hay usuarios conectados.</p>;
    };
    
    return(
        <div className="user-list">
            <br/>
            <h4>Usuarios Conectados:</h4>
            {renderUsers()}
        </div>
    );
}

export default ListUsers;