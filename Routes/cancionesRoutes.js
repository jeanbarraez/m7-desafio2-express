import express  from "express";
import { getAllCanciones,createSong } from "../src/controllers/cancionesController.js";
const router = express.Router();


/* router.get('/', getPahtHtml ); 
Este metodo no funciono 
*/

router.get('/canciones', getAllCanciones );

router.post('/canciones', createSong);




export default router;