import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TablePagination, TextField, Icon, Container } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple, red, yellow } from '@material-ui/core/colors';
import { Grid, Box } from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input'
import axios from "axios";
import Cookie from 'js-cookie'
import SearchInput from './../SearchInput';
import SolicitudTD from './../Dialogs/SolicitudTD';
import SolicitudAD from './../Dialogs/SolicitudAD';
import { CheckCircle, Cancel, HourglassFull } from '@material-ui/icons';
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);
const ColorButton1 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);
const ColorButton2 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
}))(Button);



const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 50
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
const SolicitudT = () => {
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};



  const classes = useStyles();
  
  const [solicitudest,setSolicitudest]= React.useState([]);
  const [solicitudestF,setSolicitudestF]= React.useState([]);
  const [user, setUser] = React.useState({});  
  const [idSA, setIdSA] = React.useState(0);
  const [idST, setIdST] = React.useState(0);
  const [endDate, SetEndDate] = React.useState(false);
  const [firmaJ, SetFirma] = React.useState(false);
  const [abrir, setAbrir] = React.useState(false);
  const [abrirT, setAbrirT] = React.useState(false);
  const [input, setInput] = React.useState('');
  
  React.useEffect(() => {
    axios.get("/strabajo/listst").then((result) => {
      setSolicitudest(Object.values(Object.values(result.data))[1]);
	  setSolicitudestF(Object.values(Object.values(result.data))[1]);
    });
	
	axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
            axios.get(`/jdsp/djud/${data.data.user}`)
          .then(result => {
            setUser(Object.values(Object.values(result.data))[0]);
          });
        })
  }, []);
      console.log(user);
	  
	const refresh = async() =>{
		 await axios.get("/strabajo/listst").then((result) => {
			  setSolicitudest(Object.values(Object.values(result.data))[1]);
			  setSolicitudestF(Object.values(Object.values(result.data))[1]);
			});
	}	  
  
  const AbrirSA = async(id) => {
    setIdSA(id);
    setAbrir(!abrir);
};
const AbrirST = async(id,ffin,firma) => {
  setIdST(id);
  ffin===null? SetEndDate(false):SetEndDate(true);
  console.log(firma)
  firma===null? SetFirma(true):SetFirma(false);
  refresh();
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
                <TableRow hover>
                  <TableCell align="center" component="th" scope="row">
                    <Button onClick={() => AbrirST(item.NumST, item.fecha_fin, item.firmaJud)}>
                    
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
      <SolicitudTD open={abrirT} fun={AbrirST} idst={idST} idJud={user.Id_Jud} fechaF={endDate} firma={firmaJ}/>
      <SolicitudAD open={abrir} fun={AbrirSA} idsa={idSA}/>
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

export default withRouter(SolicitudT);