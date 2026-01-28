const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.post('/login',(req,res)=>{
    const{email,password}=req.body;

    db.get(
        'SELECT * FROM users WHERE email = ?',[email],
        async(err,user)=>{
            if(!user){
                return res.status(400).json({message:"INVALID CAREDENTIALS"})
            }
            const ismatch=await bcrypt.compare(password,user.password);

            if (!ismatch){
                return res.status(400).json({message:"INVALID CAREDENTIALS"})}
            
            const token = jwt.sign(
                {
                    userId:user.id,
                    companyId:user.company_id,
                    role:user.role
                },
                "SECRET-KEY",
                {expiresIn:"1d"}
            );
            res.json({token});
        }
    )
})

module.exports = router;