import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red } from '@material-ui/core/colors';
import SignatureCanvas from "react-signature-canvas";
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import swal from 'sweetalert';
import Dialog from '@material-ui/core/Dialog';
import Cookie from 'js-cookie';
import axios from 'axios';
import {
    FirmaMant, checkMant, DevolverH
} from './../../../functions';
import { Link } from 'react-router-dom';
const FirmaM = (props) => {
    const useStyles = makeStyles((theme) => ({
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

    const classes = useStyles();
    const [dfirma, SetDfirma] = React.useState(false);
    const [imageData, setImageData] = React.useState("");
    const saveSignature = (signature) => { setImageData(signature); };
    const [user, setUser] = React.useState({});
    const [error, setError] = React.useState(false);
    const signatureRef = React.useRef({});
    const [herramienta, setHerramienta] = React.useState([]);
    const [material, setMaterial] = React.useState([]);
    const [success, setSuccess] = React.useState(true);

    React.useEffect(() => {
        axios.post("/users/user", { token: Cookie.get("Token") })
            .then(data => {
                axios.get(`/jdsp/dmant/${data.data.user}`)
                    .then(result => {
                        setUser(Object.values(Object.values(result.data))[0]);
                    });
            });
        if(localStorage.getItem("herramienta"))
            setHerramienta(JSON.parse(localStorage.getItem("herramienta")));
        if(localStorage.getItem("material"))
            setMaterial(JSON.parse(localStorage.getItem("material")));
    }, []);

    useEffect(() => {
        if(!success)
            swal("Ocurrio un error", Cookie.get("Nombre"), "error");
    },[success]);

    const handleFirmaOpen = () => {
        SetDfirma(true);
    };
    const handleFirmaClose = () => {
        SetDfirma(false);
    };
    

    const Signed = () => {
        FirmaMant(user.Id_Mantenimiento, imageData);
        console.log("Guardando firma");
        axios.post("/salmacen/insert", props.datos)
            .then(result => {
                swal("Solicitudes Generadas", Cookie.get("Nombre"), "success");
                setInterval(function () {
                    window.location.replace("/Mantenimiento/Status_T");
                }, 1000);
            });
    }

    const checkFirma = async () => {
        if (props.terminar) {
            let q = await checkMant(user.User_ID);
            if (q.firma == null)
                handleFirmaOpen();
            else {
                axios.post("/salmacen/insert", props.datos)
                    .then(result => {
                        if (localStorage.getItem("herramienta"))
                            localStorage.removeItem("herramienta");
                        if (localStorage.getItem("material"))
                            localStorage.removeItem("material")
                        swal("Solicitudes Generadas", Cookie.get("Nombre"), "success");
                        setInterval(function () {
                            window.location.replace("/Mantenimiento/Status_T");
                        }, 1000);
                    });

            }
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

    console.log(success);

    return (
        <div>
            {<Grid container spacing={3}>
                <Box flexGrow={1} ml={5}>
                    <Grid item xs={12} sm={6}>
                        <Button 
                            type="submit"
							width="25%"
							align="right"
							variant="contained"
                            color="secondary"
                            className={classes.boton2}
                            onClick={() => checkFirma()} >
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
    </Grid> }


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
    )
}

export default FirmaM;