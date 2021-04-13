import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignatureCanvas from "react-signature-canvas";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import {
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import swal from 'sweetalert';
import Dialog from '@material-ui/core/Dialog';
import {
    FirmaMant, checkMant, DevolverH
} from './../../../functions';
import FirmaM from '../../Dialogs/Mantenimiento/FirmaM';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import dlocale from 'date-fns/locale/es';
/* function Copyright() {
  return (
	<Typography variant="body2" color="textSecondary" align="center">
	  {'Copyright © '}
	  <Link color="inherit" href="https://material-ui.com/">
		Proyecto Metrobus
	  </Link>{' '}
	  {new Date().getFullYear()}
	  {'.'}
	</Typography>
  );
} */
const useStyles = makeStyles((theme) => ({
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
		minWidth: "75%",
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	boton2: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.getContrastText(green[700]),
		backgroundColor: green[700],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
	boton1: {
		margin: theme.spacing(3, 0, 2),
		color: theme.palette.getContrastText(red[700]),
		backgroundColor: red[700],
		'&:hover': {
			backgroundColor: red[700],
		},
	},
}));



const S_Trabajo = (props) => {
	const classes = useStyles();
	const [idOrden, setIdOrden] = useState(1);
	const [datos, setDatos] = useState({
		herramienta : [],
		material: [],
	});
	const [cuadrillas, setCuadrillas] = useState([]);
	const [partners, setPartners] = useState([]);
	const [vehiculos, setVehiculos] = useState([]);
	const [finish, setFinish] = useState(false);
	const [dfirma, SetDfirma] = React.useState(false);
    const [imageData, setImageData] = React.useState("");
    const saveSignature = (signature) => { setImageData(signature); };
    const [user, setUser] = React.useState({});
    const [error, setError] = React.useState(false);
    const signatureRef = React.useRef({});
    const [herramienta, setHerramienta] = React.useState([]);
    const [material, setMaterial] = React.useState([]);
    const [success, setSuccess] = React.useState(true);
	const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));
	useEffect(() => {
		setIdOrden(props.location.state.idOrden);
		datos["levantamiento"] = props.location.state.idOrden;
		datos["observaciones"] = "";
		if (localStorage.getItem("herramienta"))
			datos["herramienta"] = (JSON.parse(localStorage.getItem("herramienta")));
		if (localStorage.getItem("material"))
			datos["material"] = (JSON.parse(localStorage.getItem("material")));
		
		axios.post("/users/user", {token : Cookie.get("Token")})
			.then(data => {
				datos["User_ID"] = data.data;
			})

		axios.get("/vehiculo/list")
			.then(result => {
				setVehiculos(Object.values(Object.values(result.data))[1]);
			});

		axios.get("/salmacen/getdate")
			.then(result => {
				var aux="";
				console.log(new Date(Object.values(Object.values(result.data.data[0]))))
				aux=new Date((Object.values(Object.values(result.data.data[0])))+"T00:00:00");
				console.log(aux)
				setSelectedDate(aux);
			});

		axios.get("/cuadrilla/listcua")
			.then(result => {
				if (result.data.success === true) {
					setCuadrillas(Object.values(Object.values(result.data))[1]);
				}
			});
	}, []);

	useEffect(() => {
        axios.post("/users/user", { token: Cookie.get("Token") })
            .then(data => {
                axios.get(`/jdsp/dmant/${data.data.user}`)
                    .then(result => {
                        setUser(Object.values(Object.values(result.data))[0]);
                    });
            });
    }, []);


	const handleChanges = (e) => {
		datos[e.target.name] = (e.target.value);
		if (e.target.name === "cuadrilla") {
			console.log(datos.cuadrilla);
			axios.post("/cuadrilla/partners", { id: datos.cuadrilla })
				.then(result => {
					if (result.data.success === true) {
						setPartners(Object.values(Object.values(result.data))[1]);
					}
				})
		}
	};

	const handleFirmaOpen = () => {
        SetDfirma(true);
    };
    const handleFirmaClose = () => {
        SetDfirma(false);
    };
    

    const Signed = () => {
        FirmaMant(user.Id_Mantenimiento, imageData);
        console.log("Guardando firma");
        axios.post("/salmacen/insert", datos)
            .then(result => {
				console.log(result);
                swal("Solicitudes Generadas", Cookie.get("Nombre"), "success");
                setInterval(function () {
                    window.location.replace("/Mantenimiento/Status_T");
                }, 1000);
            });
    }

    const checkFirma = async () => {
            let q = await checkMant(user.User_ID);
            if (q.firma == null)
                handleFirmaOpen();
            else {
                axios.post("/salmacen/insert", datos)
                    .then(result => {
						if(result.data.success.includes(false)){
							swal("Solicitudes Generadas", Cookie.get("Nombre"), "success");
							setInterval(function () {
								window.location.replace("/Mantenimiento/MaLevantamientos");
							}, 1000);
						}
						else{
                        if (localStorage.getItem("herramienta"))
                            localStorage.removeItem("herramienta");
                        if (localStorage.getItem("material"))
                            localStorage.removeItem("material")
                        swal("Solicitudes Generadas", Cookie.get("Nombre"), "success");
                        setInterval(function () {
                            window.location.replace("/Mantenimiento/Status_T");
						}, 1000);
					}
                    });

            }
    };

    const Descartar = () => {
        if(localStorage.getItem("herramienta")){
            herramienta.every(async(item) => {
                await DevolverH(item.codigo, item.cantidad)
                .then(result => {
                    if (result.data.success === true) {
                        setSuccess(success);
                        herramienta.map((row,index) => {
                            if (row.codigo === item.codigo) {
                                console.log(row);
                                herramienta.splice(index,1);
                                localStorage.setItem("herramienta", JSON.stringify(herramienta));
                                let aux = [...herramienta];
                                setHerramienta(aux);
                            }
                        })
                        return true;
                    }
                    else{
                        setSuccess(false);
                        return false;
                    }
                })
            })
        }
        if(localStorage.getItem("material")){
            material.every(async(item) => {
                await DevolverH(item.codigo, item.cantidad)
                .then(result => {
                    if (result.data.success === true) {
                        setSuccess(true);
                        material.map((row,index) => {
                            if (row.codigo === item.codigo) {
                                console.log(row);
                                material.splice(index,1);
                                localStorage.setItem("material", JSON.stringify(material));
                                let aux = [...material];
                                setMaterial(aux);
                            }
                        });
                        return true;
                    }
                    else {
                        setSuccess(false);
                        return false;
                    }
                })
            })
        }
        
        
    };

	const SendDatos = () => {
		console.log(datos);
	};

	const SendData = () => {
		setFinish(true);
	}



	const handleDateChange = (date) => {
		
				console.log(date)
	  setSelectedDate(date);
	  //console.log(date)
	  datos["Fecha"] = date;

	};
	return (
		<div>
			<Link to={{ pathname: "/Mantenimiento/Almacen", state: { idOrden: idOrden } }}>
				<IconButton edge="start" color="inherit" aria-label="close">
					<BackIcon />
				</IconButton>
			</Link>
			<Container component="main">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5" align="left">
						Solicitud de Trabajo
          </Typography>
		  <Formik
            initialValues={{  }}
            onSubmit={async values => {
              checkFirma();
              
            }}
            
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
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<FormControl required className={classes.formControl}>
									<InputLabel id="demo-simple-select-required-label">Cuadrilla</InputLabel>
									<Select
										labelId="demo-simple-select-required-label"
										id="demo-simple-select-required"
										value={datos.cuadrilla}
										onChange={handleChanges}
										className={classes.selectEmpty}
										inputProps={{
											name: "cuadrilla",
											id: "cuadrilla",
										}}
									>
										{cuadrillas.map(item => {
											let Cuadrillas = (
												<MenuItem value={item.Num_Cuadrilla}>{item.Num_Cuadrilla}</MenuItem>
											);
											return Cuadrillas;
										})}
									</Select>
									<FormHelperText>Required</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl required className={classes.formControl}>
									<InputLabel id="demo-simple-select-required-label">Acompañante</InputLabel>
									<Select
										labelId="demo-simple-select-required-label"
										id="demo-simple-select-required"
										value={datos.partners}
										onChange={handleChanges}
										className={classes.selectEmpty}
										inputProps={{
											name: "partners",
											id: "partners",
										}}
									>
										{partners.map(item => {
											let Partners = (
												<MenuItem value={item.Id_Cuadrilla}>{item.nombre + " " + item.apellido}</MenuItem>
											);
											return Partners;
										})}

									</Select>
									<FormHelperText>Required</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl required className={classes.formControl}>
									<InputLabel id="demo-simple-select-required-label">Vehículo</InputLabel>
									<Select
										labelId="demo-simple-select-required-label"
										id="demo-simple-select-required"
										value={datos.vehiculo}
										onChange={handleChanges}
										className={classes.selectEmpty}
										inputProps={{
											name: "vehiculo",
											id: "vehiculo",
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{vehiculos.map(item => {
											let vehicle = (
												<MenuItem value={item.Placa}> {item.Marca + "/" + item.Placa} </MenuItem>
											);
											return vehicle;
										})}

									</Select>
									<FormHelperText>Required</FormHelperText>
								</FormControl>
							</Grid>
							<MuiPickersUtilsProvider utils={DateFnsUtils} locale={dlocale} utils={DateFnsUtils}>
							<Grid c item xs={6}>
								<KeyboardDatePicker 
								minDate={selectedDate}
								disableToolbar
								variant="inline"
								format="yyyy-MM-dd"
								margin="normal"
								id="date-picker-inline"
								label="Fecha de inicio del mantenimiento"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								/>
							</Grid>
							</MuiPickersUtilsProvider>
							<Grid item xs={12}>
								<TextField
									id="outlined-multiline-static"
									label="Observaciones"
									multiline
									fullWidth
									rows={8}
									onChange={handleChanges}
									variant="outlined"
									inputProps={{
										name: "observaciones",
										id: "observaciones",
									}}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={3}>
                <Box flexGrow={1} ml={5}>
                    <Grid item xs={12} sm={6}>
						<Button  
						disabled={isSubmitting}
                            type="submit"
							width="25%"
							align="right"
							variant="contained"
                            color="secondary"
                            className={classes.boton2}
                            >
                            Generar
				</Button>
                    </Grid>
                </Box>
                <Box mr={20}>
                    <Grid item xs={12} sm={5}>

                        <Link to={{ pathname: "/Mantenimiento/MaLevantamiento"}}>
                        <Button onClick={() => Descartar()} className={classes.boton1}>
                            Descartar
                                <ClearIcon />
                        </Button>
			</Link>
            

                    </Grid>
                </Box>
    </Grid>
						
                
              </form>);
            }}
  

          </Formik>


				</div>
			</Container>

			<Dialog open={dfirma} onClose={handleFirmaClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Firma Supervisor</DialogTitle>
                <DialogContent>
                    <Fragment>
                        <SignatureCanvas backgroundColor='rgb(230,230,230)'
                            ref={signatureRef}
                            canvasProps={{ width: 500, height: 250, style: { 'border': '1px solid #000000' } }}
                            onBegin={() => { setError(false) }}
                            onEnd={() => (saveSignature(signatureRef.current.getTrimmedCanvas().toDataURL('image/jpg')))}
                        />
                        <div>
                            <button onClick={() => {
                                signatureRef.current.clear();
                                saveSignature(null);
                            }}> Borrar </button>

                            <pre>
                                {
                                    error ? <div>La firma es obligatoria</div> : false
                                }
                            </pre>
                        </div>
                    </Fragment>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFirmaClose} color="primary">
                        Cancelar
				  </Button>
                    <Button onClick={Signed} color="primary">
                        Confirmar
				  </Button>
                </DialogActions>
            </Dialog>
			
		</div>
	);
}

export default S_Trabajo;