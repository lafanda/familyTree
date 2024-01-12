const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


const User = require('./models/user')
const Tree = require('./models/tree')
const Member = require('./models/member')

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
    const {email, password} = req.body;
    try {
        const userInfo = await User.findOne({email});
        if (!userInfo) {
            return res.status(401).json({message: '*Invalid email or password'});
        }
        const rightPassword = bcrypt.compareSync(password, userInfo.password);
        if (!rightPassword) {
            return res.status(401).json({message: '*Invalid email or password'});
        }
        const token = jwt.sign({userId: userInfo._id}, secret, {
            expiresIn: '365d'
        });
        res.json({token, userId: userInfo._id, email});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.post("/portal", async (req, res) => {
    const {familyName, id} = req.body;

    try {
        const admins = await User.findById(id)
        const roots = []
        const users = []
        const newTree = await Tree.create({
            familyName,
            roots,
            admins,
            users,
        })
        res.json(newTree)
    } catch (err) {
        console.log(err);
    }
})

// Assuming Express and your Tree model are already imported

app.get('/portal', async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({message: "User ID is required"});
        }

        const trees = await Tree.find({admins: userId}).sort({ createdAt: 1 });

        if (trees.length === 0) {
            return res.status(404).json({message: "No trees found for this user"});
        }

        res.json(trees);
    } catch (error) {
        console.error('Error fetching trees', error);
        res.status(500).json({message: "Internal Server Error"});
    }
});


app.post('/member', async (req, res) => {
    const { treeId, name, attributes, children } = req.body;

    if (!treeId || !name || attributes.deceased === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {

        const newMember = await Member.create({name, attributes, children})

        // Add the member object to the tree's roots array
        const updatedTree = await Tree.findByIdAndUpdate(treeId,
            { $push: { roots: newMember._id } },
            { new: true, runValidators: true }
        );

        if (!updatedTree) {
            return res.status(404).json({ message: "Tree not found" });
        }

        return res.status(201).json({ message: "Member created successfully and added to tree", data: newMember });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while creating the member" });
    }
});

// app.get('/member', async (req, res) => {
//     console.log("test2")
//     try {
//         const treeId = req.query.treeId;
//         if (!treeId) {
//             return res.status(400).json({message: "User ID is required"});
//         }
//
//         const members = await Tree.findById(treeId).select('roots').sort({ createdAt: 1 });
//
//         if (members.length === 0) {
//             return res.status(404).json({message: "No roots found for this user"});
//         }
//
//         res.json(members.roots);
//     } catch (error) {
//         console.error('Error fetching trees', error);
//         res.status(500).json({message: "Internal Server Error"});
//     }
// });

app.post("/member/child", async (req, res) =>{
    const {memberId, name, attributes, children} = req.body

    try{
        const newChild = await Member.create({ name, attributes, children });

        await Member.findByIdAndUpdate(memberId,
            { $push: { children: newChild._id } },
            { new: true, runValidators: true }
        );
    } catch (e) {
        console.log(e)
    }
})


async function fetchMemberTree(memberId) {
    const member = await Member.findById(memberId);
    if (!member || member.children.length === 0) {
        return {
            name: member.name,
            attributes: member.attributes,
            children: []
        };
    }

    const children = await Promise.all(
        member.children.map(childId => fetchMemberTree(childId))
    );

    return {
        name: member.name,
        attributes: member.attributes,
        children: children
    };
}


app.get('/member/:id', async (req, res) => {
    try {
        const treeId = req.params.id;

         const tree = await Tree.findById(treeId)

        const treeData = await fetchMemberTree(tree.roots[0]);
        res.json(treeData);
    } catch (error) {
        console.error('Error fetching tree:', error);
        res.status(500).send('Error fetching tree data');
    }
});



app.listen(4000, function () {
    console.log("running");
})

