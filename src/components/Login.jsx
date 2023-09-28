import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import { alerts } from "../utils/alerts";

function Login() {
  const email = useInput("");
  const password = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("/api/users/login", {
        email: email.value,
        password: password.value,
      })
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
        <div className="colitaLogin"></div>
      </div>

      <div className="sideBLogin">
        <div className="blueEffectLogin"></div>
      </div>

      <div className="loginConteiner">
        <div className="logoLogin"></div>

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
              placeholder="PASSWORD"
              required
            ></input>
          </div>
          <Link className="registrarse" to="/register">
            <p>¿Registrarse?</p>
          </Link>
          <button className="buttonLogin">Log In</button>
        </form>
      </div>
      <div style={{ left: "82%", position: "absolute" }}>
        {/* <GoogleOAuthProvider clientId="413054924757-e1sknitkpf313733h32aq5mfhse3f1j8.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decode = jwt_decode(credentialResponse.credential);
              console.log(decode);
              const payload = {
                id: decode.exp,
                email: decode.email,
                name: decode.name,
                telephone: decode.exp,
                admin: false,
              };
              alerts("Aloha!", `Welcome ${decode.name} 🏝`, "success");
              dispatch(setUser(payload));
              navigate("/home");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider> */}
      </div>
    </div>
  );
}

export default Login;
