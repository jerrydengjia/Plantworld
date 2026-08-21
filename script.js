// =====================================================
// 1. Hamburger Menu Toggle | 汉堡菜单切换
// =====================================================

const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// =====================================================
// 2. Hero Slideshow Auto-Rotation | 首页轮播自动切换
// =====================================================

const slides = [
    { h2: '让生活充满绿意', p: 'CHO22植物设计，为您打造会呼吸的空间' },
    { h2: '专业植物设计', p: '从家庭到商业空间，我们提供一站式解决方案' },
    { h2: '用心创造绿色', p: '每一株植物都承载着我们对自然的敬畏与热爱' }
];

let currentSlide = 0;
const heroSlide = document.querySelector('.hero-slide');

if (heroSlide) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        const h2 = heroSlide.querySelector('h2');
        const p = heroSlide.querySelector('p');
        if (h2) h2.textContent = slides[currentSlide].h2;
        if (p) p.textContent = slides[currentSlide].p;
    }, 4000);
}

// =====================================================
// 3. Plant Data Management | 植物数据管理（核心功能）
// =====================================================

// Initial plant data | 初始植物数据（模拟数据库）
let plants = [
    { id: 1, name: '🌵 仙人掌', description: '耐旱植物，适合懒人养护' },
    { id: 2, name: '🌿 绿萝', description: '净化空气能手，非常好养' },
    { id: 3, name: '🌸 樱花', description: '春季开花，美丽动人' },
    { id: 4, name: '🌻 向日葵', description: '向阳而生，充满希望' },
    { id: 5, name: '🌴 龟背竹', description: '网红植物，叶片独特' },
    { id: 6, name: '🎋 竹子', description: '象征坚韧与节节高升' }
];

// Get the plant list container | 获取植物列表容器
const plantList = document.getElementById('plantList');

// =====================================================
// 4. Render Plant Cards | 渲染植物卡片
// =====================================================

function renderPlants() {
    // If container doesn't exist, exit | 如果容器不存在，退出
    if (!plantList) return;

    // If no plants, show empty message | 如果没有植物，显示空状态提示
    if (plants.length === 0) {
        plantList.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:40px;color:#3d5a3d;">
                🌱 还没有植物，添加一株吧！ | No plants yet, add one!
            </p>
        `;
        return;
    }

    // Clear the container | 清空容器
    plantList.innerHTML = '';

    // Loop through plants and create cards | 遍历植物数据，生成卡片
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <h3>${plant.name}</h3>
            <p>${plant.description}</p>
            <button class="delete-btn" data-id="${plant.id}">🗑️ 删除 | Delete</button>
        `;
        plantList.appendChild(card);
    });

    // Bind delete events to all delete buttons | 给所有删除按钮绑定事件
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            if (confirm('确定要删除这株植物吗？ | Are you sure you want to delete this plant?')) {
                plants = plants.filter(p => p.id !== id);
                renderPlants(); // Re-render the list | 重新渲染列表
            }
        });
    });
}

// =====================================================
// 5. Add New Plant | 添加新植物
// =====================================================

const addForm = document.getElementById('addForm');

if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page refresh | 阻止页面刷新

        // Get input values | 获取输入值
        const nameInput = document.getElementById('plantName');
        const descInput = document.getElementById('plantDesc');

        const name = nameInput.value.trim();
        const description = descInput.value.trim() || '暂无描述 | No description';

        // Validate: name is required | 验证：名称为必填
        if (!name) {
            alert('⚠️ 请输入植物名称！ | Please enter a plant name!');
            return;
        }

        // Create new plant object | 创建新植物对象
        plants.push({
            id: Date.now(), // Use timestamp as unique ID | 用时间戳作为唯一ID
            name: name,
            description: description
        });

        // Re-render the list | 重新渲染列表
        renderPlants();

        // Clear the form | 清空表单
        addForm.reset();
        nameInput.focus();

        console.log('✅ 已添加植物 | Plant added:', { name, description });
    });
}

// =====================================================
// 6. Auto-Render on Page Load | 页面加载后自动渲染
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    renderPlants();
    console.log('🌿 CHO22 植物网站已加载完成 | CHO22 Plant website loaded successfully!');
    console.log('📊 当前植物数量 | Total plants:', plants.length);
});