const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (ajusta la URI si es necesario)
mongoose.connect('mongodb://localhost:27017/citasmedicas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Esquema y modelo
const CitaSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  phone: String,
});
const Cita = mongoose.model('Cita', CitaSchema);

// Rutas API
app.get('/api/citas', async (req, res) => {
  const citas = await Cita.find();
  res.json(citas);
});

app.post('/api/citas', async (req, res) => {
  const cita = new Cita(req.body);
  await cita.save();
  res.json(cita);
});

app.delete('/api/citas/:id', async (req, res) => {
  await Cita.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor backend en http://localhost:${PORT}`));