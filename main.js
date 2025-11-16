// โหลดค่า .env
require('dotenv').config()

// Modules ที่ต้องใช้
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcrypt')

// import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  app.quit()
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// สร้างหน้าต่างหลัก
function createWindow() {
  if (BrowserWindow.getAllWindows().length > 0) {
    return
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  win.loadFile(path.join(__dirname, 'view', 'admin-manage-user.html')).catch((err) => {
    console.error('Failed to load admin-manage-user.html:', err)
  })

  win.on('closed', () => {
    // no-op placeholder to retain reference until closed
  })
}

// Event: สร้างผู้ใช้ใหม่
ipcMain.handle('create-user', async (event, userData) => {
  const { firstname, lastname, email, password, job_role, access_level } = userData

  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hash(password, 10)

  // Mapping role & access
  const roleMap = { แพทย์: 1, เภสัช: 2, นักเทคนิคการแพทย์: 3, พนักงาน: 4 }
  const accessMap = { admin: 1, user: 2 }

  const selectedRoleId = roleMap[job_role]
  const selectedAccessId = accessMap[access_level]

  // บันทึกลง Supabase
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password_hash: hashedPassword,
        role_id: selectedRoleId,
        access_id: selectedAccessId,
        created_at: new Date(),
      },
    ])

  if (error) {
    console.error('Supabase Error:', error)
    return { success: false, message: error.message }
  }

  return { success: true, message: 'User added successfully', data }
})

// Event: ดึงรายชื่อผู้ใช้งานทั้งหมด
ipcMain.handle('get-users', async () => {
  const { data, error } = await supabase
    .from('users')
    .select('user_id,first_name, last_name, email, role_id, access_id, created_at')
    .order('user_id', { ascending: true })
    

  if (error) {
    console.error('Supabase get-users Error:', error)
    throw new Error(error.message)
  }

  return data ?? []
})
// App พร้อมใช้งาน
ipcMain.handle('update-user', async (event, updatedUser) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      role_id: updatedUser.role_id,
      access_id: updatedUser.access_id
    })
    .eq('user_id', updatedUser.user_id);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
});


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
