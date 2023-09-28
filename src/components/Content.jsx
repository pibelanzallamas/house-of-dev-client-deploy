import axios from "axios";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import Cards from "../commons/Cards";

function Content() {
  const [properties, setProperties] = useState([]);
  const [estado, setEstado] = useState(false);
  const [prop2, setProp2] = useState([]);
  const [prop3, setProp3] = useState([]);
  const filtroD = useInput("");
  const filtroC = useInput("");
  const filtroR = useInput("");
  const orden = useInput("");
  const search = useInput("");

  //escucha los cambios del user en Card
  function modFavs() {
    setEstado(!estado);
  }

  //get all properties ordenadas
  useEffect(() => {
    axios
      .get(`/api/properties/all/${orden.value}`)
      .then((all) => setProperties(all.data))
      .catch((err) => console.log(err));
  }, [orden.value]);

  //filtro dispo, cate, rooms
  useEffect(() => {
    const filters = {
      disponibility: filtroD.value,
      categories: filtroC.value,
      rooms: Number(filtroR.value),
    };

    const prop2 = properties.filter((property) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return property[key] === filters[key];
      });
    });

    setProp2(prop2);
  }, [filtroD.value, filtroC.value, filtroR.value, properties]);

  //filtro x input
  useEffect(() => {
    setProp3(
      prop2.filter(
        (e) =>
          e.neighborhood.toLowerCase().includes(search.value.toLowerCase()) ||
          e.name.toLowerCase().includes(search.value.toLowerCase()) ||
          e.city.toLowerCase().includes(search.value.toLowerCase()) ||
          e.description.toLowerCase().includes(search.value.toLowerCase())
      )
    );
  }, [prop2, search.value]);

  //scroll
  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="search-div">
        <select className="select a" {...filtroD}>
          <option value="" selected>
            Disponibilidad
          </option>
          <option value="Alquiler"> Alquiler</option>
          <option value="Venta"> Venta</option>
        </select>
        <select className="select b" {...filtroC}>
          <option value="" selected>
            Categoría
          </option>
          <option value="Casa"> Casa</option>
          <option value="Departamento"> Dpto.</option>
          <option value="PH"> PH</option>
          <option value="Local"> Local</option>
          <option value="Terreno"> Terreno</option>
        </select>
        <select className="select c" {...filtroR}>
          <option value="" selected>
            Habítaciones
          </option>
          <option value="1"> 1</option>
          <option value="2"> 2</option>
          <option value="3"> 3</option>
          <option value="4"> 4</option>
          <option value="5"> 5</option>
        </select>
        <input
          className="inputSearch"
          placeholder="Ingrese Ubicación"
          {...search}
        ></input>
        <select className="select d" {...orden}>
          <option value="" selected>
            Ordenar
          </option>
          <option value="menor"> Menor precio</option>
          <option value="mayor"> Mayor precio</option>
          <option value="recientes"> Recientes </option>
        </select>
        <search />
      </div>

      {prop3.length > 0 ? (
        <>
          <div className="todo-tarjetas-prop">
            {prop3.map((property) => (
              <Cards property={property} modFavs={modFavs} />
            ))}
          </div>
          <div
            style={{
              position: "relative",
              "margin-bottom": "7%",
              "margin-top": "2%",
            }}
          >
            <button className="onTop" onClick={handleScroll}>
              IR A INICIO
            </button>
          </div>
        </>
      ) : (
        <div className="home-titulo" style={{ border: "none" }}>
          <h2
            className="linea1"
            style={{ fontSize: "18px", border: "none", textAlign: "center" }}
          >
            No se econtraron propiedades
          </h2>
        </div>
      )}
    </div>
  );
}
export default Content;
