import React from 'react'
import {
  Button, Dialog, AppBar, Toolbar,
  Typography, IconButton, List,
  ListItem, Divider, Slide, ListItemText,
  Box,
  Grid
} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.error.dark,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LevantamientoDC = () => {

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>

      <Dialog fullScreen open={open} onClose={handleClose} >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton autoFocus edge="start" color="inherit" onClick={handleClose} href="/Campo/new_levantamientos" aria-label="close">
              <CloseIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Box p={3}>

          <Container>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" align="left">
                Elementos
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Clave" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary">
                      Buscar
					          </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                      <InputLabel id="demo-simple-select-required-label">Categoria</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        //value={age}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Plaz</MenuItem>
                        <MenuItem value={2}>Rampa de acceso a estacion</MenuItem>
                        <MenuItem value={3}>Anden /Plataforma </MenuItem>
                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                      <InputLabel id="demo-simple-select-required-label">Especificacion</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        //value={age}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={11}>Pieza de 0.87 m. x 0.17 m. de diámetro color negro mate y cinta reflejante. </MenuItem>
                        <MenuItem value={12}>Arriate circular de concreto armado, diámetros y alturas variables.</MenuItem>
                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                      <InputLabel id="demo-simple-select-required-label">Concepto</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        //value={age}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={11}>Bolardos de confinamiento peatonal</MenuItem>
                        <MenuItem value={12}>Bolardos de confinamiento peatonal</MenuItem>

                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                      <InputLabel id="demo-simple-select-required-label">Nombre</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        //value={age}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={11}>RELACIÓN DE PIEZAS DAÑADAS DE LÍNEA DE SEGURIDAD</MenuItem>


                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                      <InputLabel id="demo-simple-select-required-label">Funcion</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        //value={age}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={11}>Proteger la zona peatonal,  evitando que los vehiculos accedan a las zonas de espera para cruce seguro de los usuarios. Se colocan alineados delimitando una zona en especifico. </MenuItem>
                        <MenuItem value={12}>Protege los elementos arboreos asi como al usuario de cualquier tropiezo con las raices de arboles.</MenuItem>

                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid><Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                      <InputLabel id="demo-simple-select-required-label">Falla</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        //value={age}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={11}>Ausente </MenuItem>
                        <MenuItem value={12}>Fracura</MenuItem>

                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  width="25%"
                  align="right"
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Agregar
				</Button>
              </form>


            </div>
          </Container>

        </Box>

      </Dialog>
    </div>
  );
}

export default LevantamientoDC;