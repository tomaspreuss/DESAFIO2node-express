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

