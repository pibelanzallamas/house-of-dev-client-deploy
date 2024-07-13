import axios from "axios";
import { useState, useEffect } from "react";
import { alerts } from "../utils/alerts";
import Navbar from "./Navbar";
import UserModals from "../modals/UserModals";

function Users() {
  const [users, setUsers] = useState([]);
  const [estado, setEstado] = useState(false);
  const [pop, setPop] = useState(false);
  const [window2, setWindow2] = useState(false);
  const [data, setData] = useState({});

  //get all user
  useEffect(() => {
    axios
      .get("https://house-of-dev-server.onrender.com/api/users/all", {
        withCredentials: true,
        credentials: "include",
      })
      .then((all) => setUsers(all.data))
      .catch((err) => console.log(err));
  }, [estado]);

  const openWindow = () => setPop(true);
  const closeWindow = () => setPop(false);
  const openWindow2 = () => setWindow2(true);
  const closeWindow2 = () => setWindow2(false);

  function handleAdmin(user) {
    setData(user);
    openWindow();
  }

  function handleDelete(user) {
    setData(user);
    openWindow2();
  }

  function confirmAdmin() {
    const { id, name } = data;

    axios
      .put(
        `https://house-of-dev-server.onrender.com/api/users/${id}`,
        {
          admin: true,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(() => {
        setEstado(!estado);
        alerts("Ok!", `El usuario ${name} ahora es admin 💼`, "success");
      });
    closeWindow();
  }

  function confirmDelete() {
    const { id, name } = data;
    axios
      .delete(`https://house-of-dev-server.onrender.com/api/users/${id}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        setEstado(!estado);
        alerts("Ok!", `El usuario ${name} ha sido eliminado 😵`, "success");
      });
    closeWindow2();
  }

  //scroll up
  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">USUARIOS</h2>
        </div>
        {users.length > 0 ? (
          <div className="property-list">
            {users.map((user) => (
              <>
                <div className="user-datos" style={{ height: "310px" }}>
                  <img
                    src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                    alt="Imagen del usuario"
                  />
                  <div className="inputName">
                    <label> Nombre y Apellido </label>
                    <br></br>
                    <input value={user.name}></input>
                  </div>

                  <div className="inputEmail">
                    <label> Email </label>
                    <br></br>
                    <input value={user.email}></input>
                  </div>

                  <div className="inputTel">
                    <label> Telefono </label>
                    <br></br>
                    <input value={user.telephone}></input>
                  </div>
                  {user.admin ? <label>Admin ✔️</label> : <></>}
                  {user.admin ? (
                    <p> </p>
                  ) : (
                    <button
                      className="boton-editar"
                      onClick={() => handleAdmin(user)}
                      style={{ left: "79%" }}
                    >
                      ADMIN
                    </button>
                  )}
                  {user.email === "admin@email.com" ? (
                    <></>
                  ) : (
                    <button
                      className="boton-editar "
                      onClick={() => handleDelete(user)}
                      style={{ left: "87%" }}
                    >
                      ELIMINAR
                    </button>
                  )}
                </div>
                <hr></hr>
              </>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            position: "relative",
            "margin-bottom": "7%",
            "margin-top": "2%",
          }}
        >
          <button className="onTop" onClick={handleScroll}>
            IR A INICIO
          </button>
        </div>
        <UserModals
          isOpen={pop}
          onClose={closeWindow}
          onConfirm={confirmAdmin}
          text={"¿Desea modificar usuario?"}
        />
        <UserModals
          isOpen={window2}
          onClose={closeWindow2}
          onConfirm={confirmDelete}
          text={"¿Desea eliminar usuario?"}
        />
      </div>
    </div>
  );
}

export default Users;
