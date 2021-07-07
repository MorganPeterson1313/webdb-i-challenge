const express = require('express');
const router = express.Router();

const db = require('./data/dbConfig.js');


router.get('/', async (req, res) => {

        try{
            const accounts = await db.select('*').from('accounts');
            res.status(200).json(accounts);

        }catch (err){
            res.status(500).json({message:'error getting accounts', error: err})
        }

});


router.get('/:id', async (req, res) => {
        try{
            const {account} = await db.select('*').from('accounts').where('id');
            if (account){
                res.status(200).json(account);
            }else{
                res.status(404).json({message:"could not find the account with id"})
            }

        } catch (err){
            res.status(500).json({message:"failed to get account", error: err})
        }

});


router.post('/', async(req,res) =>{
    const accountData = req.body
        try{
            const account = await db('accounts').insert(accountData);
            res.status(201).json(account)
            
        }catch(err){
res.status(500).json({message:'could not add your account'})
        }


});

router.put('/:id', async(req,res) =>{
        const {id} = req.params;
        const changes = req.body;

    try{
        const count =await db('accounts').where('id' , '=' , id).update(changes);
        if (count){
            res.status(201).json({updated: count})
        }else{
            res.status(404).json({message:` could not find account ${id}` });
        }

    }catch(err){
        res.status(500).json({message: 'could not update account', error: err})
    }


});


router.delete('/', async(req,res) =>{
    const {id} = req.params;
    try{

        const count = await db('accounts').where({id}).del()
        db.remove(request.params.id)
            if(count) {
                res.status(200).json({deleted: count});
            }else{
                response.status(404).json({ message: `could not find account ${id}`})
            }


    }catch(err){
        res.status(500).json({message: 'could not delete account'})
    }


})














module.exports = router;