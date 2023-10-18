import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import { alerts } from "../utils/alerts";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const condicion = {
    backgroundColor: user.admin ? "#123AC8" : "red",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
  };

  useEffect(() => {
    axios
      .post("https://house-of-dev-server.onrender.com/api/users/me", {
        withCredentials: true,
        credentials: "include",
      })
      .then((cok) => dispatch(setUser(cok.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  function handleLogout(e) {
    e.preventDefault();

    const initialState = {
      id: null,
      email: null,
      telephone: null,
      name: null,
      admin: null,
    };
    axios
      .post("https://house-of-dev-server.onrender.com/api/users/logout", {
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        dispatch(setUser(initialState));
        alerts("See ya!", `Goodbye ${user.name} 🚀`, "success");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <nav style={condicion}>
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/home">
            <img
              src="https://imagizer.imageshack.com/img922/6165/gwEBmS.png"
              alt="logo"
            ></img>
          </Link>
        </div>
        <div className="navbar-links">
          {user.id ? (
            <>
              {user.admin ? (
                <>
                  <Link to={"/users"}> Ver Usuarios</Link>
                  <Link to={"/properties"}> Ver Propiedades</Link>
                  <Link to={"/appointments"}> Ver Citas </Link>
                  <Link to={"/properties/register"}>Agregar propiedades</Link>
                  <Link to={`/users/${user.id}`}> Mi perfil</Link>
                  <Link onClick={handleLogout}> Salir</Link>
                </>
              ) : (
                <>
                  <Link to={`/users/${user.id}`}> Mi perfil </Link>
                  <Link onClick={handleLogout}> Salir </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to={"/"}> Iniciar Sesión </Link>
              <Link to={"/register"}> Registrarse </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
