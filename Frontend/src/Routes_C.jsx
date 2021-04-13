import React from 'react'
import {BrowserRouter as Router,
Switch,
Route,
Link,
withRouter} from 'react-router-dom'
import Login from './componentes/paginas/Login/Login'
import Signup from './componentes/paginas/Login/Signup'
import RecuperarC from './componentes/paginas/Login/RecuperarC'
const Routes = () => {
    return ( 
        <Router>
            <div>
            <hr/>
                <Route path="/Login"component={Login} exact/>
                <Route path="/RecuperarC" component={RecuperarC} exact/>
                <Route path="/SignUp" component={Signup} exact/>
                <Route path="/" exact={true} />
                
            </div>
        </Router>
     );
}
 
export default Routes;