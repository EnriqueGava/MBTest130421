import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Table, TablePagination, Paper, Grid } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from "@material-ui/core/InputLabel";
import { Formik } from 'formik';
import * as Yup from "yup";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import { green, red } from '@material-ui/core/colors';
import swal from 'sweetalert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  boton2: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  input: {
    display: "none"
  },
  avatar: {
    width: 130,
    height: 130
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  }));

  
const ModalDevoluciones = (props) => {
    const [material, setMaterial] = React.useState([]);
    const [errorfield, setErrorfield] = React.useState([]);
    const [errortextfield, setErrortextfield] = React.useState([]);
    const [botonesflag, setBotonesFlag] = React.useState([]);
    const [devol, setDevol] = React.useState([]);
    const [cantidad, setCantidad] = React.useState();
    const [permitido, setPermitido] = React.useState(true);
    const classes = useStyles();
    React.useEffect(() =>{
      axios.post("/strabajo/material",{id: props.codd})
      .then((result) => {
          
          setMaterial(Object.values(Object.values(result.data))[1]);
      });
      
      axios.get(`/salmacen/fecha_d/${props.codd}`)
      .then((result) => {
        console.log(result);
        if(result.data.success === true){
          console.log(typeof(result.data.data) === "string")
          if(typeof(result.data.data) === "string")
            setPermitido(false);
          else
            setPermitido(true);
          
        }
      })
  }, [props.open])

  const Upload = async()=>{
    
    
    await axios.post('/inventario/devoluciones/',{devol:devol})
    .then(async(result) => {
      console.log(result)
      var array = result.data.find( element => element.success === false);
      if(typeof(array) === 'undefined') {
        await axios.post('/salmacen/devolucion', {codd: props.codd})
        .then(result => {
          swal("Devoluciones Realizadas", "", "success");
          props.handleClose();
        })
        .catch(err => {
          
        })
      }
      else{
        swal("Error en alguna devolucion","" , "error");
      }
  })
  };

    const DialogTitle = withStyles(useStyles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });
    
    const DialogContent = withStyles((theme) => ({
      root: {
        padding: theme.spacing(2),
      },
    }))(MuiDialogContent);

const handleChangeCantidad = (Cantidad, Existencia, index,id) => {
    console.log(index);
    console.log(Existencia);
    console.log(Cantidad);
    let aux = [...errorfield];
    let aux2 = [...errortextfield];
    let aux3 = [...botonesflag];
    if (Cantidad > Existencia) {
        aux[index] = true;
        aux2[index] = "Cantidad no valida";
        aux3[index] = true;
        setErrorfield(aux);
        setErrortextfield(aux2);
        setBotonesFlag(aux3);
    }
    else {
        aux[index] = false;
        aux2[index] = "";
        aux3[index] = false;
        setErrorfield(aux);
        setErrortextfield(aux2);
        setBotonesFlag(aux3);
        setCantidad(Cantidad);
        devol[index]=({cantidad:Cantidad,id:id});
       
    }

};
console.log(material)
console.log(devol)
    return (
      <Dialog 
      maxWidth={'md'}
      onClose={props.handleClose} 
      aria-labelledby="customized-dialog-title" 
      open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Devolucion de inventario de la solicitud {props.codd}
        </DialogTitle>
        
        { permitido ? 
        <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Codigo</TableCell>
                    <TableCell align="center">Producto</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Cantidad devuelta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {material.map((row,index) => {
                    let tabItem = (
                      <TableRow hover key={row.codigo}>
                        <TableCell align="center">
                            {row.codigo}
                        </TableCell>
                        <TableCell align="center">{row.producto}</TableCell>
                        <TableCell align="center">
                          {row.Cantidad}
                        </TableCell>
                        <TableCell align="center">
                        <TextField 
                        align="center"
                        id={"id-"+row.codigo}
                        variant="outlined" 
                        size="small"
                        type="number"
                        required = {true}
                        error={errorfield[index]}
                        helperText={errortextfield[index]}
                        onChange={cantidad => handleChangeCantidad(cantidad.target.value, row.Cantidad, index,row.codigo)}
                    />
                        </TableCell>
                      </TableRow>
                    );
                    return tabItem;
                  })}
                  
                </TableBody>
              </Table>
            </TableContainer>
            : <Alert severity="success">DEvolucion Realizada</Alert> }
            <Grid xs={3}>
            {(devol.length >= material.length) & permitido ?
            <Button variant="contained" component="label" className={classes.boton2} onClick={Upload}>
                Devolver
            </Button> : <div/>}

            </Grid>
      </Dialog>
      );
    } 

export default ModalDevoluciones;