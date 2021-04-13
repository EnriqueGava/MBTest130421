const axios = require("axios");
const Cookies = require('js-cookie');


export const hasRole = (token) => {
    const Role = Cookies.get("Role");
    return Role;
}

export const isLogin = () => {
    
    if(Cookies.get("Token"))
        return true;
    else
        return false;
}

export const isRole = (ROLE) => {
    if(ROLE == hasRole(Cookies.get("Token")))
        return true; 
    else
        return false;
}

//Logout
export const Logout = () => {
    if(Cookies.get("Token"))
    {
        Cookies.remove("Token");
        Cookies.remove("User_ID");
        Cookies.remove("Nombre");
        Cookies.remove("Role");
        window.location.reload(false);
    }
}

//Eliminar Herramientas y Materiales 
export const DevolverHym = async() => {
    let aux = JSON.parse(localStorage.getItem("herramienta"));
    await axios.post("/inventario/cerrarSesion", {
        Tipo: "Herramienta",
        Datos: aux
    })
    .then(result => {
        console.log(result);
    })
    
}

//Devolver Herramientas
export const DevolverH = async(Codigo, Cantidad) => {
    return await axios.post("/inventario/devolver", {
        Codigo: Codigo,
        Cantidad: Cantidad
    })
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    })

}
//Validar Usuarios

export const UserValidation = async(data) => {
    const result = await axios.post(`/users/validate`, data)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    })

    return result;
}


//Obtener Estaciones

export const getEstacionesLine = async (linea) => {
    const result = await axios.get(`/el/estacionlinea/${linea}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });
    return result.data;
};

//Obtener Sentidos

export const getSentidosEstaciones = async (estacion) => {
    const result = await axios.get(`/sentes/sentidoestaciones/${estacion}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });
    return result.data;
};

//Obetener Categorias

export const getCategorias = async (linea) => {
    const result = await axios.get(`/cat/list/${linea}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });

    return result.data;
    
};


// Obtener Conceptos

export const getConceptos = async (categoria) => {
    const result = await axios.get(`/categorias/list/${categoria}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });

    return result.data;
}
// Obtener partes
export const getPartes = async (concepto,idCC) => {
    const result = await axios.get(`/partes/list/${concepto}/${idCC}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });

    return result.data;
}
//Obtener Parte

export const getParte = async(linea, concepto, parte) => {
    const result = await axios.get(`/partes/list/${linea}/${concepto}/${parte}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });

    return result.data;
}

// Obtener fallas
export const getFallas = async (partes,idccp) => {
    const result = await axios.get(`/fallas/list/${partes}/${idccp}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });

    return result.data;
}

export const CodeSearch = async (id) => {
    const result = await axios.get(`/categorias/code/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data;
}

//Obtener Imagenes
export const getImgs = async (id) => {
    const result = await axios.get(`/registro/images/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
	//console.log(result.data[0].imagen.split(","));
    return result.data[0].imagen.split(",");
}
//Obtener Imagenes Finales
export const getImgsf = async (id) => {
    const result = await axios.get(`/registro/imagesf/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
	//console.log(result.data[0].imagen.split(","));
    return result.data[0].imagenf.split(",");
}

//Crear Levantamiento
export const newL = async(lev) => {
    const result = await axios.post(`/levantamientos/nuevo`,lev)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//Eliminar Levantamiento
export const EliminarL = async(id) => {
    const result = await axios.delete(`/levantamientos/borrar/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}
//Terminar Levantamiento
export const GenerarL = async(id) => {
    const result = await axios.put(`/levantamientos/terminar/1/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//id firma JUD
export const LevJud = async(id,sign) => {
    const result = await axios.put(`/levantamientos/signjud/${id}/${sign}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//id firma JUD
export const SolTJud = async(id,sign) => {
    const result = await axios.put(`/strabajo/signjud/${id}/${sign}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//id firma Supervisor
export const LevSup = async(id,sign) => {
    const result = await axios.put(`/levantamientos/signsup/${id}/${sign}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//Firma JUD
export const FirmaJud = async(id,sign) => {
	let firma = {data: sign};
	//console.log(firma);
	const result= await axios({
		  method: 'put',
		  url: `/jdsp/fjud/${id}/`,
		  data: firma,
		})
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//Firma Supervisor
export const FirmaSup = async(id,sign) => {
	let firma = {data: sign};
	//console.log(firma);
	const result= await axios({
		  method: 'put',
		  url: `/jdsp/fsup/${id}/`,
		  data: firma,
		})
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//Firma Mantenimiento
export const FirmaMant = async(id,sign) => {
	let firma = {data: sign};
	//console.log(firma);
	const result= await axios({
		  method: 'put',
		  url: `/jdsp/fmant/${id}/`,
		  data: firma,
		})
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

//checar existencia de firmas jud
export const checkJud = async (id) => {
    const result = await axios.get(`/jdsp/cjud/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data[0];
}

//checar existencia de firmas supervisor
export const checkSup = async (id) => {
    const result = await axios.get(`/jdsp/csup/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data[0];
}

//checar existencia de firmas mantenimiento
export const checkMant = async (id) => {
    const result = await axios.get(`/jdsp/cmant/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data[0];
}

//checar existencia de firmas mantenimiento
export const MantData = async (id) => {
    const result = await axios.get(`/jdsp/dmant/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data[0];
}

//Obtener Registros
export const getData = async (orden) => {
    const result = await axios.get(`/registro/list/${orden}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data;
}

export const getEL = async (orden) => {
    const result = await axios.get(`/registro/estline/${orden}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
	console.log(result.data[0])
    return result.data[0];
}

//Enviar registro
export const postData = async (datos) => {
			console.log(datos);
		try {
		const dataR = new FormData();
		dataR.append('els_id', datos.els);
		dataR.append('orden_id', datos.orden);
		dataR.append('falla_id', datos.falla);
        dataR.append('imagen', datos.imagenes);
        dataR.append('tramo', datos.tramo);
        dataR.append('area', datos.area);

		//console.log(dataR);

		const response= await axios({
		  method: 'post',
		  url: `/registro/upload/`,
		  data: dataR,
		})
			//console.log("respuesta: "+ response);
			return response;
		}
		   catch(err) {
				console.log(err);
			}
        }

//Subir Imagenes de fallas reparadas
export const UploadImagesMant = async (imagenes,id) => {
    const response = await axios.post('/registro/uploadImgMant', {imagenes: imagenes, id: id})
    .then(result => {
        return result.data;
    })

    return response;
}
//Check Levantamientos
export const CheckL = async (id) => {
    const result = axios.get(`/levantamientos/listarun/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    })

    return result.data;
}

//Eliinar Elemento Conformado

export const EliminarElemento = async(id) => {
    const result = axios.get(`/registro/delete/${id}`)
    .then(row => {
        return row;
    })
    .catch(err => {
        return err;
    })

    return result.data;
}

//Alta Linea
export const newLine = async(id,line) => {
    const result = await axios.put(`/lineas/newl/${id}/${line}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        return err;
    });
    return result.data;
}

