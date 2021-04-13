import React,{useState, useEffect} from 'react'
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
import {getImgs,getImgsf} from '../../../functions';
import axios from 'axios';


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
    },
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




const SolicitudTD = (props) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [data, setData] = useState([]);
	const [fallas, setFallas] = useState([]);
	const [imagenReg, setImReg] = React.useState([]);
    const [imagenRegF, setImRegF] = React.useState([]);
    const [imagenes, setImagenes] = useState({value: null});
    const [imagenesf, setImagenesf] = useState({value: null});
	const [op, setOp] = React.useState(false);
	const [opf, setOpF] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
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

    useEffect(() => {
        axios.post('/strabajo/mostrarst',{id: props.idst})
        .then(result => {
            setData(Object.values(Object.values(result.data))[1]);
        })
    }, [props.open]);

    console.log(props.idst);
	
		    useEffect(() => {
        axios.get(`/registro/list/${data.slice(0,1).map(item => {return item.NumO})[0]}`)
        .then(result => {
            setFallas(result.data)})
    }, [data]);
	
	    useEffect(() => {
        imagenes['value'] = imagenReg;
    },[imagenReg]);

    useEffect(() => {
        imagenesf['value'] = imagenRegF;
    },[imagenRegF]);
	
	
	    function getimage() {
        if(imagenes.value){
            return imagenes.value.map((item) => {
                                   let img = (	
                                   <GridListTile>
                                           <img src={"data:image/png;base64,"+item} width="400" height="400" />
                                           
                                   </GridListTile>		
                                   );
                                       return img;
            })
            }
     else
       return "";
   }

   function getimageF() {
    if(imagenesf.value){
        return imagenesf.value.map((item) => {
                               let img = (	
                               <GridListTile>
                                       <img src={"data:image/png;base64,"+item} width="400" height="400" />
                                       
                               </GridListTile>		
                               );
                                   return img;
        })
        }
 else
   return "";
}
	
	const levantamientos = () => {
       //console.log(fallas)
    if (fallas.length > 0) {
      return fallas.map((item) => {
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
                     <Button onClick={() => ImRegF(item.Id_elemento)}><ImageIcon fontSize="large" /></Button>
                </TableCell>
            </TableRow>
        );
        return tabItem;
      })
    }
  }

    const classes = useStyles();
    return (
        <Container>

            <Dialog fullScreen open={props.open} onClose={props.fun} classes={{ paper: classes.dialogf }} >
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
                                    <TableCell align="center">Solicitud de trabajo</TableCell>
                                    <TableCell align="center">Solicitud de almacen</TableCell>
                                    <TableCell align="center">Numero de Levantamiento</TableCell>
                                    <TableCell align="center">Cuadrilla</TableCell>
                                    <TableCell align="center">Encargado</TableCell>
									<TableCell align="center">Acompañante</TableCell>
                                    <TableCell align="center">Vehículo</TableCell>
									<TableCell align="center">Placa</TableCell>
									<TableCell align="center">Modelo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {data.slice(0,1).map((item) => {
									console.log(item)
                                    let tabla = (
                                        <TableRow hover>
                                            <TableCell align="center">{item.ST}</TableCell>
                                            <TableCell align="center">{item.SA}</TableCell>
                                            <TableCell align="center">{item.NumO}</TableCell>
                                            <TableCell align="center">{item.NumCua}</TableCell>
                                            <TableCell align="center">{item.nombre + " " + item.apellido}</TableCell>
											<TableCell align="center">{item.NombreP + " " + item.ApellidoP}</TableCell>
											<TableCell align="center">{item.Marca}</TableCell>
											<TableCell align="center">{item.Placa}</TableCell>
											<TableCell align="center">{item.Modelo}</TableCell>
                                            
                                        </TableRow>
                                    );
                                    return tabla;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={data.slice(0,1).length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
				{props.fechaF?
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center" className={classes.cell}>Clave</TableCell>
                                    <TableCell align="center" className={classes.cell}>Categoria</TableCell>
                                    <TableCell align="center" className={classes.cell}>Concepto</TableCell>
                                    <TableCell align="center" className={classes.cell}>Parte</TableCell>
                                    <TableCell align="center" className={classes.cell}>Falla</TableCell>
                                    <TableCell align="center" className={classes.cell}>Fotos de la falla</TableCell>
                                    <TableCell align="center" className={classes.cell}>Reparación</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
								{levantamientos()}
                            </TableBody>
                        </Table>
                    </TableContainer>
					:<div/>}
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

export default SolicitudTD;