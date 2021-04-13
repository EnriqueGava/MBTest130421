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
import { green } from '@material-ui/core/colors';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import swal from 'sweetalert';
import pic1 from '../image/mb1.jpg'
import pic2 from '../image/mb2.jpg'
import pic3 from '../image/mb3.jpg'
import pic4 from '../image/mb4.jpg'
import IconButton from '@material-ui/core/IconButton';
import { Formik } from 'formik';
import * as Yup from "yup";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.metrobus.cdmx.gob.mx/">
        Metrobús
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const pictureArray = [pic1, pic2, pic3, pic4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];
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
  image: {
    backgroundImage: `url(${selectedPicture})`, //'url(https://source.unsplash.com/random)',
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
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
  Editar
</Tooltip>
    
    
  );
export default function SignInSide() {
  const classes = useStyles();

  const [imagenD, setImagenD] = React.useState('');
  const [newUser, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "",
    perfil: "",
    lastname: "",
  });

  const handleInputChange = (e) => {
    newUser[e.target.name] = e.target.value;
    console.log(newUser);
  };
  function getBase64(files) {
    //console.log(files)
    if (files) {
      console.log(files)
        const currfile = files;
        var reader = new FileReader();
        reader.readAsDataURL(currfile);
        reader.onload = function () {
          let imgData = reader.result.replace(/^data:image\/(png|jpeg|bmp);base64,/, "");
          files = imgData;
          try {
            console.log("filesss"+files)
            setImagenD(imgData);
            
            console.log("imagen ="+imgData)
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
    const url = "users/register";

    if (
      true
    ) {
      axios
        .post(url, datos)
        .then((res) => {
          if (res.data.success === true) {
            swal("Usuario Registrado exitosamente", "Inicia sesión", "success");
            setInterval(function () {
              window.location.replace("/");
            }, 2000);
            console.log(res.data);
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

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            src="/images/avatars/avatar_3.png"
            alt="Person"
        className={classes.avatar}
          />
            </label>
    </OverlayTrigger>      
          </Grid>
     
  

          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Formik
            initialValues={{ email: "", password: "",nombre:"",lastname:"" }}
            onSubmit={async values => {
              let dato = {
                nombre: values.nombre,
                email: values.email,
                password: values.password,
                role: newUser.role,
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
              password: Yup.string()
                .required('No password provided.')
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
                ),
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
                  label="Nombre"
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
                  label="Apellido"
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
                  label="Correo electrónico "
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }

                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple"> Departamento </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      onChange={handleInputChange}
                      inputProps={{
                        name: "role",
                        id: "age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"JUDE"}>JUD</option>
                      <option value={"MantE"}>Mantenimiento</option>
                      <option value={"CampoE"}>Personal de Campo</option>
                      <option value={"SupE"}>Supervisor</option>
                      <option value={"CuadE"}>Jefe de Cuadrilla</option>
                    </Select>
                  </FormControl>
                </div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Regístrate
        </Button>
                <Grid container>
                  <Grid item xs>

                  </Grid>
                  <Grid item>
                    <Link href="/" variant="body2">
                      {"¿Ya tienes cuenta?"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>);
            }}


          </Formik>

        </div>
      </Grid>
    </Grid>

  );
}
