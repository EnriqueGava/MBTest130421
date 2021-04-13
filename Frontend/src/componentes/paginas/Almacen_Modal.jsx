import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
// import Modal from 'react-bootstrap/Modal'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
	
    
  },
	table: {
		minWidth: "100%",
	},
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
	marginRight: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function createData( elemento, cantidad) {
  return { elemento, cantidad};
}

const herramienta = [
  createData('Martillo', 15),
];

const material = [
  createData('Cemento', 305),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#9e9e9e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

/* function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
} */

export default function Almacen() {
  const classes = useStyles();
 // const [modalShow, setModalShow] = useState(false);

  const [modalStyle] = React.useState(getModalStyle);
 const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.Modal}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>Herramienta</StyledTableCell>
					<StyledTableCell align="right">Cantidad</StyledTableCell>
					<StyledTableCell align="right">Agregar</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {herramienta.map((row) => (
					<TableRow key={row.elemento}>
					  <TableCell component="th" scope="row">
						{row.elemento}
					  </TableCell>
					  <TableCell align="right">{row.cantidad}</TableCell>
					  <TableCell align="right">
							<IconButton aria-label="agregar">
								<AddIcon />
							</IconButton>
					  </TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</TableContainer>
    </div>
  );

  return (
    <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            ALMACÉN
          </Typography>
          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>Herramienta</StyledTableCell>
					<StyledTableCell align="right">Cantidad</StyledTableCell>
					<StyledTableCell align="right">Eliminar</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {herramienta.map((row) => (
					<TableRow key={row.elemento}>
					  <TableCell component="th" scope="row">
						{row.elemento}
					  </TableCell>
					  <TableCell align="right">{row.cantidad}</TableCell>
					  <TableCell align="right">
							<IconButton aria-label="delete">
								<DeleteIcon />
							</IconButton>
					  </TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</TableContainer>
			  <Button
				  //type="submit"
				  fullWidth
				  variant="contained"
				  color="secondary"
				  className={classes.submit}
				   onClick={handleOpen}
				>
				  Agregar Herramienta
				</Button>
				 
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>Material</StyledTableCell>
					<StyledTableCell align="right">Cantidad</StyledTableCell>
					<StyledTableCell align="right">Eliminar</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {material.map((row) => (
					<TableRow key={row.name}>
					  <TableCell component="th" scope="row">
						{row.elemento}
					  </TableCell>
					  <TableCell align="right">{row.cantidad}</TableCell>
					  <TableCell align="right">
							<IconButton aria-label="delete">
								<DeleteIcon />
							</IconButton>
					  </TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</TableContainer>
				<Button
				  //type="submit"
				  fullWidth
				  variant="contained"
				  color="secondary"
				  className={classes.submit}
				   onClick={handleOpen}
				>
				  Agregar Material
				</Button>
				
           </Grid>
		   <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				
			  >
				{body}
			  </Modal>
				<Button
				  type="submit"
				  width= "25%"
				  align= "right"
				  variant="contained"
				  color="secondary"
				  className={classes.submit}
				>
				  Siguiente
				</Button>
				
          </form>
				
            
        </div>
	</Container>	
  );
}