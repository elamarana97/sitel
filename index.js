const express=require('express');
const app =express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const users=require('./users')
const cors=require('cors');
const route = require('./router');
app.use(cors())

app.use('/', route)

app.listen(3000,()=>{
    console.log("listening at port 3000")
});
module.exports=app;