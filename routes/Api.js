var express = require('express');
var router = express.Router();

// const User = require('../models/users');
const Distributors = require('../models/distributor');
const Fruits = require('../models/fruits');


router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;
        const newDistributor = new Distributors({
            name: data.name
        });
        const result = await newDistributor.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "THEM THANH CONG",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "LOI, THEM KHONG THANH CONG",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/Add-fruit', async (req, res) => {
    try {
        const data = req.body;
        const newFruits = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            imge: data.imge,
            dessription: data.dessription,
            id_distributor: data.id_distributor
        });
        const result = await newFruits.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "THEM THANH CONG",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "LOI, THEM KHONG THANH CONG",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/get-list-fruit', async (req, res, next) => {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "message": "DANH SACH FRUIT",
            "data": data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Lỗi, không thể lấy danh sách trái cây",
            data: []
        });
    }
});
router.get('/get-fruit-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Fruits.findById(id).populate('id_distributor');
        res.json({
            "status": 200,
            "message": "DANH SACH FRUIT",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})
router.get('/get-list-fruit-in-price', async (req, res) => {
    try {
        const { price_start, price_end } = req.query;
        const query = { price: { $gte: price_start, $lte: price_end } };
        const data = await Fruits.find(query, 'name quantity price image status  description id_ditributor')
            .populate('id_distributor')
            .sort({ quantity: -1 })
            .skip(0)
            .limit(2);
        if (data.length > 0) {
            res.json({
                "status": 200,
                "message": "Lấy dữ liệu thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "message": "Lấy dữ liệu thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Lỗi server" });
    }
});
router.put('/update-fruit-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body;
        const updateFruit = await Fruits.findById(id)
        let result = null;
        if (updateFruit) {
            updateFruit.name = data.name ?? updateFruit.name;
            updateFruit.quantity = data.quantity ?? updateFruit.quantity;
            updateFruit.price = data.price ?? updateFruit.price;
            updateFruit.status = data.status ?? updateFruit.status;
            updateFruit.image = data.image ?? updateFruit.image;
            updateFruit.description = data.description ?? updateFruit.description;
            updateFruit.id_distributor = data.id_distributor ?? updateFruit.id_distributor;
            result = await updateFruit.save();
        }
        if (result) {
            res.json({
                "status": 200,
                "message": "CAP NHAT THANH CONG",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "LOI, CAP NHAT KHONG THANH CONG",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
router.put('/update-users-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body;
        const updateUsers = await User.findById(id)
        let result = null;
        if (updateUsers) {
            updateUsers.username = data.username ?? updateUsers.username;
            updateUsers.password = data.password ?? updateUsers.password;
            updateUsers.email = data.email ?? updateUsers.email;
            updateUsers.name = data.name ?? updateUsers.name;
            updateUsers.avatar = data.avatar ?? updateUsers.avatar;
            updateUsers.available = data.available ?? updateUsers.available;
            result = await updateUsers.save();
        }
        if (result) {
            res.json({
                "status": 200,
                "message": "CAP NHAT THANH CONG",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "LOI, CAP NHAT KHONG THANH CONG",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;

