import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import ModalEditH from './ModalEditH';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import axios from 'axios';
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


const EditarInventario = (props) => {
    
    const classes = useStyles();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [herramienta, setHerramienta] = React.useState([]);
    const [herramientaF, setHerramientaF] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos]= React.useState({});
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const updateInput = async(event) => {
		const Hsearch = event.target.value;
		setInput(Hsearch);
     const filtered = herramienta.filter(row => {
      return row.Producto.toLowerCase().includes(Hsearch.toLowerCase())
     })
	 console.log(filtered);
	 
     setHerramientaF(filtered);
	 console.log(herramientaF);
	}


    React.useEffect(() => {
        axios.get("/inventario/list")
            .then(result => {
                setHerramienta(Object.values(Object.values(result.data))[1]);
				setHerramientaF(Object.values(Object.values(result.data))[1]);

            });
    }, []);
    //console.log(herramienta);
    const handleOpen = (datos) => {
        setDatos(datos);
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
   
    return (
        <div>
		<Grid container spacing={3} direction="row" justify="space-around" alignItems="center">
			<Grid item xs={12} >
			</Grid>
			<Grid item xs={6}>
				Aqui modificarás la existencia.
			</Grid>
			<Grid item direction="row" alignItems="flex-end" justify="flex-end" xs={3}>
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
		</Grid>	
            
			<Container>
                    <TableContainer component={Paper}>
                        <Grid item xs={6} sm={12}>
                            <Box mr={0}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Codigo</TableCell>
                                            <TableCell align="center">Medida</TableCell>
                                            <TableCell align="center">Herramienta</TableCell>
                                            <TableCell align="center">Existencia</TableCell>
                                            <TableCell align="center">Agregar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {herramientaF
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            let tablaInventario = (
                                                <TableRow hover key={row.Codigo}>
                                                    <TableCell align="center">{row.Codigo}</TableCell>
                                                    <TableCell align="center">{row.Medida}</TableCell>
                                                    <TableCell align="center" component="th" scope="row">
                                                        {row.Producto}
                                                    </TableCell>
                                                    <TableCell align="center">{row.Existencia}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton onClick={() => handleOpen(row)}  >
                                                            <EditIcon/>
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
                        count={herramientaF.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Container>

        
                  <ModalEditH open={open} handleClose={handleClose} codd={datos} />
                
        </div>

    )
}

export default EditarInventario;