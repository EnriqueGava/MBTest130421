import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import BackIcon from "@material-ui/icons/ArrowBack";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import SearchInput from "./../../SearchInput";
import SolA from '../../Dialogs/Mantenimiento/SolA';
import { TextField } from "@material-ui/core";
import LevantamientoManD from './../../Dialogs/Mantenimiento/LevantaminetoManD';
import { getData } from '../../../functions';
import axios from 'axios';
import DialogMateriales from "../../Dialogs/Mantenimiento/DialogMateriales";
import {Link} from 'react-router-dom';
import {DevolverHym} from "../../../functions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
  },

  appBar: {
    position: "relative",
    backgroundColor: "#4caf50",
  },

  searchImp: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  table: {
    minWidth: "50",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
  },

  formControl: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    minWidth: "75%",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#9e9e9e",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Almacen = (props) => {
  console.log(props.location.state.idOrden)
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // const [modalShow, setModalShow] = useState(false);

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [openM, setOpenM] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (localStorage.getItem("herramienta"))
      setHerramienta(JSON.parse(localStorage.getItem("herramienta")));
    setOpen(false);
  };

  const handleCloseM = () => {
    if (localStorage.getItem("material"))
      setMaterial(JSON.parse(localStorage.getItem("material")));
    setOpenM(false);
  };


  const [idlevantamiento, setIdlevantamiento] = React.useState(0);
  const [idorden, setIdorden] = React.useState(0);
  const [abrir, setAbrir] = React.useState(false);
  const [herramienta, setHerramienta] = React.useState([]);
  const [material, setMaterial] = React.useState([]);



  const AbrirD = async (id) => {
    setIdorden(id);
    setIdlevantamiento(await getData(id));
    //refresh();
    setAbrir(!abrir)
  };

  React.useEffect(() => {
    if (localStorage.getItem("herramienta"))
      setHerramienta(JSON.parse(localStorage.getItem("herramienta")));
    if (localStorage.getItem("material"))
      setMaterial(JSON.parse(localStorage.getItem("material")));
  }, []);

  const CallBack = (bandera) => {
    if (bandera)
      if (localStorage.getItem("herramienta"))
        setHerramienta(JSON.parse(localStorage.getItem("herramienta")));
  }
  const CallBackMaterial = (bandera) => {
    if (bandera)
      if (localStorage.getItem("material"))
      setMaterial(JSON.parse(localStorage.getItem("material")));
  }

  const Devolver = async (Codigo, Cantidad) => {
    await axios.post("/inventario/devolver", {
      Codigo: Codigo,
      Cantidad: Cantidad
    })
      .then(result => {
        console.log(result)
        if (result.data.success === true) {
          herramienta.map((item,index) => {
            if (item.codigo === Codigo) {
                console.log(item);
                herramienta.splice(index,1);
                localStorage.setItem("herramienta", JSON.stringify(herramienta));
                let aux = [...herramienta];
                setHerramienta(aux);
            }
          });
        }
      })
  };

  const DevolverM = async (Codigo, Cantidad) => {
    await axios.post("/inventario/devolver", {
      Codigo: Codigo,
      Cantidad: Cantidad
    })
      .then(result => {
        console.log(result)
        if (result.data.success === true) {
          material.map((item,index) => {
            if (item.codigo === Codigo) {
                console.log(item);
                material.splice(index,1);
                localStorage.setItem("material", JSON.stringify(material));
                let aux = [...material];
                setMaterial(aux);
            }
          });
        }
      })
      
      
  };


  return (
    <div>
      <Link to={{pathname : "/Mantenimiento/MaLevantamiento",}}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="close"
      >
        <BackIcon />
      </IconButton>
      </Link>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Solicitud de Trabajo para el levantamiento
            <Button onClick={() => AbrirD(props.location.state.idOrden)}>
              {props.location.state.idOrden}
            </Button>
          </Typography>
          <Typography component="h1" variant="h5" align="left">
            ALMACÉN
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={3}></Grid>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Codigo</StyledTableCell>
                      <StyledTableCell align="center">Pieza</StyledTableCell>
                      <StyledTableCell align="center">Nombre</StyledTableCell>
                      <StyledTableCell align="center">Cantidad</StyledTableCell>
                      <StyledTableCell align="center">Eliminar</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {herramienta.map((row) => (
                      <TableRow key={row.codigo}>
                        <TableCell component="th" scope="row">
                          {row.codigo}
                        </TableCell>
                        <TableCell align="center">{row.medida}</TableCell>
                        <TableCell align="center">{row.producto}</TableCell>
                        <TableCell align="center">{row.cantidad}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => Devolver(row.codigo, row.cantidad)} aria-label="delete">
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleOpen}
              >
                Agregar Herramienta
              </Button>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Codigo</StyledTableCell>
                      <StyledTableCell align="center">Pieza</StyledTableCell>
                      <StyledTableCell align="center">Nombre</StyledTableCell>
                      <StyledTableCell align="center">Cantidad</StyledTableCell>
                      <StyledTableCell align="center">Eliminar</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {material.map((row) => (
                        <TableRow key={row.codigo}>
                          <TableCell component="th" scope="row">
                            {row.codigo}
                          </TableCell>
                          <TableCell align="center">{row.medida}</TableCell>
                          <TableCell align="center">{row.producto}</TableCell>
                          <TableCell align="center">{row.cantidad}</TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => DevolverM(row.codigo, row.cantidad)} aria-label="delete">
                              <DeleteIcon color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => setOpenM(true)}
              >
                Agregar Material
              </Button>
            </Grid>
            <SolA open={open} onClose={handleClose} Transition={Transition} callBack={CallBack}/>
            <DialogMateriales openM={openM} onCloseM={handleCloseM} TransitionM={Transition} callBackMaterial={CallBackMaterial}/>
                  

            <Link to={{pathname : "/Mantenimiento/STrabajo", state : {idOrden: props.location.state.idOrden}}}>
            <Button
              type="submit"
              width="25%"
              align="right"
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Siguiente
            </Button>
            </Link>
          </form>
        </div>

        <LevantamientoManD
          open={abrir}
          fun={AbrirD}
          datos={idlevantamiento}
          numOrden={idorden}
        />
      </Container>
    </div>
  );
}

export default Almacen;