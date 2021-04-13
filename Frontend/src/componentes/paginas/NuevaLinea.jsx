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
import NuevaEstacion from './NuevaEstacion';
import ModificarLinea from './ModificarLinea';
import { newLine } from '../../functions';


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
  const [linea_id, setLid] = React.useState("");
  const [linea_val, setLval] = React.useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleLineId = (event) => {
    setLid(event.target.value);
  };
  const handleLineVal = (event) => {
    setLval(event.target.value);
  };

  const sendData = (datos) => {
    const url = "/linea/addlinea";

    
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Alta Linea" {...a11yProps(0)} />
          <Tab label="Alta estacion" {...a11yProps(1)} />
          <Tab label="Modificar Linea" {...a11yProps(2)} />
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
                  id="Id"
				  label="ID"
                  placeholder="Ejm. L1,L2"
                  name="Id"
                  value={linea_id}
                  autoFocus
                  type="text"
                  onChange={handleLineId}
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
                  id="Nombre"
				  label="Nombre"
                  placeholder="Ejm. Linea 1, Linea 2"
                  name="nombre"
                  value={linea_val}
                  autoFocus
                  type="text"
                  onChange={handleLineVal}
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

                
                
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
				  onClick={newLine(linea_id,linea_val)}
                >
                  Agregar
        </Button>
                
              </form>);
            }}
  

          </Formik>
      </TabPanel>
		<NuevaEstacion value={value} index={1}/>
		<ModificarLinea value={value} index={2}/>
			
    </div>
  );
}
