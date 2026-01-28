# Desafío 2 — Mi colección de libros (Backend)

Servidor Express con CRUD básico sobre un archivo JSON local (`data/libros.json`) y un cliente HTML mínimo para probar desde el navegador. Incluye búsqueda y paginación en el listado.

## Características
- Servidor Express en `localhost:3000`.
- Persistencia en archivo JSON: `data/libros.json`.
- Endpoints CRUD:
  - `GET /libros` (listar con búsqueda y paginación).
  - `GET /libros/:id` (leer uno).
  - `POST /libros` (crear).
  - `PUT /libros/:id` (actualizar).
  - `DELETE /libros/:id` (borrar).
- Cliente web simple servido desde `/public/index.html`.
- Validaciones con códigos de error adecuados:
  - `400` datos inválidos (campos faltantes, tipos o rangos incorrectos).
  - `404` id inexistente al editar/borrar.
  - `409` id duplicado al crear.
  - `500` error interno.

## Modelo de datos (libros)
Campos:
- `id` (number, entero positivo). Opcional al crear: si no se envía, se autogenera.
- `titulo` (string, requerido, no vacío).
- `autor` (string, requerido, no vacío).
- `anio` (number, entero entre 1900 y año actual).
- `genero` (string, requerido, no vacío).
- `rating` (number, 1 a 5).

Ejemplo (`data/libros.json`):
```json
[
  { "id": 1, "titulo": "El túnel", "autor": "Ernesto Sabato", "anio": 1948, "genero": "Realismo mágico", "rating": 5 },
  { "id": 2, "titulo": "1984", "autor": "George Orwell", "anio": 1949, "genero": "Distopía", "rating": 5 }
]
```

## Requisitos
- Node.js 18+ recomendado.
- npm.

## Instalación
```bash
cd "/Users/tomaspreuss/Desktop/clases WEB/NODE/DESAFIO2"
npm install
npm install --save-dev nodemon
```

## Ejecución
- Desarrollo (recarga automática):
```bash
npm run dev
```
- Producción/local simple:
```bash
npm start
```

Scripts esperados en `package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```
> Nota: si tus scripts apuntan a `server.js`, cámbialos a `index.js` o renombra tu archivo principal a `server.js` para mantener coherencia.

## Estructura del proyecto

Chat

Thought process

Perfecto, te creo el README en español para que tu profesor pueda revisarlo. Debes crear el archivo manualmente en la ruta indicada o usar el botón para aplicar si tu IDE lo permite.

```
# Desafío 2 — Mi colección de libros (Backend)

Servidor Express con CRUD básico sobre un archivo JSON local (`data/
libros.json`) y un cliente HTML mínimo para probar desde el 
navegador. Incluye búsqueda y paginación en el listado.

## Características
- Servidor Express en `localhost:3000`.
- Persistencia en archivo JSON: `data/libros.json`.
- Endpoints CRUD:
  - `GET /libros` (listar con búsqueda y paginación).
  - `GET /libros/:id` (leer uno).
  - `POST /libros` (crear).
  - `PUT /libros/:id` (actualizar).
  - `DELETE /libros/:id` (borrar).
- Cliente web simple servido desde `/public/index.html`.
- Validaciones con códigos de error adecuados:
  - `400` datos inválidos (campos faltantes, tipos o rangos 
  incorrectos).
  - `404` id inexistente al editar/borrar.
  - `409` id duplicado al crear.
  - `500` error interno.

## Modelo de datos (libros)
Campos:
- `id` (number, entero positivo). Opcional al crear: si no se envía, 
se autogenera.
- `titulo` (string, requerido, no vacío).
- `autor` (string, requerido, no vacío).
- `anio` (number, entero entre 1900 y año actual).
- `genero` (string, requerido, no vacío).
- `rating` (number, 1 a 5).

Ejemplo (`data/libros.json`):
```json
[
  { "id": 1, "titulo": "El túnel", "autor": "Ernesto Sabato", "anio": 
  1948, "genero": "Realismo mágico", "rating": 5 },
  { "id": 2, "titulo": "1984", "autor": "George Orwell", "anio": 
  1949, "genero": "Distopía", "rating": 5 }
]
```

## Requisitos
- Node.js 18+ recomendado.
- npm.

## Instalación
```bash
cd "/Users/tomaspreuss/Desktop/clases WEB/NODE/DESAFIO2"
npm install
npm install --save-dev nodemon
```

## Ejecución
- Desarrollo (recarga automática):
```bash
npm run dev
```
- Producción/local simple:
```bash
npm start
```

Scripts esperados en `package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

