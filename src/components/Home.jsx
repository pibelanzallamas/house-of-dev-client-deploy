import Navbar from "../components/Navbar";
import Content from "./Content";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">HOUSE OF DEV INMOBILIARIA</h2>
        </div>
        <div className="home-imagen">
          <img className="imagen-fondo" src="/homeFondo.png" alt="home-fondo" />
        </div>
        <hr />
        <Content />
      </div>
    </div>
  );
}

export default Home;
