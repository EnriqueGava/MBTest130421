import React from 'react'
import {
    Button, Dialog, AppBar, Toolbar,
    Typography, IconButton, List,
    ListItem, Divider, Slide, ListItemText,
    Box,
    Grid,
    Container,
    GridList,
    GridListTile,
    DialogTitle,
    DialogContent,
    DialogActions
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
import ImageIcon from '@material-ui/icons/Image';
import { ReceiptTwoTone } from '@material-ui/icons';
import axios from 'axios';
import { getImgs } from './../../../functions';

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


const LevantamientoCD = (props) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [op, setOp] = React.useState(false);
    const [data, setData] = React.useState({
        id_cc: ""
    });
    const [imagenReg, setImReg] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOp = () => {
        setOp(true);
    };

    const handleCl = () => {
        setOp(false);
         
    };

    const ImReg = async (id) => {
        setImReg(await getImgs(id));
        handleOp();
        //console.log(imagenReg);
    }
    console.log(props.datos)

    /*React.useEffect(() => {
        if (props.datos.length > 0) {
            props.datos.map(item => data.id_cc = item.Id_cc);
            props.datos.map(item => data.nombre_ca = item.nombre_ca);
            props.datos.map(item => data.nombre_co = item.nombre_co);
            props.datos.map(item => data.nombre_pa = item.nombre_pa);
            props.datos.map(item => data.falla = item.falla);
            props.datos.map(item => data.Id_elemento = item.Id_elemento);
            
            
            
        }

    }, [props]);*/

    function levantamientos() {
        if (props.datos.length > 0) {
          return props.datos.map((item) => {
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
                </TableRow>
            );
            return tabItem;
          })
    
        }
      }

    function getimage() {
        if(imagenReg){
            return imagenReg.map((item) => {
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


    const classes = useStyles();
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
                                    <TableCell align="center">Clave</TableCell>
                                    <TableCell align="center">Categoria</TableCell>
                                    <TableCell align="center">Concepto</TableCell>
                                    <TableCell align="center">Parte</TableCell>
                                    <TableCell align="center">Falla</TableCell>
                                    <TableCell align="center">Foto de la falla</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {levantamientos()}

                            
                                

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={props.datos.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>

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


        </Container>
    );
}

export default LevantamientoCD;