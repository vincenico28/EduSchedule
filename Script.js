// ============================================================
//  DATA STORE
const DEMO_USERS = {
  admin:   { password: 'admin123', role: 'admin',   name: 'Admin' },
  staff:   { password: 'staff123', role: 'staff',   name: 'Staff' },
};
// ============================================================

function loadData(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
}
function saveData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Seed initial data if empty
function seedIfEmpty() {
  if (!loadData('edu_seeded', false)) {
    saveData('edu_sections', [
      { id: 1, name: 'BSIT-1A', subject: 'Data Structures', yearLevel: '1st Year', category: 'Regular', teacherId: 1, roomId: 1 },
      { id: 2, name: 'BSCS-2B', subject: 'Algorithms', yearLevel: '2nd Year', category: 'Regular', teacherId: 2, roomId: 2 },
      { id: 3, name: 'BSIT-3C', subject: 'Database Systems', yearLevel: '3rd Year', category: 'Irregular', teacherId: 1, roomId: 3 },
      { id: 4, name: 'BSCE-1A', subject: 'Calculus', yearLevel: '1st Year', category: 'Regular', teacherId: 3, roomId: 4 },
      { id: 5, name: 'BSCS-4A', subject: 'Machine Learning', yearLevel: '4th Year', category: 'Special', teacherId: 2, roomId: 5 },
    ]);
    saveData('edu_teachers', [
      { id: 1, name: 'Dr. Maria Santos', dept: 'Computer Science', units: 18, maxUnits: 21, classes: ['BSIT-1A', 'BSIT-3C'] },
      { id: 2, name: 'Prof. Jose Reyes', dept: 'Information Technology', units: 24, maxUnits: 21, classes: ['BSCS-2B', 'BSCS-4A'] },
      { id: 3, name: 'Dr. Liza Cruz', dept: 'Mathematics', units: 15, maxUnits: 21, classes: ['BSCE-1A'] },
      { id: 4, name: 'Prof. Mark Tan', dept: 'Computer Science', units: 9, maxUnits: 21, classes: [] },
    ]);
    saveData('edu_rooms', [
      { id: 1, name: 'Room 101', type: 'Lecture', capacity: 40, floor: '1F', building: 'Main', available: true },
      { id: 2, name: 'Room 205', type: 'Lecture', capacity: 35, floor: '2F', building: 'Main', available: true },
      { id: 3, name: 'CS Lab 1', type: 'Computer Lab', capacity: 30, floor: '1F', building: 'Tech', available: false },
      { id: 4, name: 'Room 110', type: 'Lecture', capacity: 45, floor: '1F', building: 'Main', available: true },
      { id: 5, name: 'AI Lab', type: 'Computer Lab', capacity: 25, floor: '3F', building: 'Tech', available: false },
      { id: 6, name: 'Room 302', type: 'Lecture', capacity: 50, floor: '3F', building: 'Main', available: true },
    ]);
    saveData('edu_schedules', [
      { id: 1, sectionId: 1, day: 'Monday', timeStart: '07:30', timeEnd: '09:00', roomId: 1, teacherId: 1 },
      { id: 2, sectionId: 2, day: 'Tuesday', timeStart: '09:00', timeEnd: '10:30', roomId: 2, teacherId: 2 },
      { id: 3, sectionId: 3, day: 'Wednesday', timeStart: '13:00', timeEnd: '14:30', roomId: 3, teacherId: 1 },
      { id: 4, sectionId: 4, day: 'Thursday', timeStart: '10:30', timeEnd: '12:00', roomId: 4, teacherId: 3 },
      { id: 5, sectionId: 5, day: 'Friday', timeStart: '15:00', timeEnd: '16:30', roomId: 5, teacherId: 2 },
      { id: 6, sectionId: 1, day: 'Wednesday', timeStart: '09:00', timeEnd: '10:30', roomId: 1, teacherId: 1 },
    ]);
    saveData('edu_seeded', true);
    saveData('edu_sys_users', [
      { id: 1, username: 'admin',  name: 'Admin',  email: 'alex@school.edu',  role: 'admin',   status: 'Active',  lastLogin: new Date(Date.now()-3600000).toISOString(),  permissions: { dashboard:true, sections:true, timetable:true, rooms:true, teachers:true, students:true, users:true, conflicts:true }, createdAt: '2024-06-01T00:00:00Z' },
      { id: 2, username: 'staff',  name: 'Sam Staff',   email: 'sam@school.edu',   role: 'staff',   status: 'Active',  lastLogin: new Date(Date.now()-86400000).toISOString(), permissions: { dashboard:true, sections:true, timetable:true, rooms:true, teachers:false, students:true, users:false, conflicts:false }, createdAt: '2024-06-05T00:00:00Z' },
      { id: 3, username: 'student', name: 'Stacy Student', email: 'stacy@school.edu', role: 'student', status: 'Active', lastLogin: new Date(Date.now()-7200000).toISOString(),  permissions: { dashboard:true, sections:false, timetable:false, rooms:false, teachers:false, students:false, users:false, conflicts:false }, createdAt: '2024-08-01T00:00:00Z' },
    ]);
    saveData('edu_activity_log', [
      { id: 1, userId: 1, userName: 'Alex Admin',   action: 'login',        detail: 'Logged in successfully',                  type: 'auth',    ts: new Date(Date.now()-3600000).toISOString() },
      { id: 2, userId: 2, userName: 'Sam Staff',    action: 'view',         detail: 'Viewed class timetable',                   type: 'access',  ts: new Date(Date.now()-7200000).toISOString() },
      { id: 3, userId: 1, userName: 'Alex Admin',   action: 'create',       detail: 'Created section BSIT-1A',                  type: 'data',    ts: new Date(Date.now()-86400000).toISOString() },
      { id: 4, userId: 3, userName: 'Stacy Student',action: 'login',        detail: 'Logged in successfully',                   type: 'auth',    ts: new Date(Date.now()-172800000).toISOString() },
      { id: 5, userId: 2, userName: 'Sam Staff',    action: 'update',       detail: 'Updated room status — CS Lab 1',           type: 'data',    ts: new Date(Date.now()-259200000).toISOString() },
      { id: 6, userId: 1, userName: 'Alex Admin',   action: 'permission',   detail: 'Updated permissions for Sam Staff',        type: 'security',ts: new Date(Date.now()-345600000).toISOString() },
    ]);
  }
}

// Getters
const DB = {
  get sections()  { return loadData('edu_sections', []); },
  get teachers()  { return loadData('edu_teachers', []); },
  get rooms()     { return loadData('edu_rooms', []); },
  get schedules() { return loadData('edu_schedules', []); },
  get students()  { return loadData('edu_students', []); },
  get sysUsers()  { return loadData('edu_sys_users', []); },
  get activityLog() { return loadData('edu_activity_log', []); },
  set sections(v)  { saveData('edu_sections', v); },
  set teachers(v)  { saveData('edu_teachers', v); },
  set rooms(v)     { saveData('edu_rooms', v); },
  set schedules(v) { saveData('edu_schedules', v); },
  set students(v)  { saveData('edu_students', v); },
  set sysUsers(v)  { saveData('edu_sys_users', v); },
  set activityLog(v) { saveData('edu_activity_log', v); },
};

// ============================================================
//  AUTH & REGISTRATION
// ============================================================
let currentUser = null;
let selectedRole = 'admin';

const regData = { username:'', password:'', email:'', firstName:'', lastName:'', yearLevel:'', course:'', type:'', contact:'', sections:[] };

function goToRegister() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('register-screen').style.display = 'flex';
  seedIfEmpty();
  renderRegSections();
  regGoStep(1);
}

function goToLogin() {
  document.getElementById('register-screen').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  const studentBtn = document.querySelector('[data-role="student"]');
  if (studentBtn) selectRole('student', studentBtn);
}

function regGoStep(n) {
  [1,2,3,4].forEach(i => {
    document.getElementById('reg-step-'+i).classList.toggle('active', i===n);
    const ind = document.getElementById('step-ind-'+i);
    ind.classList.remove('active','done');
    if (i === n) ind.classList.add('active');
    else if (i < n) ind.classList.add('done');
    if (i < 4) {
      const line = document.getElementById('line-'+i);
      line.classList.toggle('done', i < n);
    }
  });
}

function regStep1() {
  const username = document.getElementById('r-username').value.trim();
  const pass = document.getElementById('r-password').value;
  const pass2 = document.getElementById('r-password2').value;
  const email = document.getElementById('r-email').value.trim();
  if (!username) { showToast('Please enter a Student ID / Username', 'warning'); return; }
  if (pass.length < 6) { showToast('Password must be at least 6 characters', 'warning'); return; }
  if (pass !== pass2) { showToast('Passwords do not match', 'danger'); return; }
  if (!email) { showToast('Please enter your email address', 'warning'); return; }
  const existing = DB.students.find(s => s.username === username);
  if (existing || DEMO_USERS[username]) { showToast('Username already taken. Please choose another.', 'danger'); return; }
  regData.username = username;
  regData.password = pass;
  regData.email = email;
  regGoStep(2);
}

function regStep2() {
  const first = document.getElementById('r-firstname').value.trim();
  const last = document.getElementById('r-lastname').value.trim();
  const contact = document.getElementById('r-contact').value.trim();
  if (!first || !last) { showToast('Please enter your full name', 'warning'); return; }
  regData.firstName = first;
  regData.lastName = last;
  regData.yearLevel = document.getElementById('r-year').value;
  regData.course = document.getElementById('r-course').value;
  regData.type = document.getElementById('r-type').value;
  regData.contact = contact;
  regData.sections = [];
  renderRegSections();
  regGoStep(3);
}

function renderRegSections(filter='') {
  const sects = DB.sections;
  const filtered = sects.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.subject.toLowerCase().includes(filter.toLowerCase())
  );
  const catColor = {Regular:'badge-success', Irregular:'badge-warning', Special:'badge-indigo'};
  const picker = document.getElementById('reg-section-picker');
  if (!picker) return;
  picker.innerHTML = filtered.length ? filtered.map(s => `
    <div class="section-pick-card ${regData.sections.includes(s.id)?'selected':''}" onclick="toggleRegSection(${s.id}, this)">
      <div class="spick-name">${s.name}</div>
      <div class="spick-sub">${s.subject}</div>
      <div class="spick-badge">
        <span class="badge ${catColor[s.category]||'badge-gray'}">${s.category}</span>
        <span class="badge badge-gray" style="margin-left:4px">${s.yearLevel}</span>
      </div>
    </div>`).join('') :
    '<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--text-muted);font-size:.85rem">No sections found</div>';
  updateRegSelectedList();
}

function filterRegSections() {
  renderRegSections(document.getElementById('r-sect-search').value);
}

function toggleRegSection(id, el) {
  const idx = regData.sections.indexOf(id);
  if (idx >= 0) regData.sections.splice(idx, 1);
  else regData.sections.push(id);
  document.querySelectorAll('.section-pick-card').forEach(card => {
    card.classList.remove('selected');
  });
  regData.sections.forEach(sid => {
    const sects = DB.sections;
    const sect = sects.find(s => s.id === sid);
    if (!sect) return;
    document.querySelectorAll('.section-pick-card').forEach(card => {
      if (card.querySelector('.spick-name')?.textContent === sect.name) card.classList.add('selected');
    });
  });
  updateRegSelectedList();
}

