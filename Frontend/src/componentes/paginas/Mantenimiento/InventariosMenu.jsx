import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
import EditarInventario from './EditarInventario';
import Devoluciones from './Devoluciones';

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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendData = (datos) => {
    const url = "/inventario/addinventario";

    if (
      true
    ) {
      axios
        .post(url, datos)
        .then((res) => {
          if (res.data.success === true) {
            var type = "";
            if(datos.Tipo===1)
              type="Herramienta agregada";
            else
              type="Material agregado";
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Alta Herramienta" {...a11yProps(0)} />
          <Tab label="Modificar Inventario" {...a11yProps(1)} />
          <Tab label="Devoluciones" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       Aqui daras alta a una nueva herramienta

       <Formik
            initialValues={{ medida: "",producto:"",partida:"", existencia: 0, tipo: "1" }}
            onSubmit={async values => {
              let dato = {
                Medida: values.medida,
                Producto: values.producto,
                Partida: values.partida,
                Existencia: values.existencia,
                Tipo: values.tipo
              };

              sendData(dato);
              
            }}
            validationSchema={Yup.object().shape({
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
                  id="producto"
                  label="Producto"
                  name="producto"
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
                  name="medida"
                  label="Medida"
                  type="text"
                  id="Medida"
                  value={values.media}
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.medida && touched.medida
                      ? "text-input error"
                      : "text-input"
                  }

                />
                {errors.medida && touched.medida && (
                  <div className="input-feedback">{errors.medida}</div>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="partida"
                  label="Partida "
                  name="partida"
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
                  name="existencia"
                  label="Existencia"
                  type="existencia"
                  id="existencia"
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
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple"> Tipo </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      onChange={handleChange}
                      inputProps={{
                        name: "tipo",
                        id: "age-native-simple",
                      }}
                    >
                       <option aria-label="None" value="" />
                      <option value={"1"}>Herramienta</option>
                      <option value={"0"}>Material</option>
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
                  Agregar
        </Button>
                
              </form>);
            }}
  

          </Formik>
      </TabPanel>
	  <TabPanel value={value} index={1}>
		<EditarInventario value={value} index={1}/>
	  </TabPanel>
      <Devoluciones value={value} index={2}/>
    </div>
  );
}
