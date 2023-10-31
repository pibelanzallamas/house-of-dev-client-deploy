import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import useInput from "../hooks/useInput";
import Navbar from "./Navbar";
import UserModals from "../modals/UserModals";

function Property() {
  const user = useSelector((state) => state.user);
  const uid = user.id;
  const pid = Number(useParams().id);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [description, setDescription] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const [estado, setEstado] = useState(false);
  const [like, setLike] = useState(false);
  const [date, setDate] = useState(false);
  const [reviews, setReviews] = useState([]);
  const comentario = useInput("");
  const valoracion = useInput(1);
  const navigate = useNavigate();
  const dispo = ["Alquiler", "Venta"];
  const cate = ["Ph", "Local", "Terreno", "Casa", "Departamento"];
  const [window, setWindow] = useState(false);
  const [window2, setWindow2] = useState(false);
  const [window3, setWindow3] = useState(false);
  const [rId, setRID] = useState("");

  function openModal() {
    setWindow(true);
  }

  function closeModal() {
    setWindow(false);
  }

  function openModal2() {
    setWindow2(true);
  }

  function closeModal2() {
    setWindow2(false);
  }

  function openModal3() {
    setWindow3(true);
  }

  function closeModal3() {
    setWindow3(false);
  }

  //modifica la propiedad
  function handleMod(e) {
    e.preventDefault();
    openModal();
  }

  function handleDel(e) {
    e.preventDefault();
    openModal2();
  }

  function handleDrop(e) {
    openModal3();
    setRID(e);
  }

  function handleConfirm() {
    axios
      .put(
        `https://house-of-dev-server.onrender.com/api/properties/mod/${pid}`,
        {
          name,
          address,
          country,
          city,
          neighborhood,
          description,
          bathrooms,
          rooms,
          images,
          price,
          categories,
          disponibility,
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((mod) => {
        if (mod.data[0] === 1) {
          setEstado(!estado);
          alerts("Ok!", "La propiedad se modificó 👍", "success");
        } else {
          alerts("Ohoh!", "Ingrese datos validos 😵", "warning");
        }
        closeModal();
      })
      .catch(() => {
        alerts("Auch!", "Ocurrio un error 🤧", "danger");
      });
  }

  function handleConfirm2() {
    axios
      .delete(
        `https://house-of-dev-server.onrender.com/api/properties/${pid}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(() => {
        alerts("Ok!", "Propiedad eliminada 👍", "success");
        navigate("/home");
      })
      .catch(() => {
        alerts("Ohno!", "La Propiedad no pudo eliminarse 🤨", "danger");
      });
    closeModal2();
  }

  function handleConfirm3() {
    axios
      .delete(`https://house-of-dev-server.onrender.com/api/reviews/${rId}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        alerts("Ok!", "La review se eliminó 👍", "success");
        setEstado(!estado);
      })
      .catch(() => {
        alerts("Nope!", "La review no pudo eliminarse 🤏", "warning");
      });
    closeModal3();
  }

  //get propiedad
  useEffect(() => {
    axios
      .get(`https://house-of-dev-server.onrender.com/api/properties/${pid}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((prop) => {
        setName(prop.data.name);
        setAddress(prop.data.address);
        setCountry(prop.data.country);
        setCity(prop.data.city);
        setNeighborhood(prop.data.neighborhood);
        setDescription(prop.data.description);
        setBathrooms(prop.data.bathrooms);
        setRooms(prop.data.rooms);
        setImages(prop.data.images);
        setPrice(prop.data.price);
        setCategories(prop.data.categories);
        setDisponibility(prop.data.disponibility);
      })
      .catch((err) => console.log(err));
  }, [estado, pid]);

  //find fav
  useEffect(() => {
    axios
      .get("https://house-of-dev-server.onrender.com/api/favorites/find", {
        params: { uid, pid },
        withCredentials: true,
        credentials: "include",
      })
      .then((fav) => {
        if (fav.data.pid) setLike(true);
        else setLike(false);
      });
  }, [estado, user, uid, pid]);

  //find appo
  useEffect(() => {
    axios
      .get(
        "https://house-of-dev-server.onrender.com/api/appointments/find/one",
        {
          params: { uid, pid },
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((data) => {
        if (data.data.pid) setDate(true);
        else setDate(false);
      })
      .catch((err) => console.log(err));
  }, [estado, user, uid, pid]);

  //verfican los datos
  function handleDispo() {
    if (!dispo.includes(disponibility)) {
      alerts(
        "Ohno!",
        `Ingrese "Alquiler" o "Venta" en Disponibilidad 🤓`,
        "warning"
      );
      setDisponibility("");
    }
  }

  function handleCate() {
    if (!cate.includes(categories)) {
      alerts(
        "Ohno!",
        `Ingrese "Casa", "Departamento", "Local", "Ph", "Terreno" en Categoría 🤓`,
        "warning"
      );
      setCategories("");
    }
  }

  function handlePrice() {
    if (price > 1000000 || price < 10000) {
      alerts("Ohno!", `Ingrese un precio entre 10000 a 1000000 🤓`, "warning");
      setPrice(10000);
    }
  }

  //likea
  function hanldeLike() {
    axios
      .post("https://house-of-dev-server.onrender.com/api/favorites/register", {
        data: { uid, pid },
        withCredentials: true,
        credentials: "include",
      })
      .then((add) => {
        if (!uid) {
          alerts("Ojo!", "Necesitas estar logueado 💻", "warning");
        } else {
          if (add.data) {
            alerts("Eso!", "La propiedad se agrego a favoritos 💘", "success");
            setLike(true);
          } else {
            alerts(
              "Como te gusta darle al like!",
              "La propiedad ya esta en favoritos. 🤧",
              "warning"
            );
          }
        }
      });
  }

  //dislikea
  function hanldeDislike() {
    axios
      .delete("https://house-of-dev-server.onrender.com/api/favorites/delete", {
        data: { uid, pid },
        withCredentials: true,
        credentials: "include",
      })
      .then((del) => {
        if (del.data === "OK") {
          alerts("Byebye!", "La propiedad se borro de favoritos 😵", "warning");
          setLike(false);
        }
      })
      .catch((del) => {
        if (del.code === "ERR_BAD_REQUEST") {
          return alerts(
            "Guarda campeon!",
            "La propiedad no esta en favoritos. 😡",
            "danger"
          );
        }
      });
  }

  //get reviews
  useEffect(() => {
    axios
      .get(`https://house-of-dev-server.onrender.com/api/reviews/${pid}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((rev) => setReviews(rev.data))
      .catch((err) => console.log(err));
  }, [estado, pid]);

  //agregar review
  function handleReview(e) {
    e.preventDefault();

    axios
      .post("https://house-of-dev-server.onrender.com/api/reviews/register", {
        pid,
        uid,
        rating: valoracion.value,
        review: comentario.value,
        withCredentials: true,
        credentials: "include",
      })
      .then((rev) => {
        if (rev.data[1]) {
          alerts("Vamos!", "La reseña se creó con exito 🏠", "success");
          setEstado(!estado);
          valoracion.clearInput();
          comentario.clearInput();
        } else if (!rev.data[1]) {
          alerts("Pará!", "No puede hacer dos reseñas 🤠", "warning");
          valoracion.clearInput();
          comentario.clearInput();
        } else {
          alerts("Ey!", "Ingrese datos validos 😡", "warning");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo" style={{ "margin-bottom": "1%" }}>
          <h2 className="linea1" style={{ "text-transform": "uppercase" }}>
            {name}
          </h2>
        </div>
        <div className="property-card">
          <div className="user-datos" style={{ height: "890px" }}>
            <form onSubmit={handleMod}>
              <img
                src={images}
                alt={name}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
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
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
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
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={3}
                  maxLength={140}
                  required
                ></input>
              </div>
              <div className="inputTel">
                <label htmlFor="disponibility"> Disponibilidad </label>
                <br></br>
                <input
                  id="disponibility"
                  type="text"
                  value={disponibility}
                  onChange={(e) => setDisponibility(e.target.value)}
                  onBlur={handleDispo}
                  required
                ></input>
              </div>
              <div className="inputTel">
                <label htmlFor="categories"> Categoría </label>
                <br></br>
                <input
                  id="categories"
                  type="text"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  onBlur={handleCate}
                  required
                ></input>
              </div>
              <div className="inputTel">
                <label htmlFor="price"> Precio </label>
                <br></br>
                <strong style={{ fontSize: "20px", borderBottom: "solid 1px" }}>
                  $
                </strong>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: "94.7%" }}
                  onBlur={handlePrice}
                  required
                ></input>
              </div>
              {user.admin ? (
                <>
                  <div className="inputTel">
                    <label htmlFor="images"> Imagen </label>
                    <br></br>
                    <input
                      id="images"
                      type="url"
                      value={images}
                      onChange={(e) => setImages(e.target.value)}
                      required
                    ></input>
                  </div>
                  <button
                    className="boton-editar"
                    style={{ left: "62%", top: "92%" }}
                  >
                    MODIFICAR
                  </button>
                  <button
                    className="boton-editar "
                    onClick={(e) => handleDel(e)}
                    style={{ left: "75%", top: "92%" }}
                  >
                    ELIMINAR
                  </button>
                </>
              ) : (
                <></>
              )}
              {like ? (
                <Link
                  className="boton-like2"
                  style={{ top: "90%" }}
                  onClick={hanldeDislike}
                >
                  <img src="/boton-cora2.png" alt="boton-cora2" />
                </Link>
              ) : (
                <Link
                  className="boton-like2"
                  style={{ top: "90%" }}
                  onClick={hanldeLike}
                >
                  <img src="/boton-cora.png" alt="boton-cora" />
                </Link>
              )}
              {date ? (
                <Link
                  className="boton-like2"
                  style={{ left: "90.5%", top: "90%" }}
                  to={`/appointments/register/${pid}`}
                >
                  <img src="/boton-cita2.png" alt="boton-cita2" />
                </Link>
              ) : (
                <Link
                  className="boton-like2"
                  style={{ left: "90.5%", top: "90%" }}
                  to={`/appointments/register/${pid}`}
                >
                  <img src="/boton-cita.png" alt="boton-cita" />
                </Link>
              )}
            </form>
          </div>
        </div>
        <div className="ver-comments">
          <div
            className="home-titulo"
            style={{ "margin-bottom": "1%", color: "red" }}
          >
            <h2 className="linea1">RESEÑAS</h2>
          </div>
          <div className="property-card">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  className="user-datos"
                  style={{
                    height: "170px",
                    "margin-top": "1%",
                  }}
                >
                  <input
                    value={review.user.name}
                    style={{ border: "none" }}
                  ></input>
                  {user.admin ? (
                    <button
                      className="boton-drop"
                      onClick={() => {
                        handleDrop(review.id);
                      }}
                    >
                      ELIMINAR
                    </button>
                  ) : (
                    <></>
                  )}

                  <br></br>
                  <label> VALORACIÓN </label>
                  <br></br>
                  <input type="number" value={review.rating}></input>
                  <br></br>
                  <label> COMENTARIO </label>
                  <br></br>
                  <input type="text" value={review.review}></input>
                </div>
              ))
            ) : (
              <div className="home-titulo" style={{ border: "none" }}>
                <h2 className="linea1" style={{ "margin-right": "1%" }}>
                  NO HAY RESEÑAS
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="escribir-comments">
          <div
            className="home-titulo"
            style={{ "margin-bottom": "1%", color: "red" }}
          >
            <h2 className="linea1">ESCRIBIR RESEÑA</h2>
          </div>
          <div className="property-card">
            <div
              className="user-datos"
              style={{ height: "170px", position: "relative" }}
            >
              <form onSubmit={handleReview}>
                <div>
                  <label> VALORACIÓN </label>
                  <br></br>
                  <input
                    {...valoracion}
                    type="number"
                    required
                    min={1}
                    max={5}
                  ></input>
                </div>

                <div>
                  <label> COMENTARIO </label>
                  <br></br>
                  <input
                    {...comentario}
                    type="text"
                    minLength={5}
                    maxLength={100}
                    required
                  ></input>
                </div>

                <button
                  className="boton-editar"
                  style={{ left: "87%", top: "78%" }}
                >
                  GUARDAR
                </button>
              </form>
            </div>
          </div>
        </div>
        <UserModals
          isOpen={window}
          onClose={closeModal}
          onConfirm={handleConfirm}
          text={"¿Desea modificar propiedad?"}
        />
        <UserModals
          isOpen={window2}
          onClose={closeModal2}
          onConfirm={handleConfirm2}
          text={"¿Desea eliminar propiedad?"}
        />
        <UserModals
          isOpen={window3}
          onClose={closeModal3}
          onConfirm={handleConfirm3}
          text={"¿Desea eliminar comentario?"}
        />
      </div>
    </div>
  );
}

export default Property;
