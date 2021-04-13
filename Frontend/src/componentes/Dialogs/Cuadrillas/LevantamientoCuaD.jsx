import React, { useState, useEffect } from 'react'
import {
    Button, Dialog, AppBar, Toolbar,
    Typography, IconButton, List,
    ListItem, Divider, Slide, ListItemText,
    Box,
    Grid,
    Container,
    GridList,
    GridListTile
} from '@material-ui/core';
import { Table, TablePagination, Paper } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ImageIcon from '@material-ui/icons/Image';
import { getData, getImgs, getImgsf } from '../../../functions';
import axios from 'axios';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ModalSubirImagen from './ModalSubirImagen';

import Cookie from 'js-cookie';
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
        backgroundColor: "#4caf50",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    table: {
        minWidth: 50
    },
    linepad: {
        offset: theme.mixins.toolbar,
    },
    root: {
        flexGrow: 1,
    },
    boton2: {
        margin: theme.spacing(3, 0, 2),
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    boton1: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    boton2: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    dialogf: {
        backgroundColor: "#f4f6f8",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    separator: {
        margin: 10,
    },
    cell: {
        background: theme.palette.grey[400]
    }
}));
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



const LevantamientoCD = (props) => {

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [op, setOp] = React.useState(false);

    const [opf, setOpF] = React.useState(false);
    const [datos, setDatos] = useState([]);
    const [datoss, setDatoss] = useState([]);
    const [fallas, setFallas] = useState([]);
    const [imagenReg, setImReg] = React.useState([]);

    const [fechafin, setFechaFin] = React.useState({imagenes: true});
    const [prueba, setPrueba] = React.useState([false, false, true]);
    const [imagenRegF, setImRegF] = React.useState([]);
    const [imagenes, setImagenes] = useState({ value: null });
    const [imagenesf, setImagenesf] = useState({ value: null });


    useEffect(() => {
        axios.post("/cuadrilla/listmatyveh", { strabajo: props.idST })
            .then((result) => {
                console.log(result);
                setDatos(Object.values(Object.values(result.data.data)));
            })
    }, [props.idST]);

    useEffect(() => {
        axios.get(`/registro/list/${datos.slice(0, 1).map(item => { return item.NumOrden })[0]}`)
            .then(result => {
                setFallas(result.data)
            })
    }, [datos]);



    useEffect(() => {
        imagenes['value'] = imagenReg;
    }, [imagenReg]);

    useEffect(() => {
        imagenesf['value'] = imagenRegF;
    }, [imagenRegF]);

    const Refresh = () => {
        axios.post("/cuadrilla/listmatyveh", { strabajo: props.idST })
            .then((result) => {
                console.log(result);
                setDatos(Object.values(Object.values(result.data.data)));
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleOpen = (datoss) => {
        setDatoss(datoss);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOp = () => {
        setOp(true);
    };

    const handleOpF = () => {
        setOpF(true);
    };

    const handleCl = () => {
        setOp(false);

    };

    const handleClF = () => {
        setOpF(false);

    };
    const ImReg = async (id) => {
        setImReg(await getImgs(id));
        handleOp();
        //console.log(imagenReg);
    }
    const ImRegF = async (id) => {
        setImRegF(await getImgsf(id));
        handleOpF();
        //console.log(imagenReg);
    }

    const ActualizarFecha = () => {
        console.log("entre");
        axios.post("/strabajo/fechafin", { id: props.idST })
            .then(result => {
                console.log(result);
                if (result.data.success === true) {
                    swal("Solicitud Terminada", "", "success");
                    setInterval(function () {
                        window.location.replace("/Cuadrilla/levantamientos_cu");
                    }, 1000);
                }
            });
    }
    function getimage() {
        if (imagenes.value) {
            return imagenes.value.map((item) => {
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

    function getimageF() {
        if (imagenesf.value) {
            return imagenesf.value.map((item) => {
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


    const levantamientos = () => {
        console.log(fallas)
        let aux = [];
        if (fallas.length > 0) {
            return fallas.map((item) => {
                if (typeof (item.imagenf) === 'object'){
                    aux.push(false);
                }
                else{
                    aux.push(true);
                }

                let tabItem = (
                    <TableRow hover>
                        <TableCell align="center"> {item.Id_cc} </TableCell>
                        <TableCell align="center">{item.nombre_ca}</TableCell>
                        <TableCell align="center">{item.nombre_co}</TableCell>
                        <TableCell align="center">{item.nombre_pa}</TableCell>
                        <TableCell align="center">{item.falla}</TableCell>
                        <TableCell align="center">
                            <Button onClick={() => ImReg(item.Id_elemento)}><ImageIcon fontSize="large" /></Button>
                        </TableCell>
                        <TableCell align="center">
                            {
                                typeof (item.imagenf) === "object" ?
                                    <IconButton onClick={() => handleOpen(item.Id_elemento)}>
                                        <AddAPhotoIcon />
                                    </IconButton>
                                    :
                                    <Button onClick={() => ImRegF(item.Id_elemento)}><ImageIcon fontSize="large" /></Button>
                            }
                        </TableCell>
                    </TableRow>
                );
                console.log(aux)
                console.log(aux.indexOf(false));
                if(aux.indexOf(false) != -1){
                   fechafin['imagenes'] = false;
                }
                else
                    fechafin['imagenes'] = true;

                return tabItem;
                
            })

        }

    }
    console.log(fechafin.imagenes);


    const classes = useStyles();
    console.log(props.fecha)
    return (
        
        <Container>

            <Dialog fullScreen open={props.open} onClose={props.fun} classes={{ paper: classes.dialogf }}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton autoFocus edge="start" color="inherit" onClick={props.fun}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Box p={3}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center" className={classes.cell}>Solicitud de Trabajo</TableCell>
                                    <TableCell align="center" className={classes.cell}>Solicitud de Almacen</TableCell>
                                    <TableCell align="center" className={classes.cell}>Levantamiento</TableCell>
                                    <TableCell align="center" className={classes.cell}>Acompañante</TableCell>
                                    <TableCell align="center" className={classes.cell}>Vehiculo</TableCell>
                                    <TableCell align="center" className={classes.cell}>Placa</TableCell>
                                    <TableCell align="center" className={classes.cell}>Modelo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                {datos.slice(0, 1).map(item => {
                                    let datos = (
                                        <TableRow hover>
                                            <TableCell align="center">{item.NumST}</TableCell>
                                            <TableCell align="center">{item.NumSA}</TableCell>
                                            <TableCell align="center">{item.NumOrden}</TableCell>
                                            <TableCell align="center">{item.NombreP + " " + item.ApellidoP}</TableCell>
                                            <TableCell align="center">{item.Marca}</TableCell>
                                            <TableCell align="center">{item.Placa}</TableCell>
                                            <TableCell align="center">{item.Modelo}</TableCell>
                                        </TableRow>
                                    )
                                    return datos;
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

                <Divider light className={classes.separator} />
                <Box p={3}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center" className={classes.cell}>Codigo</TableCell>
                                    <TableCell align="center" className={classes.cell}>Herramienta</TableCell>
                                    <TableCell align="center" className={classes.cell}>Cantidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datos.map(item => {
                                    let material = (
                                        item.Tipo === 0 ?
                                            <TableRow hover>
                                                <TableCell align="center">{item.codigo}</TableCell>
                                                <TableCell align="center">{item.producto}</TableCell>
                                                <TableCell align="center">{item.Cantidad}</TableCell>
                                            </TableRow> : <div></div>
                                    )
                                    return material;
                                })

                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Divider light className={classes.separator} />

                <Box p={3}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center" className={classes.cell}>Codigo</TableCell>
                                    <TableCell align="center" className={classes.cell}>Material</TableCell>
                                    <TableCell align="center" className={classes.cell}>Cantidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datos.map(item => {
                                    let material = (
                                        item.Tipo === 1 ?
                                            <TableRow hover>
                                                <TableCell align="center">{item.codigo}</TableCell>
                                                <TableCell align="center">{item.producto}</TableCell>
                                                <TableCell align="center">{item.Cantidad}</TableCell>
                                            </TableRow> : <div></div>
                                    )
                                    return material;
                                })

                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Divider light className={classes.separator} />

                <Box p={3}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center" className={classes.cell}>Clave</TableCell>
                                    <TableCell align="center" className={classes.cell}>Categoria</TableCell>
                                    <TableCell align="center" className={classes.cell}>Concepto</TableCell>
                                    <TableCell align="center" className={classes.cell}>Parte</TableCell>
                                    <TableCell align="center" className={classes.cell}>Falla</TableCell>
                                    <TableCell align="center" className={classes.cell}>Foto de la falla</TableCell>
                                    <TableCell align="center" className={classes.cell}>Subir foto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {levantamientos()
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ModalSubirImagen open={open} handleClose={handleClose} cood={datoss} Refresh={Refresh} />
                </Box>

                {fechafin.imagenes ? 
                <Container>
                <Grid item alignItems="center">
                    <Box display="flex" flexDirection="row-reverse">
                    
                    {typeof(props.fecha) === "object" ? <Button onClick={() => ActualizarFecha()}
                        alignItems="center"
                        disabled={false}
                        type="submit"
                        width="25%"
                        align="right"
                        variant="contained"
                        color="secondary"
                        className={classes.boton2}
                    >
                        Finalizar
				</Button> : <div/>}
                </Box>
                </Grid>
                </Container> : <div/> }




            </Dialog>

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


            <Dialog onClose={handleClF} aria-labelledby="customized-dialog-title" open={opf}>
                <DialogTitle id="customized-dialog-title" onClose={handleClF}>
                    Fotos de la Reparacion
                </DialogTitle>
                <DialogContent dividers>
                    <GridList className={classes.gridList} cellHeight={500} cols={2}>
                        {getimageF()}
                    </GridList>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClF} color="primary">
                        Cerrar
          </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );

}

export default LevantamientoCD;