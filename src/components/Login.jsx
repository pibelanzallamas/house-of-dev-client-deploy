import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import { useNavigate, Link } from "react-router-dom";
import { alerts } from "../utils/alerts";

function Login() {
  const email = useInput("");
  const password = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post(
        "https://house-of-dev-server.onrender.com/api/users/login",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((payload) => {
        alerts("Aloha!", `Welcome ${payload.data.name} 🏝`, "success");
        dispatch(setUser(payload.data));
        navigate("/home");
      })
      .catch(() => {
        alerts("Nope!", "Email o password incorrectos ☠️", "danger");
      });
  }

  return (
    <div className="containerLogin">
      <div className="sideALogin">
        <div className="colitaR"></div>
      </div>

      <div className="sideBLogin">
        <div className="blueEffectLogin"></div>
      </div>

      <div className="loginConteiner">
        <Link to={"/home"}>
          <div className="logoLogin"></div>
        </Link>
        <form onSubmit={handleLogin}>
          <div className="inputALogin">
            <div className="buttonMailLog"></div>
            <input
              {...email}
              className="textInputALog"
              type="email"
              placeholder="EMAIL"
              required
            ></input>
          </div>

          <div className="inputBLogin">
            <div className="buttonLockLog"></div>
            <input
              {...password}
              className="textInputBLog"
              type="password"
              placeholder="CONTRASEÑA"
              required
            ></input>
          </div>

          <Link className="registrarse" to="/register">
            <p>¿Registrarse?</p>
          </Link>

          <button className="buttonLogin">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
