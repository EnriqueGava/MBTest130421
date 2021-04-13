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
import ModalDevoluciones from './ModalDevoluciones';
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


const Devoluciones = (props) => {
    
    const classes = useStyles();
    const [solicitudesa, setSolicitudesa] = React.useState([]);
    
    const [open, setOpen] = React.useState(false);
    const [datos, setDatos]= React.useState({});
    React.useEffect(() => {
        axios.get("/salmacen/getsa")
            .then(result => {
                setSolicitudesa(Object.values(Object.values(result.data))[1]);
            });
    }, []);
    console.log(solicitudesa);
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
      const handleOpen = (datos) => {
        setDatos(datos);
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
        <TabPanel value={props.value} index={props.index}>
            <Grid container spacing={3} direction="row" justify="space-around" alignItems="center">
			
			  
				    Aqui haras las devoluciones de las solicitudes de almacen.
                    <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow hover>
                    <TableCell align="center">Solicitud de Almacen</TableCell>
                    <TableCell align="center">Fecha Inicio</TableCell>
                    <TableCell align="center">Fecha Fin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {solicitudesa.map((item) => {
                    let tabItem = (
                      <TableRow hover>
                        <TableCell align="center" component="th" scope="row">
                          <Button onClick={() => handleOpen(item.NumSA)}>
                            {item.NumSA}
                          </Button>
                        </TableCell>
                        <TableCell align="center">{item.Fecha_inicio}</TableCell>
                        <TableCell align="center">
                          {item.Fecha_Fin}
                        </TableCell>
                      </TableRow>
                    );
                    return tabItem;
                  })}
                  
                </TableBody>
              </Table>
            </TableContainer>
			

		    </Grid>	
        </TabPanel>
        <ModalDevoluciones open={open} handleClose={handleClose} codd={datos} />

        </div>

    )
}

export default Devoluciones;