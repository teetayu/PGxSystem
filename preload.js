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
    getPatients: () => ipcRenderer.invoke('get-patients'),
    getPatientOrders: () => ipcRenderer.invoke('get-patient-orders'),
    getOrderDetail: (orderId) => ipcRenderer.invoke('get-order-detail', orderId),
    getCyp2c9Result: (payload) => ipcRenderer.invoke('get-cyp2c9-result', payload),
    createOrder: (orderData) => ipcRenderer.invoke('create-order', orderData),
    printWindow: () => ipcRenderer.invoke('print-window')
});
