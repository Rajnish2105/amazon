const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { Users } = require('./db');
const zod = require("zod");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
const passwordSchema = zod.string().min(8);
const validation = (req,res,next)=>{
    const { error } = passwordSchema.safeParse(req.body.password);
    if (error) {
        return res.status(400).json({ message: "Password must be 8 letters" });
    }
    next();
}
app.post("/signup",validation,(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        res.json({
            message : "User and password field is required"
        })
    }
    const existingUser = Users.findOne({username}).exec();
    if (existingUser.length>0) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    bcrypt.hash(password,10,async(err,hash)=>{
        if(err){
            return res.status(500).json({ message: 'Error hashing password.' });
        }
       await Users.create({
            username : username,
            password : hash
        })
        res.status(201).json({ message: 'User created successfully.' });

    })
});
app.post("/signin",validation,async (req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        res.json({
            message : "User and password field is required"
        })
    }
    const nonexistingUser = await Users.findOne({username});
    if (!nonexistingUser) {
        return res.status(409).json({ message: 'User dont exists.' });
    }
    const user = await Users.findOne({username});
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }
    res.status(200).json("ok");

})




app.listen(3000);