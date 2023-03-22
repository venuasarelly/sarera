const express = require('express')
const mongoose = require('mongoose');
const newData = require('./model');

const app = express();
app.use(express.json())
mongoose.connect('mongodb+srv://venu:VENU@cluster0.dt57vkn.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>console.log('db connected')
).catch(err => console.log(err))


app.post('/addata',async(req,res)=>{
    const {username} = req.body;
    try{
    const newdata = new newData({username});
    await newdata.save();
    return res.json(await newData.find())

    }
    catch(err){
        console.log(err.message);
    }
})
app.get('/alldata',async(req,res)=>{
    

    try{
      const allnames = await newData.find();
      return res.json(allnames);
    }
    catch(err){
        console.log(err.message);
    }
})
app.get('/alldata/:name',async(req,res)=>{
    try{
        const name = req.params.name;
      const Data = await newData.findOne({username : name});
      return res.json(Data);
    }
    catch(err){

    }
})
app.get('/',(req,res)=>{
    res.send('hello worwld');
})
app.listen(1234,()=>console.log('server is running....'))