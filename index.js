const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'libros.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function readLibros() {
  try {
    const raw = await fs.promises.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

async function writeLibros(libros) {
  await fs.promises.writeFile(DATA_FILE, JSON.stringify(libros, null, 2), 'utf8');
}

function validateLibro(libro) {
  const errors = [];
  if (!(typeof libro.titulo === 'string' && libro.titulo.trim().length > 0)) errors.push('titulo');
  if (!(typeof libro.autor === 'string' && libro.autor.trim().length > 0)) errors.push('autor');
  const currentYear = new Date().getFullYear();
  if (!(Number.isInteger(libro.anio) && libro.anio >= 1900 && libro.anio <= currentYear)) errors.push('anio');
  if (!(typeof libro.genero === 'string' && libro.genero.trim().length > 0)) errors.push('genero');
  if (!(typeof libro.rating === 'number' && libro.rating >= 1 && libro.rating <= 5)) errors.push('rating');
  if (libro.id !== undefined && !(Number.isInteger(libro.id) && libro.id > 0)) errors.push('id');
  return errors;
}

app.get('/libros', async (req, res) => {
  const { q, page = '1', limit = '10' } = req.query;
  const libros = await readLibros();
  let filtered = libros;
  if (q) {
    const v = String(q).toLowerCase();
    filtered = libros.filter(
      l =>
        (l.titulo || '').toLowerCase().includes(v) ||
        (l.autor || '').toLowerCase().includes(v) ||
        (l.genero || '').toLowerCase().includes(v)
    );
  }
  const p = Math.max(1, parseInt(page) || 1);
  const lim = Math.max(1, parseInt(limit) || 10);
  const start = (p - 1) * lim;
  const results = filtered.slice(start, start + lim);
  res.json({ total: filtered.length, page: p, limit: lim, results });
});

app.get('/libros/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'id inválido' });
  const libros = await readLibros();
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.status(404).json({ error: 'No encontrado' });
  res.json(libro);
});

app.post('/libros', async (req, res) => {
  const body = req.body || {};
  const errors = validateLibro(body);
  if (errors.length > 0) return res.status(400).json({ error: 'Datos inválidos', campos: errors });

  const libros = await readLibros();
  let id = body.id;
  if (id !== undefined) {
    if (libros.some(l => l.id === id)) return res.status(409).json({ error: 'id duplicado' });
  } else {
    id = (libros.reduce((m, l) => Math.max(m, l.id || 0), 0)) + 1;
  }

  const nuevo = {
    id,
    titulo: body.titulo.trim(),
    autor: body.autor.trim(),
    anio: body.anio,
    genero: body.genero.trim(),
    rating: body.rating
  };
  libros.push(nuevo);
  await writeLibros(libros);
  res.status(201).json(nuevo);
});

app.put('/libros/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'id inválido' });

  const body = req.body || {};
  const errors = validateLibro(body);
  if (errors.length > 0) return res.status(400).json({ error: 'Datos inválidos', campos: errors });

  const libros = await readLibros();
  const idx = libros.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  const actualizado = {
    id,
    titulo: body.titulo.trim(),
    autor: body.autor.trim(),
    anio: body.anio,
    genero: body.genero.trim(),
    rating: body.rating
  };
  libros[idx] = actualizado;
  await writeLibros(libros);
  res.json(actualizado);
});

app.delete('/libros/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'id inválido' });

  const libros = await readLibros();
  const idx = libros.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  const eliminado = libros[idx];
  libros.splice(idx, 1);
  await writeLibros(libros);
  res.json({ ok: true, eliminado });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error interno' });
});

app.listen(PORT, () => {});