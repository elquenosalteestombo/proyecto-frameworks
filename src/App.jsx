import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");

  useEffect(() => {
    console.log("Aplicación cargada");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.date) newErrors.date = "La fecha es obligatoria.";
    if (!formData.time) newErrors.time = "La hora es obligatoria.";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "El número de teléfono debe tener 10 dígitos.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const now = new Date();
    const appointmentTime = new Date(`${formData.date}T${formData.time}`);

    if (appointmentTime < now) {
      alert("Selecciona una hora válida.");
      return;
    }

    const isTimeTaken = appointments.some(
      (appointment) =>
        appointment.date === formData.date && appointment.time === formData.time
    );

    if (isTimeTaken) {
      alert("Esta hora ya está reservada. Por favor, elige otra hora.");
      return;
    }

    setAppointments([...appointments, formData]);
    setFormData({ name: "", date: "", time: "", phone: "" });
    setNotification("Cita reservada con éxito.");
    setTimeout(() => setNotification(""), 3000);
  };

  const scheduleReminder = (appointment) => {
    alert(
      `Recordatorio: Tienes una cita programada para ${appointment.name} el ${appointment.date} a las ${appointment.time}.`
    );
  };

  const deleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    setNotification("Cita eliminada con éxito.");
    setTimeout(() => setNotification(""), 3000);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reserva de Citas Médicas</h1>
        <nav>
          <button onClick={() => scrollToSection("online-booking")}>
            Reserva de citas en línea
          </button>
          <button onClick={() => scrollToSection("agenda-management")}>
             Agenda disponible
          </button>
        </nav>
      </header>
      <main>
        {notification && <div className="notification">{notification}</div>}
        <section id="welcome">
          <h2>Bienvenido</h2>
          <p>
            Administra tus citas médicas de manera eficiente. Reserva, organiza
            y recibe recordatorios automáticos.
          </p>
        </section>
        <section id="online-booking">
          <h2>Reserva de citas en línea</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="name">Nombre del paciente:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="time">Hora:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
              {errors.time && <p className="error">{errors.time}</p>}
            </div>
            <div>
              <label htmlFor="phone">Número de teléfono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <button type="submit">Reservar cita</button>
          </form>
        </section>
        <section id="agenda-management">
          <h2>Gestión de agenda</h2>
          <ul>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <li key={index} className="card">
                  <h3>{appointment.name}</h3>
                  <p>
                    Fecha: {appointment.date} <br />
                    Hora: {appointment.time} <br />
                    Teléfono: {appointment.phone}
                  </p>
                  <button
                    onClick={() => scheduleReminder(appointment)}
                    style={{ marginRight: "10px" }}
                  >
                    Recordatorio
                  </button>
                  <button onClick={() => deleteAppointment(index)}>
                    Eliminar
                  </button>
                </li>
              ))
            ) : (
              <p>No hay citas reservadas.</p>
            )}
          </ul>
        </section>
      </main>
      <footer>
        <p>© 2025 Gestión de Citas Médicas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;

