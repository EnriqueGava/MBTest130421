import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {InputAdornment} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from "@material-ui/core/InputLabel";
import { Formik } from 'formik';
import * as Yup from "yup";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
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



const CambiarPwdS = (props) => {

  const classes = useStyles();

  const [passwords, setPasswords] = useState({
    password : "",
    confirmpassword: "",
    showPassword: false,
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState({value : false});

  const handleInputChange = (event,tou) => {
    passwords[event.target.name] = event.target.value;
    if(tou==true)
    setPasswords({ ...passwords, showPassword: !passwords.showPassword });
    else
    setPasswords({ ...passwords, showPassword: passwords.showPassword });
  }
  


  console.log(passwords);


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

  

  return (
    <div>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open} fullWidth={true} maxWidth = {'md'}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Actualizar Contrase??a
                </DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              password:passwords.password,
              confirmpassword: passwords.confirmpassword,
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .required("No password provided.")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Debe contener 8 caracteres, una may??scula, una min??scula, un n??mero y un car??cter especial"
                ),
              confirmpassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Las contrase??as no coinciden')
                .required("No password provided.")
                
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleClickShowPassword = () => {
                  setPasswords({ ...passwords, showPassword: !passwords.showPassword });
                  console.log(passwords.showPassword);
                },
              
                handleReset,
              } = props;
              return (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="introduce la nueva contrase??a"
                    name="password"
                    onChange={handleInputChange} 
                    value={values.password}
                    type={passwords.showPassword ? 'text' : 'password'}
                    onBlur={handleBlur}
                    InputProps={{
                      name: "password",
                      endAdornment: 
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => handleInputChange(e,true)}
                        >
                          {passwords.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>,
                      id: "password"
                      
                    }}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                   {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmpassword"
                    label="introduce la contrase??a de nuevo"
                    name="confirmpassword"
                    disabled={false}
                    type="password"
                    value={values.confirmpassword}
                    onChange={(e) => handleInputChange(e,false)}
                    onBlur={handleBlur}
                    className={
                      errors.confirmpassword && touched.confirmpassword
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.confirmpassword && touched.confirmpassword && (
                    <div className="input-feedback">{errors.confirmpassword}</div>
                  )}


                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"


                  >
                    Cambiar Contrase??a
                    </Button>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CambiarPwdS;