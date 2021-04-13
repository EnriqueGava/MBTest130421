import React from 'react'
import Alert from '@material-ui/lab/Alert'
const jwt_decode = require('jwt-decode');

const Denied = () => {
    

    return (
        <div>
            <Alert severity="error">Permiso no autorizado</Alert>
        </div>
    )
}

export default Denied;