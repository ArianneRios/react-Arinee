import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./Contacto.css";

const Contacto = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [enviado, setEnviado] = useState(false);

  // Lógica del Chat Simulado
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hola, soy el Asistente Dulce. Puedo ayudarte con pedidos personalizados, precios, horarios y recomendaciones.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  // Auto-scroll al final del chat cada vez que cambien los mensajes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const enviarFormulario = (data) => {
    console.log("Datos de contacto enviados:", data);
    setEnviado(true);
    reset(); // Limpia los campos del formulario
    setTimeout(() => {
      setEnviado(false);
    }, 5000); // Ocultar mensaje de éxito después de 5 segundos
  };

  const respuestasSimuladas = {
    torta: "Claro. Para una torta personalizada necesitamos saber la fecha, cantidad de personas, sabor preferido y diseño aproximado. Puedes enviarnos esos detalles en el formulario.",
    precios: "Los precios varían según tamaño, sabor y decoración. Puedes revisar el catálogo o escribirnos el producto que te interesa para darte una orientación.",
    horarios: "Atendemos consultas de lunes a sábado. Los pedidos personalizados se recomiendan con al menos 48 horas de anticipación.",
    cumpleanos: "Para cumpleaños te recomendamos tortas decoradas, cheesecake o bandejas de masas dulces. También puedes combinar tortas y pequeñas tentaciones.",
    pedido: "Selecciona tus productos del catálogo, agrégalos al carrito y finaliza la compra. También puedes usar este formulario para pedidos personalizados."
  };

  const handleQuickQuestion = (key, questionText) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Mensaje del usuario
    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: questionText,
      time: timeNow
    };

    // 2. Mensaje de respuesta del asistente
    const assistantMsg = {
      id: messages.length + 2,
      sender: "assistant",
      text: respuestasSimuladas[key],
      time: timeNow
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  return (
    <div className="container contact-page-container">
      <h1 className="main-title">Contacto</h1>

      <div className="contact-grid">
        {/* Columna Izquierda: Formulario e Información de Contacto */}
        <div className="contact-column-left">
          <div className="contact-form-card">
            <h2 className="card-title">Envíanos un Mensaje</h2>
            
            {enviado && (
              <div className="contact-success-banner">
                <p>Gracias por contactarnos. Te responderemos pronto.</p>
              </div>
            )}

            <form className="formulario-contacto" onSubmit={handleSubmit(enviarFormulario)}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  className={errors.nombre ? "input-error" : ""}
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className={errors.email ? "input-error" : ""}
                  {...register("email", { 
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Formato de correo electrónico inválido"
                    }
                  })}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="Número de contacto (opcional)"
                  {...register("telefono")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tema">Tema de Consulta</label>
                <select id="tema" {...register("tema")}>
                  <option value="Pedido personalizado">Pedido personalizado</option>
                  <option value="Consulta de precios">Consulta de precios</option>
                  <option value="Disponibilidad de productos">Disponibilidad de productos</option>
                  <option value="Evento o cumpleaños">Evento o cumpleaños</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  placeholder="Escribe tu consulta aquí..."
                  className={`mensaje-textarea ${errors.mensaje ? "input-error" : ""}`}
                  {...register("mensaje", { required: "El mensaje es obligatorio" })}
                ></textarea>
                {errors.mensaje && <span className="error-message">{errors.mensaje.message}</span>}
              </div>

              <button type="submit" className="btn-contacto-enviar">Enviar Mensaje</button>
            </form>
          </div>

          {/* Información de Contacto Adicional */}
          <div className="contact-info-card">
            <h3 className="info-card-title">Otros Medios de Contacto</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">💬</span>
                <div>
                  <p className="info-label">WhatsApp</p>
                  <p className="info-value">+591 70000000</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <p className="info-label">Correo Electrónico</p>
                  <p className="info-value">contacto@luciapasteleria.com</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <p className="info-label">Ubicación</p>
                  <p className="info-value">La Paz, Bolivia</p>
                </div>
              </div>
            </div>
            <p className="info-footer">📅 Pedidos personalizados con anticipación mínima de 48 horas.</p>
          </div>
        </div>

        {/* Columna Derecha: Asistente Virtual Simulado */}
        <div className="contact-column-right">
          <div className="assistant-chat-card">
            {/* Header del Asistente */}
            <div className="chat-header">
              <div className="avatar">AD</div>
              <div className="chat-header-info">
                <h3 className="assistant-name">Asistente Dulce</h3>
                <span className="assistant-status"><span className="status-dot"></span>En línea</span>
              </div>
            </div>

            {/* Ventana de Mensajes */}
            <div className="chat-messages-window">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message-bubble ${msg.sender}-bubble`}>
                  <p className="bubble-text">{msg.text}</p>
                  <span className="bubble-time">{msg.time}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Botones rápidos */}
            <div className="chat-quick-actions">
              <p className="quick-actions-title">Preguntas Frecuentes:</p>
              <div className="quick-buttons">
                <button onClick={() => handleQuickQuestion("torta", "Quiero una torta personalizada")}>
                  🎂 Quiero una torta personalizada
                </button>
                <button onClick={() => handleQuickQuestion("precios", "Consultar precios")}>
                  💰 Consultar precios
                </button>
                <button onClick={() => handleQuickQuestion("horarios", "Ver horarios de atención")}>
                  🕒 Ver horarios de atención
                </button>
                <button onClick={() => handleQuickQuestion("cumpleanos", "Recomendaciones para cumpleaños")}>
                  🎉 Recomendaciones para cumpleaños
                </button>
                <button onClick={() => handleQuickQuestion("pedido", "Cómo hacer un pedido")}>
                  🛒 Cómo hacer un pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
