import { useForm } from "react-hook-form";

import "./Contacto.css";

const Contacto = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const enviar = (data) => {
    console.log(data);
    reset();  // Limpia los campos del formulario después de enviar
  };

  return (
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit(enviar)}>
        <input
          type="text"
          placeholder="Ingresá tu nombre"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && <span>Este campo es obligatorio</span>}

        <input
          type="email"
          placeholder="Ingresá tu email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Este campo es obligatorio</span>}

        <textarea
          className="consulta"
          placeholder="Dejanos tu consulta"
          {...register("consulta", { required: true })}
        ></textarea>
        {errors.consulta && <span>Este campo es obligatorio</span>}

        <select {...register("tema")}>
          <option value="">Selecciona un tema</option>
          <option value="productos">Productos</option>
          <option value="servicio">Servicio al Cliente</option>
          <option value="otro">Otros</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
