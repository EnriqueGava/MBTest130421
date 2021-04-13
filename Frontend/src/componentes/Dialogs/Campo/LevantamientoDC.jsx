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
        backgroundColor: theme.palette.error.dark,
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

const LevantamientoDC = (props) => {

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
                        <IconButton autoFocus edge="start" color="inherit" onClick={props.fun} href="/Campo/levantamientos" aria-label="close">
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Box p={3}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell>Numero de orden</TableCell>
                                    <TableCell align="center">Categoria</TableCell>
                                    <TableCell align="center">Concepto</TableCell>
                                    <TableCell align="center">Funcion</TableCell>
                                    <TableCell align="center">Especificacion</TableCell>
                                    <TableCell align="center">Falla</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow hover>
                                    <TableCell component="th" scope="row">
                                        1301
                                </TableCell>
                                    <TableCell align="center">ANDÉN / PLATAFORMA</TableCell>
                                    <TableCell align="center">Extintores</TableCell>
                                    <TableCell align="center">Tienen la función de apagar o controlar incendios para salvaguardar la integridad de los usuarios. </TableCell>
                                    <TableCell align="center">Gabinete rectangular de lamina de 0.36x0.21x0.71 m. fijado a estructura de estación con pintura roja y cristal transparente de 0.21x0.57 m. y chapa de servicio; extintor tipo ABC de 4.5 Kg. De capacidad ubicado dentro de gabinete. Se extinguidores PQS (polvo químico seco) que consta de un cilindro de 4.5 Kg.</TableCell>
                                    <TableCell align="center">Vitrina rota</TableCell>
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
                <Grid container spacing={3}>
                    <Box flexGrow={1} ml={5}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" className={classes.boton1}>
                            Rechazar
                        </Button>
                    </Grid>
                    </Box>
                    <Box mr={4}>
                    <Grid item xs={12} sm={5}>
                        <Button variant="contained" className={classes.boton2} >
                            Firmar
                        </Button>
                    </Grid>
                    </Box>
                </Grid>
            </Dialog>
        </Container>
    );
}

export default LevantamientoDC;