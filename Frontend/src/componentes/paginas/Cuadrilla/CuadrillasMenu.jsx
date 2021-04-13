import React , { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Paper from "@material-ui/core/Paper";
import Tooltip from "react-bootstrap/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import swal from 'sweetalert';
import ListarCuadrilla from './ListarCuadrilla';


import Cookie from 'js-cookie';
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
  
    input: {
      display: "none",
    },
    avatar: {
      width: 130,
      height: 130,
    },
    image: {
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
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
export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const [imagenD, setImagenD] = React.useState("");
  const [cuadrillas, setCuadrillas] = useState([]);
  const [newUser, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "CuadM",
    perfil: "",
    lastname: "",
    cuadrilla: "",
  });

 
  useEffect(() => {
    axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
          console.log(data.data.user);
          axios.post("/cuadrilla/oncuadrilla",{user:data.data.user})
          .then(result => {
              console.log(result.data.data)
              if(result.data.success === true){
                setCuadrillas(Object.values(Object.values(result.data.data)));
              }
              else
                console.log("error")
          })
        })
  },[]);

  useEffect(() => {
    cuadrillas.forEach(item => {
      newUser["cuadrilla"] = item.Num_Cuadrilla})
    
  },[cuadrillas])
  const handleInputChange = (e) => {
    newUser[e.target.name] = e.target.value;
    console.log(newUser);
  };
  function getBase64(files) {
    //console.log(files)
    if (files) {
      console.log(files);
      const currfile = files;
      var reader = new FileReader();
      reader.readAsDataURL(currfile);
      reader.onload = function () {
        let imgData = reader.result.replace(
          /^data:image\/(png|jpeg|bmp);base64,/,
          ""
        );
        files = imgData;
        try {
          console.log("filesss" + files);
          setImagenD(imgData);

          console.log("imagen =" + imgData);
        } catch (e) {
          console.log("Error en Base64");
        }
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };

      return files;
    } else console.log("hola");
  }
  const sendData = (datos) => {
    const url = "/users/register";

    if (true) {
      axios
        .post(url, datos)
        .then((res) => {
          if (res.data.success === true) {
            axios.post("/cuadrilla/insertar", datos).then((result) => {
              if (result.data.success === true) {
                swal(
                  "Usuario Registrado exitosamente",
                  "Inicia sesión",
                  "success"
                );
                setInterval(function () {
                  window.location.replace("/Cuadrilla/levantamientos_cu");
                }, 2000);
                console.log(res.data);
              } else {
                swal(
                  "Error al crear usuario",
                  "Verifica los datos o intente otra vez",
                  "error"
                );
                console.log(res.data);
                // alert(res.data.message);
              }
            });
          } else {
            swal(
              "Error al crear usuario",
              "Verifica los datos o intente otra vez",
              "error"
            );
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
  
console.log(cuadrillas.map(item => {return item.Num_Cuadrilla}))
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Alta Integrante Cuadrilla" {...a11yProps(0)} />
          <Tab label="Ver Integrantes de Cuadrilla" {...a11yProps(1)} />
        
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      
       <Grid container component="main" className={classes.root}>
      
      <Grid item xs={12} component={Paper} square>
        <div className={classes.paper}>
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => getBase64(e.target.files[0])}
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
            initialValues={{
              email: "",
              password: "M0mitos$",
              nombre: "",
              lastname: "",
            }}
            onSubmit={async (values) => {
              let dato = {
                nombre: values.nombre,
                email: values.email,
                password: values.password,
                role: newUser.role,
                perfil: imagenD,
                lastname: values.lastname,
                cuadrilla: newUser.cuadrilla,
              };
              sendData(dato);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().lowercase().email().required("Required"),
              password: Yup.string()
                .required("No password provided.")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
                ),
              nombre: Yup.string()
                .required("Required")
                .matches(/^.((?=.*[A-Za-z])).*$/, "Debe contener solo letras"),
              lastname: Yup.string()
                .required("Required")
                .matches(/^.((?=.*[A-Za-z])).*$/, "Debe contener solo letras"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form className={classes.form} onSubmit={handleSubmit}>
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
                    hidden={true}
                    variant="outlined"
                    margin="normal"
                    required
                    value="M0mitos$"
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
                    <FormControl className={classes.formControl} hidden={true}>
                      <InputLabel htmlFor="age-native-simple">
                        {" "}
                        Departamento{" "}
                      </InputLabel>
                      <Select
                        native
                        defaultValue="CuadM"
                        Value="CuadM"
                        onChange={handleInputChange}
                        inputProps={{
                          name: "role",
                          id: "age-native-simple",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={"CuadM"}>Personal de Cuadrilla</option>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl required className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple" shrink={true}>
                        {" "}
                        Cuadrilla{" "}
                      </InputLabel>
                      <Select
                        native
                        value={newUser.cuadrilla}
                        onChange={handleInputChange}
                        inputProps={{
                          name: "cuadrilla",
                          id: "age-native-simple",
                        }}
                      >
                        
                        {cuadrillas.map(item => {
                          let Values = (
                            <option value={item.Num_Cuadrilla}>{item.Num_Cuadrilla}</option>
                          );

                          return Values;
                        })}
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
                    Regístrar
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Grid>
    </Grid>
      </TabPanel>
      <ListarCuadrilla value={value} index={1} cuadrilla={newUser.cuadrilla}/>
    </div>
  );
}
