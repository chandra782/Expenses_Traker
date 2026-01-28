const express=require('express');
const bcrypt=require('bcrypt');
const db=require('../db');

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {companyName,email,password}=req.body;

    db.get(
        'SELECT * FROM companies WHERE email = ?',[email],
        async(err,company)=>{
            if(company){
                return res.status(400).json({message:"company already exists"})
            }
            const hashedpassword=await bcrypt.hash(password,10);

            db.run(
                "INSERT INTO companies (company_name,email) values(?,?)",
                [companyName,email],

                function(){
                    const companyId=this.lastID;

                    db.run(
                        "INSERT INTO users(company_id,email,password,role) values(?,?,?,?)",
                        [companyId,email,hashedpassword,"admin"],
                        ()=>{
                            res.status(201).json({message:"company registered successfully"});
                        }
                    )
                }
            )
        }
    )

})

module.exports=router;