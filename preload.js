const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getUsers: () => ipcRenderer.invoke('get-users'),
    createUser: (userData) => ipcRenderer.invoke('create-user', userData),
    updateUser: (userData) => ipcRenderer.invoke('update-user', userData),
    deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId),
    login: (email, password) => ipcRenderer.invoke('login', { email, password }),
    createPatient: (patientData) => ipcRenderer.invoke('create-patient', patientData),
    getPhysicians: () => ipcRenderer.invoke('get-physicians'),
    getHospitals: () => ipcRenderer.invoke('get-hospitals'),
    getDashboardStats: () => ipcRenderer.invoke('get-dashboard-stats'),
    getMonthlyPatients: () => ipcRenderer.invoke('get-monthly-patients')
});
