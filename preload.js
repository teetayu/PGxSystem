const { contextBridge, ipcRenderer } = require('electron')



// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  createUser: (payload) => ipcRenderer.invoke('create-user', payload),
  getUsers: () => ipcRenderer.invoke('get-users')
})

