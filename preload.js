const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getUsers: () => ipcRenderer.invoke('get-users'),
    createUser: (userData) => ipcRenderer.invoke('create-user', userData),
    updateUser: (userData) => ipcRenderer.invoke('update-user', userData),
    deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId), // ต้องมี
    login: (email, password) => ipcRenderer.invoke('login', { email, password })
});
