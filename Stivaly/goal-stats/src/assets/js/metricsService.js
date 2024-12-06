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
            console.log("Métricas obtenidas con éxito:", response.data);
            return response.data; 
        } catch (error) {
            console.error("Error fetching metrics:", error);
            throw error; 
        }
    }

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

    async createMetric(metricData) {
        try {
            if (!metricData || typeof metricData !== 'object') {
                throw new Error("Datos de métrica inválidos");
            }
            console.log(metricData);
            const response = await this.axiosInstance.post('/performance-metrics/', metricData);
            console.log("Métrica creada con éxito:", response.data);
            return response.data; // Devuelve la métrica creada
        } catch (error) {
            console.error("Error creating metric:", error);
            throw error; // Propaga el error para manejo externo
        }
    }

    async deleteMetric(metricId) {
        try {
    
            const response = await this.axiosInstance.delete(`/performance-metrics/${metricId}/`);
            console.log("Métrica eliminada con éxito:", response.data);
            return response.data; 
        } catch (error) {
            console.error("Error al eliminar la métrica:", error);
            throw error; 
        }
    }
    
}

export default metricsService;