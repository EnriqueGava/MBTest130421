import React from 'react'
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import { Table, TablePagination, TextField, Icon, Container, Input } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple, red, yellow } from '@material-ui/core/colors';
import { Grid, Box, InputBase } from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import SearchInput from './../../SearchInput';
import SearchIcon from '@material-ui/icons/Search'
import LevantamientoDS from './../../Dialogs/Supervisor/LevantamientoDS';
import { CheckCircle, Cancel, HourglassFull } from '@material-ui/icons';
import axios from 'axios';
import {getData} from '../../../functions';
import Cookie from 'js-cookie';
const Levantamiento = () => {

        const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    

    const [levantamientos, setLevantamientos] = React.useState([]);
	const [levantamientosF, setLevantamientosF] = React.useState([]);
    const [idlevantamiento, setIdlevantamiento] = React.useState(0);
	const [idorden, setIdorden] = React.useState(0);
    const [user, setUser] = React.useState({});
	const [input, setInput] = React.useState('');
	const [firma, setFirma] = React.useState(true);
    React.useEffect(() => {
        axios.get(`/levantamientos/listar`)
          .then(result => {
            setLevantamientos(Object.values(Object.values(result.data)));
			setLevantamientosF(Object.values(Object.values(result.data)));
          });
        axios.post("/users/user", {token : Cookie.get("Token")})
          .then(data => {
            axios.get(`/jdsp/dsup/${data.data.user}`)
            .then(result => {
              setUser(Object.values(Object.values(result.data))[0]);
            });
        })
        
        
    }, []);

    console.log(user);


    const useStyles = makeStyles(theme => ({
        table: {
            minWidth: 50
        },
        margin: {
            margin: theme.spacing(1),
        },
        Box: {
            backgroundColor: theme.palette.grey[200],
            width: 300,
            marginBottom: 7,

        },
        Font: {
            marginBottom: 2,
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

		},
        root: {

        }

    }));

    const [abrir, setAbrir] = React.useState(false)
	
	const refresh = async() =>{
		 await axios.get(`/levantamientos/listar`)
          .then(result => {
            setLevantamientos(Object.values(Object.values(result.data)));
          });
	}
	
    const AbrirD = async(id,firma) => {
		 console.log(firma)
        if(firma===null)
            setFirma(true);
        else
            setFirma(false);
		setIdorden(id);
        setIdlevantamiento(await getData(id));
		refresh();
        setAbrir(!abrir)
    };
	
	const updateInput = (event) => {
		const Lsearch = event.target.value;
		setInput(Lsearch);
		console.log(Lsearch)
			const filtered = levantamientos.filter(item => {
		  return item.Id_numorden.toString().includes(Lsearch)
			})
			 console.log(filtered)
			 setLevantamientosF(filtered);
	}

    const classes = useStyles();

    const Firma = (firma) => {
        if(firma===null)
            return <HourglassFull variant="contained" style={{ color: "#FFD700" }} fontSize="large" className={classes.margin} />
        else if(firma===0)
            return <Cancel variant="contained" style={{ color: "red" }} fontSize="large" className={classes.margin} />
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
                                <TableRow>
                                    <TableCell align="center">Numero de levantamiento</TableCell>
                                    <TableCell align="center">Fecha</TableCell>
                                    <TableCell align="center">Rev. Jud</TableCell>
                                    <TableCell align="center">Rev. Supervisor</TableCell>
                                    <TableCell align="center">Concluido</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                            {levantamientosF
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => {
                                    let tabItem = (
                                        <TableRow hover>
                                            <TableCell align="center" component="th" scope="row">
                                                <Button onClick={() => AbrirD(item.Id_numorden, item.firmasup)}>{item.Id_numorden}</Button>
                                            </TableCell>
                                    <TableCell align="center">{item.Fecha}</TableCell>
                                            <TableCell align="center">
                                                {Firma(item.firmaJud)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {Firma(item.firmasup)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <HourglassFull variant="contained" style={{ color: "#FFD700" }} fontSize="large" className={classes.margin} />
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

            <LevantamientoDS open={abrir} fun={AbrirD} datos={idlevantamiento} numOrden={idorden} idSup={user.Supervisor_Id} firma={firma}/>

            <TablePagination
                component="div"
                count={levantamientosF.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Container>
    );
}

export default withRouter(Levantamiento);