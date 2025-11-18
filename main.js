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

let win; // ประกาศตัวแปรใน scope ระดับ global

function createWindow() {
  // ถ้ามีหน้าต่างอยู่แล้ว ไม่ต้องสร้างใหม่
  if (BrowserWindow.getAllWindows().length > 0) {
    return;
  }

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // โหลดไฟล์ HTML
  win.loadFile(path.join(__dirname, 'view', 'login-main.html'))
    .catch((err) => {
      console.error('Failed to load admin-manage-user.html:', err);
    });

  win.webContents.openDevTools();

  // CSP header configuration
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co;"]
      }
    });
  });

  // เมื่อปิดหน้าต่าง ให้รีเซ็ตตัวแปร
  win.on('closed', () => {
    win = null;
  });
}

// เรียกเมื่อแอปพร้อม
app.whenReady().then(createWindow);

// ปิดแอปเมื่อปิดทุกหน้าต่าง (ยกเว้น macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// สำหรับ macOS: สร้างหน้าต่างใหม่เมื่อคลิกไอคอนแอป
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


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
// Event: ลบผู้ใช้งาน
ipcMain.handle('delete-user', async (event, userId) => {
  console.log("Deleting user ID:", userId);

  if (!userId) {
    return { success: false, message: "userId ไม่ถูกต้อง" };
  }

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error("Supabase delete-user error:", error);
    return { success: false, message: error.message };
  }

  console.log("Deleted user:", data);
  return { success: true, data };
  });

  //login event
 ipcMain.handle('login', async (event, { email, password }) => {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .ilike('email', email)
        .single();

    if (error || !user) {
        return { success: false, message: "Email ไม่ถูกต้อง" };
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
        return { success: false, message: "รหัสผ่านไม่ถูกต้อง" };
    }

    // ✅ เพิ่ม flag สำหรับ admin
    const isAdmin = email.toLowerCase() === 'admin@gmail.com';

    return {
        success: true,
        isAdmin, // ส่งไปให้ renderer
        user: {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            role_id: user.role_id,
            access_id: user.access_id
        }
    };
});

//new patient section start
ipcMain.handle('create-patient', async (event, patientData) => {
    try {
        // หา physician_id จากชื่อ
        const { data: physicianData } = await supabase
            .from('physicians')
            .select('physician_id')
            .ilike('name', patientData.physician)
            .single();

        // หา hospital_id จากชื่อ
        const { data: hospitalData } = await supabase
            .from('hospitals')
            .select('hospital_id')
            .ilike('name', patientData.hospital)
            .single();

        const { data, error } = await supabase
            .from('patients')
            .insert([{
                hospital_number: patientData.id_number, // หรือใช้ HN ที่ generate
                fname: patientData.fname,
                lname: patientData.lname,
                age: patientData.age,
                gender: patientData.gender,
                id_number: patientData.id_number,
                phone_number: patientData.phone_number,
                physician_id: physicianData?.physician_id || null,
                hospital_id: hospitalData?.hospital_id || null,
                request_date: patientData.request_date,
                report_date: patientData.report_date,
                weight: patientData.weight,
                height: patientData.height,
                annotation: patientData.annotation
            }]);

        if (error) {
            console.error('Insert error:', error);
            return { success: false, message: error.message };
        }

        return { success: true, message: 'Patient added successfully', data };
    } catch (err) {
        console.error('Create patient error:', err);
        return { success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' };
    }
});

app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication');



// app.whenReady().then(createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })
