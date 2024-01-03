import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate, Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import houseLogo from "../assets/House.svg";
import ofDevLogo from "../assets/ofDev.svg";
import emailLogo from "../assets/emailLogo.svg";

function ForgottenPass() {
  const email = useInput("");
  return (
    <div>
      <div className="red">
        <div className="house-logo">
          <img src={houseLogo}></img>
        </div>
        <div className="ofDev-logo">
          <img src={ofDevLogo}></img>
        </div>
      </div>
      <div className="white">
        <form>
          <div className="inputBox">
            <div className="logoInput">
              <img src={emailLogo} alt="emailLogo"></img>
            </div>
            <input
              {...email}
              className="loginInput"
              type="email"
              placeholder="INGRESE SU EMAIL"
              required
            ></input>
          </div>
          <p className="olvidaste">¿Ya tiene cuenta?</p>
          <div className="boton-container">
            <button className="loginBottom">ENVIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgottenPass;
