import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CrearEncuesta = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    numOpciones: 0,
    pregunta: '',
    descripcion: '',
    titulo: '',
    opciones: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNumOpcionesChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setFormValues({ ...formValues, numOpciones: isNaN(newValue) ? 0 : newValue, opciones: [] });
  };

  const handleOpcionesChange = (e, i) => {
    const newOpciones = [...formValues.opciones];
    newOpciones[i] = e.target.value;
    setFormValues({ ...formValues, opciones: newOpciones });
  };

  const renderOpcionesCampos = () => {
    const { numOpciones, opciones } = formValues;
    const opcionesCampos = [];
    for (let i = 0; i < numOpciones; i++) {
      opcionesCampos.push(
        <div key={i}>
          <label>{`Opción ${i + 1}:`}</label>
          <input
            type="text"
            id={`opciones[${i}]`}
            name={`opciones[${i}]`}
            onChange={(e) => handleOpcionesChange(e, i)}
          />
        </div>
      );
    }
    return opcionesCampos;
  };

  const onSubmit = (data) => {
    // Lógica para guardar la encuesta (simulado)
    console.log('Encuesta guardada:', data);
    navigate('/');
  };

  return (
    <div>
      <h1>Crear Nueva Encuesta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          {...register("titulo", {
            required: 'El título es obligatorio',
            maxLength: { value: 50, message: 'El título debe tener menos de 50 caracteres' }
          })}
          onChange={handleInputChange}
        />
        {errors.titulo && <p>{errors.titulo.message}</p>}

        <label>Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          onChange={handleInputChange}
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}

        <label>Pregunta:</label>
        <input
          type="text"
          id="pregunta"
          name="pregunta"
          onChange={handleInputChange}
        />
        
        <label>Cantidad de opciones que tendrá la pregunta:</label>
        <input
          type="number"
          id="numOpciones"
          name="numOpciones"
          value={formValues.numOpciones}
          onChange={handleNumOpcionesChange}
        />

        {renderOpcionesCampos()}

        <button type="submit">Guardar Encuesta</button>
      </form>
    </div>
  );
};

export default CrearEncuesta;
