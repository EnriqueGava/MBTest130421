import React, {useEffect, useState, Suspense} from 'react';

import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import { Table, TablePagination, TextField, Container } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple, red, yellow } from '@material-ui/core/colors';
import { Grid, Box, InputBase } from '@material-ui/core/';
import LevantamientoCuaD from '../../Dialogs/Cuadrillas/LevantamientoCuaD';
import SearchInput from '../../SearchInput';
import axios from 'axios';
import Cookie from 'js-cookie';
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
    }

}));

const LevantamientoC = () => {

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [solicitudes, setSolicitudes] = useState([]);
    const [idST, setIdST] = useState(0);
    const [Fecha, setFecha] = useState(0);
    useEffect(() => {
        axios.post("/users/user", {token : Cookie.get("Token")})
            .then(response => {
                axios.post("/cuadrilla/listst", {user: response.data.user})
                    .then(result => {
                        console.log(result.data.data);
                        setSolicitudes(Object.values(Object.values(result.data.data)));
                    })
            })
    },[]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [abrir, setAbrir] = React.useState(false)

    const AbrirD = (id,fecha) => {
        console.log(id);
        if(typeof id === "number"){
            setIdST(id);
            setFecha(fecha);
        }
        setAbrir(!abrir)
        
    };



    const classes = useStyles();


    return (
        <Container>
            <SearchInput
                placeholder="Buscar"
            />
            <TableContainer component={Paper}>
                <Grid item xs={6} sm={12}>
                    <Box mr={0}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center">Solicitud de Trabajo</TableCell>
                                    <TableCell align="center">Fecha Inicio</TableCell>
                                    <TableCell align="center">Fecha Fin</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {solicitudes.map(item => {
                                    let tabla =(
                                    <TableRow hover>
                                        <TableCell align="center" component="th" scope="row">

                                            <Button onClick={() =>AbrirD(item.NumST,item.Fecha_Fin)}>{item.NumST}</Button>
                                        </TableCell>
                                        <TableCell align="center">{item.Fecha_Inicio}</TableCell>
                                        <TableCell align="center">{item.Fecha_Fin}</TableCell>

                                    </TableRow>
                                    )
                                    return tabla;
                                }
                                )}

                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
            </TableContainer>
            <LevantamientoCuaD open={abrir} fun={AbrirD} fecha={Fecha} idST={idST} />

            <TablePagination
                component="div"
                count={100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Container>
    );
}

export default LevantamientoC;