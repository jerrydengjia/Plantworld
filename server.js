// 1. 引入依赖
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 2. 使用中间件
app.use(cors());
app.use(express.json());

// 3. 连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/plantdb')
    .then(() => console.log('✅ 数据库连接成功！'))
    .catch(err => console.log('❌ 数据库连接失败：', err));

// 4. 定义植物数据模型（Schema）
const plantSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        default: '暂无描述'
    }
});

// 5. 创建植物模型
const Plant = mongoose.model('Plant', plantSchema);

// 6. CRUD API 接口
// GET - 获取所有植物
app.get('/api/plants', async (req, res) => {
    try {
        const plants = await Plant.find();
        res.json(plants);
    } catch (error) {
        res.status(500).json({ error: '获取数据失败' });
    }
});

// POST - 添加新植物
app.post('/api/plants', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: '植物名称是必填项' });
        }
        const newPlant = new Plant({ name, description });
        await newPlant.save();
        res.status(201).json(newPlant);
    } catch (error) {
        res.status(400).json({ error: '添加失败：' + error.message });
    }
});

// DELETE - 删除植物
app.delete('/api/plants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Plant.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: '植物不存在' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: '删除失败' });
    }
});

// 7. 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});