## Estructura del proyecto
```
DESAFIO2/
├─ data/
│  └─ libros.json
├─ public/
│  └─ index.html
├─ index.js          # Servidor Express (entrypoint)
├─ package.json
└─ package-lock.json

```

## Cliente Web
- Abrir `http://localhost:3000/`.
- Permite listar, buscar por `q` (título/autor/género), crear, editar 
y borrar.
- Edición: botón “Editar” carga el formulario y luego “Actualizar” 
envía al API.

## API: Endpoints y ejemplos

### Listar con búsqueda y paginación
`GET /libros?q=<texto>&page=<n>&limit=<m>`

Respuesta:
```json
{
  "total": 12,
  "page": 1,
  "limit": 10,
  "results": [ { /* libro */ } ]
}
```

Ejemplos:
```bash
curl -s "http://localhost:3000/libros"
curl -s "http://localhost:3000/libros?q=realismo&page=1&limit=5"
```

### Obtener por id
`GET /libros/:id`
```bash
curl -s "http://localhost:3000/libros/2"
```

- `400` si `id` no es entero.
- `404` si no existe.

### Crear
`POST /libros` (JSON body)
```json
{
  "titulo":"Ficciones",
  "autor":"Jorge Luis Borges",
  "anio":1944,
  "genero":"Cuentos",
  "rating":5
}
```
```bash
curl -s -X POST http://localhost:3000/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Ficciones","autor":"Jorge Luis Borges","anio":1944,
  "genero":"Cuentos","rating":5}'
```

- `201` retorna el libro creado (con `id` autogenerado si no se 
envió).
- `400` datos inválidos (incluye `campos` con nombres que fallaron).
- `409` si se envía un `id` ya existente.

### Actualizar
`PUT /libros/:id` (JSON body completo con todos los campos)
```bash
curl -s -X PUT http://localhost:3000/libros/2 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"1984","autor":"George Orwell","anio":1949,
  "genero":"Distopía","rating":4}'
```

- `400` datos inválidos.
- `404` si no existe el `id`.

### Borrar
`DELETE /libros/:id`
```bash
curl -s -X DELETE http://localhost:3000/libros/5
```

- `404` si no existe el `id`.
- `200` ejemplo de respuesta:
```json
{ "ok": true, "eliminado": { "id": 5, /* ... */ } }
```

## Errores
- `400` ejemplo:
```json
{ "error": "Datos inválidos", "campos": ["titulo","anio"] }
```
- `404` ejemplo:
```json
{ "error": "No encontrado" }
```
- `409` ejemplo:
```json
{ "error": "id duplicado" }
```
- `500` ejemplo:
```json
{ "error": "Error interno" }
```

## Checklist para corrección
- [ ] `npm run dev` y `npm start` arrancan sin errores.
- [ ] `GET /libros` lista y permite `q`, `page`, `limit`.
- [ ] `POST /libros` valida tipos/rangos y autogenera `id` si falta.
- [ ] `PUT /libros/:id` requiere todos los campos y valida; 404 si no 
existe.
- [ ] `DELETE /libros/:id` elimina y retorna `eliminado`.
- [ ] Cliente `/` realiza CRUD contra el API correctamente.
- [ ] Archivo `data/libros.json` se actualiza tras crear/editar/
borrar.

## Mejoras futuras (opcionales)
- Separar en `routes/`, `controllers/`, `services/`.
- Tests con Jest para las rutas/controladores.
- Filtros adicionales (por género, rango de años, rango de rating).
- Persistencia real (SQLite, MongoDB, PostgreSQL).

