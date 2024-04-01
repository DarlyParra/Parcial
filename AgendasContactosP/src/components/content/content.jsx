import { useEffect, useState } from "react";
import axios from "axios";
import "./content.css";

export const Content = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setOptionSelect] = useState("");
  const [selectCh, setSelectCh] = useState(null);
  const [searchTerm, setBuscarT] = useState("");
  const [searchError, setSearchError] = useState("");
  const [showContaAdd, setShowContaAdd] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactImage, setNewContactImage] = useState("");

  const handleGetData = () => {
    axios
      .get("https://kpw1ch0aa1.execute-api.us-east-2.amazonaws.com/dev/project")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const selecChange = (event) => {
    const selectedId = event.target.value;
    setOptionSelect(selectedId);
    const character = data.find(
      (char) => char.identify === parseInt(selectedId)
    );
    setSelectCh(character);
  };

  const buscarC = (event) => {
    setBuscarT(event.target.value);
    setOptionSelect("");
  };

  const serchByName = () => {
    const character = data.find((char) => {
      const firstName = char.names.split(" ")[0]; // Obtiene el primer nombre
      return firstName.toLowerCase() === searchTerm.toLowerCase();
    });
    if (character) {
      setSelectCh(character);
      setSearchError("");
    } else {
      setSelectCh(null);
      setSearchError("El contacto no existe");
    }
  };

  const handleAddContactClick = () => {
    setShowContaAdd(true);
  };

  const handleAddContactSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://kpw1ch0aa1.execute-api.us-east-2.amazonaws.com/dev/project",
        {
          names: newContactName,
          telephone: newContactPhone,
          image: newContactImage,
        }
      );
      console.log("Nuevo contacto agregado:", response.data);
      handleGetData(); 
      setShowContaAdd(false); 
      setNewContactName(""); 
      setNewContactPhone(""); 
      setNewContactImage(""); 
    } catch (error) {
      console.error("Error al agregar nuevo contacto:", error);
    }
  };

  const filteredData = data.filter((character) =>
    character.names.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchError(""); 
    setSelectCh(null); 
  }, [searchTerm]);

  return (
    <div className="content-container">
      <div className="agenda-content">
        <h1 className="agenda">Agenda</h1>
      </div>
      <div className="container-b">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={buscarC}
          required
          className="buscar"
        />
        <button onClick={serchByName}>Buscar</button>
        {searchError && <p className="error-message">{searchError}</p>}
      </div>
      <div className="select-container">
        <select value={selectedOption} onChange={selecChange}>
          <option value="">Selecciona un contacto</option>
          {filteredData.map((obj) => (
            <option key={obj.identify} value={obj.identify}>
              {obj.names}
            </option>
          ))}
        </select>
      </div>
      {(selectCh || searchTerm || filteredData.length > 0) && (
        <div className="selected-character-container">
          {selectCh && (
            <>
              <h2>{selectCh.names}</h2>
              <img
                src={selectCh.image}
                alt={selectCh.names}
              />
              <h5>Telefono: {selectCh.telephone}</h5>
            </>
          )}
        </div>
      )}{" "}
      <div className="boton2">
        <button className="btn2" onClick={handleAddContactClick}>
          Añadir nuevo contacto
        </button>
      </div>
      {showContaAdd && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowContaAdd(false)}
            >
              &times;
            </span>
            <div className="modal-text">
            <h2>Agregar nuevo contacto</h2>
            </div>
            
            <form onSubmit={handleAddContactSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  required
                  className="text-form"
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  required
                  className="text-form"
                />
              </label>
              <label>
                URL de la imagen:
                <input
                  type="text"
                  value={newContactImage}
                  onChange={(e) => setNewContactImage(e.target.value)}
                  required
                  className="text-form"
                />
              </label>
              <button type="submit">Agregar contacto</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
