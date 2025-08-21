import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import Navbar from "../components/Navbar";
import Cards from "../commons/Cards";
import AppointmentsCards from "../commons/AppointmentsCards";
import UserModals from "../modals/UserModals";
import { setUser } from "../state/userState";

function User() {
  const userRX = useSelector((state) => state.user); //obtiene desde la global store
  const userLS = JSON.parse(localStorage.getItem("user")); //obtiene desde el local storage
  const user = userRX; //obtiene user de acuerdo a cual este disponible
  const uid = user.id;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.telephone);
  const [estado, setEstado] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [window, setWindow] = useState(false);
  const [appo, setAppo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  //mod user
  const handleConfirm = () => {
    axios
      .put(
        `https://house-of-dev-server.onrender.com/api/users/${uid}`,
        {
          name,
          email,
          telephone,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((user) => {
        setEstado(!estado); //modificado en la base de datos
        const newUser = {
          id: user.data.id,
          name: user.data.name,
          email: user.data.email,
          telephone: user.data.telephone,
          admin: user.data.admin,
        };
        dispatch(setUser(newUser));
        localStorage.setItem("user", JSON.stringify(newUser));
        alerts("Ok!", "Modificó su perfil 😎", "success");
        handleClose();
      })
      .catch(() => alerts("Err", "Ingrese datos correctos 😖", "danger"));
  };

  //get favs de user
  useEffect(() => {
    axios
      .get(`https://house-of-dev-server.onrender.com/api/favorites/${uid}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => setFavoritos(res.data))
      .catch((err) => console.log(err));
  }, [estado, uid]);

  //get citas
  useEffect(() => {
    axios
      .get(`https://house-of-dev-server.onrender.com/api/appointments/${uid}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((all) => setCitas(all.data))
      .catch((err) => console.log(err));
  }, [estado, uid]);

  //estado alert citas
  const cancelDate = () => {
    setAppo(!appo);
  };

  //estado alert cards
  function hanldeEstado() {
    setEstado(!estado);
  }

  //form submit mod user
  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpen();
  };
  //modal management
  const handleOpen = () => setWindow(true);
  const handleClose = () => setWindow(false);

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">MI PERFIL</h2>
        </div>
        <div className="user-datos">
          <form onSubmit={handleSubmit}>
            <img
              src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
              alt="Imagen del usuario"
            />

            <div className="inputName">
              <label> Nombre y Apellido </label>
              <br></br>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
                maxLength={25}
                required
              ></input>
            </div>

            <div className="inputEmail">
              <label> Email </label>
              <br></br>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                minLength={5}
                maxLength={45}
                required
              ></input>
            </div>

            <div className="inputTel">
              <label> Telefono </label>
              <br></br>
              <input
                id="telephone"
                type="number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                min={10000}
                max={9999999999}
                required
              ></input>
            </div>

            {user.admin ? <label>Admin ✔️</label> : <></>}

            <button className="boton-editar" style={{ left: "86%" }}>
              MODIFICAR
            </button>
            <UserModals
              isOpen={window}
              onClose={handleClose}
              onConfirm={handleConfirm}
              text={"¿Modificar su perfil?"}
            />
          </form>
        </div>

        {favoritos.length > 0 ? (
          <>
            <div className="home-titulo">
              <h2 className="linea1">FAVORITOS</h2>
            </div>
            <div className="todo-tarjetas-prop">
              {favoritos.map((favorito, id) => (
                <div key={id} className="property-cards-container">
                  <Cards
                    modAppo={appo}
                    property={favorito.property}
                    modFavs={hanldeEstado}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="home-titulo" style={{ border: "none" }}>
            <h2 className="linea1" style={{ marginRight: "2%" }}>
              NO HAY FAVORITOS
            </h2>
          </div>
        )}

        {citas.length > 0 ? (
          <>
            <div className="home-titulo">
              <h2 className="linea1">PRÓXIMAS CITAS</h2>
            </div>
            <div className="todo-tarjetas-prop">
              {citas.map((app) => (
                <AppointmentsCards
                  cancelDate={cancelDate}
                  cita={app}
                  modFavs={hanldeEstado}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="home-titulo" style={{ border: "none" }}>
            <h2 className="linea1" style={{ marginRight: "1%" }}>
              NO HAY PRÓXIMAS CITAS
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
