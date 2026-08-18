// ===== 汉堡菜单切换 =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// ===== Hero轮播（自动切换） =====
const slides = [
    { h2: '让绿色融入生活', p: 'H₂O₂ 植物设计，为您打造会呼吸的空间' },
    { h2: '专业植物设计', p: '从家庭到商业空间，我们提供一站式解决方案' },
    { h2: '用心创造绿色', p: '每一株植物都承载着我们对自然的敬畏与热爱' }
];

let currentSlide = 0;
const heroSlide = document.querySelector('.hero-slide');

if (heroSlide) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        heroSlide.querySelector('h2').textContent = slides[currentSlide].h2;
        heroSlide.querySelector('p').textContent = slides[currentSlide].p;
    }, 4000);
}