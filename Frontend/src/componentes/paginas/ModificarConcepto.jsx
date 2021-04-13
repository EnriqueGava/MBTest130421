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
import ModalEditL from './ModalEditL';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from '@material-ui/core/FormHelperText';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: "75%",
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


const ModificarConcepto = (props) => {
    
    const classes = useStyles();
    const [lineas, setLineas] = React.useState([]);
    const [line, setline] = React.useState('');
    const handleChangeLine = (event) => {
      setline(event.target.value);
    };
    
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
    React.useEffect(() => {

        axios.get("/lineas/list")
          .then(result => {
            setLineas(Object.values(Object.values(result.data)));
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
        <TabPanel value={props.value} index={props.index}>
        <div>
		<Grid container spacing={3} direction="row" justify="space-around" alignItems="center">
			<Grid item xs={12} >
			</Grid>
			<Grid item xs={6}>
				Aqui modificarás la estaciones
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
            <Grid item direction="row" alignItems="flex-start" justify="flex-start" xs={6}>
            <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Lineas</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={line}
                  onChange={handleChangeLine}
                  className={classes.selectEmpty}
                >
                  {lineas.map((item) =>
                    <MenuItem value={item.Id_linea}> {item.Id_linea} </MenuItem>)}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              </Grid>

		</Grid>	
        
			<Container>
                    <TableContainer component={Paper}>
                        <Grid item xs={6} sm={12}>
                            <Box mr={0}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Linea</TableCell>
                                            <TableCell align="center">Categoria</TableCell>
                                            <TableCell align="center">Concepto</TableCell>
                                            <TableCell align="center">Clave</TableCell>
                                            <TableCell align="center">Funcion</TableCell>
                                            <TableCell align="center">Especificacion</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        
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

        
                  <ModalEditL open={open} handleClose={handleClose} codd={datos} />
                
        </div>
        </TabPanel>
    )
}

export default ModificarConcepto;