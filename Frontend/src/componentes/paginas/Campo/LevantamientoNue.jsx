import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import {
  Grid,
  GridList,
  GridListTile,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import swal from 'sweetalert';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { green, red } from '@material-ui/core/colors';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Table, TablePagination, Input } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import {
  getCategorias, getConceptos, getEstacionesLine, getSentidosEstaciones, getPartes, getFallas, CodeSearch,
  getParte, getData, postData, getImgs, newL, EliminarL, GenerarL, CheckL, EliminarElemento
} from './../../../functions';
import { compress, decompress } from 'lz-string';
//import {getTableNue, setTableNue} from './Js/functions';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },

  margin: {
    margin: theme.spacing(2),
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: "75%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
    backgroundColor: "#4caf50",
  },
  table: {
    minWidth: 50
  },
  boton2: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  boton1: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  dialogf: {
    backgroundColor: "#f4f6f8",
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Nue() {

  const [lineas, setLineas] = React.useState([]);
  const [estaciones, setEstaciones] = React.useState([]);
  const [sentido, setSentidos] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [conceptos, setConceptos] = React.useState([]);
  const [partes, setPartes] = React.useState([]);
  const [fallass, setFallass] = React.useState([]);
  const [busqueda, setBusqueda] = React.useState([]);
  const [splitparte, setSplitParte] = React.useState("");
  const [auxpartes, setAuxPartes] = React.useState([]);
  const [registros, setRegistro] = React.useState([]);
  const [tbldata, setTblData] = React.useState([]);
  const [imagenReg, setImReg] = React.useState([]);
  const [acordion, setAcordion] = React.useState(false);
  const [gl, setGL] = React.useState(true);
  const [dl, setDL] = React.useState(true);
  const [ver, setVer] = React.useState(false);
  const [mostrar, setMostrar] = React.useState(false);
  const [metros, setMetros] = React.useState(false);
  const [levantamiento, setLevantamiento] = React.useState([]);
  const [levnot, setLevnot] = React.useState({
    Id_numorden: "",
    Id_linea: "",
    Id_estacion: 0
  });
  const [auxmetros,setAuxMetros]= React.useState([]);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    axios.post("/users/user", {token : Cookie.get("Token")})
    .then(data => {
            setId(data.data.user);
    })

    axios.post("/users/user", {token : Cookie.get("Token")})
    .then(data => {
      axios.get(`/levantamientos/listarun/${data.data.user}`)
        .then(result => {
          let leva = (Object.values(Object.values(result.data)));
          if((leva[0]) != "SequelizeDatabaseError") {
            (leva.map(item => levnot.Id_numorden = item.Id_numorden))
            setLevantamiento(leva[0]);
            console.log(levnot);
            axios.get(`/registro/unsave/${levnot.Id_numorden}`)
              .then(result => {
                console.log(result);
                let le = (Object.values(Object.values(result.data)));
                setAcordion(true);
                setGL(false);
                setVer(true);
                setDL(false);
                if (le.length > 0) {
                  (le.map(item => levnot.Id_linea = item.Id_linea));
                  console.log(le.map(item => levnot.Id_estacion = item.Id_estacion));
                  setline(levnot.Id_linea);
                  Estaciones(levnot.Id_linea);
                  setest(levnot.Id_estacion);
                  Sentidos(levnot.Id_estacion);
                  Categorias(levnot.Id_linea);
                }
                axios.get(`/registro/list/${levnot.Id_numorden}`)
                  .then(result => {
                    setRegistro(Object.values(Object.values(result.data)));
                  });
              });

          }
        });
    });
    axios.get("/lineas/list")
      .then(result => {
        setLineas(Object.values(Object.values(result.data)));
      });

  }, []);

  React.useEffect(()=>{
    console.log(registros.length)
    if(registros.length<1)
      setGL(true);
  },[registros])

  console.log(sentido);

  const Estaciones = async (linea) => {
    setEstaciones(await getEstacionesLine(linea));
  };

  const Categorias = async (linea) => {
    setCategorias(await getCategorias(linea));
  };

  const Sentidos = async (estacion) => {
    setSentidos(await getSentidosEstaciones(estacion));
  };

  const Conceptos = async (categoria) => {
    setConceptos(await getConceptos(categoria));
  };

  const Partes = async (concepto,idCC) => {
    setPartes(await getPartes(concepto,idCC));
  }

  const Parte = async (linea, concepto, parte) => {
    setAuxPartes(await getParte(linea, concepto, parte));
  }

  const Fallas = async (partes,idccp) => {
    setFallass(await getFallas(partes,idccp));
  }

  const Metross = async (categoria) => {
    setAuxMetros(await getConceptos(categoria));
  };

  const Search = async (id) => {
    var part = id.split("-");
    var newid = part[0] + "-" + part[1] + "-" + part[2];
    console.log(part+" "+newid);
    if(part[1] === undefined || part[2] === undefined)
        swal("La clave no esta separada por guiones", "", "error");
    else{
      if(part[0] != line){
        swal("La clave no pertenece con la linea seleccionada", "", "error");
      }
      else{
        setSplitParte(part[3]);
        setBanderaca(true);
        setBanderaco(true);
        setBusqueda((await CodeSearch(newid)));
      }
    }
    
  }
  const CrearL = async () => {
    setVer(true);
    setAcordion(true);    
    setDL(false);
    NuevoLevantamiento(id);

  }
  const NuevoLevantamiento = async (id) => {
    console.log("id" + id);
    let lev = {
      Id_User: id,
      firmaJud: "",
      firmasup: "",
      estado: 0,
      Generado: 0
    }
    const n = await newL(lev);
    setLevantamiento(n);
  }

  const TerminarLevantamiento = async () => {
    await GenerarL(levantamiento.Id_numorden);
    swal("Levantamiento Generado", Cookie.get("Nombre"), "success");
    setInterval(function () {
      window.location.replace("/Campo/levantamientos");
    }, 1000);
  }

  const DeleteElemento = async(id) => {
    await EliminarElemento(id);
    axios.get(`/registro/list/${levantamiento.Id_numorden}`)
      .then(result => {
        setRegistro(Object.values(Object.values(result.data)));
        
      });
     
  }

  
  function ButtonGreeting(props) {
    var ver = props.ver;
    if (ver)
      return (
        <div>
          <Grid container spacing={3}>
            <Box flexGrow={1} ml={5}>
              <Grid item xs={12} sm={6}>
                <Button disabled={gl} variant="contained" component="label" className={classes.boton2}
                  onClick={() => TerminarLevantamiento()} >
                  Generar
				</Button>
              </Grid>
            </Box>
            <Box mr={20}>
              <Grid item xs={12} sm={5}>

                <Button disabled={dl} onClick={() => { descartar(setVer(false)) }} className={classes.boton1}>Descartar <ClearIcon />  </Button>

              </Grid>
            </Box>
          </Grid>
        </div>);
    else return (
      <div>
        <Grid container spacing={3}>
          <Box flexGrow={1} ml={5}>
            <Grid item xs={12} sm={6}>
              <Button disabled={gl} variant="contained" component="label" className={classes.boton2} >
                Generar
          </Button>
            </Grid>
          </Box>
        </Grid>
      </div>);
  }
  
  const descartar = async () => {
    setGL(true);
    setDL(true);
    setAcordion(false);
    setEstaciones([]);
    setSentidos([]);
    setline('');
    setest('');
    setdir('');
    setdis(true);
    await EliminarL(levantamiento.Id_numorden);
    axios.get(`/registro/list/${levnot.Id_numorden}`)
      .then(result => {
        setRegistro(Object.values(Object.values(result.data)));
      });
  }

  const Registro = async (orden) => {
    setRegistro(await getData(orden));
  };

  const TblData = async (data) => {
    setTblData(await postData(data));
    Registro(data.orden);
  };


  const ImReg = async (id) => {
    setImReg(await getImgs(id));
    handleOp();
    //console.log(imagenReg);
  }

  const classes = useStyles();
  const [line, setline] = React.useState('');
  const [est, setest] = React.useState('');
  const [dir, setdir] = React.useState('');
  const [code, setcode] = React.useState('');
  const [categ, setcateg] = React.useState('');
  const [concept, setconcept] = React.useState('');
  const [falla, setfalla] = React.useState('');
  const [part, setPart] = React.useState('');
  const [imagenD, setImagenD] = React.useState('');
  const [area, setArea] = React.useState(0.0);
  const [tramo, setTramo] = React.useState('');
  const [banderaca, setBanderaca] = React.useState(false);
  const [banderaco, setBanderaco] = React.useState(false);
  const [dis, setdis] = React.useState(true);
  const [disAgregar, setDisAgregar] = React.useState(true);
  

  var datos = {
    els: "",
    orden: "",
    falla: "",
    imagenes: "",
    tramo: "",
    area: 0.0
  };

  var orden = 0;


  React.useEffect(() => {
    if (busqueda.length > 0) {
      setconcept(busqueda);
      let c = busqueda.map((item) => item.Id_categoria);
      setcateg(c[0]);
      console.log("categ = " + categ);
      Conceptos(c[0]);
      const co = busqueda.map((item) => item.Id_concepto);
      const idCC = busqueda.map((item) => item.Id_cc);
      console.log(idCC)
      setconcept(co[0]);
      
      Partes(co, idCC);
      console.log("conceptooos " + c[0]);
      Metross(c[0]);
      console.log("Metross = " + co[0]);

      Parte(line, co, splitparte);
      if (categorias[categorias.findIndex(item => item.Id_categoria === c[0])].nombre_ca === "Carril confinado")
        setMostrar(true);
      else
        setMostrar(false);
        
       
     
    }
  }, [busqueda]);

  React.useEffect(() => {
    if (auxpartes.length > 0) {
      let pa,idccp;
      auxpartes.map((item) =>
        pa = item.Id_partes);
      auxpartes.map((item) =>
        idccp = item.Id_ccp);
      setPart(pa);
      Fallas(pa,idccp);
      
    }

  }, [auxpartes]);

  React.useEffect(() => {
    if(auxmetros.length >0)
    {
      let met;
      auxmetros.map((item)=>
      {
        if(item.Id_concepto==concept)
          met = item.m2;
        
      }
      );
      //setconcept(met);
      console.log("met = "+met)
     
      if (met)
      setMetros(true);
      else
      setMetros(false);
      //console.log("Aux "+ JSON.stringify( auxmetros[auxmetros.findIndex(item => item.Id_concepto === met)].m2) );
 
    }
   }, [auxmetros]);

  const handleChange = (event) => {
    setcode(event.target.value);
  };
  const handleChangeLine = (event) => {
    setline(event.target.value);
    Estaciones(event.target.value);
    Categorias(event.target.value);
  };
  const handleChangeEs = (event) => {
    setest(event.target.value);
    Sentidos(event.target.value);
  };
  const handleChangeDir = (event) => {
    setdir(event.target.value);
    setdis(false);
  };
  const handleChangeCat = (event) => {
    setBanderaca(true);
    setcateg(event.target.value);
    Conceptos(event.target.value);
    if (categorias[categorias.findIndex(item => item.Id_categoria === event.target.value)].nombre_ca === "Carril confinado")
      setMostrar(true);
    else
      setMostrar(false);
  };
  const handleChangeCon = (event) => {
    setBanderaco(true);
    setconcept(event.target.value);
    Partes(event.target.value,conceptos[conceptos.findIndex(item => item.Id_concepto === event.target.value)].Id_cc);
    console.log(conceptos[conceptos.findIndex(item => item.Id_concepto === event.target.value)].Id_cc);
    if (conceptos[conceptos.findIndex(item => item.Id_concepto === event.target.value)].m2)
      setMetros(true);
    else
      setMetros(false);
  };
  const handleChangeFail = (event) => {
    setfalla(event.target.value);
    setDisAgregar(false);
  };
  const handleChangePart = (event) => {
    console.log(partes);
    setPart(event.target.value);
    Fallas(event.target.value,partes[partes.findIndex(item => item.Id_partes===event.target.value)].Id_ccp);
  }

  const handleChangeCode = (event) => {
    setcode(event.target.value);
    /* setcateg(event.target.value);
    setconcept(event.target.value);
    setfalla(event.target.value); */
  };

  const handleChangeArea = (event) => {
    setArea(event.target.value);
  }

  const handleChangeTramo = (event) => {
    setTramo(event.target.value);
  }

  const [open, setOpen] = React.useState(false);
  const [op, setOp] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleOp = () => {
    setOp(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleCl = () => {
    setOp(false);

  };


  React.useEffect(() => {
    //Nota: Cambiar orden_id
    axios.get(`/registro/list/${levantamiento.Id_numorden}`)
      .then(result => {
        setRegistro(Object.values(Object.values(result.data)));
      });

  }, []);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
 

  const setElem = () => {

    datos.els = dir;
    datos.orden = levantamiento.Id_numorden;
    datos.falla = falla;
    datos.imagenes = imagenD;
    datos.tramo = tramo;
    datos.area = area;
    TblData(datos);
    setGL(false);
    handleClose();
  };

  function getBase64(files) {
    if (files && files.length > 0) {
      files.forEach(function (file, index) {
        const currfile = file;
        var reader = new FileReader();
        reader.readAsDataURL(currfile);
        reader.onload = function () {
          let imgData = reader.result.replace(/^data:image\/(png|jpeg|bmp);base64,/, "");
          files[index] = imgData;
          try {
            setImagenD(files);
          }
          catch (e) {
            console.log("Error en Base64");
          }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      });

      return files;
    }
    else
      return "hola"
  }

  function tableDrop() {

    console.log(registros);

    if (registros) {
      return registros.map((item) => {
        let tabItem = (
          <TableRow hover>
            <TableCell align="center">{item.Id_cc}</TableCell>
            <TableCell align="center">{item.nombre_ca}</TableCell>
            <TableCell align="center">{item.nombre_co}</TableCell>
            <TableCell align="center">{item.nombre_pa}</TableCell>
            <TableCell align="center">{item.falla}</TableCell>
            <TableCell align="center">
              <Button onClick={() => ImReg(item.Id_elemento)}><ImageIcon fontSize="large" /></Button>
            </TableCell>
            <TableCell align="center">
              <Button className={classes.boton1} onClick={() => DeleteElemento(item.Id_elemento)}>Eliminar</Button>
            </TableCell>
          </TableRow>
        );
        return tabItem;
      })

    }
  }

  function getimage() {
    if (imagenReg) {
      return imagenReg.map((item) => {
        let img = (
          <GridListTile>
            <img src={"data:image/png;base64," + item} width="400" height="400" />

          </GridListTile>
        );
        return img;
      })
    }
    else
      return "";
  }


  //console.log("sentidos "+sentido.map(item=>item.Id_els));
  const bodyElem = (

    <Container>
      <Dialog fullScreen open={open} onClose={handleClose} classes={{ paper: classes.dialogf }}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton autoFocusedge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>

            </Typography>

          </Toolbar>
        </AppBar>
        <Container >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="outlined-basic" label="clave" size="small" variant="outlined" className={classes.margin}
                onChange={handleChangeCode} />
              <Button variant="contained" color="primary" size="medium" className={classes.margin} onClick={() => Search(code)}
              >
                Buscar
					</Button>
            </Grid>
            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label" shrink={banderaca}>Categorias</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id='categoria'
                  value={categ}
                  onChange={handleChangeCat}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {/* select Categoria */}

                  {categorias.map((item) =>
                    <MenuItem value={item.Id_categoria}>{item.nombre_ca}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label" shrink={banderaco}>Concepto</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="concepto"
                  value={concept}
                  onChange={handleChangeCon}
                  displayEmpty
                  className={classes.selectEmpty}
                  fullWidth
                >
                  {/*Select Conceptos */}
                  {conceptos.map((item) =>
                    <MenuItem value={item.Id_concepto} >{item.nombre_co}</MenuItem>
                  )}
                </Select>

              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Partes</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="parte"
                  value={part}
                  onChange={handleChangePart}
                  className={classes.selectEmpty}
                  fullWidth
                >
                  {partes.map((item) =>
                    <MenuItem value={item.Id_partes}>{item.nombre_pa}</MenuItem>
                  )}

                </Select>

              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Falla</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="falla"
                  value={falla}
                  onChange={handleChangeFail}
                  className={classes.selectEmpty}
                  fullWidth
                >
                  {fallass.map((item) =>
                    <MenuItem value={item.Id_Falla}>{item.falla}</MenuItem>
                  )}

                </Select>

              </FormControl>

            </Grid>
            {mostrar ? <Grid item xs={6}>
            <FormControl required className={classes.formControl}>
              <TextareaAutosize onChange={handleChangeTramo} aria-label="minimum height" rowsMin={3} placeholder="Escribe el tramo" />;

              </FormControl>

            </Grid> : <div></div>}
            
            {metros ? <Grid item xs={6} sm={3}>
            <FormControl required className={classes.formControl}>

              <TextField value={area} onChange={handleChangeArea} type="number" id="outlined-basic" label="metros cuadrados" variant="outlined" />
            </FormControl>

            </Grid> : <div></div>}

            <Container>
              <DropzoneArea maxFileSize={10000000} acceptedFiles={['image/*']} filesLimit={10}
                dropzoneText={"Arrasta la imagen o da click aqui"} onChange={(files) => getBase64(files)} />
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button disabled={disAgregar} variant="contained" component="label" className={classes.boton2} onClick={setElem}>
                  Aceptar
                    </Button>
              </Box>
            </Container>

          </Grid>
        </Container>

      </Dialog>
    </Container>
  );





  return (

    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="left">
          Nuevo levantamiento
            <Button disabled={acordion} onClick={() => { CrearL() }}> <PostAddIcon /></Button>
        </Typography>
        <Accordion
          expanded={acordion}>
          <AccordionSummary

            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Nuevo Levantamiento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Lineas</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={line}
                  onChange={handleChangeLine}
                  className={classes.selectEmpty}
                >
                  {lineas.map((item) =>
                    <MenuItem value={item.Id_linea}> {item.Id_linea} </MenuItem>)}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Estaciones</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={est}
                  onChange={handleChangeEs}
                  className={classes.selectEmpty}
                >
                  {estaciones.map((item) =>
                    <MenuItem value={item.id_estacion}>{item.nombre_es}</MenuItem>
                  )}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Sentido</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={dir}
                  onChange={handleChangeDir}
                  className={classes.selectEmpty}
                >
                  {sentido.map((item) =>
                    <MenuItem value={item.Id_els}>{item.nombre_se}</MenuItem>
                  )}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <form className={classes.form} noValidate>

          <Grid item xs={12}>


            <Button disabled={dis} onClick={handleOpen} fullWidth variant="contained" component="label" className={classes.boton2}>
              Agregar Elementos
				</Button>
          </Grid>
          <Dialog
            fullScreen open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            {bodyElem}
          </Dialog>

          <Box mr={0}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow hover>
                    <TableCell>Clave</TableCell>
                    <TableCell align="center">Categoria</TableCell>
                    <TableCell align="center">Concepto</TableCell>
                    <TableCell align="center">Parte</TableCell>
                    <TableCell align="center">Falla</TableCell>
                    <TableCell align="center">Foto de la falla</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {tableDrop()}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={registros.length}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
          <Dialog onClose={handleCl} aria-labelledby="customized-dialog-title" open={op}>
            <DialogTitle id="customized-dialog-title" onClose={handleCl}>
              Fotos de las Fallas
                </DialogTitle>
            <DialogContent dividers>
              <GridList className={classes.gridList} cellHeight={500} cols={2}>
                {getimage()}
              </GridList>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCl} color="primary">
                Cerrar
          </Button>
            </DialogActions>
          </Dialog>



          <ButtonGreeting ver={ver} />

        </form>
      </div>

    </Container>
  );


}
