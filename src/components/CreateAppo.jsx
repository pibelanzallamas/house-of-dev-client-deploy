import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { alerts } from "../utils/alerts";
import AppointmentsCards from "../commons/AppointmentsCards";
import UserModals from "../modals/UserModals";

function CreateAppo() {
  const pid = useParams().id;
  const user = useSelector((state) => state.user);
  const uid = user.id;
  const [property, setProperty] = useState({});
  const [date, setDate] = useState(false);
  const [appo, setAppo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const navigate = useNavigate();
  const [window, setWindow] = useState(false);

  //get property
  useEffect(() => {
    axios
      .get(`/api/properties/${pid}`)
      .then((data) => {
        setProperty(data.data);
      })
      .catch((err) => console.log(err));
  }, [user, pid]);

  //create appointment
  const handleOpen = () => setWindow(true);
  const handleClose = () => setWindow(false);

  function handleClick() {
    handleOpen();
  }

  const handleConfirm = () => {
    axios
      .post("/api/appointments/register", { uid, pid, date: startDate })
      .then((data) => {
        if (data.data[1]) {
          handleClose();
          alerts("Exito!", "Cita agendada correctamente 📝", "success");
          sendEmail(startDate, property);
          navigate("/home");
        } else {
          handleClose();
          alerts(
            "Oops!",
            "Lo siento, este horario ya está reservado 😇",
            "warning"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  //check Date
  useEffect(() => {
    axios
      .get("/api/appointments/find/one", { params: { uid, pid } })
      .then((data) => {
        if (data.data.pid) {
          setDate(true);
          setAppo(data.data);
        } else setDate(false);
      })
      .catch((err) => console.log(err));
  }, [user, pid, uid]);

  //sent email
  function sendEmail(date, place) {
    axios
      .post(`/api/users/register/${user.email}`, { date, place })
      .then(() =>
        alerts("Exito!", "Mail de confirmación enviado ✉️", "success")
      )
      .catch(() => alerts("Rayos!", "Mail no puso enviarse ☠️", "warning"));
  }

  //create appointment

  function handleChange() {
    navigate(`/users/${uid}`);
  }

  registerLocale("es", es);
  setDefaultLocale("es");

  const handleDateChange = (date) => {
    date.setMilliseconds(0);
    setStartDate(date);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1" style={{ textTransform: "uppercase" }}>
            REALIZAR CITA EN {property.name}
          </h2>
        </div>

        {date ? (
          <div>
            <div className="appo-card" style={{ width: "470px" }}>
              <div className="home-titulo" style={{ border: "none" }}>
                <h2 className="linea1" style={{ fontSize: "18px" }}>
                  Usted ya tiene cita
                </h2>
              </div>
              <div className="o">
                <AppointmentsCards cita={appo} modFavs={handleChange} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="appo-card">
              <div className="home-titulo" style={{ border: "none" }}>
                <h2
                  className="linea1"
                  style={{ marginRight: "1%", fontSize: "18px" }}
                >
                  Seleccionar Fecha
                </h2>
              </div>
              <div className="o">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeIntervals={60}
                  timeFormat="HH:mm:ss"
                  dateFormat="MMMM d, yyyy h:mm:ss aa"
                  inline
                  timeCaption="Hora"
                  minDate={today}
                  minTime={new Date().setHours(9, 0)}
                  maxTime={new Date().setHours(17, 0)}
                />
              </div>
              <div className="boton-div">
                <button className="boton-fecha" onClick={() => handleClick()}>
                  Confirmar Fecha
                </button>
              </div>
              <UserModals
                isOpen={window}
                onClose={handleClose}
                onConfirm={handleConfirm}
                text={"¿Desea crear esta cita?"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateAppo;
