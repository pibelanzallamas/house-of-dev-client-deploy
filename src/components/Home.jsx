import Navbar from "../components/Navbar";
import Content from "./Content";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">HOUSE OF DEV INMOBILIARIA</h2>
          <div className="linea2"></div>
        </div>
        <div className="home-imagen">
          <div className="portada-a">
            <p>
              Encuentra tu hogar ideal con nosotros. Expertos en bienes raíces.
            </p>
          </div>
        </div>
        <hr />
        <Content />
      </div>
    </div>
  );
}

export default Home;
