import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import Navbar from "./Navbar";
import UserModals from "../modals/UserModals";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [estado, setEstado] = useState(false);
  const [aid, setAid] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [pop, setPop] = useState(false);

  useEffect(() => {
    axios
      .get("https://house-of-dev-server.onrender.com/api/appointments/all", {
        withCredentials: true,
        credentials: "include",
      })
      .then((data) => {
        setAppointments(data.data);
      })
      .catch((err) => console.log(err));
  }, [estado]);

  function sendEmail(email) {
    axios
      .post(
        `https://house-of-dev-server.onrender.com/api/users/delete/${email}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(() => alerts("Exito!", "Mail de cencelación enviado ✉️", "success"))
      .catch(() => alerts("Rayos!", "Mail no pudo enviarse ☠️", "warning"));
  }

  function handleOpen() {
    setPop(true);
  }

  function handleClose() {
    setPop(false);
  }

  function handleClick(id, email) {
    setAid(id);
    setUEmail(email);
    handleOpen();
  }

  function handleConfirm() {
    axios
      .delete(
        `https://house-of-dev-server.onrender.com/api/appointments/${aid}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(() => {
        alerts("Ok!", "Cita cancelada! 🤝", "success");
        sendEmail(uEmail);
        setEstado(!estado);
      })
      .catch((err) => console.log(err));
    handleClose();
  }

  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">CITAS</h2>
        </div>
        <div className="todo-tarjetas-prop">
          {appointments.map((elemento) => (
            <div id={elemento.id} className="todo-tarjeta">
              <div className="imagen">
                <img
                  src={elemento.property.images}
                  alt={elemento.property.name}
                />
              </div>
              <div className="texto">
                <div className="rectangulo-uno">
                  <div className="cuadradito-uno">
                    <p style={{ top: "-6px" }}>
                      <strong>
                        {" "}
                        {elemento.date.slice(11, 13) - 3}:
                        {elemento.date.slice(14, 16)} hs
                      </strong>
                    </p>
                  </div>
                  <div className="cuadradito-cuatro">
                    <p style={{ top: "-6px", left: "6%" }}>
                      <strong>
                        {elemento.date.slice(8, 10)} /{" "}
                        {elemento.date.slice(5, 7)} /{" "}
                        {elemento.date.slice(0, 4)}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="rectangulo-uno">
                  <div
                    className="cuadradito-dos"
                    style={{
                      top: "-1px",
                      width: "100%",
                      borderRight: "none",
                    }}
                  >
                    <p style={{ left: "3%" }}>
                      <strong>{elemento.user.name}</strong>
                    </p>
                  </div>
                </div>
                <div className="rectangulo-dos">
                  <p style={{ top: "-6px", marginRight: "2%" }}>
                    {elemento.property.address},{" "}
                    {elemento.property.neighborhood}, {elemento.property.city},{" "}
                    {elemento.property.country}
                  </p>
                </div>
                <div
                  className="rectangulo-dos"
                  style={{ borderBottom: "none" }}
                >
                  <p style={{ top: "-1px" }}>{elemento.property.name} </p>
                  <Link
                    className="boton-mas"
                    onClick={() => {
                      handleClick(elemento.id, elemento.user.email);
                    }}
                    style={{ left: "68%", top: "7px" }}
                  >
                    CANCELAR
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <UserModals
            isOpen={pop}
            onClose={handleClose}
            onConfirm={handleConfirm}
            text={"¿Deseas cancelar la cita?"}
          />
        </div>
      </div>
    </>
  );
}

export default Appointments;
