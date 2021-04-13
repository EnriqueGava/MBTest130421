import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import InputLabel from "@material-ui/core/InputLabel";
import { Formik } from 'formik';
import * as Yup from "yup";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import swal from 'sweetalert';
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

  
const ModalEditL = (props) => {
    const classes = useStyles();
    const [tipos, setTipo]= React.useState({type: 0});

    React.useEffect(() => {
      setTipo({type: props.codd.Tipo});
    }, [props.codd]);

    const handleInputChange = (e) => {
      tipos[e.target.name.toString()] = e.target.value;
    };

    

    console.log(tipos);
    
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

    const sendData = (datos) => {
      const url = "/inventario/Edith";
  
      if (
        true
      ) {
        axios
          .post(url, datos)
          .then((res) => {
            if (res.data.success === true) {
              var type = "";
              if(datos.Tipo===1)
                type="Herramienta actualizada";
              else
                type="Material actualizado";
              swal(type, "", "success");
              setInterval(function () {
                window.location.replace("/");
              }, 2000);
            } else {
              swal("Error al agregar "+type, "", "error");
            }
          })
          .catch((err) => {
            console.log("SERVER ERROR >: " + err);
          });
      } else {
        alert("Empty fields!!");
      }
    };
    console.log("funciona el props? "+tipos.type)
    return (
        <div>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Actualizar Inventario
        </DialogTitle>
        <DialogContent dividers>
        
       <Formik
            initialValues={{ codigo:props.codd.Codigo,medida:props.codd.Medida,producto:props.codd.Producto,partida:props.codd.Partida, existencia: props.codd.Existencia, tipo: tipos.type }}
            onSubmit={async values => {
              let dato = {
                Codigo: values.codigo,
                Medida: values.medida,
                Producto: values.producto,
                Partida: values.partida,
                Existencia: values.existencia,
                Tipo: tipos.type
              };
              console.log(dato);
              sendData(dato);
              
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.number()
                .required("Required"),
              medida: Yup.string()
                .required("Required"),
              producto: Yup.string()
                .required("Required"),
              partida: Yup.string()
                .required("Required"),
              existencia: Yup.number()
                .positive("La existencia debe ser de al menos 1"),
              tipo: Yup.string()
                .required("Required")
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
              } = props;
              return (<form className={classes.form} onSubmit={handleSubmit}>
                

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Linea"
                  label="Linea"
                  name="Linea"
                  value={values.producto}
                  autoFocus
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.nombre && touched.nombre
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.nombre && touched.nombre && (
                  <div className="input-feedback">{errors.nombre}</div>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="estacion"
                  label="Estacion"
                  name="estacion"
                  autoComplete="partida"
                  value={values.partida}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.partida && touched.partida
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.partida && touched.partida && (
                  <div className="input-feedback">{errors.partida}</div>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="origen"
                  label="Origen"
                  type="origen"
                  id="origen"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.existencia}
                  className={
                    errors.existencia && touched.existencia
                      ? "text-input error"
                      : "text-input"
                  }
                  

                />
                {errors.existencia && touched.existencia && (
                  <div className="input-feedback">{errors.existencia}</div>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Destino"
                  label="Destino"
                  name="Destino"
                  value={values.partida}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.partida && touched.partida
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.partida && touched.partida && (
                  <div className="input-feedback">{errors.partida}</div>
                )}
                <div>
                
                    <InputLabel htmlFor="age-native-simple"> Sentido </InputLabel>
                    <Select   
                    native 
                      defaultValue={values.tipo}                          
                      onChange={handleInputChange}
                      inputProps={{
                        name: "type",
                        id: "age-native-simple",
                      }}
                    >
                     
                      <option value={1}>Norte-Sur</option>
                      <option value={0}>Oriente-Poniente</option>
                    </Select>
                    
                </div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Actualizar
        </Button>
                
              </form>);
            }}
  

          </Formik>
        </DialogContent>
      </Dialog>
        </div>
      );
    } 

export default ModalEditL;