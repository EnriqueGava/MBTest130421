import React, { Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer';
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
import CloseIcon from '@material-ui/icons/Close';
import { red, green } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';
import { getImgs, LevJud, FirmaJud, checkJud} from '../../../functions';



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


Font.registerHyphenationCallback(word => [word]);
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
	paddingTop: 25,
	paddingBottom: 25,
	marginBottom: 10,
    paddingHorizontal: 35,
  },
  section: {
    margin: 5,
    padding: 5,
  },
    image: {
    marginVertical: 5,
    marginHorizontal: 10,
	width: 200,
	height: 75,
  },
  
  fImage: {
    marginBottom: 50,
    marginRight: 2,
	width: 150,
	height: 50,
  },
  
  htext: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'right',
  },
  
  ftext: {
    fontSize: 8,
	marginBottom: 1,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'left',
    color: 'grey',
  },
  
  bodytext: {
    fontSize: 12,
    marginBottom: 2,
    textAlign: 'justify',
  },
  
  block: {

    height: 100,
    width: 250,
  },
  
    blockf: {
    height: 50,
    width: 250,
	
  },
  
   content: {
    padding: 20,
    '@media max-width: 400': {
      flexDirection: 'column',
    },
    '@media min-width: 400': {
      flexDirection: 'row',
    },
  },
   header: {
    padding: 15,
    '@media max-width: 400': {
      flexDirection: 'column',
    },
    '@media min-width: 400': {
      flexDirection: 'row',
    },
  },
  
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 0,
	'@media max-width: 400': {
      flexDirection: 'column',
    },
    '@media min-width: 400': {
      flexDirection: 'row',
    },
  },
  
});

const Lev_MantPDF = (props) => {

	//console.log(props.datos)
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [op, setOp] = React.useState(false);
    const [data, setData] = React.useState({
        id_cc: ""
    });
    const [imagenReg, setImReg] = React.useState([]);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
		props.fun();
    };
    const handleOp = () => {
        setOp(true);
    };

    const handleCl = () => {
        setOp(false);
         
    };

  function getimage(imgs) {
			let imgIx = imgs.split(",");
            return imgIx.map((item) => {
					if(item.startsWith("iVBORw0KG"))
						item = "data:image/png;base64,"+item;
					if(item.startsWith("/9j/4AAQSkZJR"))
						item = "data:image/jpg;base64,"+item;   
					
					return	<Image src={item} style={[styles.image, {width: 150, height: 150}]}/>                 
            })

   }
   
var linea = "N/A";
var estacion = "N/A";
if(props.lineaest){
	linea = props.lineaest.nombre_li;
	estacion = props.lineaest.nombre_es;
}
//console.log(linea+" "+estacion)
var referencia = props.dataf.ref;
var asunto = props.dataf.as;
var recNombre = props.dataf.recN;
var recPuesto = props.dataf.recP;
var concepto = "";
var categoria = "";
var daños = "";
var tramoA = "";
var anexo="";
 if (props.datos.length > 0) {
       daños =  props.datos.map((item) => {
			  let daño = item.falla+" en "+item.nombre_pa+" en el tramo de "+item.tramo+".";
				return <Text style={styles.bodytext}> {daño} </Text>
		});	
		anexo = props.datos.map((item) => {
			let daño = item.falla+" en "+item.nombre_pa+" en el tramo de "+item.tramo+".";
			let img =  getimage(item.imagen);
			return (
				<View>
					<Text style={[styles.bodytext, {fontSize:8}]}> {daño} </Text>
						{img}
				</View>	
			);		
			
			
		  });
          }	  
var nombre_Rem = props.dataf.remN;
var puesto_Rem = props.dataf.remP;
var firma = props.dataf.firma;

