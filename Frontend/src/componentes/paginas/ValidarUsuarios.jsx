import React from "react";
import { withStyles, makeStyles, fade } from "@material-ui/core/styles";
import {
    Table,
    TablePagination,
    TextField,
    Icon,
    Container,
    Button,
	Input
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import swal from 'sweetalert'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Box, InputBase } from "@material-ui/core/";
//import SearchInput from "./../SearchInput";
import axios from "axios";
import Cookie from "js-cookie";
import { UserValidation } from "../../functions";
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    buttonColor: {
        backgroundColor: "#FDEE00"
    },
    progressBar: {
        display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
}));

const ValidarUsuario = () => {
    const classes = useStyles();

    const [usuarios, setUsuarios] = React.useState([]);
	const [usuariosF, setUsuariosF] = React.useState([]);
    const [estado, setEstado] = React.useState();
    const [progress, setProgress] = React.useState(true)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [input, setInput] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        axios.get("/users/list").then((result) => {
            setUsuarios(Object.values(Object.values(result.data.data)));
			setUsuariosF(Object.values(Object.values(result.data.data)));
           
            setProgress(false);
        });
    }, []);


    const handleChangeEstado = (event) => {
        setEstado(event.target.value);
    };

    const Actualizar = async(user, estado) => {
        let data = {User_ID: user, state: estado};
        await UserValidation(data)
        .then(result => {
            if(result.data.success){
                swal("Actualización de datos exitosa", "Estado Actualizado", "success");
                setInterval(function(){
                    window.location.replace("/Jud/Usuarios");
                }, 1000);  
            }
        })
    }
	
	const updateInput = (event) => {
		const Nsearch = event.target.value;
		setInput(Nsearch);
			//console.log(Nsearch)
			const filtered = usuarios.filter(item => {
		  return item.Nombre.toLowerCase().includes(Nsearch.toLowerCase())
			})
			 //console.log(filtered)
			 setUsuariosF(filtered);
	}
    console.log(usuariosF);
    return (
        <div>
            {progress ? <LinearProgress  /> :
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
                                        <TableCell align="center">Usuario</TableCell>
                                        <TableCell align="center">Nombre</TableCell>
                                        <TableCell align="center">Estado</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usuariosF
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((item, index) => {
                                        let tabItem = (
                                            <TableRow hover>
                                                <TableCell align="center" component="th" scope="row">
                                                    {item.User_ID}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.Nombre} {item.Apellido}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <FormControl required className={classes.formControl}>
                                                        <InputLabel id="demo-simple-select-required-label"></InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-required-label"
                                                            id='categoria'
                                                            value={estado}
                                                            defaultValue={item.estado}
                                                            onChange={handleChangeEstado}
                                                            displayEmpty
                                                            className={classes.selectEmpty}
                                                        >

                                                            <MenuItem value={false}>Inactivo</MenuItem>
                                                            <MenuItem value={true}>Activo</MenuItem>
                                                            
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" className={classes.buttonColor} onClick={() => Actualizar(item.User_ID, estado)}>Actualizar</Button>
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

                <TablePagination
                    component="div"
                    count={usuariosF.length}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Container>}
        </div>
    );
};

export default ValidarUsuario;
