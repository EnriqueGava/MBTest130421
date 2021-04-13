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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import swal from 'sweetalert';
import ModificarFalla from './ModificarFalla';
import NuevaParte from './NuevaParte';


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
  const [lineas, setLineas] = React.useState([]);
  const [line, setline] = React.useState('');
  const handleChangeLine = (event) => {
    setline(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {

    axios.get("/lineas/list")
      .then(result => {
        setLineas(Object.values(Object.values(result.data)));
      });

  }, []);

  const sendData = (datos) => {
    const url = "/falla/addfalla";


  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Alta Falla" {...a11yProps(0)} />
          <Tab label="Alta Partes" {...a11yProps(1)} />
          <Tab label="Modificar Falla" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Aqui daras alta a una nueva linea
       <Formik
          initialValues={{ nombre: "" }}
          onSubmit={async values => {
            let dato = {
              Nombre: values.linea,
            };

            sendData(dato);

          }}
          validationSchema={Yup.object().shape({
            nombre: Yup.string()
              .required("Required"),

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
                id="falla"
                label="Falla"
                name="falla"
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

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple"> Categoria </InputLabel>
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
                  <option value={"0"}>Plazoleta</option>
                  <option value={"2"}>Rampa de acceso</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple"> Concepto </InputLabel>
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
                  <option value={"0"}>Guia tactil</option>
                  <option value={"2"}>Apagadores</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple"> Parte </InputLabel>
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
                  <option value={"0"}>WC</option>
                  <option value={"2"}>CUarto de servicio</option>
                </Select>
              </FormControl>



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
      <NuevaParte value={value} index={1} />
      <ModificarFalla value={value} index={2} />

    </div>
  );
}
