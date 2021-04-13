import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SoldT from '../../Dialogs/Mantenimiento/SolT';
import SoldA from '../../Dialogs/Mantenimiento/SolA'
import IconButton from '@material-ui/core/IconButton';
import { CheckCircle, Cancel, HourglassFull } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Search';
import SearchInput from '../../SearchInput'; 
import SearchIcon from '@material-ui/icons/Search'
import axios from "axios";
import Input from '@material-ui/core/Input';
import SolAlmacen from "../../Dialogs/Mantenimiento/SolAlmacenD"
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  
];

function createData(number, date) {
  return { number, date};
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
   paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
	 
  },
	table: {
		minWidth: "100%",
	},
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
	marginRight: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
  rootS: {
        borderRadius: '5px',
        padding: theme.spacing(1),
        marginBottom: 16,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .5)',
    },
    icon: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    input: {
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '-0.05px'
    }
}));



export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [solicitudest,setSolicitudest]= React.useState([]);
    const [solicitudestF,setSolicitudestF]= React.useState([]);
  const [idSA, setIdSA] = React.useState(0);
  const [idST, setIdST] = React.useState(0);
  const [endDate, SetEndDate] = React.useState(false);
  const [idorden, setIdorden] = React.useState(0);
  const [abrir, setAbrir] = React.useState(false);
  const [abrirT, setAbrirT] = React.useState(false);
  const [input, setInput] = React.useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  React.useEffect(() => {
    axios.get("/strabajo/listst").then((result) => {
      setSolicitudest(Object.values(Object.values(result.data))[1]);
	  setSolicitudestF(Object.values(Object.values(result.data))[1]);
    });
  }, []);
  const AbrirSA = async(id) => {
    console.log(id);
    if(typeof id === 'number')
      setIdSA(id);
    
    setAbrir(!abrir);
};
const AbrirST = async(id,ffin) => {
  if(typeof id === 'number')
    setIdST(id);

  ffin===null? SetEndDate(false):SetEndDate(true);
  setAbrirT(!abrirT);
};

const updateInput = async(event) => {
		const Ssearch = event.target.value;
		let filtT = "";
		let filtA = "";
		setInput(Ssearch);
		filtT = solicitudest.filter(row => {
      return row.NumST.toString().includes(Ssearch)
     })
		filtA = solicitudest.filter(row => {
      return row.NumSA.toString().includes(Ssearch)
     })
	 //console.log(filtT.concat(filtA));
     setSolicitudestF(Array.from(new Set(filtT.concat(filtA))));
	 
	}
	
	    const EstadoSol = (std) => {
        if(std===null)
            return <HourglassFull variant="contained" style={{ color: "#FFD700" }} fontSize="large" className={classes.margin} />
        else
            return <CheckCircle variant="contained" style={{ color: "green" }} fontSize="large" className={classes.margin} />

    }

  return (
    <Container>
        <Grid container direction="row" alignItems="flex-end" justify="flex-end">
						<Paper
						className={classes.rootS}>
							<SearchIcon className={classes.icon} />
							<Input
								className={classes.input}
								disableUnderline
								placeholder={"Buscar"}
								value= {input}
								onChange={updateInput}
							/>
						</Paper>
					</Grid>
<TableContainer component={Paper}>
        <Grid item xs={12}>
          <Box mr={0}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover >
                  <TableCell align="center">Solicitud de Trabajo</TableCell>
                  <TableCell align="center">Solicitud de Almacén</TableCell>
                  <TableCell align="center">Fecha de Inicio</TableCell>
                  <TableCell align="center">Fecha Final</TableCell>
                  <TableCell align="center">Estado</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {solicitudestF.map((item) => {
                  let tabItem = (
                <TableRow hover key={item.NumST}>
                  <TableCell align="center" component="th" scope="row">
                    <Button onClick={() => AbrirST(item.NumST, item.fecha_fin)}>
                    
                    {item.NumST}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                  <Button onClick={() => AbrirSA(item.NumSA)}>
                    {item.NumSA}
                    </Button>
                  </TableCell>
                  <TableCell align="center">{item.fecha_inicio}</TableCell>
                  <TableCell align="center">{item.fecha_fin}</TableCell>
                  <TableCell align="center">
                  {EstadoSol(item.fecha_fin)}
                  </TableCell>
                    
                </TableRow>
                  );
                  return tabItem;
                })}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </TableContainer>
      <SolAlmacen open={abrir} fun={AbrirSA} idsa={idSA} />
      <SoldT open={abrirT} fun={AbrirST} idst={idST} fechaF={endDate}/>
      <TablePagination
                component="div"
                count={solicitudest.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
    </Container>
  );
}