function getFecha(){
	var meses = ["Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	let año = (new Date()).getFullYear();
	let mes = (new Date()).getMonth();
	let dia = (new Date()).getDate();
	
	var fecha = dia+" de "+meses[mes]+" del "+año;
	return fecha;
}
var NoOficio = "MB/ DEOTP /GEUTP/"+props.numOrden+"/"+(new Date()).getFullYear();


  
const MediaComponent = () => (
  <View style={styles.content}>
    <View style={[styles.block, { backgroundColor: 'green' }]} />
  </View>
);

const Header = () => (
  <View style={styles.header} fixed>
    <View style={styles.block}>
		<Image src={"/images/logos/gobLogo.png"} style={styles.image}/>
	</View>
	<View style={[styles.block, ]}>
		<Text style={styles.htext}>METROBÚS</Text>
		<Text style={styles.htext}>DIRECCIÓN EJECUTIVA DE OPERACIONES TÉCNICA Y PROGRAMATICA</Text>
		<Text style={styles.htext}>GERENCIA DE ESTACIONES, UNIDADES DE TRANSPORTE Y PROYECTOS</Text>
		<Image src={"/images/logos/2020leona.jpg"} style={[styles.image, { width: 100, height: 50, marginHorizontal:150}]}/>
	</View>
  </View>
);

const Footer = () => (
  <View style={styles.footer} fixed>
	<View style={styles.blockf}>
		<Text style={styles.ftext}>Avenida Cuauhtémoc 16, colonia Doctores,</Text>
		<Text style={styles.ftext}>Alcaldía Cuauhtémoc C.P. 06720, Ciudad de México</Text>
		<Text style={styles.ftext}>T. 5761 6858, 5761 6860, 5761 6864, 5761 6870</Text>
	</View>
	<View style={[styles.blockf, {display: "flex", alignItems:"right"}]}>
		<Image src={"/images/logos/logo2.jpg"} style={styles.fImage}/>
	</View>
  </View>
);

// Create Document Component
const MyDocument = () => (
	
  <Document title = "Informe Carriles Confinados" > 
    <Page style={styles.page} wrap>
	  <Header/>
      <View style={styles.section}>
        <Text style={styles.htext}>Ciudad de México, a {getFecha()}</Text>
		<Text style={styles.htext}>{NoOficio}</Text>
		<Text style={styles.htext}>Asunto: {asunto}</Text>
		<Text style={styles.htext}>Referencia: {referencia} </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.bodytext, { textAlign: 'left' }]}>{recNombre}.</Text>
		<Text style={[styles.bodytext, { textAlign: 'left' }]}>{recPuesto}.</Text>
		<Text style={[styles.bodytext, { textAlign: 'left' }]}>PRESENTE.</Text>
      </View>
	  
	  <View style={styles.section}>
        <Text style={styles.bodytext}>Sirva este medio para informarle que estamos en vísperas de
			realizar el proyecto de {referencia}, en el cual se detectan los siguientes daños en la estación {estacion} de la {linea}:</Text>
				{daños}
	  </View>
	  
	   <View style={styles.section}>
		<Text style={styles.bodytext}>De igual forma me permito solicitar su valiosa intervención para rehabilitar como hecho prioritario el asfalto que pertenece al {referencia}. Anexo imagénes de las fallas que se comentan y listado de los tramos con dimensiones aproximadas a reparar, para mayor referencia.</Text>
      </View>
	  
	  <View style={styles.section}>
	  <Text style={styles.bodytext}>Sin más por el momento, reciba un cordial saludo.</Text>
	  <Text style={styles.bodytext}>ATENTAMENTE</Text>
      </View>
	  
	  
	  <View style={styles.section}>
		<Image src={firma} style={[styles.image, { width: 100, height: 60, marginHorizontal: 25 }]}/>
		<Text style={[styles.bodytext, { textAlign: 'left' }]}>{nombre_Rem}</Text>
        <Text style={[styles.bodytext, { textAlign: 'left' }, {fontSize: 10}]}>{puesto_Rem}</Text>
		<Text style={[styles.bodytext, {fontSize: 6}]}>c.c.c.e.p Ing. Roberto Samuel Capuano Tripp.- Director General de Metrobús.- rct@metrobus.cdmx.gob.mx</Text>
      </View>
	 
	  
	  <View style={styles.section} break>
		<Text style={[styles.bodytext, {textAlign: "center"}]} > ANEXO 01 </Text>
			{anexo}
	  </View>
	  <Footer/>
    </Page>
  </Document>
);

	
    const classes = useStyles();
    return (
        <Container>

            <Dialog fullScreen open={props.open} onClose={() => window.location.reload(false)} classes={{ paper: classes.dialogf }}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton autoFocus edge="start" color="inherit" onClick={() => window.location.reload(false)}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
			   <Button variant="contained" className={classes.boton2}>
				<PDFDownloadLink document={<MyDocument />} fileName={"Oficio_"+NoOficio+".pdf"}>
				  {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar Documento')}
				</PDFDownloadLink>
			  </Button>
		  
               <div align="center">
			<PDFViewer height={window.screen.height - 200} width="100%"  >
				<MyDocument />
			</PDFViewer>
			

</div>
				
            </Dialog>

        </Container>
    );
}

export default Lev_MantPDF;