import React from 'react'
import {BrowserRouter as Router,
Switch,
Route,
Redirect,
Link,
withRouter} from 'react-router-dom'
import { isLogin, isRole } from './functions';

const Routes = ({component: Component,role: ROLE, ...rest}) => {
    
    return ( 
        
            <div>
                <Route {...rest} render={props => (
                    isLogin() ? (isRole(ROLE) ? <Component {...props}/> : <Redirect to="/denied"/>)
                    : <Redirect to="/"/>
                )} />
                
            </div>
     );
}
 
export default Routes;
