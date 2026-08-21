// ==========================================
// Plant World - Full Stack Version (with Backend API)
// ==========================================

const API_URL = 'http://localhost:3000/api/plants';

// ==========================================
// 1. LOAD PLANTS FROM BACKEND
// ==========================================
async function loadPlants() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        plants = data;
        renderPlants();
        console.log('✅ Plants loaded successfully, total:', plants.length);
    } catch (error) {
        console.error('❌ Failed to load plants:', error);
        document.getElementById('plantList').innerHTML = 
            '<p style="color:red;">⚠️ Cannot connect to server. Please make sure the backend is running.</p>';
    }
}

// ==========================================
// 2. RENDER PLANTS TO THE PAGE
// ==========================================
function renderPlants() {
    const container = document.getElementById('plantList');
    container.innerHTML = '';
    
    if (plants.length === 0) {
        container.innerHTML = '<p style="color:#888; text-align:center; padding:40px;">🌱 No plants yet. Add your first plant!</p>';
        return;
    }
    
    plants.forEach(p => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.description || 'No description'}</p>
            <button onclick="deletePlant('${p._id}')" style="
                background: #e74c3c; 
                color: white; 
                border: none; 
                padding: 6px 16px; 
                border-radius: 4px; 
                cursor: pointer;
                margin-top: 10px;
            ">Delete</button>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// 3. ADD NEW PLANT (POST to Backend)
// ==========================================
document.getElementById('addForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('plantName').value.trim();
    const description = document.getElementById('plantDesc').value.trim();
    
    if (!name) {
        alert('Please enter a plant name');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name, 
                description: description || 'No description' 
            })
        });
        
        if (!response.ok) throw new Error('Failed to add plant');
        const newPlant = await response.json();
        plants.push(newPlant);
        renderPlants();
        this.reset();
        console.log('✅ Plant added successfully:', newPlant.name);
    } catch (error) {
        console.error('❌ Failed to add plant:', error);
        alert('Failed to add plant. Please check if the server is running.');
    }
});

// ==========================================
// 4. DELETE PLANT (DELETE from Backend)
// ==========================================
async function deletePlant(id) {
    if (!confirm('Are you sure you want to delete this plant?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete plant');
        plants = plants.filter(p => p._id !== id);
        renderPlants();
        console.log('✅ Plant deleted successfully');
    } catch (error) {
        console.error('❌ Failed to delete plant:', error);
        alert('Failed to delete plant. Please check the server.');
    }
}

// ==========================================
// 5. LOAD PLANTS WHEN PAGE OPENS
// ==========================================
let plants = [];
loadPlants();