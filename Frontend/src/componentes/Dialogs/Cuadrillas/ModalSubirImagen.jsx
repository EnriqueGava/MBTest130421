import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { DropzoneArea } from 'material-ui-dropzone';
import { green, red } from '@material-ui/core/colors';
import axios from 'axios';
import swal from 'sweetalert';
import Cookie from 'js-cookie';
import {UploadImagesMant} from '../../../functions';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
  },
  boton2: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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

const ModalSubirImagen = (props) => {
  const classes = useStyles();
  const [imagenD, setImagenD] = React.useState('');
  const [imagenes, setImagenes] = useState({imagenes: ''})



  const DialogTitle = withStyles(useStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  console.log(props.cood);

  const Upload = async() => {
    if(imagenes.imagenes.length > 0)
      await axios.post('/registro/test/', {imagenes: imagenes.imagenes, id: props.cood})
      .then(result => {
          if(result.data.success === true) {
            swal("Imagenes Subidas", Cookie.get("Nombre"), "success");
            props.Refresh();
            props.handleClose();
            setImagenes({imagenes: ''});
          }
      })
    else{
      swal("Seleccionar al menos 1 imagen", Cookie.get("Nombre"), "error");
    }
  };

  const getBase64 = (files) => {
    console.log(files);
    if (files && files.length > 0) {
      files.forEach(function (file, index) {
        const currfile = file;
        var reader = new FileReader();
        reader.readAsDataURL(currfile);
        reader.onload = function () {
          let imgData = reader.result.replace(/^data:image\/(png|jpeg|bmp);base64,/, "");
          files[index] = imgData;
          try {
            imagenes['imagenes'] = files;
          }
          catch (e) {
            console.log("Error en Base64");
          }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      });

      return files;
    }
    else
      return "hola"
  }

  const Holi = (files) => {
    console.log(imagenes);
  }

  console.log(imagenes);


  return (
    <div>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open} fullWidth={true} maxWidth={'md'}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Subir Imagenes del mantenimiento realizado {props.cood}
        </DialogTitle>
        <DialogContent dividers>
          <Container>
            <DropzoneArea maxFileSize={10000000} acceptedFiles={['image/*']} filesLimit={10}
              dropzoneText={"Arrasta la imagen o da click aqui"} onChange={files => getBase64(files)} />
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button variant="contained" component="label" className={classes.boton2} onClick={Upload}>
                Aceptar
                    </Button>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ModalSubirImagen;