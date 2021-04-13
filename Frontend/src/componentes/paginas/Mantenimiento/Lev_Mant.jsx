import React from "react";
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
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Search";
import axios from "axios";
import Cookie from 'js-cookie'
import Almacen from "./Almacen";
import {Link} from "react-router-dom"
import LevantamientoManD from "../../Dialogs/Mantenimiento/LevantaminetoManD";
import {getData, getEL} from '../../../functions';
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(number, date) {
  return { number, date };
}

const rows = [
  createData(1300, "18/05/2020"),
  createData(1301, "25/06/2020"),
  createData(1302, "27/06/2020"),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  table: {
    minWidth: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [levantamientos, setLevantamientos] = React.useState([]);
  const [solicitud, setSolicitud] = React.useState(false);
  const [idlevantamiento, setIdlevantamiento] = React.useState(0);
  const [user, setUser] = React.useState({});
  const [lineEst, setLineEst] = React.useState(0);											  
  const [idorden, setIdorden] = React.useState(0);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  React.useEffect(() => {
    axios.get("/levantamientos/mantenimiento").then((result) => {
      setLevantamientos(Object.values(Object.values(result.data))[1]);
    });
	
	axios.post("/users/user", {token : Cookie.get("Token")})
          .then(data => {
            axios.get(`/jdsp/dmant/${data.data.user}`)
            .then(result => {
              setUser(Object.values(Object.values(result.data))[0]);
            });
			
        })
  }, []);
  console.log(user)

  const [abrir, setAbrir] = React.useState(false)
	
	const refresh = async() =>{
		 await axios.get(`/levantamientos/mantenimiento`)
          .then(result => {
            setLevantamientos(Object.values(Object.values(result.data))[1]);
          });
	}
	
    const AbrirD = async(id) => {
		    setIdorden(id);
        setIdlevantamiento(await getData(id));
		setLineEst(await getEL(id));					  
		    //refresh();
        setAbrir(!abrir)
    };

    const HacerSolicitud = (bandera, id) => {
      setSolicitud(bandera);
      setIdorden(id);
    }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="left">
          Levantamientos
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow hover>
                    <TableCell align="center">Número</TableCell>
                    <TableCell align="center">Fecha</TableCell>
                    <TableCell align="center">Solicitar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {levantamientos.map((item) => {
                    let tabItem = (
                      <TableRow hover>
                        <TableCell align="center" component="th" scope="row">
                          <Button onClick={() => AbrirD(item.Id_numorden)}>
                            {item.Id_numorden}
                          </Button>
                        </TableCell>
                        <TableCell align="center">{item.Fecha}</TableCell>
                        <TableCell align="center">
                          <Link to={{pathname : "/Mantenimiento/Almacen", state : {idOrden: item.Id_numorden}}}>
                          <IconButton>
                            <CheckIcon />
                          </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                    return tabItem;
                  })}
                  
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={levantamientos.length}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <LevantamientoManD open={abrir} fun={AbrirD} datos={idlevantamiento} numOrden={idorden} idMant={user} lineaest={lineEst}/>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
