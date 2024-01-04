const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


const User = require('./models/user')

const uri = 'mongodb+srv://yazanmmh:Lafanda2004@cluster0.rap661n.mongodb.net/?retryWrites=true&w=majority'
const salt = bcrypt.genSaltSync(10)
const secret = 'e97bb1792f1b9c295135ec1a3b2b609bdffa2a9e2d24078139859b50c97e4918f82e0d9ffe410680e5b10c9dfc19dbf5b4f07a9cb02ca8d8e0d78d2fa235a1b6'

mongoose.connect(uri)
    .then(() => console.log("connected"))
    .catch(err => console.error(err));


app.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    try {
        const newUser = await User.create({
            email,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(newUser)
    } catch (err) {
        res.status(400).json(err)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userInfo = await User.findOne({ email });
        if (!userInfo) {
            return res.status(401).json({ message: '*Invalid email or password' });
        }
        const rightPassword = bcrypt.compareSync(password, userInfo.password);
        if (!rightPassword) {
            return res.status(401).json({ message: '*Invalid email or password' });
        }
        const token = jwt.sign({ userId: userInfo._id }, secret, {
            expiresIn: '365d'
        });
        res.json({ token,userId: userInfo._id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(4000, function () {
    console.log("running");
})