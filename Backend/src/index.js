const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const app = express();
const http = require("http");

//imports models
const lineas = require("./Routes/Estaciones/LineasRoute");
const user = require("./Routes/userRoutes");
const estaciones = require("./Routes/Estaciones/EstacionesRoute");
const estacioneslinea = require("./Routes/Estaciones/EstacionesLineasRoute");
const partes = require("./Routes/Estaciones/PartesRoute");
const sentidos = require("./Routes/Estaciones/Sentidos");
const sentidosestaciones=require("./Routes/Estaciones/SentidosEstaciones");
const categoria=require("./Routes/Estaciones/CategoriasRoute");
const categoriaconcepto=require("./Routes/Estaciones/CategoriasConceptosRoute");
const levantamiento=require("./Routes/Estaciones/LevantamientosRoute");
const elementosconf = require("./Routes/Estaciones/ElemConfRoute");
const ccparte=require("./Routes/Estaciones/CcPartesRoute");
const falla=require("./Routes/Estaciones/FallaRoute");
const judsup=require("./Routes/Estaciones/JudSupRoute");
const vehiculos = require("./Routes/Estaciones/VehiculoRoute");
const inventario = require("./Routes/Estaciones/InventarioRoute");
const cuadrilla = require("./Routes/Estaciones/CuadrillaRoute");
const salmacen = require("./Routes/Estaciones/SAlmacenRoute");
const strabajo = require("./Routes/Estaciones/STrabajoRoute");

require("dotenv").config();
app.set('port',process.env.PORT || 4000);
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));
app.use(cors());
app.use(session({
    secret: "qwerty",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        expires: 120
    },
    
}));


//Middlewares

app.use(morgan("dev"));


//Routes

app.use("/lineas", lineas);
app.use("/Campo/users", user);
app.use("/users", user);
app.use("/estaciones", estaciones);
app.use("/el", estacioneslinea);
app.use("/se", sentidos);
app.use("/sentes",sentidosestaciones);
app.use("/cat",categoria);
app.use("/categorias",categoriaconcepto)
app.use("/partes",partes)
app.use("/levantamientos",levantamiento);
app.use("/registro",elementosconf);
app.use("/ccparte",ccparte);
app.use("/fallas",falla);
app.use("/jdsp",judsup);
app.use("/vehiculo", vehiculos);
app.use("/inventario", inventario);
app.use("/cuadrilla",cuadrilla);
app.use("/salmacen", salmacen);
app.use("/strabajo",strabajo)
//listen 
const port = app.get('port');


app.listen(port, () => {
    console.log(`corriendo en el puerto ${port}`);
    console.log(process.versions);
    console.log(`Server is up \n Max HTTP header size is ${http.maxHeaderSize}`)
});