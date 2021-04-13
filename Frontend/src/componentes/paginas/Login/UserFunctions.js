import axios from 'axios'

export const register = newUser => {
  return axios
    .post('Users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registrado')
    })
}

export const login = user => {
  return axios
    .post('/auth', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log('Contraseña y Usuarios no validos , ' + err)
    })
}

export const getUser = id => {
  return axios
    .get('users/getuser/${id}')
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}
