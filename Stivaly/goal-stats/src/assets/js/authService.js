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
      console.error('Error al registrar:', error);
      throw error; 
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
        console.error('Error al registrar:', error);
        throw error;
    }
}
}

export default AuthService;
