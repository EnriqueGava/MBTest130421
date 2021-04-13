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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import swal from 'sweetalert';



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
  rootS: {
    borderRadius: '5px',
    padding: theme.spacing(1),
    marginBottom: 16,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .5)',
  },
  input: {
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
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

const NuevoConcepto = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [lineas, setLineas] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [mostrar, setMostrar] = React.useState(false);
  const [line, setline] = React.useState('');
  const [categ, setcateg] = React.useState('');
  const [banderaca, setBanderaca] = React.useState(false);
  const handleChangeLine = (event) => {
    setline(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleChangeCat = (event) => {
    setBanderaca(true);
    setcateg(event.target.value);
    
    if (categorias[categorias.findIndex(item => item.Id_categoria === event.target.value)].nombre_ca === "Carril confinado")
      setMostrar(true);
    else
      setMostrar(false);
  };
  React.useEffect(() => {
   
    axios.get("/lineas/list")
      .then(result => {
        setLineas(Object.values(Object.values(result.data)));
      });

  }, []);

  const sendData = (datos) => {
    const url = "/concepto/addconcepto";


  };


  return (
    <TabPanel value={props.value} index={props.index}>
      Aqui daras alta a una nuevo concepto
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
              id="concepto"
              label="Concepto"
              name="concepto"
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
              name="funcion"
              label="Funcion"
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
              id="especificacion"
              label="Especficacion"
              name="Especificacion "
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
              id="clave"
              label="Clave"
              name="clave "
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
            <div>
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
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label" shrink={banderaca}>Categorias</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id='categoria'
                  value={categ}
                  onChange={handleChangeCat}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {/* select Categoria */}

                  {categorias.map((item) =>
                    <MenuItem value={item.Id_categoria}>{item.nombre_ca}</MenuItem>
                  )}
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
  );
}
export default NuevoConcepto;