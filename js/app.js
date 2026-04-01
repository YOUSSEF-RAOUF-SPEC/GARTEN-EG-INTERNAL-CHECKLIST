const app = {
  state: {
    currentScreen: 'screen-branch',
    branch: null,
    user: null,
    checklistType: null,
    checklistData: [],
    history: []
  },

  // DATA REPOSITORY
  getUsers: () => JSON.parse(localStorage.getItem('garten_users')),
  saveUsers: (users) => localStorage.setItem('garten_users', JSON.stringify(users)),
  getChecklists: () => JSON.parse(localStorage.getItem('garten_checklists')),
  saveChecklists: (cl) => localStorage.setItem('garten_checklists', JSON.stringify(cl)),

  // ROUTING
  showScreen: function(id, saveHistory = true) {
    if (saveHistory && this.state.currentScreen !== id) {
      this.state.history.push(this.state.currentScreen);
    }
    
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    this.state.currentScreen = id;

    const backBtn = document.getElementById('btn-back');
    if (id === 'screen-branch') {
      backBtn.classList.add('hidden');
      this.state.history = []; // Reset history
    } else {
      backBtn.classList.remove('hidden');
    }
  },

  goBack: function() {
    if (this.state.history.length > 0) {
      const prev = this.state.history.pop();
      
      // Handle logout if going back from dashboard
      if (this.state.currentScreen === 'screen-dashboard') {
        this.state.user = null;
        document.getElementById('input-password').value = '';
      }
      
      this.showScreen(prev, false);
    }
  },

  // BRANCH ALIGN
  selectBranch: function(branchName) {
    this.state.branch = branchName;
    document.getElementById('login-branch-title').innerText = branchName;
    this.showScreen('screen-login');
  },

  // AUTHENTICATION
  handleLogin: function() {
    const rawPwd = document.getElementById('input-password').value;
    const pwd = rawPwd.trim().toLowerCase(); // Handle mobile spaces and auto-caps
    const errorEl = document.getElementById('login-error');
    
    const users = this.getUsers();
    const user = users.find(u => u.password.toLowerCase() === pwd);

    if (user && (user.branches.includes(this.state.branch) || user.role === 'superadmin')) {
      errorEl.classList.add('hidden');
      this.state.user = user;
      this.initDashboard();
      this.showScreen('screen-dashboard');
    } else {
      errorEl.classList.remove('hidden');
    }
  },

  // DASHBOARD
  initDashboard: function() {
    document.getElementById('dash-greeting').innerText = `Hello, ${this.state.user.username.split(' ')[0]}`;
    document.getElementById('dash-branch').innerText = this.state.branch;
    
    let roleName = 'Staff Member';
    if (this.state.user.role === 'superadmin') roleName = 'General Manager';
    if (this.state.user.role === 'branchadmin') roleName = 'Branch Manager';
    document.getElementById('dash-role').innerText = roleName;

    // Admin controls visibility
    document.getElementById('admin-controls').classList.remove('hidden');
    document.getElementById('btn-manage-points').classList.toggle('hidden', !this.state.user.canManagePoints);
    document.getElementById('btn-manage-users').classList.toggle('hidden', !this.state.user.canManageUsers);

    // Render accessible checklists
    const clContainer = document.getElementById('dashboard-checklists');
    clContainer.innerHTML = '';

    const labels = {
      service: { icon: 'fa-concierge-bell', name: 'Service Area' },
      bar: { icon: 'fa-cocktail', name: 'Bar Area' },
      shisha: { icon: 'fa-smoking', name: 'Shisha Area' }
    };

    if (this.state.user.checklists.length === 0) {
      clContainer.innerHTML = '<p class="text-muted">No checklists assigned to your role.</p>';
      return;
    }

    this.state.user.checklists.forEach(type => {
      if (labels[type]) {
        clContainer.innerHTML += `
          <div class="card" onclick="app.startChecklist('${type}')">
            <i class="fas ${labels[type].icon}"></i>
            <h3>${labels[type].name}</h3>
          </div>
        `;
      }
    });
  },

  // CHECKLIST RENDER
  startChecklist: function(type) {
    this.state.pendingChecklistType = type;
    // Open shift selection modal
    document.getElementById('shift-modal').classList.add('active');
  },

  startShift: function(shiftType) { // 'OPENING' or 'CLOSING'
    document.getElementById('shift-modal').classList.remove('active');
    
    const type = this.state.pendingChecklistType;
    if(!type) return;

    this.state.checklistType = type;
    this.state.currentShift = shiftType;
    const allLists = this.getChecklists();
    
    // Filter the items based on section name containing 'OPENING' or 'CLOSING'
    const shiftItems = (allLists[type] || []).filter(item => item.section.toUpperCase().includes(shiftType));

    // Deep copy and add state properties
    this.state.checklistData = JSON.parse(JSON.stringify(shiftItems)).map(item => ({
      ...item,
      completed: false,
      notes: '',
      photo: null // Will store base64 string
    }));

    document.getElementById('checklist-title').innerText = `${this.state.branch} - ${type.toUpperCase()} (${shiftType})`;
    this.renderChecklist();
    this.showScreen('screen-checklist');
  },

  renderChecklist: function() {
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    // Group by section
    const grouped = {};
    this.state.checklistData.forEach((item, index) => {
      item.originalIndex = index; // Keep track of the actual index in the state array
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    });

    let completedCount = 0;

    for (const [section, items] of Object.entries(grouped)) {
      let sectionHtml = `<div class="checklist-section">
        <h3 class="section-title"><i class="fas fa-clipboard-check"></i> ${section}</h3>`;

      items.forEach(item => {
        if (item.completed) completedCount++;
        const cardClass = item.completed ? 'point-card completed' : 'point-card';
        
        sectionHtml += `
          <div class="${cardClass}" id="point-card-${item.originalIndex}">
            <div class="point-header">
              <input type="checkbox" class="checkbox-custom" 
                ${item.completed ? 'checked' : ''} 
                onchange="app.togglePoint(${item.originalIndex}, this.checked)">
              <div class="point-text">${item.text}</div>
            </div>
            <div class="point-actions">
              <textarea class="notes-input" placeholder="Add notes/issues (optional)..." 
                onchange="app.updateNotes(${item.originalIndex}, this.value)">${item.notes}</textarea>
              
              <label class="camera-btn">
                <i class="fas fa-camera"></i> ${item.photo ? 'Retake Photo' : 'Take Photo'}
                <input type="file" accept="image/*" capture="environment" class="hidden" 
                  onchange="app.handlePhotoUpload(event, ${item.originalIndex})">
              </label>
              <img id="photo-preview-${item.originalIndex}" class="photo-preview" 
                   src="${item.photo || ''}" style="display: ${item.photo ? 'block' : 'none'}">
            </div>
          </div>
        `;
      });

      sectionHtml += `</div>`;
      container.innerHTML += sectionHtml;
    }

    document.getElementById('checklist-progress').innerText = `${completedCount}/${this.state.checklistData.length} Completed`;
  },

  togglePoint: function(index, isChecked) {
    this.state.checklistData[index].completed = isChecked;
    const card = document.getElementById(`point-card-${index}`);
    if (isChecked) card.classList.add('completed');
    else card.classList.remove('completed');
    
    const completedCount = this.state.checklistData.filter(x => x.completed).length;
    document.getElementById('checklist-progress').innerText = `${completedCount}/${this.state.checklistData.length} Completed`;
  },

  updateNotes: function(index, value) {
    this.state.checklistData[index].notes = value;
  },

  handlePhotoUpload: function(event, index) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Compress high-res mobile photos to stop html2pdf from crashing
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const base64Str = canvas.toDataURL('image/jpeg', 0.6); // 60% quality jpeg
          
          app.state.checklistData[index].photo = base64Str;
          
          const imgEl = document.getElementById(`photo-preview-${index}`);
          imgEl.src = base64Str;
          imgEl.style.display = 'block';
          
          event.target.parentElement.innerHTML = `
            <i class="fas fa-camera"></i> Retake Photo
            <input type="file" accept="image/*" capture="environment" class="hidden" 
              onchange="app.handlePhotoUpload(event, ${index})">
          `;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },

  // EXCEL GENERATION
  generateExcel: async function() {
    try {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const fileName = `${this.state.branch} - ${this.state.user.username} - ${this.state.checklistType.toUpperCase()} ${this.state.currentShift} - ${dateStr}.xlsx`;

      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('Checklist Report');

      // Define columns exactly as the original XLS
      ws.columns = [
        { header: 'Section', key: 'section', width: 25 },
        { header: 'Task Description', key: 'text', width: 45 },
        { header: 'Completed?', key: 'status', width: 15 },
        { header: 'Issues Faced / Notes', key: 'notes', width: 35 },
        { header: 'Action Taken', key: 'action', width: 20 },
        { header: 'Signature', key: 'signature', width: 15 },
        { header: 'Photo Evidence', key: 'photo', width: 30 },
        { header: 'Timestamp', key: 'time', width: 20 }
      ];

      // Styling header
      ws.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      ws.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A2F24' } };
      ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

      let currentRow = 2;

      for (const item of this.state.checklistData) {
        const isCompleted = item.completed;
        const statusText = isCompleted ? 'Yes - Pass' : 'No - Fail';
        
        const row = ws.addRow({
          section: item.section,
          text: item.text,
          status: statusText,
          notes: item.notes || '',
          action: '', // Standard original col
          signature: this.state.user.username,
          time: isCompleted ? new Date().toLocaleTimeString() : ''
        });

        // Alignment and wrapping
        row.getCell('section').alignment = { wrapText: true, vertical: 'middle' };
        row.getCell('text').alignment = { wrapText: true, vertical: 'middle' };
        row.getCell('notes').alignment = { wrapText: true, vertical: 'middle' };
        row.getCell('status').alignment = { horizontal: 'center', vertical: 'middle' };

        // Color coding completion status
        if (!isCompleted) {
          row.getCell('status').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFCCCC' } };
          row.getCell('status').font = { color: { argb: 'FFCC0000' }, bold: true };
        } else {
          row.getCell('status').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCFFCC' } };
          row.getCell('status').font = { color: { argb: 'FF008000' }, bold: true };
        }

        // Handle Image
        if (item.photo) {
          const base64Data = item.photo.split(',')[1];
          const imageId = wb.addImage({
            base64: base64Data,
            extension: 'jpeg',
          });
          
          ws.getRow(currentRow).height = 120; // make row tall for image
          ws.addImage(imageId, {
            tl: { col: 6, row: currentRow - 1 },
            ext: { width: 160, height: 140 } // fit nicely in column
          });
        }
        
        currentRow++;
      }

      // Add Manager Signatures at the bottom
      ws.addRow([]);
      ws.addRow(['Duty Manager Signature:', '_______________________', '', 'Operations Mgr Signature:', '_______________________']);
      ws.getRow(currentRow + 1).font = { bold: true };

      // Generate Blob and trigger download
      const buffer = await wb.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, fileName);
      
      alert("Excel Report downloaded successfully!");
      app.goBack(); // Back to dashboard
    } catch (e) {
      console.error(e);
      alert("Error generating Excel report.");
    }
  },

  // MODAL LOGIC
  openAdminModal: function(mode) {
    const overlay = document.getElementById('admin-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (mode === 'password') {
      title.innerText = 'Change Password';
      body.innerHTML = `
        <div class="form-group">
          <label>New Password</label>
          <input type="password" id="new-pwd" class="input-el">
        </div>
        <button class="btn-primary" onclick="app.savePassword()">Update Password</button>
      `;
    } else if (mode === 'checkpoints') {
      title.innerText = 'Manage Checkpoints';
      let options = '';
      this.state.user.checklists.forEach(type => {
        options += `<option value="${type}">${type.toUpperCase()}</option>`;
      });
      body.innerHTML = `
        <div class="form-group">
          <label>Select Checklist</label>
          <select id="manage-cl-type" class="input-el">${options}</select>
        </div>
        <div class="form-group">
          <label>Section Name</label>
          <input type="text" id="manage-cl-section" class="input-el" placeholder="e.g. OPENING - BAR AREA">
        </div>
        <div class="form-group">
          <label>Task Description</label>
          <textarea id="manage-cl-text" class="input-el notes-input"></textarea>
        </div>
        <button class="btn-primary" onclick="app.addCheckpoint()">Add Checkpoint</button>
        <p class="text-muted" style="margin-top:1rem; font-size:0.8rem;">*Note: Removing points is omitted for UI simplicity in this demo, but the data structure supports it.</p>
      `;
    } else if (mode === 'users') {
      title.innerText = 'Manage Users';
      body.innerHTML = `
        <div class="form-group">
          <label>Username</label>
          <input type="text" id="manage-u-name" class="input-el">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="text" id="manage-u-pwd" class="input-el">
        </div>
        <div class="form-group">
          <label>Role</label>
          <select id="manage-u-role" class="input-el">
            <option value="user">User</option>
            <option value="branchadmin">Branch Admin</option>
          </select>
        </div>
        <button class="btn-primary" onclick="app.addUser()">Add User</button>
      `;
    }

    overlay.classList.add('active');
  },

  closeModal: function() {
    document.getElementById('admin-modal').classList.remove('active');
  },

  savePassword: function() {
    const newPwd = document.getElementById('new-pwd').value;
    if (newPwd.length < 3) return alert("Password too short");
    
    const users = this.getUsers();
    const userIdx = users.findIndex(u => u.password === this.state.user.password);
    if (userIdx !== -1) {
      users[userIdx].password = newPwd;
      this.saveUsers(users);
      this.state.user.password = newPwd;
      alert("Password updated");
      this.closeModal();
    }
  },

  addCheckpoint: function() {
    const type = document.getElementById('manage-cl-type').value;
    const section = document.getElementById('manage-cl-section').value;
    const text = document.getElementById('manage-cl-text').value;

    if (!section || !text) return alert("Please fill all fields");

    const lists = this.getChecklists();
    lists[type].push({ section, text });
    this.saveChecklists(lists);
    
    alert("Checkpoint added successfully!");
    this.closeModal();
    if (this.state.currentScreen === 'screen-checklist' && this.state.checklistType === type) {
      this.startChecklist(type); // Refresh
    }
  },

  addUser: function() {
    const username = document.getElementById('manage-u-name').value;
    const password = document.getElementById('manage-u-pwd').value;
    const role = document.getElementById('manage-u-role').value;

    if (!username || !password) return alert("Please fill all fields");

    const users = this.getUsers();
    if (users.find(u => u.password === password)) return alert("Password must be unique across all users based on DB design");

    users.push({
      username, password, role,
      branches: [this.state.branch],
      checklists: ['service', 'bar', 'shisha'], // Default for demo
      canManagePoints: role === 'branchadmin',
      canManageUsers: false
    });

    this.saveUsers(users);
    alert("User added securely.");
    this.closeModal();
  }
};

// Event Binding
document.getElementById('btn-back').addEventListener('click', () => app.goBack());

// Initialize
app.showScreen('screen-branch');
