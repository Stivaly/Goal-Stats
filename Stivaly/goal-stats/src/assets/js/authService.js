import axios from 'axios';

class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
        baseURL: this.baseURL,
        withCredentials: false, 
    });
  }

  async registerUser(form) {
    if (!form.username || !form.email || !form.password || !form.role) {
      throw new Error("Todos los campos son obligatorios.");
    }

    try {
      const response = await this.axiosInstance.post(`${this.baseURL}/register/`, form);
      delete form.password;
      return response; 
    } catch (error) {
      if (error.response) {
        const serverError = error.response.data;
        if (serverError.username) {
          alert(serverError.username);
        } else {
          throw new Error('Error desconocido al registrar el usuario.');
        }
      } else {
        console.error('Error inesperado:', error);
        throw new Error('Error en la conexión con el servidor.');
      }
    }
  }

  async loginUser(form) {
    try {
      const response = await this.axiosInstance.post('/login/', form);
      delete form.password;
      if (response.status === 200) {
        const token = response.data.token;
        const username = form.username;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
        localStorage.setItem('username', username);
      }
      return response;
    } catch (error) {
      if (error.response) {
        const serverError = error.response.data;
        if (serverError.error == 'Invalid Credentials') {
          alert("Usuario o contraseña incorrectos.");
        } else {
          throw new Error('Error desconocido al registrar el usuario.');
        }
      } else {
        console.error('Error inesperado:', error);
        throw new Error('Error en la conexión con el servidor.');
      }
    }
}
}

export default AuthService;
