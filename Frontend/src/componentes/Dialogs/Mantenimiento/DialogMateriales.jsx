import React from "react";
import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    Divider,
    Slide,
    ListItemText,
    Box,
    Grid,
    Container,
    TextField,
	Input
} from "@material-ui/core";
import { Table, TablePagination, Paper } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
//import SearchInput from './../../SearchInput';
import swal from 'sweetalert'
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
        backgroundColor: "#4caf50",
        marginBottom: theme.spacing(2)
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    table: {
        minWidth: 50,
    },
    linepad: {
        offset: theme.mixins.toolbar,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    boton1: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        "&:hover": {
            backgroundColor: red[700],
        },
    },
    boton2: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
    dialogf: {
        backgroundColor: "#f4f6f8",
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

const DialogMateriales = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [material, setMaterial] = React.useState([]);
	const [materialF, setMaterialF] = React.useState([]);
    const [localmaterial, setLocalmaterial] = React.useState([]);
    const [bandera, setBandera] = React.useState(false);
    const [botonesflag, setBotonesFlag] = React.useState([]);
    const [errorfield, setErrorfield] = React.useState([]);
    const [errortextfield, setErrortextfield] = React.useState([]);
    const [cantidad, setCantidad] = React.useState()
	const [input, setInput] = React.useState('');
	
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        axios.get("/inventario/listMaterial")
            .then(result => {
                setMaterial(Object.values(Object.values(result.data))[1]);
				setMaterialF(Object.values(Object.values(result.data))[1]);

            });
        if (localStorage.getItem("material"))
            setLocalmaterial(JSON.parse(localStorage.getItem("material")))
    }, [props.openM]);

    React.useEffect(() => {
        axios.get("/inventario/listMaterial")
            .then(result => {
                setMaterial(Object.values(Object.values(result.data))[1]);

            });
        if (localStorage.getItem("material"))
            setLocalmaterial(JSON.parse(localStorage.getItem("material")))
    }, []);

    React.useEffect(() => {
        material.map(e => {
            setErrorfield(oldArray => [...oldArray, false]);
            setErrortextfield(oldArray => [...oldArray, ""]);
            setBotonesFlag(oldArray => [...oldArray, false]);
        });

    }, [material.length])

    React.useEffect(() => {
        if (bandera) {
            console.log(localmaterial);
            localStorage.setItem("material", JSON.stringify(localmaterial));
            props.callBackMaterial(true);
        }
    }, [localmaterial]);
	
	const updateInput = async(event) => {
     const filtered = material.filter(row => {
      return row.Producto.toLowerCase().includes(input)
     })
	 
	 setInput(event.target.value);
     setMaterialF(filtered);
	}

		

    const Apartar = async(Codigo, Cantidad) => {
        await axios.post("/inventario/apartar", {
            Codigo: Codigo,
            Cantidad: Cantidad 
        })
        .then(result => {
            console.log(result)
            if(result.data.success === true){
                swal("Material Agregado", "", "success")
                .then(props.onCloseM);
            }
        })
    }

    const AgregarMaterial = (Codigo, Medida, Producto, Cantidad) => {
        if(Cantidad>0)
        {
        let datos = {};
        console.log(localmaterial.length)
        if (localmaterial.length < 1) {
            datos = {
                codigo: Codigo,
                medida: Medida,
                producto: Producto,
                cantidad: Cantidad
            };
            console.log(datos);
            setCantidad();
            setLocalmaterial(oldArray => [...oldArray, datos]);
            setBandera(true);
        }
        else {
            datos = {
                codigo: Codigo,
                medida: Medida,
                producto: Producto,
                cantidad: Cantidad
            };
            let aux = {};
            //console.log(localmaterial[0])
            console.log((aux = localmaterial.find(item => item.codigo === Codigo)))
            if (typeof aux === "undefined") {
                console.log(datos);
                setCantidad();
                setLocalmaterial(oldArray => [...oldArray, datos]);
                setBandera(true);
            }
            else {
                console.log("elemento encontrado");
                localmaterial.map(item => {
                    if (item.codigo === Codigo) {
                        item.cantidad = parseInt(item.cantidad) + parseInt(Cantidad);
                    }
                });

                localStorage.setItem("material", JSON.stringify(localmaterial));
                setCantidad();
                setBandera(true);
            }


        }

        Apartar(Codigo,Cantidad);

        }else{
            swal("Elige al menos una herramienta", "", "error")
        }
    }

    const handleChangeCantidad = (Cantidad, Existencia, index) => {
        console.log(index);
        let aux = [...errorfield];
        let aux2 = [...errortextfield];
        let aux3 = [...botonesflag];
        if (Cantidad > Existencia) {
            aux[index] = true;
            aux2[index] = "Cantidad no valida";
            aux3[index] = true;
            setErrorfield(aux);
            setErrortextfield(aux2);
            setBotonesFlag(aux3);
        }
        else {
            aux[index] = false;
            aux2[index] = "";
            aux3[index] = false;
            setErrorfield(aux);
            setErrortextfield(aux2);
            setBotonesFlag(aux3);
            setCantidad(Cantidad);
        }

    };
    console.log(localmaterial);



    const AddButton = (Codigo, Medida, Producto, cantidad, disable) => {
        return <IconButton disabled={disable} onClick={() => AgregarMaterial(Codigo, Medida, Producto, cantidad)} aria-label="delete">
            <AddIcon />
        </IconButton>
    }

    console.log(props.openM);

    const classes = useStyles();
    return (
        <Container>
            <Dialog
                fullScreen
                open={props.openM}
                onClose={props.onCloseM}
                TransitionComponent={props.TransitionM}
                classes={{ paper: classes.dialogf }}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onCloseM}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Container className={classes.searchImp}>
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
                        <Grid item xs={6} sm={12}>
                            <Box mr={0}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Codigo</TableCell>
                                            <TableCell align="center">Medida</TableCell>
                                            <TableCell align="center">Material</TableCell>
                                            <TableCell align="center">Cantidad</TableCell>
                                            <TableCell align="center">Existencia</TableCell>
                                            <TableCell align="center">Agregar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {materialF
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            let tablaInventario = (
                                                <TableRow hover key={row.Codigo}>
                                                    <TableCell align="center">{row.Codigo}</TableCell>
                                                    <TableCell align="center">{row.Medida}</TableCell>
                                                    <TableCell align="center" component="th" scope="row">
                                                        {row.Producto}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <TextField
                                                            align="center"
                                                            id={"id-"+row.Codigo}
                                                            variant="outlined"
                                                            size="small"
                                                            error={errorfield[index]}
                                                            helperText={errortextfield[index]}
                                                            onChange={cantidad => handleChangeCantidad(cantidad.target.value, row.Existencia, index)}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">{row.Existencia}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton disabled={row.Existencia<1 ? true : botonesflag[index]} onClick={() => AgregarMaterial(row.Codigo, row.Medida, row.Producto, cantidad)} aria-label="delete">
                                                            <AddIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                            return tablaInventario
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={100}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Container>
            </Dialog>
        </Container>
    );
};

export default DialogMateriales;
