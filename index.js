const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user') ;
const contactRouter = require('./routes/contact')
const cors = require("cors")
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json());
app.use("/contact", contactRouter)
app.use("/admin", adminRouter);
app.use("/user",  userRouter)


var listener = app.listen(process.env.PORT, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});