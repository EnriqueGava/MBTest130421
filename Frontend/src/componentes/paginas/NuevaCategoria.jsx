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
import NuevoConcepto from './NuevoConcepto';
import ModificarConcepto from './ModificarConcepto';


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
    const url = "/concepto/addconcepto";


  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Alta categoria" {...a11yProps(0)} />
          <Tab label="Alta concepto" {...a11yProps(1)} />
          <Tab label="Modificar concepto" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Aqui daras alta a un nuevo concepto
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
                id="categoria"
                label="Categoria"
                name="categoria"
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="linea"
				          label="linea"
                  placeholder="Ejm. L1,L2"
                  name="linea"
                  autoFocus
                  type="text"
                  
                  onBlur={handleBlur}
                  className={
                    errors.nombre && touched.nombre
                      ? "text-input error"
                      : "text-input"
                  }
                />
              


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
      <NuevoConcepto value={value} index={1} />
      <ModificarConcepto value={value} index={2} />

    </div>
  );
}