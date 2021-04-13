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
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import Cookie from 'js-cookie';
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


const ListarCuadrilla = (props) => {
    
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
    const [squad, setSquad] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = (datos) => {
       
        setOpen(true);
      };
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
          console.log(data.data.user);
          axios.post("/cuadrilla/integrantescu",{user:data.data.user})
          .then(result => {
              console.log(result.data.data)
              if(result.data.success === true){
                setSquad(Object.values(Object.values(result.data.data)));
              }
              else
                console.log("error")
          })
        })
    }, []);
    console.log(squad)
    return (
        <div>
        <TabPanel value={props.value} index={props.index}>
           Perteneces a la cuadrilla Numero: {props.cuadrilla} <br></br>
           Los integrantes de tu cuadrilla son los siguientes
           <Container className={classes.searchImp}>
                    <Grid container direction="row" alignItems="flex-end" justify="flex-end">
						<Paper
						className={classes.rootS}>
							<SearchIcon className={classes.icon} />							
						</Paper>
					</Grid>
                    <TableContainer component={Paper}>
                        <Grid item xs={6} sm={12}>
                            <Box mr={0}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Nombre</TableCell>
                                            <TableCell align="center">Apellido</TableCell>
                                            <TableCell align="center">Correo</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {squad
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            let tablaintegrantes = (
                                                <TableRow hover key={row.nombre}>
                                                    <TableCell align="center">{row.nombre}</TableCell>
                                                    <TableCell align="center">{row.apellido}</TableCell>
                                                    <TableCell align="center">{row.User_ID}</TableCell>
                                                </TableRow>
                                            );
                                            return tablaintegrantes
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={squad.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Container>
  
        </TabPanel>
        
                 
        </div>

    )
}

export default ListarCuadrilla;