import React, {useState, useEffect} from 'react'
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
    }
}));


const SolicitudAD = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
	
	    const [herramientas, setHerramientas] = React.useState([]);

	useEffect(()=>{
        axios.post("/strabajo/material",{id: props.idsa})
        .then((result) => {
            console.log(result.data);
            setHerramientas(Object.values(Object.values(result.data))[1]);
        });
    }, [props.open])
   
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

                                    <TableCell align="center">Codigo</TableCell>
                                    <TableCell align="center">Producto</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {herramientas.map((item) => {
                                let tabItem = (
                                <TableRow hover>
                                    <TableCell align="center">{item.codigo}</TableCell>
                                    <TableCell align="center">{item.producto}</TableCell>
                                    <TableCell align="center">{item.Cantidad}</TableCell>
                                    
                                </TableRow>
                            );
                            return tabItem;
                                    })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={herramientas.length}
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