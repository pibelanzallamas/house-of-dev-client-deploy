import axios from "axios";
import { useState } from "react";
import useInput from "../hooks/useInput";
import "animate.css/animate.min.css";
import { alerts } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import UserModals from "../modals/UserModals";

function Properties() {
  const name = useInput("");
  const address = useInput("");
  const country = useInput("");
  const city = useInput("");
  const neighborhood = useInput("");
  const description = useInput("");
  const categories = useInput("");
  const bathrooms = useInput("");
  const rooms = useInput("");
  const disponibility = useInput("");
  const images = useInput("");
  const price = useInput("");
  const navigate = useNavigate();
  const dispo = ["Alquiler", "Venta"];
  const cate = ["Ph", "Local", "Terreno", "Casa", "Departamento"];

  const [window, setWindow] = useState(false);

  const handleOpen = () => setWindow(true);
  const handleClose = () => setWindow(false);

  function handleRegister(e) {
    e.preventDefault();
    handleOpen();
  }

  const handleConfirm = () => {
    axios
      .post("https://house-of-dev.onrender.com/api/properties/register", {
        name: name.value,
        address: address.value,
        country: country.value,
        city: city.value,
        neighborhood: neighborhood.value,
        description: description.value,
        categories: categories.value,
        bathrooms: bathrooms.value,
        rooms: rooms.value,
        disponibility: disponibility.value,
        images: images.value,
        price: price.value,
        withCredentials: true,
        credentials: "include",
      })
      .then((prop) => {
        if (prop.data[1]) {
          alerts("Vamos!", "La propiedad se creó con exito 🏠", "success");
          navigate("/home");
        } else if (!prop.data[1]) {
          alerts("Pará!", "La propiedad ya existe 🤠", "warning");
        } else {
          alerts("Ey!", "Ingrese datos validos 😡", "warning");
        }
      })
      .catch((err) => console.log(err));
    handleClose();
  };

  function handleDispo() {
    if (!dispo.includes(disponibility.value)) {
      alerts(
        "Ohno!",
        `Ingrese "Alquiler" o "Venta" en Disponibilidad 🤓`,
        "warning"
      );
    }
  }

  function handleCate() {
    if (!cate.includes(categories.value)) {
      alerts(
        "Ohno!",
        `Ingrese "Casa", "Departamento", "Local", "Ph", "Terreno" en Categoría 🤓`,
        "warning"
      );
    }
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">AGREGAR PROPIEDAD</h2>
        </div>

        <div className="property-card">
          <div className="user-datos" style={{ height: "742px" }}>
            <form onSubmit={handleRegister} style={{ "margin-top": "20px" }}>
              <div className="inputName">
                <label> Nombre </label>
                <br></br>
                <input
                  id="name"
                  type="text"
                  {...name}
                  minLength={3}
                  maxLength={25}
                  required
                ></input>
              </div>

              <div className="inputEmail">
                <label> Dirección </label>
                <br></br>
                <input
                  id="address"
                  {...address}
                  type="text"
                  required
                  minLength={3}
                  maxLength={20}
                ></input>
              </div>

              <div className="inputTel">
                <label> Barrio </label>
                <br></br>
                <input
                  id="neighborhood"
                  type="text"
                  {...neighborhood}
                  minLength={3}
                  maxLength={20}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Ciudad </label>
                <br></br>
                <input
                  id="city"
                  type="text"
                  {...city}
                  minLength={3}
                  maxLength={20}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> País </label>
                <br></br>
                <input
                  id="country"
                  type="text"
                  {...country}
                  minLength={3}
                  maxLength={20}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Baños </label>
                <br></br>
                <input
                  id="number"
                  type="number"
                  {...bathrooms}
                  min={1}
                  max={15}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Habitaciones </label>
                <br></br>
                <input
                  id="rooms"
                  type="number"
                  {...rooms}
                  min={1}
                  max={20}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Description </label>
                <br></br>
                <input
                  id="description"
                  type="text"
                  {...description}
                  minLength={3}
                  maxLength={70}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Disponibilidad </label>
                <br></br>
                <input
                  id="disponibility"
                  type="text"
                  {...disponibility}
                  onBlur={handleDispo}
                  required
                ></input>
              </div>

              <div>
                <label> Categoría </label>
                <br></br>
                <input
                  id="categories"
                  type="text"
                  {...categories}
                  onBlur={handleCate}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Precio </label>
                <br></br>
                <input
                  id="price"
                  type="number"
                  {...price}
                  min={10000}
                  max={1000000}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Imagen </label>
                <br></br>
                <input id="images" type="url" {...images} required></input>
              </div>

              <button
                className="boton-editar"
                style={{ left: "86.5%", top: "94%" }}
              >
                GUARDAR
              </button>
            </form>
          </div>
          <hr></hr>
          <UserModals
            isOpen={window}
            onClose={handleClose}
            onConfirm={handleConfirm}
            text={"¿Desea crear esta propiedad?"}
          />
        </div>
      </div>
    </>
  );
}

export default Properties;
