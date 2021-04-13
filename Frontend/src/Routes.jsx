import React from 'react'
import {BrowserRouter as Router,
Route,} from 'react-router-dom'
import Levantamiento from './componentes/paginas/Levantamiento';
import NuevaLinea from './componentes/paginas/NuevaLinea';
import NuevaCategoria from './componentes/paginas/NuevaCategoria';
import NuevaFalla from './componentes/paginas/NuevaFalla';
import LevantamientoCu from './componentes/paginas/Campo/LevantamientosC';
import SolicitudT from './componentes/paginas/SolicitudT';
import EditarPerfilJ from './componentes/paginas/EditarPerfilJ';
import LevantamientoD from './componentes/Dialogs/LevantamientoD';
import SolicitudTD from './componentes/Dialogs/SolicitudTD';
import LevantamientoDC from './componentes/Dialogs/Campo/LevantamientoDC';
import LevantamientoS from './componentes/paginas/Supervisor/LevantamientoS';
import EditarPerfilS from './componentes/paginas/Supervisor/EditarPerfilS';
import LevantamientoNue from './componentes/paginas/Campo/LevantamientoNue';
import EditarPerfil from './componentes/paginas/Campo/EditarPerfilL';
import EditarPerfilCu from './componentes/paginas/Cuadrilla/EditarPerfilCu';
import LevantamientosCu from './componentes/paginas/Cuadrilla/LevantamientosCu';
import LevantamientoNueD from './componentes/Dialogs/Campo/LevantamientoNueD';
import SolicitudAD from './componentes/Dialogs/SolicitudAD';
import NuevaLineaD from './componentes/Dialogs/NuevaLineaD';
import Almacen from './componentes/paginas/Mantenimiento/Almacen';
import EditarPerfilM from './componentes/paginas/Mantenimiento/EditarPerfilM';
import STrabajo from './componentes/paginas/Mantenimiento/S_Trabajo'
import MaLevant from './componentes/paginas/Mantenimiento/Lev_Mant'
import StatusT from './componentes/paginas/Mantenimiento/Status_Trabajo'
import Inventarios from './componentes/paginas/Mantenimiento/InventariosMenu';
import LevantamientoCD from './componentes/Dialogs/Campo/LevantamientoCD';
import Login from './componentes/paginas/Login/Login'
import Registro from './componentes/paginas/Login/Registro'
import Signup from './componentes/paginas/Login/Signup'
import RecuperarC from './componentes/paginas/Login/RecuperarC'
import PrivateRoute from './PrivateRoute'
import RootRoute from './RootRoute'
import Denied from './componentes/paginas/Denied';
import ValidarUsuario from './componentes/paginas/ValidarUsuarios';
import SupLevantamiento from './componentes/paginas/Supervisor/LevantamientoNue';
import MenuCua from './componentes/paginas/Cuadrilla/CuadrillasMenu'
const Routes = () => {
    
    return ( 
        
            <div>
                <RootRoute path="/"  exact={true} />
                <PrivateRoute path="/Jud/levantamientos" role="JUDE" component={Levantamiento} exact/>
                <PrivateRoute path="/Jud/levantamientos/Dialog" role="JUDE" component={LevantamientoD} exact/>
                <PrivateRoute path="/Jud/solicitud_trabajo" role="JUDE" component={SolicitudT} exact/>
                <PrivateRoute path="/Jud/solicitud_trabajo/Dialog" role="JUDE" component={SolicitudTD} exact/>
                <PrivateRoute path="/Jud/solicitud_almacen/Dialog" role="JUDE" component={SolicitudAD}/>
                <PrivateRoute path="/Jud/Edit_perfilJ" role="JUDE" component={EditarPerfilJ}/>
                <PrivateRoute path="/Jud/Usuarios" role="JUDE" component={ValidarUsuario}/>
                <PrivateRoute path="/Jud/Nueva_Linea" role="JUDE" component={NuevaLinea}/>
                <PrivateRoute path="/Jud/Nueva_Categoria" role="JUDE" component={NuevaCategoria}/>
                <PrivateRoute path="/Jud/Nueva_Falla" role="JUDE" component={NuevaFalla}/>
                <PrivateRoute path="/Campo/levantamientos" role="CampoE" component={LevantamientoCu} exact/>
                <PrivateRoute path="/Cuadrilla/levantamientos_cu" role="CuadE"  component={LevantamientosCu} exact/>
                <PrivateRoute path="/Campo/new_levantamientos" role="CampoE" component={LevantamientoNue} exact/>
                <PrivateRoute path="/Campo/edit_perfil" role="CampoE" component={EditarPerfil} exact/>
                <PrivateRoute path="/Cuadrilla/edit_perfilcu" role="CuadE" component={EditarPerfilCu} exact/>
                <PrivateRoute path="/Cuadrilla/menucua" role="CuadE" component={MenuCua} exact/>
                
                <PrivateRoute path="/Campo/levantamientos/Dialog" role="CampoE" component={LevantamientoCD} exact/>
                <PrivateRoute path="/Campo/new_levantamientos/Dialog" role="CampoE" component={LevantamientoNueD} exact/>
                <PrivateRoute path="/Mantenimiento/MaLevantamiento" role="MantE" component={MaLevant} exact/>
                <PrivateRoute path="/Mantenimiento/Almacen" role="MantE" component={Almacen} exact/>
                <PrivateRoute path="/Mantenimiento/Edit_PerfilM" role="MantE" component={EditarPerfilM} exact/>
                <PrivateRoute path="/Mantenimiento/STrabajo" role="MantE" component={STrabajo} exact/>
                <PrivateRoute path="/Mantenimiento/Status_T" role="MantE" component={StatusT} exact/>
                <PrivateRoute path="/Mantenimiento/InventarioM" role="MantE" component={Inventarios} exact/>
                <PrivateRoute path="/Supervisor/levantamientos" role="SupE" component={LevantamientoS} exact/>
                <PrivateRoute path="/Supervisor/nuevo_levantamiento" role="SupE" component={SupLevantamiento} exact/>
                <PrivateRoute path="/Supervisor/Edit_PerfilS" role="SupE" component={EditarPerfilS} exact/>
                <Route path="/denied" component={Denied} exact/>
                <Route path="/RecuperarC" component={RecuperarC} exact/>
                <Route path="/SignUp" component={Signup} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/registro" component={Registro} exact />
                
            </div>
     );
}
 
export default Routes;
