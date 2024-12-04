import axios from 'axios';

class metricsService {
    constructor(baseURL='https://goalstats-api.onrender.com/api') {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            withCredentials: false, 
        });
    }

    async getAllMetrics() {
        try {
            const response = await this.axiosInstance.get('/performance-metrics/');
            return response.data; // Devuelve todas las métricas
        } catch (error) {
            console.error("Error fetching metrics:", error);
            throw error; // Propaga el error para manejo externo
        }
    }

    // Filtrar métricas por atleta en el frontend
    async getMetricsByAthlete(athleteId) {
        try {
            // Obtiene todas las métricas
            const allMetrics = await this.getAllMetrics();
            // Filtra las métricas según el ID del atleta
            const filteredMetrics = allMetrics.filter(metric => metric.athlete === athleteId);
            
            return filteredMetrics; // Devuelve las métricas filtradas
        } catch (error) {
            console.error("Error filtering metrics by athlete:", error);
            throw error;
        }
    }
}

export default metricsService;