function updateRegSelectedList() {
  const sects = DB.sections;
  const listEl = document.getElementById('reg-selected-list');
  const countEl = document.getElementById('reg-sel-count');
  if (!listEl) return;
  listEl.innerHTML = regData.sections.map(id => {
    const s = sects.find(sec => sec.id === id);
    return s ? `<span class="sel-sec-chip">${s.name}<button onclick="toggleRegSection(${id})">✕</button></span>` : '';
  }).join('');
  if (countEl) countEl.textContent = `${regData.sections.length} section${regData.sections.length!==1?'s':''} selected`;
}

function regStep3() {
  const students = DB.students;
  const newId = Date.now();
  const newStudent = {
    id: newId,
    username: regData.username,
    password: regData.password,
    email: regData.email,
    name: regData.firstName + ' ' + regData.lastName,
    firstName: regData.firstName,
    lastName: regData.lastName,
    yearLevel: regData.yearLevel,
    course: regData.course,
    type: regData.type,
    contact: regData.contact,
    enrolledSections: regData.sections,
    registeredAt: new Date().toISOString(),
    status: 'Active'
  };
  students.push(newStudent);
  DB.students = students;

  document.getElementById('reg-done-name').textContent = regData.firstName;
  const sects = DB.sections;
  const enrolledNames = regData.sections.map(id => sects.find(s=>s.id===id)?.name || '').filter(Boolean);
  document.getElementById('reg-done-summary').innerHTML = `
    <div style="margin-bottom:8px"><strong>Student ID:</strong> ${regData.username}</div>
    <div style="margin-bottom:8px"><strong>Program:</strong> ${regData.course} — ${regData.yearLevel}</div>
    <div style="margin-bottom:8px"><strong>Type:</strong> ${regData.type}</div>
    <div><strong>Enrolled Sections (${enrolledNames.length}):</strong><br>
    ${enrolledNames.length ? enrolledNames.map(n=>`<span class="class-chip" style="margin-top:5px">${n}</span>`).join('') : '<span style="color:var(--text-muted)">None selected</span>'}
    </div>`;
  regGoStep(4);
  showToast('Registration successful! 🎉', 'success');
}

function selectRole(role, el) {
  selectedRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

// ============================================================
// ✅ FIX 1: Block suspended students from logging in
// ============================================================
function doLogin() {
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value.trim();

  if (selectedRole === 'student') {
    const student = DB.students.find(s => s.username === user && s.password === pass);
    if (student) {
      // CHECK: Block suspended students at login
      if (student.status === 'Suspended') {
        showToast('Your account has been suspended. Please contact your administrator.', 'danger');
        return;
      }
      currentUser = {
        username: student.username,
        name: student.name,
        role: 'student',
        studentId: student.id,
        enrolledSections: student.enrolledSections || [],
        status: student.status
      };
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('app').classList.add('active');
      initApp();
      logActivity('login', 'Logged in successfully', 'auth');
      return;
    }
  }

  const u = DEMO_USERS[user];
  if (!u || u.password !== pass || u.role !== selectedRole) {
    showToast('Invalid credentials or role mismatch', 'danger');
    return;
  }
  currentUser = { username: user, ...u, enrolledSections: [] };
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').classList.add('active');
  initApp();
  logActivity('login', 'Logged in successfully', 'auth');
}

function doLogout() {
  logActivity('logout', 'Logged out', 'auth');
  currentUser = null;
  document.getElementById('app').classList.remove('active');
  document.getElementById('auth-screen').style.display = 'flex';
}

function logActivity(action, detail, type='data') {
  if (!currentUser) return;
  const log = DB.activityLog;
  log.unshift({
    id: Date.now(),
    userId: currentUser.id || currentUser.username,
    userName: currentUser.name,
    action, detail, type,
    ts: new Date().toISOString()
  });
  DB.activityLog = log.slice(0, 200);
}

// ============================================================
//  NAV CONFIG
// ============================================================
const NAV_CONFIG = {
  admin: [
    { section: 'Overview', items: [
      { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    ]},
    { section: 'Management', items: [
      { id: 'sections', icon: '🏫', label: 'Sections' },
      { id: 'timetable', icon: '🗓', label: 'Timetable' },
      { id: 'rooms', icon: '🏢', label: 'Rooms' },
      { id: 'teachers', icon: '👩‍🏫', label: 'Teacher Load' },
      { id: 'students', icon: '🎓', label: 'Students' },
    ]},
    { section: 'System', items: [
      { id: 'users', icon: '👥', label: 'User Management' },
      { id: 'conflicts', icon: '⚠️', label: 'Conflict Detector', badge: true },
    ]},
  ],
  staff: [
    { section: 'Overview', items: [
      { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    ]},
    { section: 'View', items: [
      { id: 'sections', icon: '🏫', label: 'Sections' },
      { id: 'timetable', icon: '🗓', label: 'Timetable' },
      { id: 'rooms', icon: '🏢', label: 'Rooms' },
      { id: 'students', icon: '🎓', label: 'Students' },
    ]},
  ],
  student: [
    { section: 'My Classes', items: [
      { id: 'dashboard', icon: '📊', label: 'Dashboard' },
      { id: 'my-schedule', icon: '📅', label: 'My Schedule' },
    ]},
  ],
};

// ============================================================
//  INIT
// ============================================================
function initApp() {
  seedIfEmpty();
  const role = currentUser.role;
  
  const initials = currentUser.name.split(' ').map(n=>n[0]).join('').slice(0,2);
  document.getElementById('sb-avatar').textContent = initials;
  document.getElementById('sb-username').textContent = currentUser.name;
  document.getElementById('sb-role').textContent = role;
  document.getElementById('tb-avatar').textContent = initials;
  document.getElementById('tb-name').textContent = currentUser.name.split(' ')[0];

  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  const config = NAV_CONFIG[role] || [];
  config.forEach(section => {
    nav.innerHTML += `<div class="nav-section-label">${section.section}</div>`;
    section.items.forEach(item => {
      const conflicts = detectConflicts();
      const badge = item.badge && conflicts.length > 0 ? `<span class="nav-badge">${conflicts.length}</span>` : '';
      nav.innerHTML += `<div class="nav-item" data-view="${item.id}" onclick="showView('${item.id}')">
        <span class="nav-icon">${item.icon}</span>
        <span>${item.label}</span>${badge}
      </div>`;
    });
  });

  const conflicts = detectConflicts();
  if (conflicts.length > 0) document.getElementById('notif-dot').style.display = 'block';

  showView('dashboard');
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.view === viewId);
  });
  
  const viewEl = document.getElementById('view-' + viewId);
  if (!viewEl) return;
  viewEl.classList.add('active');

  const titles = {
    dashboard: 'Dashboard', sections: 'Section Management', timetable: 'Class Timetable',
    rooms: 'Room Availability', teachers: 'Teacher Loading', conflicts: 'Conflict Detector',
    students: 'Student Management', users: 'User Management', 'my-schedule': 'My Schedule'
  };
  document.getElementById('page-title').textContent = titles[viewId] || viewId;

  const renderers = {
    dashboard: renderDashboard,
    sections: renderSections,
    timetable: renderTimetable,
    rooms: renderRooms,
    teachers: renderTeachers,
    conflicts: renderConflicts,
    students: renderStudents,
    users: renderUserManagement,
    'my-schedule': renderMySchedule,
  };
  if (renderers[viewId]) renderers[viewId](viewEl);

  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('active');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
}

