import axios from 'axios';

class UserService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            withCredentials: false, 
        });
        this.users = [];
        this.disciplinas = [];
    }

    async usersData() {
        try {
          const [responseDisciplinas, responseUsers] = await Promise.all([
            await axios.get('/disciplines/'),
            await axios.get('/users/'),
          ]);
          this.disciplinas = responseDisciplinas.data;
          this.users = responseUsers.data;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        };
    }

    async usersCount() {
        try {
            await this.usersData(); 
            return this.users.length; 
          } catch (error) {
            console.error('Error al contar usuarios:', error);
            return 0; 
          }
    }

    async usersCountByIsActive() {
        try {
            await this.usersData(); 
            return this.users.filter(user => user.is_active === true).length; 
          } catch (error) {
            console.error('Error al contar usuarios:', error);
            return 0; 
          }
    }

    async usersCountByRole() {
        try {
            await this.usersData(); 
            const roles = ['SUPER_ADMIN', 'ADMIN', 'COACH', 'PLAYER'];
            const roleCounts = roles.reduce((acc, role) => {
                acc[role] = this.users.filter(user => user.role === role).length;
                return acc;
              }, {});
            return roleCounts;
          } catch (error) {
            console.error('Error al contar usuarios:', error);
            return {
                SUPER_ADMIN: 0,
                ADMIN: 0,
                COACH: 0,
                PLAYER: 0,
              }; 
          }
    }

    calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            return edad - 1;
        }
        return edad;
    }

    async editUser(userId, userData) {
        if (!userData.nombre || !userData.nombre.trim()) {
            alert("El nombre es obligatorio.");
            return;
        } 
        if (!userData.apellido || !userData.apellido.trim()) {
            alert("El apellido es obligatorio.");
            return;
        }
        if (userData.peso !== undefined) {
            const peso = parseFloat(userData.peso);
            if (isNaN(peso) || peso < 15 || peso > 150) {
                alert("El peso es obligatorio y debe estar entre 15 kg y 150 kg.");
                return;
            }
        }
        if (userData.estatura !== undefined) {
            const estatura = parseFloat(userData.estatura);
            if (isNaN(estatura) || estatura < 50 || estatura > 220) {
                alert("La estatura es obligatoria y debe ser un número positivo y mayor o igual a 50 cm.");
                return;
            }
        }
        if (userData.fecha_nacimiento !== undefined) {
            const fechaNacimiento = new Date(userData.fecha_nacimiento);
            if (isNaN(fechaNacimiento.getTime())) {
                alert("La fecha de nacimiento es inválida.");
                return;
            }
    
            const edad = this.calcularEdad(fechaNacimiento);
            if (edad < 7) {
                alert("La edad no puede ser menor a 7 años.");
                return;
            }
        }
        try {
            const response = await this.axiosInstance.patch(`/users/${userId}/`, userData);
            alert('Usuario actualizado con éxito.');
            return { response: response.data, success: true };
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Hubo un error al actualizar el usuario. Intenta nuevamente.");
            return null;
        }
    }

    filterUsersByDiscipline(disciplineName) {
        if (!this.users.length) {
            console.warn('No hay usuarios cargados para filtrar.');
            return [];
        }

        if (disciplineName === 'todas') {
            return this.users; // Devuelve todos los usuarios si no se filtra por disciplina
        }

        // Encuentra el ID de la disciplina correspondiente al nombre
        const disciplina = this.disciplinas.find(d => d.nombre_disciplina === disciplineName);
        if (!disciplina) {
            console.warn(`Disciplina "${disciplineName}" no encontrada.`);
            return [];
        }

        // Filtra los usuarios cuyo ID de disciplina coincida con el ID encontrado
        return this.users.filter(user => user.nombre_disciplina === disciplina.id);
    }

    async postDiscipline(formElement) {
        try {
            const formData = new FormData(formElement);

            const nombreDisciplina = formData.get("nombreDisciplina");
            const descripcionDisciplina = formData.get("descripcionDisciplina");

            if (!nombreDisciplina.trim()) {
                throw new Error("El campo 'Nombre de la Disciplina' es obligatorio.");
            }
            if (!descripcionDisciplina.trim()) {
                throw new Error("El campo 'Descripción' es obligatorio.");
            }
            const disciplineData = {
                nombre_disciplina: nombreDisciplina,
                descripcion: descripcionDisciplina,
            };
            const response = await this.axiosInstance.post('/disciplines/', disciplineData);
            this.disciplinas.push(response.data);

            return response.data; 
        } catch (error) {
            console.error('Error al crear la disciplina:', error);
            throw error;
        }
    }

    async editDiscipline(disciplineId, disciplineData) {
        try {
            // Validar que el disciplineId y disciplineData sean válidos
            if (!disciplineId) {
                throw new Error("El ID de la disciplina es obligatorio para editarla.");
            }
    
            if (!disciplineData || typeof disciplineData !== "object") {
                throw new Error("Los datos de la disciplina son inválidos.");
            }
            const response = await this.axiosInstance.patch(`/disciplines/${disciplineId}/`, disciplineData);
            
            const updatedDisciplineIndex = this.disciplinas.findIndex(discipline => discipline.id === disciplineId);
            if (updatedDisciplineIndex !== -1) {
                this.disciplinas[updatedDisciplineIndex] = { ...this.disciplinas[updatedDisciplineIndex], ...response.data };
            }
    
            console.log('Disciplina actualizada:', response.data);
            return response.data; // Retorna los datos de la disciplina actualizada
        } catch (error) {
            console.error('Error al editar la disciplina:', error);
            throw error;
        }
    }

    async deleteDiscipline(disciplineId) {
        try {
            const response = await this.axiosInstance.delete(`/disciplines/${disciplineId}/`);
            this.disciplinas = this.disciplinas.filter(discipline => discipline.id !== disciplineId);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la disciplina:', error);
            throw error;
        }
    }
    
    async distributeAgeGroups() {
        const ageRanges = {
            "18-25 años": 0,
            "26-35 años": 0,
            "36-45 años": 0,
            "46+ años": 0,
        };
        await this.usersData();
        this.users.map(user => {
            const edad = this.calcularEdad(new Date(user.fecha_nacimiento));
            if (edad >= 18 && edad <= 25) {
                ageRanges["18-25 años"]++;
            } else if (edad >= 26 && edad <= 35) {
                ageRanges["26-35 años"]++;
            } else if (edad >= 36 && edad <= 45) {
                ageRanges["36-45 años"]++;
            } else {
                ageRanges["46+ años"]++;
            }
        });
        return ageRanges;
    }
}

export default UserService;