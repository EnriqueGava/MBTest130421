import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import swal from 'sweetalert';
import IconButton from '@material-ui/core/IconButton';
import { Formik } from 'formik';
import * as Yup from "yup";
import  Cookie  from 'js-cookie';
import CambiarPwdM from '../Mantenimiento/CambiarPwdM';
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    input: {
      display: "none"
    },
    avatar: {
      width: 130,
      height: 130
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
      margin: theme.spacing(2, 0, 2),
      height: 52
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
    Editar
  </Tooltip>
      
      
    );
export default function Edit() {
    const classes = useStyles();
    const [imagenD, setImagenD] = React.useState('');
    const [user, setNewUser] = React.useState({});
    const [bandera, setBandera]= React.useState(false);
    const [open,setOpen]=React.useState(false);
    React.useEffect(() => {
      axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
          axios.get(`/users/photo/${data.data.user}`)
          .then(result => {
            setNewUser(Object.values(Object.values(result.data))[1]);
            setBandera(true);
          })
        })
        
    
      }, []);

      React.useEffect(() => {
        if(bandera)
          setImagenD(user.Perfil);
      },[bandera]);
      const [imagendes, setImagen] = React.useState({});
      const getImage = () => {
        axios.post("/users/desencrypt", { email: user.User_ID, password: user.Perfil })
        .then(result => {
          if (result.data.success === true) {
            console.log(result)
            setImagen(Object.values(Object.values(result.data))[1]);
          }
        })
        
        return "data:image/png;base64,"+imagendes
      }
      const handleOpen = () => {
        axios.post("/users/validatePass", {token : Cookie.get("Token"), password: userPass.pass})
        .then(data => {
          if(data.data.success === true){
            userPass["pass"] = "";
            userPass["email"] = data.data.email;
            setOpen(true);
          }
          else{
            swal(data.data.message, "", "error");
          }
            
        })
        
      };
      const handleClose = () => {
        setOpen(false);
    };
    const [newUser, setUser] = useState({
      nombre: "",
      email: "",
      perfil: "",
      lastname: "",
      password: "",
    });
    const [userPass, setUserPass] = React.useState({
      pass: "",
      email: "",
    });

  
    const handleInputChange = (e) => {
      userPass[e.target.name] = e.target.value;
    };
    function getBase64(files) {
      //console.log(files)
      if (files) {
          const currfile = files;
          var reader = new FileReader();
          reader.readAsDataURL(currfile);
          reader.onload = function () {
            let imgData = reader.result.replace(/^data:image\/(png|jpeg|bmp);base64,/, "");
            files = imgData;
            try {
              setImagenD(imgData);
              
            }
            catch (e) {
              console.log("Error en Base64");
            }
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
  
  
        return files;
      }
      else
      console.log("hola")
    }
  
    const sendData = (datos) => {
      const url = "/users/editar";
  
      if (
        true
      ) {
        axios
          .post(url, datos)
          .then((res) => {
            if (res.data.success === true) {
              swal("Datos Actualizados", user.User_ID, "success");
              setInterval(function () {
                window.location.replace("/Campo/new_levantamientos");
              }, 2000);
              console.log("res.dat= "+res.data);
            } else {
              swal("Error al crear usuario", "Verifica los datos o intente otra vez", "error");
              console.log(res.data);
              // alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log("SERVER ERROR >: " + err);
          });
      } else {
        alert("Empty fields!!");
      }
    };
    
    return (
      <Grid container component="main" className={classes.root}>
       <Grid item xs={12} component={Paper}  square>
          <div className={classes.paper}>
  
            
  
      <Grid container justify="center" alignItems="center">
  
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
  
                multiple
                type="file"
                onChange={e => getBase64(e.target.files[0])}
              />
  <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
              <label htmlFor="contained-button-file">
              <Avatar
              src={getImage()}
              alt="Person"
          className={classes.avatar}
            />
              </label>
      </OverlayTrigger>      
            </Grid>
       
    
  
            <Typography component="h1" variant="h5">
              Actualizar Datos
            </Typography>
            
            {bandera ? <Formik
              initialValues={{ email: user.User_ID,nombre: user.Nombre,lastname: user.Apellido, password: user.Pwd}}
              onSubmit={async values => {
                let dato = {
                  nombre: values.nombre,
                  email: values.email,
                  perfil:  imagenD,
                  lastname: values.lastname,
                };
                sendData(dato);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .lowercase()
                  .email()
                  .required("Required"),
                nombre: Yup.string()
                  .required("Required")
                  .matches(
                    /^.((?=.*[A-Za-z])).*$/,
                    "Debe contener solo letras"
                  ),
                lastname: Yup.string()
                  .required("Required")
                  .matches(
                    /^.((?=.*[A-Za-z])).*$/,
                    "Debe contener solo letras"
                  )
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
                    id="nombre"
                    defaultValue={user.Nombre}
                    name="nombre"
                    value={values.nombre}
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
                    name="lastname"
                    
                    type="text"
                    id="Apellido"
                    value={values.lastname}
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.lastname && touched.lastname
                        ? "text-input error"
                        : "text-input"
                    }
  
                  />
                  {errors.lastname && touched.lastname && (
                    <div className="input-feedback">{errors.lastname}</div>
                  )}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    disabled = {true}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={user.User_ID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                  <Grid container>
                  <Grid item xs={10} >
                    
                  <TextField
                    variant="outlined"
                    margin="normal"
                    
                    fullWidth
                    id="password"
                    disabled = {false}
                    name="password"
                    autoComplete="password"
                    autoFocus
                    type="password"
                    defaultvalue=""
                    onChange={handleInputChange}
                    inputProps={{
                      name: "pass",
                      id: "pass-native-simple",
                    }}
                    onBlur={handleBlur}
                   
                  />
                  </Grid>
                  <Grid item xs={2} >
                    
                  <Button
                    disabled={false}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => handleOpen()}
                  >
                    Cambiar Contraseña
          </Button>
                  </Grid>
                  </Grid>
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
  
   
            </Formik> : <div/>}
            <CambiarPwdM open={open} handleClose={handleClose} email={userPass.email}/>
          </div>
        </Grid>
      </Grid>
  
    );

 
}
