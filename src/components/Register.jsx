import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate, Link } from "react-router-dom";
import { alerts } from "../utils/alerts";

function Register() {
  const email = useInput("");
  const name = useInput("");
  const telephone = useInput("");
  const password = useInput("");
  const navigate = useNavigate();

  //create user
  function handleRegister(e) {
    e.preventDefault();

    axios
      .post(`https://house-of-dev-server.onrender.com/api/users/register`, {
        email: email.value,
        password: password.value,
        name: name.value,
        telephone: telephone.value,
        withCredentials: true,
        credentials: "include",
      })
      .then((user) => {
        if (user.data[1]) {
          alerts("Exito!", `Usuario creado 🤠`, "success");
          navigate("/");
        } else if (!user.data[1]) {
          alerts("Jum!", `Usuario ya existente 😤`, "warning");
        } else {
          alerts("Jum!", `Ingrese un email valido! 💌`, "warning");
        }
      })
      .catch((err) => {
        console.log(err);
        alerts("Jum!", `Ingrese un datos validos! 😡`, "warning");
      });
  }

  return (
    <div className="container">
      <div className="sideA">
        <div className="colitaR"></div>
      </div>

      <div className="sideB">
        <div className="blueEffect"></div>
      </div>

      <div className="headerBox">
        <div className="textLogo"></div>
        <div className="vector"></div>
      </div>

      <div className="bodyBox">
        <form onSubmit={handleRegister}>
          <div className="inputs A">
            <div className="button name"></div>
            <input
              className="textInput"
              type="text"
              placeholder="NOMBRE"
              required
              {...name}
              maxLength={30}
            ></input>
          </div>

          <div className="inputs B">
            <div className="button telephone"></div>
            <input
              className="textInput"
              placeholder="TELEPHONE"
              type="number"
              required
              min={10000}
              max={9999999999}
              {...telephone}
              style={{ top: "29%" }}
            ></input>
          </div>

          <div className="inputs C">
            <div className="button mail"></div>
            <input
              placeholder="EMAIL"
              className="textInput"
              type="email"
              required
              maxLength={45}
              {...email}
            ></input>
          </div>

          <div className="inputs D">
            <div className="button password"></div>
            <input
              className="textInput"
              type="password"
              placeholder="PASSWORD"
              required
              {...password}
              maxLength={45}
            ></input>
          </div>

          <Link to={"/"}>
            <p className="forgetPassword">¿Ya tiene usuario?</p>
          </Link>

          <button className="buttonRegister"> Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
