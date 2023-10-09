import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Properties() {
  const [properties, setProperies] = useState([]);

  //get properties
  useEffect(() => {
    axios
      .get("https://house-of-dev.onrender.com/api/properties/all", {
        withCredentials: true,
        credentials: "include",
      })
      .then((all) => setProperies(all.data))
      .catch((err) => console.log(err));
  }, []);

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
          <h2 className="linea1">PROPIEDADES</h2>
        </div>
        {properties.map((elemento) => (
          <div className="property-card" style={{ "margin-bottom": "3%" }}>
            <div className="user-datos" style={{ height: "880px" }}>
              <form>
                <img
                  src={elemento.images}
                  alt={elemento.name}
                  style={{
                    objectFit: "cover",
                    width: "140px",
                    height: "140px",
                    border: "solid blue 1px",
                    padding: "3px",
                    "margin-left": "81%",
                    "border-radius": "0%",
                    "margin-bottom": "-15px",
                  }}
                />
                <div className="inputName">
                  <label htmlFor="name"> Nombre </label>
                  <br></br>
                  <input
                    id="name"
                    type="text"
                    value={elemento.name}
                    minLength={3}
                    maxLength={25}
                    required
                  ></input>
                </div>
                <div className="inputEmail">
                  <label htmlFor="address"> Dirección </label>
                  <br></br>
                  <input
                    id="address"
                    type="text"
                    value={elemento.address}
                    minLength={3}
                    maxLength={25}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="neighborhood"> Barrio </label>
                  <br></br>
                  <input
                    id="neighborhood"
                    type="text"
                    value={elemento.neighborhood}
                    minLength={3}
                    maxLength={25}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="city"> Ciudad </label>
                  <br></br>
                  <input
                    id="city"
                    type="text"
                    value={elemento.city}
                    minLength={3}
                    maxLength={10}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="country"> País </label>
                  <br></br>
                  <input
                    id="country"
                    type="text"
                    value={elemento.country}
                    minLength={3}
                    maxLength={25}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="bathrooms"> Baños </label>
                  <br></br>
                  <input
                    id="bathrooms"
                    type="number"
                    value={elemento.bathrooms}
                    min={1}
                    max={15}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="rooms"> Habitaciones </label>
                  <br></br>
                  <input
                    id="rooms"
                    type="number"
                    value={elemento.rooms}
                    min={1}
                    max={20}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="description"> Description </label>
                  <br></br>
                  <input
                    id="description"
                    type="text"
                    value={elemento.description}
                    minLength={3}
                    maxLength={70}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="disponibility"> Disponibilidad </label>
                  <br></br>
                  <input
                    id="disponibility"
                    type="text"
                    value={elemento.disponibility}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="categories"> Categoría </label>
                  <br></br>
                  <input
                    id="categories"
                    type="text"
                    value={elemento.categories}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="price"> Precio </label>
                  <br></br>
                  <strong
                    style={{ fontSize: "20px", borderBottom: "solid 1px" }}
                  >
                    $
                  </strong>
                  <input
                    id="price"
                    type="number"
                    value={elemento.price}
                    style={{ width: "94.7%" }}
                    required
                  ></input>
                </div>
                <div className="inputTel">
                  <label htmlFor="images"> Imagen </label>
                  <br></br>
                  <input
                    id="images"
                    type="url"
                    value={elemento.images}
                    required
                  ></input>
                </div>
                <Link
                  onClick={handleScroll}
                  className="boton-mas"
                  to={`/properties/${elemento.id}`}
                  style={{ top: "93%", fontSize: "13px", left: "88%" }}
                >
                  VER MÁS
                </Link>
              </form>
            </div>
          </div>
        ))}
        <div style={{ position: "relative", "margin-bottom": "10%" }}>
          <button className="onTop" onClick={handleScroll}>
            IR A INICIO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Properties;
