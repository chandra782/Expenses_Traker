const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/',auth,(req , res)=>{
    const {category,amount,date}=req.body
    const {companyId,userId}=req.user;

    db.run(
        'INSERT INTO expences (company_id,user_id,category,amount,date) VALUES (?,?,?,?.?)',
        [companyId,userId,category,amount,date],
        ()=>{
            res.json({message:"Expense added"})
        }
    )
} )

module.exports = router;