// ============================================================
//  DASHBOARD
// ============================================================
function renderDashboard(el) {
  const sects = DB.sections, teachers = DB.teachers, rooms = DB.rooms, scheds = DB.schedules;
  const students = DB.students;
  const conflicts = detectConflicts();
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const times = ['07:30','09:00','10:30','13:00','15:00','16:30'];

  let schedTableRows = times.map(t => {
    let cols = days.map(d => {
      const sched = scheds.find(s => s.day === d && s.timeStart === t);
      if (sched) {
        const sec = sects.find(s => s.id === sched.sectionId);
        const colors = ['','cyan','green','amber','','cyan'];
        const cls = colors[days.indexOf(d) % colors.length];
        return `<td><span class="sched-chip ${cls}">${sec ? sec.name : '?'}<br><small style="font-weight:400">${sec ? sec.subject : ''}</small></span></td>`;
      }
      return '<td style="color:#e2e8f0;font-size:.75rem;text-align:center">—</td>';
    }).join('');
    return `<tr><th class="time-col">${t}</th>${cols}</tr>`;
  }).join('');

  const notifications = [
    ...conflicts.map(c => ({type:'danger', text: c.desc, time:'Just now'})),
    {type:'warning', text:'Prof. Jose Reyes is overloaded by 3 units', time:'2h ago'},
    {type:'info', text:'4 new sections created this week', time:'1d ago'},
  ];

  el.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card indigo">
        <div class="stat-icon">🏫</div>
        <div class="stat-value">${sects.length}</div>
        <div class="stat-label">Total Sections</div>
        <div class="stat-change up">↑ 2 this week</div>
      </div>
      <div class="stat-card cyan">
        <div class="stat-icon">👩‍🏫</div>
        <div class="stat-value">${teachers.length}</div>
        <div class="stat-label">Total Teachers</div>
        <div class="stat-change up">↑ 1 new</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon">🎓</div>
        <div class="stat-value">${students.length}</div>
        <div class="stat-label">Registered Students</div>
        <div class="stat-change ${students.length>0?'up':''}">
          ${students.length>0?`↑ ${students.filter(s=>s.status==='Active').length} active`:'No registrations yet'}
        </div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon">🗓</div>
        <div class="stat-value">${scheds.length}</div>
        <div class="stat-label">Active Schedules</div>
        ${conflicts.length > 0 ? `<div class="stat-change down">⚠ ${conflicts.length} conflict${conflicts.length>1?'s':''}</div>` : '<div class="stat-change up">✓ No conflicts</div>'}
      </div>
    </div>
    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <div class="card-title">📅 Weekly Schedule Overview</div>
          <button class="btn btn-ghost btn-sm" onclick="showView('timetable')">Full View →</button>
        </div>
        <div class="card-body">
          <div class="mini-schedule">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  ${days.map(d=>`<th>${d.slice(0,3)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>${schedTableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">🔔 Notifications</div>
          <span class="badge badge-danger">${notifications.length}</span>
        </div>
        <div class="card-body">
          <div class="notif-list">
            ${notifications.map(n => `
              <div class="notif-item">
                <div class="notif-dot2 ${n.type}"></div>
                <div>
                  <div class="notif-text">${n.text}</div>
                  <div class="notif-time">${n.time}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ============================================================
//  SECTIONS
// ============================================================
function renderSections(el) {
  const isAdmin = currentUser.role === 'admin';
  const sects = DB.sections, teachers = DB.teachers, rooms = DB.rooms;

  function refresh(filter='', catFilter='All') {
    const filtered = sects.filter(s =>
      (s.name.toLowerCase().includes(filter.toLowerCase()) || s.subject.toLowerCase().includes(filter.toLowerCase())) &&
      (catFilter === 'All' || s.category === catFilter)
    );
    const tbody = document.getElementById('sections-tbody');
    if (!tbody) return;
    tbody.innerHTML = filtered.length ? filtered.map(s => {
      const teacher = teachers.find(t => t.id === s.teacherId);
      const room = rooms.find(r => r.id === s.roomId);
      const catBadge = {Regular:'badge-success', Irregular:'badge-warning', Special:'badge-indigo'};
      return `<tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.subject}</td>
        <td><span class="badge badge-gray">${s.yearLevel}</span></td>
        <td><span class="badge ${catBadge[s.category]||'badge-gray'}">${s.category}</span></td>
        <td>${teacher ? teacher.name : '<span style="color:var(--text-muted)">Unassigned</span>'}</td>
        <td>${room ? room.name : '<span style="color:var(--text-muted)">Unassigned</span>'}</td>
        ${isAdmin ? `<td>
          <div class="action-btns">
            <button class="btn btn-ghost btn-sm" onclick="editSection(${s.id})">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteSection(${s.id})">🗑</button>
          </div>
        </td>` : '<td></td>'}
      </tr>`;
    }).join('') : `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">🔍</div><p>No sections found</p></div></td></tr>`;
  }

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Section Management</h1>
        <p>Create and manage class sections with subject assignments</p>
      </div>
      ${isAdmin ? `<button class="btn btn-indigo" onclick="addSection()">+ Add Section</button>` : ''}
    </div>
    <div class="toolbar">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search sections..." id="sect-search" oninput="sectSearchChange()">
      </div>
      <select class="filter-select" id="sect-cat-filter" onchange="sectSearchChange()">
        <option>All</option><option>Regular</option><option>Irregular</option><option>Special</option>
      </select>
    </div>
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Section</th><th>Subject</th><th>Year Level</th><th>Category</th>
            <th>Teacher</th><th>Room</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="sections-tbody"></tbody>
      </table>
    </div>`;

  window.sectSearchChange = () => {
    const f = document.getElementById('sect-search').value;
    const c = document.getElementById('sect-cat-filter').value;
    refresh(f, c);
  };
  refresh();
}

function addSection() {
  const teachers = DB.teachers, rooms = DB.rooms;
  showModal('Add New Section', `
    <div class="form-grid">
      <div class="form-group">
        <label>Section Name</label>
        <input type="text" id="f-name" placeholder="e.g. BSIT-1A">
      </div>
      <div class="form-group">
        <label>Subject</label>
        <input type="text" id="f-subject" placeholder="e.g. Data Structures">
      </div>
      <div class="form-group">
        <label>Year Level</label>
        <select id="f-year">
          <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
        </select>
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="f-cat">
          <option>Regular</option><option>Irregular</option><option>Special</option>
        </select>
      </div>
      <div class="form-group">
        <label>Assign Teacher</label>
        <select id="f-teacher">
          <option value="">-- Unassigned --</option>
          ${teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Assign Room</label>
        <select id="f-room">
          <option value="">-- Unassigned --</option>
          ${rooms.map(r=>`<option value="${r.id}">${r.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveSection()">Save Section</button>
    </div>`);
}

function saveSection(id=null) {
  const name = document.getElementById('f-name').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const yearLevel = document.getElementById('f-year').value;
  const category = document.getElementById('f-cat').value;
  const teacherId = parseInt(document.getElementById('f-teacher').value) || null;
  const roomId = parseInt(document.getElementById('f-room').value) || null;
  if (!name || !subject) { showToast('Please fill in required fields', 'warning'); return; }
  
  const sects = DB.sections;
  if (id) {
    const i = sects.findIndex(s => s.id === id);
    if (i >= 0) sects[i] = { ...sects[i], name, subject, yearLevel, category, teacherId, roomId };
  } else {
    const newId = Math.max(0, ...sects.map(s=>s.id)) + 1;
    sects.push({ id: newId, name, subject, yearLevel, category, teacherId, roomId });
  }
  DB.sections = sects;
  closeModal();
  showToast(id ? 'Section updated!' : 'Section created!', 'success');
  renderSections(document.getElementById('view-sections'));
}

function editSection(id) {
  const sect = DB.sections.find(s => s.id === id);
  if (!sect) return;
  const teachers = DB.teachers, rooms = DB.rooms;
  showModal('Edit Section', `
    <div class="form-grid">
      <div class="form-group">
        <label>Section Name</label>
        <input type="text" id="f-name" value="${sect.name}">
      </div>
      <div class="form-group">
        <label>Subject</label>
        <input type="text" id="f-subject" value="${sect.subject}">
      </div>
      <div class="form-group">
        <label>Year Level</label>
        <select id="f-year">
          ${['1st Year','2nd Year','3rd Year','4th Year'].map(y=>`<option ${sect.yearLevel===y?'selected':''}>${y}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="f-cat">
          ${['Regular','Irregular','Special'].map(c=>`<option ${sect.category===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Assign Teacher</label>
        <select id="f-teacher">
          <option value="">-- Unassigned --</option>
          ${teachers.map(t=>`<option value="${t.id}" ${sect.teacherId===t.id?'selected':''}>${t.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Assign Room</label>
        <select id="f-room">
          <option value="">-- Unassigned --</option>
          ${rooms.map(r=>`<option value="${r.id}" ${sect.roomId===r.id?'selected':''}>${r.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveSection(${id})">Update Section</button>
    </div>`);
}

function deleteSection(id) {
  if (!confirm('Delete this section? This will also remove its schedules.')) return;
  DB.sections = DB.sections.filter(s => s.id !== id);
  DB.schedules = DB.schedules.filter(s => s.sectionId !== id);
  showToast('Section deleted', 'danger');
  renderSections(document.getElementById('view-sections'));
}

// ============================================================
//  TIMETABLE
// ============================================================
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const TIME_SLOTS = ['07:30','09:00','10:30','13:00','15:00','16:30'];
const COLORS = ['#eef2ff','#ecfeff','#ecfdf5','#fffbeb','#fdf4ff','#fff7ed'];
const TEXT_COLORS = ['#4f46e5','#0e7490','#047857','#b45309','#7c3aed','#c2410c'];

function renderTimetable(el) {
  const sects = DB.sections;
  const isAdmin = currentUser.role === 'admin';
  let currentSect = sects[0]?.id || null;

  function buildTable(sectId) {
    const scheds = DB.schedules.filter(s => s.sectionId === sectId);
    const cells = DAYS.map(day => {
      return TIME_SLOTS.map(time => {
        const sched = scheds.find(s => s.day === day && s.timeStart === time);
        const conflicts = detectConflicts();
        const hasConflict = sched && conflicts.some(c => c.schedId === sched.id);
        if (sched) {
          const teacher = DB.teachers.find(t => t.id === sched.teacherId);
          const room = DB.rooms.find(r => r.id === sched.roomId);
          const sect = DB.sections.find(s => s.id === sectId);
          const ci = sectId % COLORS.length;
          return `<td>
            <div class="timetable-cell ${hasConflict?'conflict':''}" style="background:${hasConflict?'':COLORS[ci]};color:${hasConflict?'var(--danger)':TEXT_COLORS[ci]}">
              <div class="cell-subject">${sect?.subject || '?'}</div>
              <div class="cell-room">🏢 ${room?.name || 'No room'}</div>
              <div class="cell-teacher">👩‍🏫 ${teacher?.name?.split(' ').slice(-1)[0] || '?'}</div>
              ${isAdmin ? `<div style="margin-top:4px"><button onclick="deleteSchedule(${sched.id})" style="background:none;border:none;font-size:.65rem;color:var(--danger);cursor:pointer">✕ Remove</button></div>` : ''}
            </div>
          </td>`;
        }
        return `<td>${isAdmin ? `<div class="cell-add" onclick="addScheduleSlot(${sectId},'${day},'${time}')">+</div>` : '<div style="color:#e2e8f0;text-align:center;font-size:.75rem;padding:4px">—</div>'}</td>`;
      });
    });
    return TIME_SLOTS.map((t, ti) => `<tr><td class="time-col">${t}–${TIME_SLOTS[ti+1]||'18:00'}</td>${cells.map(dc=>dc[ti]).join('')}</tr>`).join('');
  }

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Class Timetable</h1>
        <p>Weekly schedule grid — Monday to Saturday</p>
      </div>
      ${isAdmin ? `<button class="btn btn-indigo" onclick="addSchedule()">+ Add Schedule</button>` : ''}
    </div>
    <div class="toolbar">
      <label style="font-weight:600;font-size:.85rem">Section:</label>
      <select class="filter-select" id="tt-sect-select" onchange="changeTTSect(this.value)">
        ${sects.map(s=>`<option value="${s.id}">${s.name} — ${s.subject}</option>`).join('')}
      </select>
    </div>
    <div class="card">
      <div class="card-body" style="padding:16px">
        <div class="timetable-grid">
          <table class="timetable">
            <thead>
              <tr>
                <th style="min-width:80px">Time</th>
                ${DAYS.map(d=>`<th>${d}</th>`).join('')}
              </tr>
            </thead>
            <tbody id="tt-body">${buildTable(currentSect)}</tbody>
          </table>
        </div>
      </div>
    </div>`;

  window.changeTTSect = (v) => {
    currentSect = parseInt(v);
    const tbody = document.getElementById('tt-body');
    if (tbody) tbody.innerHTML = buildTable(currentSect);
  };
}

function addScheduleSlot(sectId, day, time) {
  addSchedule(sectId, day, time);
}

function addSchedule(sectId=null, day=null, time=null) {
  const sects = DB.sections, teachers = DB.teachers, rooms = DB.rooms;
  showModal('Add Schedule', `
    <div class="form-group">
      <label>Section</label>
      <select id="fs-sect">
        ${sects.map(s=>`<option value="${s.id}" ${sectId===s.id?'selected':''}>${s.name} — ${s.subject}</option>`).join('')}
      </select>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Day</label>
        <select id="fs-day">
          ${DAYS.map(d=>`<option ${day===d?'selected':''}>${d}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Time Slot</label>
        <select id="fs-time">
          ${TIME_SLOTS.map(t=>`<option ${time===t?'selected':''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Teacher</label>
        <select id="fs-teacher">
          ${teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Room</label>
        <select id="fs-room">
          ${rooms.map(r=>`<option value="${r.id}">${r.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div id="conflict-check-area"></div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveSchedule()">Save Schedule</button>
    </div>`);
}

function saveSchedule() {
  const sectId = parseInt(document.getElementById('fs-sect').value);
  const day = document.getElementById('fs-day').value;
  const timeStart = document.getElementById('fs-time').value;
  const teacherId = parseInt(document.getElementById('fs-teacher').value);
  const roomId = parseInt(document.getElementById('fs-room').value);
  const ti = TIME_SLOTS.indexOf(timeStart);
  const timeEnd = TIME_SLOTS[ti+1] || '18:00';

  const scheds = DB.schedules;
  const conflicts = [];
  scheds.forEach(s => {
    if (s.day === day && s.timeStart === timeStart) {
      if (s.teacherId === teacherId) conflicts.push(`Teacher double-booked on ${day} at ${timeStart}`);
      if (s.roomId === roomId) conflicts.push(`Room double-booked on ${day} at ${timeStart}`);
      if (s.sectionId === sectId) conflicts.push(`Section already has class on ${day} at ${timeStart}`);
    }
  });

  if (conflicts.length > 0) {
    document.getElementById('conflict-check-area').innerHTML = `
      <div class="conflict-alert">
        <div class="conflict-alert-icon">🚫</div>
        <div class="conflict-alert-text">
          <strong>Conflict Detected!</strong>
          ${conflicts.map(c=>`<div>• ${c}</div>`).join('')}
        </div>
      </div>`;
    showToast('Schedule conflict detected!', 'danger');
    return;
  }

  const newId = Math.max(0, ...scheds.map(s=>s.id)) + 1;
  DB.schedules = [...scheds, { id: newId, sectionId: sectId, day, timeStart, timeEnd, roomId, teacherId }];
  closeModal();
  showToast('Schedule added!', 'success');
  renderTimetable(document.getElementById('view-timetable'));
}

function deleteSchedule(id) {
  DB.schedules = DB.schedules.filter(s => s.id !== id);
  showToast('Schedule removed', 'warning');
  renderTimetable(document.getElementById('view-timetable'));
}

// ============================================================
//  ROOMS
// ============================================================
function renderRooms(el) {
  const rooms = DB.rooms;
  const isAdmin = currentUser.role === 'admin';
  const scheds = DB.schedules;

  function getRoomLoad(roomId) {
    return scheds.filter(s => s.roomId === roomId).length;
  }

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Room Availability</h1>
        <p>Color-coded room status and capacity management</p>
      </div>
      ${isAdmin ? `<button class="btn btn-indigo" onclick="addRoom()">+ Add Room</button>` : ''}
    </div>
    <div class="tabs">
      <button class="tab-btn active" onclick="roomTab('grid',this)">Grid View</button>
      <button class="tab-btn" onclick="roomTab('table',this)">Table View</button>
    </div>
    <div id="room-content">
      <div class="rooms-grid">
        ${rooms.map(r => {
          const load = getRoomLoad(r.id);
          const maxLoad = 6;
          const pct = Math.min(100, Math.round((load/maxLoad)*100));
          const fillClass = pct < 40 ? 'high' : pct < 75 ? 'mid' : 'low';
          const statusBadge = r.available ? '<span class="badge badge-success">Available</span>' : '<span class="badge badge-danger">Occupied</span>';
          return `
          <div class="room-card ${r.available?'available':'occupied'}">
            <div class="room-header">
              <div>
                <div class="room-name">${r.name}</div>
                <div class="room-type">${r.type}</div>
              </div>
              ${statusBadge}
            </div>
            <div class="room-stats">
              <div class="room-stat"><div class="room-stat-label">Capacity</div><div class="room-stat-value">${r.capacity}</div></div>
              <div class="room-stat"><div class="room-stat-label">Floor</div><div class="room-stat-value">${r.floor}</div></div>
              <div class="room-stat"><div class="room-stat-label">Building</div><div class="room-stat-value">${r.building}</div></div>
            </div>
            <div class="availability-bar">
              <div class="avail-label"><span>Schedule Load</span><span>${pct}%</span></div>
              <div class="avail-track"><div class="avail-fill ${fillClass}" style="width:${pct}%"></div></div>
            </div>
            ${isAdmin ? `<div style="display:flex;gap:6px;margin-top:12px">
              <button class="btn btn-ghost btn-sm" style="flex:1" onclick="editRoom(${r.id})">✏️ Edit</button>
              <button class="btn btn-${r.available?'success':'danger'} btn-sm" style="flex:1" onclick="toggleRoom(${r.id})">${r.available?'Mark Occupied':'Mark Available'}</button>
            </div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>`;

  window.roomTab = (type, btn) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (type === 'table') {
      document.getElementById('room-content').innerHTML = `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Room</th><th>Type</th><th>Capacity</th><th>Floor</th><th>Building</th><th>Status</th>${isAdmin?'<th>Actions</th>':''}</tr></thead>
            <tbody>${rooms.map(r=>`<tr>
              <td><strong>${r.name}</strong></td>
              <td>${r.type}</td>
              <td>${r.capacity}</td>
              <td>${r.floor}</td>
              <td>${r.building}</td>
              <td>${r.available?'<span class="badge badge-success">Available</span>':'<span class="badge badge-danger">Occupied</span>'}</td>
              ${isAdmin?`<td><div class="action-btns">
                <button class="btn btn-ghost btn-sm" onclick="editRoom(${r.id})">✏️</button>
                <button class="btn btn-${r.available?'success':'danger'} btn-sm" onclick="toggleRoom(${r.id})">${r.available?'✓':'✗'}</button>
              </div></td>`:''}
            </tr>`).join('')}</tbody>
          </table>
        </div>`;
    } else {
      renderRooms(el);
    }
  };
}

function addRoom() {
  showModal('Add Room', `
    <div class="form-grid">
      <div class="form-group">
        <label>Room Name</label>
        <input type="text" id="fr-name" placeholder="e.g. Room 101">
      </div>
      <div class="form-group">
        <label>Type</label>
        <select id="fr-type"><option>Lecture</option><option>Computer Lab</option><option>Laboratory</option><option>Seminar</option></select>
      </div>
      <div class="form-group">
        <label>Capacity</label>
        <input type="text" id="fr-cap" placeholder="e.g. 40">
      </div>
      <div class="form-group">
        <label>Floor</label>
        <input type="text" id="fr-floor" placeholder="e.g. 1F">
      </div>
      <div class="form-group">
        <label>Building</label>
        <input type="text" id="fr-building" placeholder="e.g. Main">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveRoom()">Save Room</button>
    </div>`);
}

function saveRoom(id=null) {
  const name = document.getElementById('fr-name').value.trim();
  const type = document.getElementById('fr-type').value;
  const capacity = parseInt(document.getElementById('fr-cap').value) || 0;
  const floor = document.getElementById('fr-floor').value;
  const building = document.getElementById('fr-building').value;
  if (!name) { showToast('Room name required', 'warning'); return; }
  const rooms = DB.rooms;
  if (id) {
    const i = rooms.findIndex(r=>r.id===id);
    if (i>=0) rooms[i] = {...rooms[i], name, type, capacity, floor, building};
  } else {
    const newId = Math.max(0, ...rooms.map(r=>r.id)) + 1;
    rooms.push({ id: newId, name, type, capacity, floor, building, available: true });
  }
  DB.rooms = rooms;
  closeModal();
  showToast(id ? 'Room updated!' : 'Room added!', 'success');
  renderRooms(document.getElementById('view-rooms'));
}

function editRoom(id) {
  const r = DB.rooms.find(rm => rm.id === id);
  if (!r) return;
  showModal('Edit Room', `
    <div class="form-grid">
      <div class="form-group"><label>Room Name</label><input type="text" id="fr-name" value="${r.name}"></div>
      <div class="form-group"><label>Type</label><select id="fr-type">
        ${['Lecture','Computer Lab','Laboratory','Seminar'].map(t=>`<option ${r.type===t?'selected':''}>${t}</option>`).join('')}
      </select></div>
      <div class="form-group"><label>Capacity</label><input type="text" id="fr-cap" value="${r.capacity}"></div>
      <div class="form-group"><label>Floor</label><input type="text" id="fr-floor" value="${r.floor}"></div>
      <div class="form-group"><label>Building</label><input type="text" id="fr-building" value="${r.building}"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveRoom(${id})">Update Room</button>
    </div>`);
}

function toggleRoom(id) {
  const rooms = DB.rooms;
  const i = rooms.findIndex(r => r.id === id);
  if (i >= 0) { rooms[i].available = !rooms[i].available; DB.rooms = rooms; }
  showToast('Room status updated', 'success');
  renderRooms(document.getElementById('view-rooms'));
}

// ============================================================
//  TEACHERS
// ============================================================
function renderTeachers(el) {
  const teachers = DB.teachers;
  const isAdmin = currentUser.role === 'admin';

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Teacher Loading</h1>
        <p>Faculty workload distribution and overload detection</p>
      </div>
      ${isAdmin ? `<button class="btn btn-indigo" onclick="addTeacher()">+ Add Teacher</button>` : ''}
    </div>
    <div class="teacher-cards">
      ${teachers.map((t, i) => {
        const pct = Math.min(110, Math.round((t.units/t.maxUnits)*100));
        const overload = t.units > t.maxUnits;
        const fillColor = overload ? 'var(--danger)' : pct > 80 ? 'var(--warning)' : 'var(--success)';
        const avatarColors = ['#eef2ff/#4f46e5','#ecfeff/#0e7490','#ecfdf5/#047857','#fffbeb/#b45309'];
        const [bg, color] = avatarColors[i%4].split('/');
        return `
        <div class="teacher-card">
          <div class="teacher-top">
            <div class="teacher-avatar" style="background:${bg};color:${color}">${t.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div class="teacher-info">
              <div class="teacher-name">${t.name}</div>
              <div class="teacher-dept">${t.dept}</div>
            </div>
          </div>
          <div class="load-bar-wrap">
            <div class="load-bar-label">
              <span>Teaching Load</span>
              <div><span class="load-units">${t.units}</span><span class="load-max"> / ${t.maxUnits} units</span></div>
            </div>
            <div class="load-track">
              <div class="load-fill" style="width:${Math.min(100,pct)}%;background:${fillColor}"></div>
            </div>
          </div>
          ${overload ? `<div class="overload-warning">🚨 Overloaded by ${t.units - t.maxUnits} units! Reassignment recommended.</div>` : ''}
          <div class="teacher-classes" style="margin-top:10px">
            <div style="font-size:.75rem;color:var(--text-muted);margin-bottom:5px">Assigned Sections:</div>
            ${t.classes.map(c=>`<span class="class-chip">${c}</span>`).join('') || '<span style="font-size:.78rem;color:var(--text-muted)">No classes assigned</span>'}
          </div>
          ${isAdmin ? `<div style="margin-top:12px;display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" style="flex:1" onclick="editTeacher(${t.id})">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTeacher(${t.id})">🗑</button>
          </div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
}

function addTeacher() {
  showModal('Add Teacher', `
    <div class="form-grid">
      <div class="form-group"><label>Full Name</label><input type="text" id="ft-name" placeholder="e.g. Dr. Jane Smith"></div>
      <div class="form-group"><label>Department</label><input type="text" id="ft-dept" placeholder="e.g. Computer Science"></div>
      <div class="form-group"><label>Current Units</label><input type="text" id="ft-units" placeholder="0" value="0"></div>
      <div class="form-group"><label>Max Units</label><input type="text" id="ft-max" placeholder="21" value="21"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveTeacher()">Save Teacher</button>
    </div>`);
}

function saveTeacher(id=null) {
  const name = document.getElementById('ft-name').value.trim();
  const dept = document.getElementById('ft-dept').value.trim();
  const units = parseInt(document.getElementById('ft-units').value) || 0;
  const maxUnits = parseInt(document.getElementById('ft-max').value) || 21;
  if (!name) { showToast('Name required', 'warning'); return; }
  const teachers = DB.teachers;
  if (id) {
    const i = teachers.findIndex(t=>t.id===id);
    if (i>=0) teachers[i] = {...teachers[i], name, dept, units, maxUnits};
  } else {
    const newId = Math.max(0, ...teachers.map(t=>t.id)) + 1;
    teachers.push({ id: newId, name, dept, units, maxUnits, classes: [] });
  }
  DB.teachers = teachers;
  closeModal();
  showToast(id ? 'Teacher updated!' : 'Teacher added!', 'success');
  renderTeachers(document.getElementById('view-teachers'));
}

function editTeacher(id) {
  const t = DB.teachers.find(tc=>tc.id===id);
  if (!t) return;
  showModal('Edit Teacher', `
    <div class="form-grid">
      <div class="form-group"><label>Full Name</label><input type="text" id="ft-name" value="${t.name}"></div>
      <div class="form-group"><label>Department</label><input type="text" id="ft-dept" value="${t.dept}"></div>
      <div class="form-group"><label>Current Units</label><input type="text" id="ft-units" value="${t.units}"></div>
      <div class="form-group"><label>Max Units</label><input type="text" id="ft-max" value="${t.maxUnits}"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveTeacher(${id})">Update</button>
    </div>`);
}

function deleteTeacher(id) {
  if (!confirm('Delete this teacher?')) return;
  DB.teachers = DB.teachers.filter(t => t.id !== id);
  showToast('Teacher removed', 'danger');
  renderTeachers(document.getElementById('view-teachers'));
}

// ============================================================
//  CONFLICT DETECTION
// ============================================================
function detectConflicts() {
  const scheds = DB.schedules;
  const conflicts = [];
  for (let i = 0; i < scheds.length; i++) {
    for (let j = i + 1; j < scheds.length; j++) {
      const a = scheds[i], b = scheds[j];
      if (a.day === b.day && a.timeStart === b.timeStart) {
        if (a.teacherId === b.teacherId) {
          const teacher = DB.teachers.find(t=>t.id===a.teacherId);
          conflicts.push({ type:'teacher', schedId: a.id, schedId2: b.id, desc: `Teacher double-booking: ${teacher?.name||'?'} on ${a.day} at ${a.timeStart}` });
        }
        if (a.roomId === b.roomId) {
          const room = DB.rooms.find(r=>r.id===a.roomId);
          conflicts.push({ type:'room', schedId: a.id, schedId2: b.id, desc: `Room conflict: ${room?.name||'?'} on ${a.day} at ${a.timeStart}` });
        }
        if (a.sectionId === b.sectionId) {
          const sect = DB.sections.find(s=>s.id===a.sectionId);
          conflicts.push({ type:'section', schedId: a.id, schedId2: b.id, desc: `Section overlap: ${sect?.name||'?'} on ${a.day} at ${a.timeStart}` });
        }
      }
    }
  }
  DB.teachers.forEach(t => {
    if (t.units > t.maxUnits) conflicts.push({ type:'overload', desc: `${t.name} is overloaded by ${t.units - t.maxUnits} units` });
  });
  return conflicts;
}

function renderConflicts(el) {
  const conflicts = detectConflicts();

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Conflict Detector</h1>
        <p>Automatically detects scheduling conflicts and overloads</p>
      </div>
      <button class="btn btn-ghost" onclick="renderConflicts(document.getElementById('view-conflicts'))">🔄 Refresh</button>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="stat-card ${conflicts.filter(c=>c.type==='teacher').length?'amber':'green'}">
        <div class="stat-icon">👩‍🏫</div>
        <div class="stat-value">${conflicts.filter(c=>c.type==='teacher').length}</div>
        <div class="stat-label">Teacher Double-Bookings</div>
      </div>
      <div class="stat-card ${conflicts.filter(c=>c.type==='room').length?'amber':'green'}">
        <div class="stat-icon">🏢</div>
        <div class="stat-value">${conflicts.filter(c=>c.type==='room').length}</div>
        <div class="stat-label">Room Conflicts</div>
      </div>
      <div class="stat-card ${conflicts.filter(c=>c.type==='overload').length?'amber':'green'}">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">${conflicts.filter(c=>c.type==='overload').length}</div>
        <div class="stat-label">Overloaded Teachers</div>
      </div>
    </div>
    ${conflicts.length === 0 ? `
      <div class="card" style="padding:60px;text-align:center">
        <div style="font-size:3rem;margin-bottom:16px">✅</div>
        <h3 style="font-family:'Syne',sans-serif;margin-bottom:8px">No Conflicts Detected!</h3>
        <p style="color:var(--text-muted)">All schedules are clean and valid.</p>
      </div>` : `
      <div class="conflict-panel">
        <div class="conflict-header">
          <span style="font-size:1.2rem">⚠️</span>
          <h3>${conflicts.length} Conflict${conflicts.length>1?'s':''} Found</h3>
          <span class="badge badge-danger" style="margin-left:auto">${conflicts.length}</span>
        </div>
        ${conflicts.map(c => {
          const icons = { teacher:'👩‍🏫', room:'🏢', section:'🏫', overload:'⚡' };
          const labels = { teacher:'Teacher Conflict', room:'Room Conflict', section:'Section Overlap', overload:'Overload Warning' };
          return `<div class="conflict-item">
            <div class="conflict-item-icon">${icons[c.type]||'⚠️'}</div>
            <div class="conflict-item-text">
              <strong>${labels[c.type]||'Conflict'}</strong>
              <span>${c.desc}</span>
            </div>
          </div>`;
        }).join('')}
      </div>`}`;
}

// ============================================================
//  USER MANAGEMENT (Admin Only)
// ============================================================
const ALL_PERMISSIONS = [
  { key: 'dashboard',  label: 'Dashboard',         desc: 'View main dashboard' },
  { key: 'sections',   label: 'Sections',           desc: 'Manage class sections' },
  { key: 'timetable',  label: 'Timetable',          desc: 'View & edit schedules' },
  { key: 'rooms',      label: 'Rooms',              desc: 'Manage room assignments' },
  { key: 'teachers',   label: 'Teacher Load',       desc: 'View faculty workload' },
  { key: 'students',   label: 'Students',           desc: 'Manage student records' },
  { key: 'users',      label: 'User Management',    desc: 'Manage system users' },
  { key: 'conflicts',  label: 'Conflict Detector',  desc: 'View scheduling conflicts' },
];

let umActiveTab = 'all';

function renderUserManagement(el) {
  const sysUsers = DB.sysUsers;
  const students = DB.students;
  const log = DB.activityLog;

  const allUsers = [
    ...sysUsers,
    ...students.map(s => ({
      id: s.id, username: s.username, name: s.name, email: s.email,
      role: 'student', status: s.status || 'Active',
      lastLogin: s.lastLogin || null,
      permissions: { dashboard: true, 'my-schedule': true },
      createdAt: s.registeredAt || '',
      isStudent: true, studentData: s
    }))
  ];

  const admins  = allUsers.filter(u => u.role === 'admin');
  const staffs  = allUsers.filter(u => u.role === 'staff');
  const studs   = allUsers.filter(u => u.role === 'student');
  const active  = allUsers.filter(u => u.status === 'Active');

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>User Management</h1>
        <p>Manage all system accounts, roles, and permissions</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost" onclick="exportUsers()">⬇ Export</button>
        <button class="btn btn-indigo" onclick="addSystemUser()">+ Add User</button>
      </div>
    </div>
    <div class="um-stats">
      <div class="stat-mini">
        <div class="stat-mini-icon">👥</div>
        <div><div class="stat-mini-val">${allUsers.length}</div><div class="stat-mini-label">Total Users</div></div>
      </div>
      <div class="stat-mini">
        <div class="stat-mini-icon">✅</div>
        <div><div class="stat-mini-val">${active.length}</div><div class="stat-mini-label">Active</div></div>
      </div>
      <div class="stat-mini">
        <div class="stat-mini-icon">🛡️</div>
        <div><div class="stat-mini-val">${admins.length}</div><div class="stat-mini-label">Admins</div></div>
      </div>
      <div class="stat-mini">
        <div class="stat-mini-icon">🎓</div>
        <div><div class="stat-mini-val">${studs.length}</div><div class="stat-mini-label">Students</div></div>
      </div>
    </div>
    <div class="um-tabs">
      <button class="um-tab ${umActiveTab==='all'?'active':''}" onclick="umSwitchTab('all')">All Users <span class="um-count">${allUsers.length}</span></button>
      <button class="um-tab ${umActiveTab==='admin'?'active':''}" onclick="umSwitchTab('admin')">Admins <span class="um-count">${admins.length}</span></button>
      <button class="um-tab ${umActiveTab==='staff'?'active':''}" onclick="umSwitchTab('staff')">Staff <span class="um-count">${staffs.length}</span></button>
      <button class="um-tab ${umActiveTab==='student'?'active':''}" onclick="umSwitchTab('student')">Students <span class="um-count">${studs.length}</span></button>
      <button class="um-tab ${umActiveTab==='log'?'active':''}" onclick="umSwitchTab('log')">Activity Log <span class="um-count">${log.length}</span></button>
    </div>
    ${['all','admin','staff','student'].map(tab => `
    <div class="um-panel ${umActiveTab===tab?'active':''}" id="um-panel-${tab}">
      <div class="search-filter-bar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search users..." oninput="umFilter('${tab}', this.value)" id="um-search-${tab}">
        </div>
        <select class="filter-select" onchange="umFilterStatus('${tab}', this.value)" id="um-status-${tab}">
          <option value="All">All Status</option><option>Active</option><option>Suspended</option>
        </select>
      </div>
      <div class="user-table-card" id="um-table-${tab}">
        ${buildUserTable(tab==='all' ? allUsers : allUsers.filter(u=>u.role===tab))}
      </div>
    </div>`).join('')}
    <div class="um-panel ${umActiveTab==='log'?'active':''}" id="um-panel-log">
      <div class="search-filter-bar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search log entries..." oninput="umFilterLog(this.value)" id="um-search-log">
        </div>
        <select class="filter-select" onchange="umFilterLogType(this.value)" id="um-log-type">
          <option value="all">All Types</option>
          <option value="auth">Auth</option>
          <option value="data">Data</option>
          <option value="access">Access</option>
          <option value="security">Security</option>
        </select>
        <button class="btn btn-ghost btn-sm" onclick="clearActivityLog()">🗑 Clear Log</button>
      </div>
      <div class="card">
        <div class="card-body" style="padding:4px 20px 20px">
          <div id="um-log-list">${buildLogList(log)}</div>
        </div>
      </div>
    </div>`;

  window.umFilter = (tab, val) => {
    const statusEl = document.getElementById('um-status-' + tab);
    const status = statusEl ? statusEl.value : 'All';
    const filtered = (tab === 'all' ? allUsers : allUsers.filter(u => u.role === tab))
      .filter(u => {
        const matchSearch = u.name.toLowerCase().includes(val.toLowerCase()) ||
          u.username.toLowerCase().includes(val.toLowerCase()) ||
          (u.email||'').toLowerCase().includes(val.toLowerCase());
        const matchStatus = status === 'All' || u.status === status;
        return matchSearch && matchStatus;
      });
    const tableEl = document.getElementById('um-table-' + tab);
    if (tableEl) tableEl.innerHTML = buildUserTable(filtered);
  };
  window.umFilterStatus = (tab, status) => {
    const searchEl = document.getElementById('um-search-' + tab);
    const val = searchEl ? searchEl.value : '';
    window.umFilter(tab, val);
  };
  window.umFilterLog = (val) => {
    const typeEl = document.getElementById('um-log-type');
    const type = typeEl ? typeEl.value : 'all';
    const filtered = log.filter(l =>
      (l.userName.toLowerCase().includes(val.toLowerCase()) || l.detail.toLowerCase().includes(val.toLowerCase())) &&
      (type === 'all' || l.type === type)
    );
    const listEl = document.getElementById('um-log-list');
    if (listEl) listEl.innerHTML = buildLogList(filtered);
  };
  window.umFilterLogType = (type) => {
    const searchEl = document.getElementById('um-search-log');
    const val = searchEl ? searchEl.value : '';
    window.umFilterLog(val);
  };
}

function buildUserTable(users) {
  if (!users.length) return `<div class="empty-state"><div class="empty-icon">👤</div><p>No users found</p></div>`;
  const roleColors = { admin: 'role-badge-admin', staff: 'role-badge-staff', student: 'role-badge-student' };
  const avatarBg = { admin: '#eef2ff/#4f46e5', staff: '#ecfeff/#0e7490', student: '#ecfdf5/#047857' };

  return `
    <div class="user-row header" style="grid-template-columns:38px 1fr 120px 100px 130px 150px">
      <div></div><div>User</div><div>Role</div><div>Status</div><div>Last Login</div><div>Actions</div>
    </div>
    ${users.map(u => {
      const [bg, color] = (avatarBg[u.role] || '#f1f5f9/#64748b').split('/');
      const initials = u.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
      const statusBadge = u.status === 'Active'
        ? '<span class="badge badge-success">Active</span>'
        : '<span class="badge badge-danger">Suspended</span>';
      const lastLogin = u.lastLogin ? timeAgo(u.lastLogin) : '<span style="color:var(--text-light)">Never</span>';
      const roleBadge = `<span class="badge ${roleColors[u.role]||'badge-gray'}" style="text-transform:capitalize">${u.role}</span>`;

      return `<div class="user-row" style="grid-template-columns:38px 1fr 120px 100px 130px 150px">
        <div class="ur-avatar" style="background:${bg};color:${color}">${initials}</div>
        <div>
          <div class="ur-name">${u.name}</div>
          <div class="ur-sub">@${u.username}${u.email ? ' · ' + u.email : ''}</div>
        </div>
        <div>${roleBadge}</div>
        <div>${statusBadge}</div>
        <div style="font-size:.78rem;color:var(--text-muted)">${lastLogin}</div>
        <div>
          <div class="action-btns" style="flex-wrap:wrap">
            <button class="btn btn-ghost btn-sm" onclick="editSystemUser('${u.username}','${u.role}')">✏️ Edit</button>
            <button class="btn btn-ghost btn-sm" onclick="managePermissions('${u.username}','${u.role}')">🔑 Perms</button>
            <button class="btn btn-${u.status==='Active'?'warning':'success'} btn-sm" onclick="toggleUserStatus('${u.username}','${u.role}')">${u.status==='Active'?'Suspend':'Activate'}</button>
            ${u.username !== currentUser.username ? `<button class="btn btn-danger btn-sm" onclick="deleteSystemUser('${u.username}','${u.role}')">🗑</button>` : ''}
          </div>
        </div>
      </div>`;
    }).join('')}`;
}

function buildLogList(log) {
  if (!log.length) return `<div class="empty-state"><div class="empty-icon">📋</div><p>No activity recorded yet</p></div>`;
  const typeConfig = {
    auth:     { icon: '🔐', bg: '#eef2ff', color: '#4f46e5' },
    data:     { icon: '📝', bg: '#ecfdf5', color: '#047857' },
    access:   { icon: '👁', bg: '#ecfeff', color: '#0e7490' },
    security: { icon: '🛡️', bg: '#fef9c3', color: '#854d0e' },
  };
  return log.map(l => {
    const cfg = typeConfig[l.type] || { icon: '📋', bg: '#f1f5f9', color: '#64748b' };
    return `<div class="log-item">
      <div class="log-icon" style="background:${cfg.bg};color:${cfg.color}">${cfg.icon}</div>
      <div class="log-body">
        <div class="log-action">${l.userName} <span style="font-weight:400;color:var(--text-muted)">·</span> <span style="text-transform:capitalize;color:${cfg.color}">${l.action}</span></div>
        <div class="log-detail">${l.detail}</div>
      </div>
      <div class="log-time">${timeAgo(l.ts)}</div>
    </div>`;
  }).join('');
}

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(isoStr).toLocaleDateString();
}

function umSwitchTab(tab) {
  umActiveTab = tab;
  renderUserManagement(document.getElementById('view-users'));
}

function addSystemUser() {
  showModal('Add System User', `
    <div class="form-grid">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="su-name" placeholder="e.g. Jane Doe">
      </div>
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="su-user" placeholder="e.g. jane.doe">
      </div>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="su-email" placeholder="jane@school.edu">
      </div>
      <div class="form-group">
        <label>Role</label>
        <select id="su-role" onchange="updatePermPreset()">
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="su-pass" placeholder="Min. 6 characters">
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="su-status"><option>Active</option><option>Suspended</option></select>
      </div>
    </div>
    <div class="form-group">
      <label style="margin-bottom:10px;display:block">Permissions</label>
      <div class="perm-grid" id="su-perm-grid">
        ${ALL_PERMISSIONS.map(p => `
          <div class="perm-item">
            <div class="perm-item-info">
              <div class="perm-item-label">${p.label}</div>
              <div class="perm-item-desc">${p.desc}</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="perm-${p.key}" ${['dashboard','sections','timetable','rooms','students'].includes(p.key) ? 'checked' : ''}>
              <div class="slider"></div>
            </label>
          </div>`).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveSystemUser()">Create User</button>
    </div>`);
  window.updatePermPreset = () => {
    const role = document.getElementById('su-role').value;
    const presets = {
      admin: ALL_PERMISSIONS.map(p => p.key),
      staff: ['dashboard','sections','timetable','rooms','students']
    };
    ALL_PERMISSIONS.forEach(p => {
      const el = document.getElementById('perm-' + p.key);
      if (el) el.checked = (presets[role] || []).includes(p.key);
    });
  };
}

function saveSystemUser() {
  const name = document.getElementById('su-name').value.trim();
  const username = document.getElementById('su-user').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const role = document.getElementById('su-role').value;
  const pass = document.getElementById('su-pass').value;
  const status = document.getElementById('su-status').value;
  if (!name || !username || !pass) { showToast('Please fill all required fields', 'warning'); return; }
  if (pass.length < 6) { showToast('Password must be 6+ characters', 'warning'); return; }
  const existing = DB.sysUsers.find(u => u.username === username);
  if (existing || DEMO_USERS[username]) { showToast('Username already taken', 'danger'); return; }
  const permissions = {};
  ALL_PERMISSIONS.forEach(p => { permissions[p.key] = document.getElementById('perm-' + p.key)?.checked || false; });
  const users = DB.sysUsers;
  users.push({ id: Date.now(), username, password: pass, name, email, role, status, permissions, createdAt: new Date().toISOString(), lastLogin: null });
  DB.sysUsers = users;
  logActivity('create', `Created ${role} account: ${name} (@${username})`, 'data');
  closeModal();
  showToast(`User "${name}" created!`, 'success');
  renderUserManagement(document.getElementById('view-users'));
}

function editSystemUser(username, role) {
  let user, isStudent = false;
  if (role === 'student') {
    user = DB.students.find(s => s.username === username);
    isStudent = true;
  } else {
    user = DB.sysUsers.find(u => u.username === username);
  }
  if (!user) return;

  showModal(`Edit User — ${user.name}`, `
    <div class="form-grid">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="eu-name" value="${user.name}">
      </div>
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="eu-user" value="${user.username}" disabled style="opacity:.6">
      </div>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="eu-email" value="${user.email||''}">
      </div>
      ${!isStudent ? `<div class="form-group">
        <label>Role</label>
        <select id="eu-role">
          <option value="staff" ${user.role==='staff'?'selected':''}>Staff</option>
          <option value="admin" ${user.role==='admin'?'selected':''}>Admin</option>
        </select>
      </div>` : `<div class="form-group">
        <label>Program</label>
        <input type="text" id="eu-email2" value="${user.course||''}" placeholder="e.g. BSIT" disabled style="opacity:.6">
      </div>`}
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>New Password <span style="color:var(--text-muted);font-weight:400">(leave blank to keep)</span></label>
        <input type="password" id="eu-pass" placeholder="••••••••">
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="eu-status">
          <option ${(user.status||'Active')==='Active'?'selected':''}>Active</option>
          <option ${user.status==='Suspended'?'selected':''}>Suspended</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="updateSystemUser('${username}','${role}')">Save Changes</button>
    </div>`);
}

function updateSystemUser(username, role) {
  const name = document.getElementById('eu-name').value.trim();
  const email = document.getElementById('eu-email').value.trim();
  const newPass = document.getElementById('eu-pass').value;
  const status = document.getElementById('eu-status').value;
  if (!name) { showToast('Name is required', 'warning'); return; }
  if (newPass && newPass.length < 6) { showToast('Password must be 6+ chars', 'warning'); return; }

  if (role === 'student') {
    const students = DB.students;
    const i = students.findIndex(s => s.username === username);
    if (i >= 0) {
      students[i] = { ...students[i], name, email, status, ...(newPass ? { password: newPass } : {}) };
      DB.students = students;
    }
  } else {
    const newRole = document.getElementById('eu-role').value;
    const users = DB.sysUsers;
    const i = users.findIndex(u => u.username === username);
    if (i >= 0) {
      users[i] = { ...users[i], name, email, role: newRole, status, ...(newPass ? { password: newPass } : {}) };
      DB.sysUsers = users;
    }
  }
  logActivity('update', `Updated account: ${name} (@${username})`, 'data');
  closeModal();
  showToast('User updated!', 'success');
  renderUserManagement(document.getElementById('view-users'));
}

function managePermissions(username, role) {
  if (role === 'student') { showToast('Students have fixed permissions', 'info'); return; }
  const user = DB.sysUsers.find(u => u.username === username);
  if (!user) return;
  const perms = user.permissions || {};

  showModal(`Permissions — ${user.name}`, `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;padding:12px;background:var(--surface2);border-radius:9px">
      <div style="width:40px;height:40px;border-radius:10px;background:#eef2ff;color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700">
        ${user.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
      </div>
      <div>
        <div style="font-weight:700">${user.name}</div>
        <div style="font-size:.78rem;color:var(--text-muted)">@${user.username} · <span style="text-transform:capitalize">${user.role}</span></div>
      </div>
      <div style="margin-left:auto;display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick="setAllPerms(true)">Enable All</button>
        <button class="btn btn-ghost btn-sm" onclick="setAllPerms(false)">Disable All</button>
      </div>
    </div>
    <div class="perm-grid" id="perm-edit-grid">
      ${ALL_PERMISSIONS.map(p => `
        <div class="perm-item" id="perm-item-${p.key}">
          <div class="perm-item-info">
            <div class="perm-item-label">${p.label}</div>
            <div class="perm-item-desc">${p.desc}</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="ep-${p.key}" ${perms[p.key] ? 'checked' : ''} onchange="syncPermItem('${p.key}')">
            <div class="slider"></div>
          </label>
        </div>`).join('')}
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="savePermissions('${username}')">Save Permissions</button>
    </div>`);

  window.setAllPerms = (val) => {
    ALL_PERMISSIONS.forEach(p => {
      const el = document.getElementById('ep-' + p.key);
      if (el) { el.checked = val; syncPermItem(p.key); }
    });
  };
  window.syncPermItem = (key) => {
    const el = document.getElementById('ep-' + key);
    const item = document.getElementById('perm-item-' + key);
    if (el && item) {
      item.style.borderColor = el.checked ? 'rgba(16,185,129,.4)' : '';
      item.style.background = el.checked ? '#f0fdf4' : '';
    }
  };
  ALL_PERMISSIONS.forEach(p => syncPermItem(p.key));
}

function savePermissions(username) {
  const users = DB.sysUsers;
  const i = users.findIndex(u => u.username === username);
  if (i < 0) return;
  const permissions = {};
  ALL_PERMISSIONS.forEach(p => { permissions[p.key] = document.getElementById('ep-' + p.key)?.checked || false; });
  users[i].permissions = permissions;
  DB.sysUsers = users;
  logActivity('permission', `Updated permissions for @${username}`, 'security');
  closeModal();
  showToast('Permissions saved!', 'success');
  renderUserManagement(document.getElementById('view-users'));
}

function toggleUserStatus(username, role) {
  if (username === currentUser.username) { showToast("You can't suspend your own account", 'warning'); return; }
  if (role === 'student') {
    const students = DB.students;
    const i = students.findIndex(s => s.username === username);
    if (i >= 0) {
      students[i].status = students[i].status === 'Active' ? 'Suspended' : 'Active';
      const newStatus = students[i].status;
      DB.students = students;
      logActivity('update', `${newStatus === 'Active' ? 'Activated' : 'Suspended'} student @${username}`, 'security');
      showToast(`User ${newStatus}`, newStatus === 'Active' ? 'success' : 'warning');
    }
  } else {
    const users = DB.sysUsers;
    const i = users.findIndex(u => u.username === username);
    if (i >= 0) {
      users[i].status = users[i].status === 'Active' ? 'Suspended' : 'Active';
      const newStatus = users[i].status;
      DB.sysUsers = users;
      logActivity('update', `${newStatus === 'Active' ? 'Activated' : 'Suspended'} user @${username}`, 'security');
      showToast(`User ${newStatus}`, newStatus === 'Active' ? 'success' : 'warning');
    }
  }
  renderUserManagement(document.getElementById('view-users'));
}

function deleteSystemUser(username, role) {
  if (username === currentUser.username) { showToast("You can't delete your own account", 'danger'); return; }
  if (!confirm(`Permanently delete user "@${username}"? This cannot be undone.`)) return;
  if (role === 'student') {
    DB.students = DB.students.filter(s => s.username !== username);
  } else {
    DB.sysUsers = DB.sysUsers.filter(u => u.username !== username);
  }
  logActivity('delete', `Deleted user account @${username}`, 'security');
  showToast('User deleted', 'danger');
  renderUserManagement(document.getElementById('view-users'));
}

function clearActivityLog() {
  if (!confirm('Clear all activity log entries?')) return;
  DB.activityLog = [];
  showToast('Activity log cleared', 'info');
  renderUserManagement(document.getElementById('view-users'));
}

function exportUsers() {
  const sysUsers = DB.sysUsers;
  const students = DB.students;
  const allUsers = [
    ...sysUsers.map(u => ({ ...u, type: 'System' })),
    ...students.map(s => ({ ...s, role: 'student', type: 'Student', status: s.status || 'Active' }))
  ];
  const rows = [['Username','Full Name','Email','Role','Type','Status','Created At','Last Login']];
  allUsers.forEach(u => {
    rows.push([
      u.username, u.name, u.email || '', u.role, u.type, u.status || 'Active',
      u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '',
      u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'
    ]);
  });
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'users_export.csv';
  a.click();
  showToast('Users exported as CSV!', 'success');
}

// ============================================================
//  STUDENTS (Admin/Staff View)
// ============================================================
function renderStudents(el) {
  const students = DB.students;
  const sects = DB.sections;
  const canEdit = currentUser.role === 'admin';

  function refresh(filter='', typeFilter='All', statusFilter='All') {
    const filtered = students.filter(s =>
      (s.name.toLowerCase().includes(filter.toLowerCase()) ||
       s.username.toLowerCase().includes(filter.toLowerCase()) ||
       (s.course||'').toLowerCase().includes(filter.toLowerCase())) &&
      (typeFilter === 'All' || s.type === typeFilter) &&
      (statusFilter === 'All' || s.status === statusFilter)
    );

    const grid = document.getElementById('students-grid');
    if (!grid) return;

    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No students found</p></div>`;
      return;
    }

    grid.innerHTML = filtered.map(s => {
      const enrolledNames = (s.enrolledSections||[]).map(id => sects.find(sec=>sec.id===id)?.name).filter(Boolean);
      const initials = s.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
      const typeColor = {Regular:'badge-success', Irregular:'badge-warning', Transferee:'badge-cyan', Returnee:'badge-indigo'};
      const statusColor = s.status === 'Active' ? 'badge-success' : 'badge-danger';
      return `
        <div class="student-profile-card" style="border-left-color:${s.status==='Suspended'?'var(--danger)':'var(--primary)'}">
          <div class="student-ava" style="${s.status==='Suspended'?'background:linear-gradient(135deg,#fef2f2,#fecaca);color:var(--danger)':''}">
            ${s.status==='Suspended' ? '🚫' : initials}
          </div>
          <div class="student-info" style="flex:1">
            <div class="student-name">${s.name}</div>
            <div class="student-meta">
              🆔 ${s.username}
              ${s.email ? ` · 📧 ${s.email}` : ''}
              ${s.contact ? ` · 📱 ${s.contact}` : ''}
            </div>
            <div class="student-meta" style="margin-top:3px">
              📚 ${s.course||'—'} · ${s.yearLevel||'—'}
            </div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px">
              <span class="badge ${typeColor[s.type]||'badge-gray'}">${s.type||'Regular'}</span>
              <span class="badge ${statusColor}">${s.status||'Active'}</span>
            </div>
            <div class="student-sects">
              ${enrolledNames.length
                ? enrolledNames.map(n=>`<span class="class-chip">${n}</span>`).join('')
                : '<span style="font-size:.73rem;color:var(--text-muted)">No sections enrolled</span>'}
            </div>
          </div>
          ${canEdit ? `<div style="display:flex;flex-direction:column;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="editStudent(${s.id})">✏️ Edit</button>
            <button class="btn btn-${s.status==='Active'?'warning':'success'} btn-sm" onclick="toggleStudentStatus(${s.id})">${s.status==='Active'?'Suspend':'Activate'}</button>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.id})">🗑</button>
          </div>` : ''}
        </div>`;
    }).join('');
  }

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>Student Management</h1>
        <p>${students.length} registered student${students.length!==1?'s':''}</p>
      </div>
      <div style="display:flex;gap:8px">
        ${canEdit ? `<button class="btn btn-indigo" onclick="adminAddStudent()">+ Add Student</button>` : ''}
        <button class="btn btn-ghost" onclick="exportStudents()">⬇ Export</button>
      </div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      <div class="stat-card indigo">
        <div class="stat-icon">🎓</div>
        <div class="stat-value">${students.length}</div>
        <div class="stat-label">Total Students</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon">✅</div>
        <div class="stat-value">${students.filter(s=>s.status==='Active').length}</div>
        <div class="stat-label">Active</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon">🔄</div>
        <div class="stat-value">${students.filter(s=>s.type==='Irregular').length}</div>
        <div class="stat-label">Irregular</div>
      </div>
      <div class="stat-card cyan">
        <div class="stat-icon">📋</div>
        <div class="stat-value">${students.filter(s=>s.enrolledSections&&s.enrolledSections.length>0).length}</div>
        <div class="stat-label">With Sections</div>
      </div>
    </div>
    <div class="toolbar">
      <div class="search-wrap" style="flex:1">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search by name, ID, or course..." id="stu-search" oninput="stuRefresh()">
      </div>
      <select class="filter-select" id="stu-type" onchange="stuRefresh()">
        <option>All</option><option>Regular</option><option>Irregular</option><option>Transferee</option><option>Returnee</option>
      </select>
      <select class="filter-select" id="stu-status" onchange="stuRefresh()">
        <option>All</option><option>Active</option><option>Suspended</option>
      </select>
    </div>
    <div id="students-grid" style="display:flex;flex-direction:column;gap:12px"></div>`;

  window.stuRefresh = () => {
    refresh(
      document.getElementById('stu-search').value,
      document.getElementById('stu-type').value,
      document.getElementById('stu-status').value
    );
  };
  refresh();
}

function adminAddStudent() {
  const sects = DB.sections;
  showModal('Add Student', `
    <div class="form-grid">
      <div class="form-group"><label>Student ID</label><input type="text" id="as-id" placeholder="2024-00001"></div>
      <div class="form-group"><label>Password</label><input type="password" id="as-pass" placeholder="Min. 6 chars"></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label>First Name</label><input type="text" id="as-first"></div>
      <div class="form-group"><label>Last Name</label><input type="text" id="as-last"></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label>Email</label><input type="email" id="as-email" placeholder=""></div>
      <div class="form-group"><label>Contact</label><input type="text" id="as-contact" placeholder="09XX-XXX-XXXX"></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label>Year Level</label>
        <select id="as-year"><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select>
      </div>
      <div class="form-group"><label>Program</label>
        <select id="as-course"><option>BSIT</option><option>BSCS</option><option>BSCE</option><option>BSEd</option><option>BSBA</option></select>
      </div>
    </div>
    <div class="form-group"><label>Type</label>
      <select id="as-type"><option>Regular</option><option>Irregular</option><option>Transferee</option><option>Returnee</option></select>
    </div>
    <div class="form-group">
      <label>Enrolled Sections</label>
      <div class="section-picker" id="modal-sect-picker" style="max-height:200px">
        ${sects.map(s=>`
          <div class="section-pick-card" onclick="this.classList.toggle('selected')" data-sect-id="${s.id}">
            <div class="spick-name">${s.name}</div>
            <div class="spick-sub">${s.subject}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="saveAdminStudent()">Add Student</button>
    </div>`);
}

function saveAdminStudent(id=null) {
  const username = document.getElementById('as-id').value.trim();
  const pass = document.getElementById('as-pass').value;
  const first = document.getElementById('as-first').value.trim();
  const last = document.getElementById('as-last').value.trim();
  if (!username || !first || !last) { showToast('Please fill required fields', 'warning'); return; }
  if (!id && pass.length < 6) { showToast('Password must be 6+ characters', 'warning'); return; }
  const existing = DB.students.find(s => s.username === username && s.id !== id);
  if (!id && (existing || DEMO_USERS[username])) { showToast('Username already taken', 'danger'); return; }

  const selectedSectEls = document.querySelectorAll('#modal-sect-picker .section-pick-card.selected');
  const enrolledSections = [...selectedSectEls].map(el => parseInt(el.dataset.sectId));

  const students = DB.students;
  if (id) {
    const i = students.findIndex(s=>s.id===id);
    if (i>=0) students[i] = {...students[i],
      name: first+' '+last, firstName: first, lastName: last,
      email: document.getElementById('as-email').value,
      contact: document.getElementById('as-contact').value,
      yearLevel: document.getElementById('as-year').value,
      course: document.getElementById('as-course').value,
      type: document.getElementById('as-type').value,
      enrolledSections
    };
  } else {
    students.push({
      id: Date.now(), username, password: pass,
      name: first+' '+last, firstName: first, lastName: last,
      email: document.getElementById('as-email').value,
      contact: document.getElementById('as-contact').value,
      yearLevel: document.getElementById('as-year').value,
      course: document.getElementById('as-course').value,
      type: document.getElementById('as-type').value,
      enrolledSections, registeredAt: new Date().toISOString(), status: 'Active'
    });
  }
  DB.students = students;
  closeModal();
  showToast(id ? 'Student updated!' : 'Student added!', 'success');
  renderStudents(document.getElementById('view-students'));
}

function editStudent(id) {
  const s = DB.students.find(st=>st.id===id);
  if (!s) return;
  const sects = DB.sections;
  showModal('Edit Student', `
    <div class="form-grid">
      <div class="form-group"><label>Student ID</label><input type="text" id="as-id" value="${s.username}" disabled style="opacity:.6"></div>
      <div class="form-group"><label>New Password (leave blank to keep)</label><input type="password" id="as-pass" placeholder="••••••••"></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label>First Name</label><input type="text" id="as-first" value="${s.firstName||''}"></div>
      <div class="form-group"><label>Last Name</label><input type="text" id="as-last" value="${s.lastName||''}"></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label>Email</label><input type="email" id="as-email" value="${s.email||''}"></div>
      <div class="form-group"><label>Contact</label><input type="text" id="as-contact" value="${s.contact||''}"></div>
    </div>
    <div class="form-grid">
      <div class="form-group"><label>Year Level</label>
        <select id="as-year">${['1st Year','2nd Year','3rd Year','4th Year'].map(y=>`<option ${s.yearLevel===y?'selected':''}>${y}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label>Program</label>
        <select id="as-course">${['BSIT','BSCS','BSCE','BSEd','BSBA'].map(c=>`<option ${s.course===c?'selected':''}>${c}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-group"><label>Type</label>
      <select id="as-type">${['Regular','Irregular','Transferee','Returnee'].map(t=>`<option ${s.type===t?'selected':''}>${t}</option>`).join('')}</select>
    </div>
    <div class="form-group">
      <label>Enrolled Sections</label>
      <div class="section-picker" id="modal-sect-picker" style="max-height:200px">
        ${sects.map(sec=>`
          <div class="section-pick-card ${(s.enrolledSections||[]).includes(sec.id)?'selected':''}" onclick="this.classList.toggle('selected')" data-sect-id="${sec.id}">
            <div class="spick-name">${sec.name}</div>
            <div class="spick-sub">${sec.subject}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-indigo" onclick="updateStudentFromModal(${id})">Save Changes</button>
    </div>`);
}

function updateStudentFromModal(id) {
  const s = DB.students.find(st=>st.id===id);
  if (!s) return;
  const first = document.getElementById('as-first').value.trim();
  const last = document.getElementById('as-last').value.trim();
  const newPass = document.getElementById('as-pass').value;
  if (!first || !last) { showToast('Name is required', 'warning'); return; }
  const selectedSectEls = document.querySelectorAll('#modal-sect-picker .section-pick-card.selected');
  const enrolledSections = [...selectedSectEls].map(el => parseInt(el.dataset.sectId));
  const students = DB.students;
  const i = students.findIndex(st=>st.id===id);
  students[i] = { ...students[i],
    name: first+' '+last, firstName: first, lastName: last,
    email: document.getElementById('as-email').value,
    contact: document.getElementById('as-contact').value,
    yearLevel: document.getElementById('as-year').value,
    course: document.getElementById('as-course').value,
    type: document.getElementById('as-type').value,
    enrolledSections,
    ...(newPass.length >= 6 ? { password: newPass } : {})
  };
  DB.students = students;
  closeModal();
  showToast('Student updated!', 'success');
  renderStudents(document.getElementById('view-students'));
}

function toggleStudentStatus(id) {
  const students = DB.students;
  const i = students.findIndex(s=>s.id===id);
  if (i>=0) {
    students[i].status = students[i].status === 'Active' ? 'Suspended' : 'Active';
    DB.students = students;
    showToast(`Student ${students[i].status}`, students[i].status==='Active'?'success':'warning');
    renderStudents(document.getElementById('view-students'));
  }
}

function deleteStudent(id) {
  if (!confirm('Permanently delete this student account?')) return;
  DB.students = DB.students.filter(s=>s.id!==id);
  showToast('Student deleted', 'danger');
  renderStudents(document.getElementById('view-students'));
}

function exportStudents() {
  const students = DB.students;
  const sects = DB.sections;
  const rows = [['Student ID','Name','Email','Course','Year Level','Type','Status','Enrolled Sections','Registered At']];
  students.forEach(s => {
    const names = (s.enrolledSections||[]).map(id=>sects.find(sec=>sec.id===id)?.name||'').filter(Boolean).join('; ');
    rows.push([s.username, s.name, s.email||'', s.course||'', s.yearLevel||'', s.type||'', s.status||'Active', names, s.registeredAt ? new Date(s.registeredAt).toLocaleDateString() : '']);
  });
  const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'students_export.csv';
  a.click();
  showToast('Students exported as CSV!', 'success');
}

// ============================================================
// ✅ FIX 2: renderMySchedule — show suspension banner & block schedule
// ============================================================
function renderMySchedule(el) {
  const enrolledIds = currentUser.enrolledSections || [];
  const allScheds = DB.schedules;
  const sects = DB.sections;

  const scheds = enrolledIds.length > 0
    ? allScheds.filter(s => enrolledIds.includes(s.sectionId))
    : allScheds;

  const enrolledSects = enrolledIds.length > 0
    ? sects.filter(s => enrolledIds.includes(s.id))
    : sects;

  // Find registered student profile & check suspension
  const studentProfile = DB.students.find(s => s.username === currentUser.username);
  const isSuspended = studentProfile && studentProfile.status === 'Suspended';

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>My Class Schedule</h1>
        <p>${isSuspended ? 'Account suspended' : enrolledIds.length > 0 ? `${enrolledSects.length} enrolled section${enrolledSects.length!==1?'s':''} this term` : 'All schedules (demo view)'}</p>
      </div>
    </div>

    ${isSuspended ? `
    <!-- ===== SUSPENSION BANNER ===== -->
    <div class="card" style="margin-bottom:20px;border:2px solid var(--danger);background:linear-gradient(135deg,#fef2f2,#fff5f5);box-shadow:0 4px 20px rgba(239,68,68,.15)">
      <div class="card-body" style="padding:24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div style="width:58px;height:58px;border-radius:16px;background:#fecaca;display:flex;align-items:center;justify-content:center;font-size:1.9rem;flex-shrink:0;box-shadow:0 4px 12px rgba(239,68,68,.2)">🚫</div>
        <div style="flex:1;min-width:200px">
          <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:var(--danger);margin-bottom:5px">Account Suspended</div>
          <div style="font-size:.87rem;color:#b91c1c;line-height:1.6">Your account has been suspended by an administrator. Schedule access is restricted until your account is reactivated. Please contact your school administrator for assistance.</div>
        </div>
        <div style="background:#fecaca;border-radius:10px;padding:10px 16px;text-align:center;flex-shrink:0">
          <div style="font-size:.7rem;color:#991b1b;font-weight:700;text-transform:uppercase;letter-spacing:.05em">Status</div>
          <div style="font-size:.9rem;color:var(--danger);font-weight:800;margin-top:2px">Suspended</div>
        </div>
      </div>
    </div>

    <!-- ===== BLURRED / LOCKED SCHEDULE ===== -->
    <div style="position:relative;border-radius:var(--radius);overflow:hidden">
      <!-- Lock overlay -->
      <div style="position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,.6);backdrop-filter:blur(2px)">
        <div style="background:var(--surface);border:2px solid var(--danger);border-radius:18px;padding:32px 44px;text-align:center;box-shadow:0 12px 40px rgba(239,68,68,.2);max-width:320px">
          <div style="font-size:2.8rem;margin-bottom:12px">🔒</div>
          <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:var(--danger);margin-bottom:6px">Schedule Access Blocked</div>
          <div style="font-size:.78rem;color:var(--text-muted);line-height:1.5">Your schedule is hidden while your account is suspended. Contact your administrator to restore access.</div>
        </div>
      </div>
      <!-- Blurred timetable underneath -->
      <div style="filter:blur(5px);pointer-events:none;user-select:none;opacity:.3">
        <div class="card">
          <div class="card-body" style="padding:16px">
            <div class="timetable-grid">
              <table class="timetable">
                <thead>
                  <tr>
                    <th>Time</th>
                    ${DAYS.map(d=>`<th>${d}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${TIME_SLOTS.map(t => `<tr>
                    <td class="time-col">${t}</td>
                    ${DAYS.map(() => `<td><div style="height:60px;background:#eef2ff;border-radius:6px;margin:2px"></div></td>`).join('')}
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>` : `

    ${studentProfile ? `
    <div class="card" style="margin-bottom:20px">
      <div class="card-body" style="padding:20px">
        <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
          <div style="width:60px;height:60px;border-radius:14px;background:linear-gradient(135deg,#eef2ff,#c7d2fe);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;color:var(--primary);flex-shrink:0">
            ${studentProfile.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
          </div>
          <div style="flex:1">
            <div style="font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800">${studentProfile.name}</div>
            <div style="font-size:.82rem;color:var(--text-muted);margin-top:3px">
              🆔 ${studentProfile.username} · 📚 ${studentProfile.course} · ${studentProfile.yearLevel} · <span class="badge badge-success" style="vertical-align:middle">${studentProfile.type}</span>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${enrolledSects.map(s=>`<span class="class-chip" style="padding:5px 10px">${s.name}</span>`).join('')}
            ${enrolledSects.length === 0 ? `<span style="font-size:.82rem;color:var(--text-muted)">No sections enrolled yet</span>` : ''}
          </div>
        </div>
      </div>
    </div>` : ''}

    ${enrolledIds.length === 0 && !studentProfile ? `
    <div class="card" style="margin-bottom:20px;border-left:4px solid var(--warning)">
      <div class="card-body" style="padding:18px;display:flex;align-items:center;gap:12px">
        <span style="font-size:1.4rem">ℹ️</span>
        <div>
          <div style="font-weight:700;font-size:.9rem">Demo Student View</div>
          <div style="font-size:.8rem;color:var(--text-muted)">Register a new account to see your personal enrolled sections.</div>
        </div>
      </div>
    </div>` : ''}

    ${enrolledIds.length > 0 && enrolledSects.length === 0 ? `
    <div class="card" style="margin-bottom:20px;border-left:4px solid var(--accent2)">
      <div class="card-body" style="padding:18px;display:flex;align-items:center;gap:12px">
        <span style="font-size:1.4rem">📋</span>
        <div>
          <div style="font-weight:700;font-size:.9rem">No Sections Enrolled</div>
          <div style="font-size:.8rem;color:var(--text-muted)">You haven't been enrolled in any sections yet. Contact your administrator.</div>
        </div>
      </div>
    </div>` : ''}

    <div class="card">
      <div class="card-body" style="padding:16px">
        <div class="timetable-grid">
          <table class="timetable">
            <thead>
              <tr>
                <th>Time</th>
                ${DAYS.map(d=>`<th>${d}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${TIME_SLOTS.map((t,ti) => `<tr>
                <td class="time-col">${t}</td>
                ${DAYS.map(d => {
                  const sched = scheds.find(s => s.day===d && s.timeStart===t);
                  if (sched) {
                    const sect = sects.find(s=>s.id===sched.sectionId);
                    const teacher = DB.teachers.find(tc=>tc.id===sched.teacherId);
                    const room = DB.rooms.find(r=>r.id===sched.roomId);
                    return `<td>
                      <div class="timetable-cell" style="background:#eef2ff;color:#4f46e5">
                        <div class="cell-subject">${sect?.subject||'?'}</div>
                        <div class="cell-room">🏢 ${room?.name||'?'}</div>
                        <div class="cell-teacher">👩‍🏫 ${teacher?.name?.split(' ').slice(-1)[0]||'?'}</div>
                      </div>
                    </td>`;
                  }
                  return `<td><div style="height:100%;display:flex;align-items:center;justify-content:center;color:#e2e8f0;font-size:.7rem">Free</div></td>`;
                }).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`}`;
}

// ============================================================
//  MODAL HELPERS
// ============================================================
function showModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-overlay').classList.add('active');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ============================================================
//  TOAST
// ============================================================
function showToast(msg, type='info') {
  const icons = { success:'✅', danger:'❌', warning:'⚠️', info:'ℹ️' };
  const tc = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
  tc.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(20px)'; toast.style.transition='.3s'; setTimeout(()=>toast.remove(), 300); }, 3000);
}

// ============================================================
//  KEYBOARD
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});