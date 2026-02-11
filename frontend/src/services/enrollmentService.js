import axios from '../config/axios';

export const enrollmentService = {
    // Get all enrollments
    getAllEnrollments: async () => {
        try {
            const response = await axios.get('/enrollments');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new enrollment
    createEnrollment: async (data) => {
        try {
            const response = await axios.post('/enrollments', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Export to Excel
    exportEnrollments: () => {
        window.open('http://localhost:8000/api/enrollments/export', '_blank');
    }
};