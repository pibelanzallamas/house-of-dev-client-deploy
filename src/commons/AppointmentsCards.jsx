import axios from "axios";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import { alerts } from "../utils/alerts";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserModals from "../modals/UserModals";

function AppointmentsCards({ cita, modFavs }) {
  const user = useSelector((state) => state.user);
  const [window, setWindow] = useState(false);
  const [aid, setAid] = useState("");

  //send email
  function sendEmail(email) {
    axios
      .post(`/api/users/delete/${email}`)
      .then(() => alerts("Exito!", "Mail de cencelación enviado ✉️", "success"))
      .catch(() => alerts("Rayos!", "Mail no pudo enviarse ☠️", "warning"));
  }

  //eliminar cita
  const handleOpen = () => setWindow(true);
  const handleClose = () => setWindow(false);

  function handleDel(id) {
    setAid(id);
    handleOpen();
  }

  const handleConfirm = () => {
    axios
      .delete(`/api/appointments/${aid}`)
      .then(() => {
        alerts("Ok!", "Cita cancelada! 🤝", "success");
        sendEmail(user.email);
        modFavs();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id={cita.id} className="todo-tarjeta">
        <div className="imagen">
          <img src={cita.property.images} alt={cita.property.name} />
        </div>
        <div className="texto">
          <div className="rectangulo-uno">
            <div className="cuadradito-uno">
              <p style={{ top: "-6px" }}>
                <strong>
                  {" "}
                  {cita.date.slice(11, 13) - 3}:{cita.date.slice(14, 16)} hs
                </strong>
              </p>
            </div>
            <div className="cuadradito-cuatro">
              <p style={{ top: "-6px", left: "6%" }}>
                <strong>
                  {cita.date.slice(8, 10)} / {cita.date.slice(5, 7)} /{" "}
                  {cita.date.slice(0, 4)}
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
              <p style={{ left: "3%" }}>{cita.property.name}</p>
            </div>
          </div>
          <div className="rectangulo-dos">
            <p style={{ top: "-6px", marginRight: "2%" }}>
              {cita.property.address}, {cita.property.neighborhood},{" "}
              {cita.property.city}, {cita.property.country}
            </p>
          </div>
          <div className="rectangulo-tres">
            <Link
              className="boton-mas"
              onClick={() => {
                handleDel(cita.id);
              }}
              style={{ left: "68%" }}
            >
              CANCELAR
            </Link>
          </div>
          <UserModals
            isOpen={window}
            onClose={handleClose}
            onConfirm={handleConfirm}
            text={"¿Desea cancelar la cita?"}
          />
        </div>
      </div>
    </>
  );
}

export default AppointmentsCards;
