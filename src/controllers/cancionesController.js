import { v4 as uuidv4 } from "uuid";
import fs from "fs";



//La conexion a la ruta raiz, en este caso html 
const getPathHtml = (req, res) => {
  try {
    const html = fs.readFileSync("index.html", "utf-8")
    res.status(200).send(html)
  } catch (error) {
    res.status(500).json({ error: "Error solicitud no procesada " });
    console.error("Error del servidor  al procesar la solicitud", error);
  }
}; 

// Leer todas las canciones existente 
const getAllCanciones = (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    res.status(200).json(canciones);
  } catch (error) {
    console.error("The user entered the route incorrectly", error);
    res.status(500).json({ error: "Server problems" });
  }
};

// post create song
const createSong = (req, res) => {
  try {
    const cancion = req.body;
    console.log(cancion);

    if (!cancion.titulo || !cancion.artista || !cancion.tono) {
      res.status(400).json({ mensaje: "You must enter all fields" });
      return;
    }
    const id = uuidv4();
    const idBody = {
      id,
      ...cancion,
    };

    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

    canciones.push(idBody);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.status(201).send("Song added successfully");
  } catch (error) {
    console.error("The user entered the route incorrectly", error);
    res.status(500).json({ error: "Server problems" });
  }
};

// put editsong
const editSong = (req, res) => {
  try {
    const { id } = req.params;
    const cancion = req.body;

    if (!cancion.titulo || !cancion.artista || !cancion.tono) {
      res.status(400).json({ mensaje: "You must enter all fields" });
      return;
    }

    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id === id);
    canciones[index] = {
      id,
      ...cancion
    };
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.status(201).send("song successfully edit");

  } catch (error) {
    console.error("The user entered the route incorrectly", error);
    res.status(500).json({ error: "Server problems" });
  }
};

// delete song
const removeSong = (req, res) => {
  try {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("song successfully removed");
  } catch (error) {
    console.error("The user entered the route incorrectly", error);
    res.status(500).json({ error: "Server problems" });
  }
};



export {getAllCanciones, createSong, editSong, removeSong,getPathHtml};
