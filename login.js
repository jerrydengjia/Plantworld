// =====================================================
// Login Functionality | 登录功能
// =====================================================

// Hardcoded user accounts (you can add more)
// 硬编码用户账号（你可以添加更多）
const users = [
    { username: 'admin', password: '123456' },
    { username: 'user', password: 'password' },
    { username: 'cho22', password: 'plant2026' }
];

// Get form and error display elements
// 获取表单和错误显示元素
const loginForm = document.getElementById('loginForm');
const errorDisplay = document.getElementById('loginError');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get input values | 获取输入值
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        // Validate: fields cannot be empty | 验证：字段不能为空
        if (!username || !password) {
            errorDisplay.textContent = '⚠️ Please enter both username and password.';
            errorDisplay.style.color = '#d9534f';
            return;
        }

        // Check if user exists | 检查用户是否存在
        const foundUser = users.find(user =>
            user.username === username && user.password === password
        );

        if (foundUser) {
            // Login success | 登录成功
            errorDisplay.textContent = '✅ Login successful! Redirecting...';
            errorDisplay.style.color = '#2d5a27';

            // Save login status to localStorage | 保存登录状态到本地存储
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);

            // Redirect to home page after 1 second | 1秒后跳转到首页
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            // Login failed | 登录失败
            errorDisplay.textContent = '❌ Invalid username or password. Please try again.';
            errorDisplay.style.color = '#d9534f';
        }
    });
}