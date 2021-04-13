import React from 'react'
import {
    Button, Dialog, AppBar, Toolbar,
    Typography, IconButton, List,
    ListItem, Divider, Slide, ListItemText,
    Box,
    Grid,
    Container
} from '@material-ui/core';
import { Table, TablePagination, Paper} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';





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
    }
}));


const SolicitudAD = (props) => {
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
   
    const classes = useStyles();
    return (
        <Container>

            <Dialog fullScreen open={props.open} onClose={props.fun} classes={{paper: classes.dialogf}}>
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
                                    <TableCell align="center" colSpan={2}>Material</TableCell>

                                    <TableCell align="center" >Herramienta</TableCell>

                                    <TableCell align="center" colSpan={3}>Vehiculo</TableCell>
                                  

                                </TableRow>


                            </TableHead>
                            <TableBody>
                            <TableRow hover>
                                    
                                    <TableCell align="center">Concepto</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center "> </TableCell>
                                    <TableCell align="center">Marca</TableCell>
                                    <TableCell align="center">Modelo</TableCell>
                                    <TableCell align="center">Kilometraje</TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell align="center">Tuerca de Seguridad de 1/4"</TableCell>
                                    <TableCell align="center">105</TableCell>
                                    <TableCell align="center">pinzas de punta </TableCell>
                                    <TableCell align="center"rowSpan={3}>Ford </TableCell>
                                    <TableCell align="center"rowSpan={3}>F-105 </TableCell>
                                    <TableCell align="center"rowSpan={3}>150000 </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell align="center">Tornillo de cabeza hexagonal con ranura recto de 2 x 8 x 1/4"</TableCell>
                                    <TableCell align="center">105</TableCell>
                                    <TableCell align="center">pinzas de corte diagonal </TableCell>
                                
                                </TableRow>
                                <TableRow hover>
                                    <TableCell align="center">Rondanas planas de 1/4"</TableCell>
                                    <TableCell align="center">105</TableCell>
                                    <TableCell align="center">pinzas de electricista</TableCell>
                                   
                                </TableRow>
                                

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={100}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>

            </Dialog>
        </Container>
    );
}

export default SolicitudAD;