const express = require('express');
const Message = require("../models/Message");
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/',  auth, permit('admin'), async (req, res, next) => {
    try {
        const messages = await Message.find().sort({_id: -1});
        return res.send(messages);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
       const messageData = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            text: req.body.text,
        };

        const message = new Message(messageData);
        await message.save();
        return res.send(message);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);
        await Message.deleteOne(message);
        return res.send({message: 'OK!'});

    } catch (e) {
        next(e);
    }
});

module.exports = router;
