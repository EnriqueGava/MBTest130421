import React from 'react'
import {
Route,
Redirect} from 'react-router-dom'
import { isLogin,getDatosUpdate, isRole, hasRole } from './functions';
import Cookie from 'js-cookie'


const Routes = ({component: Component,...rest}) => {

    const path = () => {
       
        const role = Cookie.get("Role");
        if(role == "CampoE")
            return <Redirect to="/Campo/levantamientos"/>;
        if(role == "JUDE")
            return <Redirect to="/JUD/levantamientos"/>;
        if(role == "MantE")
            return <Redirect to="/Mantenimiento/Status_T"/>;
        if(role == "SupE")
            return <Redirect to="/Supervisor/levantamientos"/>;
        if(role == "CuadE")
            return <Redirect to="/Cuadrilla/levantamientos_cu"/>;
    }
    
    return ( 
        
            <div>
                <Route {...rest} render={props => (
                    isLogin() ? path()
                    : <Redirect to="/login"/>
                )} />
                
            </div>
     );
}
 
export default Routes;
