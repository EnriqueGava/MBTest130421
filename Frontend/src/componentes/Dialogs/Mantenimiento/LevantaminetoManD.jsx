import React, { Fragment, useRef, useState, useEffect } from "react";
import {
    Button, Dialog, AppBar, Toolbar,
    Typography, IconButton, List, TextField,
    ListItem, Divider, Slide, ListItemText,
    Box,
    Grid,
    Container,
    GridList,
    GridListTile,
    DialogTitle,
    DialogContent,
    DialogActions,
	DialogContentText
} from '@material-ui/core';
import { Table, TablePagination, Paper } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';
import Lev_MantPDF from "./Lev_MantPDF";
import SignatureCanvas from "react-signature-canvas";
import { getImgs, FirmaMant, checkMant } from '../../../functions';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "#4caf50",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    table: {
        minWidth: 50
    },
    linepad: {
        offset: theme.mixins.toolbar,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    boton1: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    boton2: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    dialogf: {
        backgroundColor: "#f4f6f8",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
}));


const LevantamientoManD = (props) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
//Agregar-----------------	
    const [opent, setOpen] = React.useState(false);
	const [openPdf, setOpenPdf] = React.useState(false);
    const [op, setOp] = React.useState(false);
	const [openF, setOpF] = React.useState(false);
    const [data, setData] = React.useState({
        id_cc: ""
    });
    const [imagenReg, setImReg] = React.useState([]);

    const handleClickOpen = () => {
		console.log(props.datos)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOp = () => {
        setOp(true);
    };

    const handleCl = () => {
        setOp(false);
         
    };
	const handleOFirma = () => {
        setOpF(true);
    };

    const handleClFirma = () => {
        setOpF(false); 
		if(remn != '' && remp != '' && imageData != '')
			setDis(false); 		
    };

    const ImReg = async (id) => {
        setImReg(await getImgs(id));
        handleOp();
        //console.log(imagenReg);
    }
	

	const handleOpenPdf = () => {
		console.log(dataForm)
        setOpenPdf(!openPdf);
    };

    const [referencia, setref] = React.useState('');
	const [asunto, setasunto] = React.useState('');
	const [recn, setrecn] = React.useState('');
	const [recp, setrecp] = React.useState('');
	const [remn, setremn] = React.useState('');
	const [remp, setremp] = React.useState('');
	const [tramo, settramo] = React.useState(' ');
	const [disrc, setDisRc] = React.useState(true);
	const [disrm, setDisRm] = React.useState(true);
	const [dis, setDis] = React.useState(true);
	
	const handleChangeRef = (event) => {
		setref(event.target.value);
		if(referencia != '' && asunto != '' && tramo != '')
			setDisRc(false)};		
	const handleChangeAsunto = (event) => {
		setasunto(event.target.value);
		if(referencia != '' && asunto != '' && tramo != '')
			setDisRc(false)};
	const handleChangeRecN = (event) => {
		setrecn(event.target.value);
		if(recn != '' && recp != '')
			setDisRm(false)};	
	const handleChangeRecP = (event) => {
		setrecp(event.target.value);
				console.log(remn)
		if(recn != '' && recp != '')
			setDisRm(false)};	
	/* const handleChangeRemN = (event) => {
		setremn(event.target.value);
		if(remn != '' && remp != '' && imageData != '')
			setDis(false)};  */
	const handleChangeRemP = (event) => {
		setremp(event.target.value);
		setremn(props.idMant.Nombre+' '+props.idMant.Apellido);
		//console.log(remn)
		if(remn != '' && remp != '' && imageData != '')
			setDis(false)}; 	
	const handleChangeTramo = (event) => {
		settramo(event.target.value);
		if(referencia != '' && asunto != '' && tramo != '')
			setDisRc(false)};			
		
  const [signData, setSigndata] = React.useState('');
	const signatureRef = useRef({});
	const [imageData, setImageData] = useState("");
	const [error, setError] = useState(false);
	const saveSignature = (signature) => { setImageData(signature); }
	useEffect(() => {
		},[imageData]);
		
	const checkFirma = async() => {
		console.log(props.idMant.Id_Mantenimiento);
		let q= await checkMant(props.idMant.User_ID);
		console.log(q);
        if( q.firma == null)
			handleOFirma();
		else{
		console.log("Guardando firma");
		//props.fun();
		getFirmaDes();
		console.log(imageData)
		setDis(false);
		}
    };
	
	const Signed =() => {
	console.log(imageData)
    FirmaMant(props.idMant.Id_Mantenimiento,imageData);
	console.log("Guardando firma");
    handleClFirma();
  }
  
  const [imagendes, setImagen] = React.useState({});
  const getFirmaDes = () => {
    axios.post("/users/desencrypt", { email: props.idMant.User_ID, password: props.idMant.firma})
    .then(result => {
      if (result.data.success === true) {
        console.log(result)
        setImageData(Object.values(Object.values(result.data))[1]);
      }
    })
/* 	console.log(imagendes)
    return imagendes */
  }
			
		
  const DigitalSignature =(
        <Fragment>
            <SignatureCanvas  backgroundColor = 'rgb(255,255,255)'
			ref={signatureRef}
			canvasProps={{width: 300, height: 200, style:{'border':'1px solid #000000'} }}
			onBegin={() => {setError(false)}}
			onEnd={ () => (saveSignature(signatureRef.current.getTrimmedCanvas().toDataURL('image/jpg')))}
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
    );	
	
		const dataForm = {
		ref: referencia,
		as: asunto,
		recN: recn,
		recP: recp,
		remN: remn,
		remP: remp,
		firma: imageData,
		//tramo: props.datos.tramo,
	}
//----------------------
    function levantamientos() {
        if (props.datos.length > 0) {
          return props.datos.map((item) => {
            let tabItem = (
                    <TableRow hover>
                    <TableCell align="center"> {item.Id_cc} </TableCell>
                    <TableCell align="center">{item.nombre_ca}</TableCell>
                    <TableCell align="center">{item.nombre_co}</TableCell>
                    <TableCell align="center">{item.nombre_pa}</TableCell>
                    <TableCell align="center">{item.falla}</TableCell>
                    <TableCell align="center">
                        <Button onClick={() => ImReg(item.Id_elemento)}><ImageIcon fontSize="large" /></Button>
                    </TableCell>
                </TableRow>
            );

            return tabItem;
          })
    
        }
      }

    function getimage() {
        if(imagenReg){
            return imagenReg.map((item) => {
                                   let img = (	
                                   <GridListTile>
                                           <img src={"data:image/png;base64,"+item} width="400" height="400" />
                                           
                                   </GridListTile>		
                                   );
                                       return img;
            })
            }
     else
       return "";
   }



	
    const classes = useStyles();
    return (
        <Container>

            <Dialog fullScreen open={props.open} onClose={props.fun} classes={{ paper: classes.dialogf }}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton autoFocus edge="start" color="inherit" onClick={props.fun}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Box p={3}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell align="center">Clave</TableCell>
                                    <TableCell align="center">Categoria</TableCell>
                                    <TableCell align="center">Concepto</TableCell>
                                    <TableCell align="center">Parte</TableCell>
                                    <TableCell align="center">Falla</TableCell>
                                    <TableCell align="center">Foto de la falla</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {levantamientos()}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={props.datos.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
				 <Box mr={4}>
                        <Grid item xs={12} sm={5}>
                            <Button variant="contained" className={classes.boton2} onClick={() => handleClickOpen()}>
                                Generar Oficio
                        </Button>
                        </Grid>
                    </Box>
            </Dialog>

            <Dialog onClose={handleCl} aria-labelledby="customized-dialog-title" open={op}>
                <DialogTitle id="customized-dialog-title" onClose={handleCl}>
                    Fotos de las Fallas
                </DialogTitle>
                <DialogContent dividers>
                    <GridList className={classes.gridList} cellHeight={500} cols={2}>
                        {getimage()}
                    </GridList>
                </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCl} color="primary">
                        Cerrar
          </Button>
                </DialogActions>
            </Dialog>

		
			<Dialog open={opent} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="true" maxWidth="md">
        <DialogTitle id="form-dialog-title">Datos requeridos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Favor de completar los siguientes datos referentes al documento a generar. 
          </DialogContentText>
					<TextField required id="standard-full-width" label="Referencia" style={{ margin: 5 }}  fullWidth margin="normal" className={classes.margin} onChange={handleChangeRef} />
					<TextField required id="standard-full-width" label="Asunto"  style={{ margin: 5 }}  fullWidth margin="normal" className={classes.margin} onChange={handleChangeAsunto} />

					<TextField required disabled={disrc} id="standard-full-width" label="Dirigido a..."  style={{ margin: 5}} fullWidth margin="normal" className={classes.margin} onChange={handleChangeRecN} />
					<TextField required disabled={disrc} id="standard-full-width" label="Cargo"  style={{ margin: 5}} fullWidth margin="normal" className={classes.margin} onChange={handleChangeRecP} />

					
					<TextField required disabled={disrm} id="standard-full-width" label="Puesto Solicitante"  style={{ margin: 5}} fullWidth margin="normal" className={classes.margin} onChange={handleChangeRemP} />  

					<Button  disabled={disrm} variant="contained" className={classes.boton2} onClick={checkFirma} >
                                Firmar
                        </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button disabled={dis} onClick={() => handleOpenPdf()} color="primary">
            Generar PDF
          </Button>
        </DialogActions>
      </Dialog>
	  <Dialog open={openF} onClose={handleClFirma} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Firma</DialogTitle>
				<DialogContent>
				{DigitalSignature}
				</DialogContent>
				<DialogActions>
				  <Button onClick={handleClFirma} color="primary">
					Cancelar
				  </Button>
				  <Button onClick={Signed} color="primary">
					Confirmar
				  </Button>
				</DialogActions>
			</Dialog>
			<Lev_MantPDF open={openPdf} fun={handleOpenPdf} datos={props.datos} numOrden={props.numOrden} dataf={dataForm} lineaest={props.lineaest}/>
		

        </Container>
    );
}

export default LevantamientoManD;