## Autor
- Estudiante: Tomas Preuss (clases WEB / NODE)
```
Qué añade este README

- Explica objetivos, cómo correr el proyecto, endpoints, validaciones y ejemplos de uso.
- Incluye una checklist para que tu profesor pueda corregir rápidamente.
Recuerda crear y guardar este archivo en la ruta indicada. Si quieres que agregue una sección específica (por ejemplo, criterios de evaluación de tu curso), dime y la incorporo.

23:14
tomaspreuss

como se crea el archivo readme cual es su tipo de archivo y donde va?

Chat

Thought process

Para este proyecto, el README es un archivo de texto en formato Markdown. Se llama README.md y va en la raíz del proyecto.

Qué es

- Tipo de archivo: texto plano con formato Markdown.
- Extensión: .md
- Propósito: explicar qué hace el proyecto, cómo instalar, ejecutar y probar, y servir como guía para quien lo revisa (tu profesor).
Dónde va

- Ubicación: raíz del proyecto.
- Ruta exacta en tu caso: /Users/tomaspreuss/Desktop/clases WEB/NODE/DESAFIO2/README.md
Cómo crearlo

- En tu IDE:
  - Crea un archivo nuevo llamado README.md en la carpeta DESAFIO2.
  - Pega el contenido y guarda.
- Con Terminal (macOS):
  - Crear el archivo vacío:
```
cd "/Users/tomaspreuss/Desktop/clases WEB/NODE/DESAFIO2"
touch README.md
```
- Abrir y pegar contenido con tu editor (por ejemplo, Nano):
```
nano README.md
```
- O escribir en una sola línea:
```
cat > README.md << 'EOF'
# aquí pega el contenido completo del README
EOF
```
A continuación te dejo el contenido listo para copiar y pegar. Crea el archivo manualmente o usa el botón de aplicar si tu IDE lo permite.

```
# Desafío 2 — Mi colección de libros (Backend)

Servidor Express con CRUD básico sobre un archivo JSON local (`data/
libros.json`) y un cliente HTML mínimo para probar desde el 
navegador. Incluye búsqueda y paginación en el listado.

## Características
- Servidor Express en `localhost:3000`.
- Persistencia en archivo JSON: `data/libros.json`.
- Endpoints CRUD:
  - `GET /libros` (listar con búsqueda y paginación).
  - `GET /libros/:id` (leer uno).
  - `POST /libros` (crear).
  - `PUT /libros/:id` (actualizar).
  - `DELETE /libros/:id` (borrar).
- Cliente web simple servido desde `/public/index.html`.
- Validaciones con códigos de error adecuados:
  - `400` datos inválidos (campos faltantes, tipos o rangos 
  incorrectos).
  - `404` id inexistente al editar/borrar.
  - `409` id duplicado al crear.
  - `500` error interno.

## Modelo de datos (libros)
Campos:
- `id` (number, entero positivo). Opcional al crear: si no se envía, 
se autogenera.
- `titulo` (string, requerido, no vacío).
- `autor` (string, requerido, no vacío).
- `anio` (number, entero entre 1900 y año actual).
- `genero` (string, requerido, no vacío).
- `rating` (number, 1 a 5).

Ejemplo (`data/libros.json`):
```json
[
  { "id": 1, "titulo": "El túnel", "autor": "Ernesto Sabato", "anio": 
  1948, "genero": "Realismo mágico", "rating": 5 },
  { "id": 2, "titulo": "1984", "autor": "George Orwell", "anio": 
  1949, "genero": "Distopía", "rating": 5 }
]
```

## Requisitos
- Node.js 18+ recomendado.
- npm.

## Instalación
```bash
cd "/Users/tomaspreuss/Desktop/clases WEB/NODE/DESAFIO2"
npm install
npm install --save-dev nodemon
```

## Ejecución
- Desarrollo (recarga automática):
```bash
npm run dev
```
- Producción/local simple:
```bash
npm start
```

Scripts esperados en `package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```
> Nota: si tus scripts apuntan a `server.js`, cámbialos a `index.js` 
o renombra tu archivo principal a `server.js` para mantener 
coherencia.

## Estructura del proyecto
```
DESAFIO2/
├─ data/
│  └─ libros.json
├─ public/
│  └─ index.html
├─ index.js          # Servidor Express (entrypoint)
├─ package.json
└─ package-lock.json
