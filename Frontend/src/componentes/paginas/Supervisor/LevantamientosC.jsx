import React from 'react';

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
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import LevantamientoCD from './../../Dialogs/Campo/LevantamientoCD';
import SearchInput from './../../SearchInput';
import { CheckCircle, Cancel, HourglassFull } from '@material-ui/icons';
import axios from 'axios';
import {getData} from './../../../functions';
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [abrir, setAbrir] = React.useState(false)
    const [idlevantamiento, setIdlevantamiento] = React.useState(0);
    const AbrirD = async(id) => {
        setIdlevantamiento(await getData(id));
        setAbrir(!abrir)
    };

    const [registro, setRegistro] = React.useState([]);

    React.useEffect(() => {
        axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
            axios.get(`/levantamientos/list/${data.data}`)
            .then(result => {
                setRegistro(Object.values(Object.values(result.data)));
            });
        })
        

    }, []);


    const Firma = (firma) => {
        if(firma===null)
            return <HourglassFull variant="contained" style={{ color: "#FFD700" }} fontSize="large" className={classes.margin} />
        else if(firma===0)
            return <Cancel variant="contained" style={{ color: "red" }} fontSize="large" className={classes.margin} />
        else
            return <CheckCircle variant="contained" style={{ color: "green" }} fontSize="large" className={classes.margin} />

    }



    const classes = useStyles();
    console.log(registro);

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
                                    <TableCell align="center">Numero de levantamiento</TableCell>
                                    <TableCell align="center">Fecha</TableCell>
                                    <TableCell align="center">Rev. Jud</TableCell>
                                    <TableCell align="center">Rev. Supervisor</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {registro.map((item) => {
                                    let tabItem = (
                                        <TableRow hover>
                                            <TableCell align="center" component="th" scope="row">
                                                <Button onClick={() => AbrirD(item.Id_numorden)}>{item.Id_numorden}</Button>
                                            </TableCell>
                                    <TableCell align="center">{item.Fecha}</TableCell>
                                            <TableCell align="center">
                                                {Firma(item.firmaJud)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {Firma(item.firmasup)}
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

            <LevantamientoCD open={abrir} fun={AbrirD} datos={idlevantamiento}/>

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