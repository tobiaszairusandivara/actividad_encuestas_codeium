import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import encuestas from '../data/encuestas.json';

const Encuesta = ({ responderEncuesta }) => {
  const { id } = useParams();
  const [encuesta, setEncuesta] = useState(null);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const selectedEncuesta = encuestas.find((enc) => enc.id === parseInt(id));
    setEncuesta(selectedEncuesta);
  }, [id]);

  const handleRespuestaChange = (preguntaId, respuesta) => {
    setRespuestas({ ...respuestas, [preguntaId]: respuesta });
  };

  const handleSubmitRespuestas = (e) => {
    e.preventDefault();
    responderEncuesta(id, respuestas);
  };

  return (
    <div>
      {encuesta && (
        <>
          <div className="encuesta-header">
            <h2>{encuesta.titulo}</h2>
            <p>{encuesta.descripcion}</p>
          </div>
          <div className="encuesta-questions">
            <h2>Preguntas</h2>
            <form onSubmit={handleSubmitRespuestas}>
              {encuesta.preguntas.map((pregunta) => (
                <div key={pregunta.id}>
                  <p>{pregunta.pregunta}</p>
                  <ul>
                    {pregunta.opciones.map((opcion) => (
                      <li key={opcion.id}>
                        <label>
                          <input
                            type="radio"
                            name={pregunta.id}
                            value={opcion.texto}
                            onChange={(e) =>
                              handleRespuestaChange(pregunta.id, e.target.value)
                            }
                          />
                          {opcion.texto}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button type="submit">Enviar Respuestas</button>
            </form>
          </div>
          <Link to="/">Volver</Link>
        </>
      )}
      {!encuesta && <p>Cargando encuesta...</p>}
    </div>
  );
};

export default Encuesta;
