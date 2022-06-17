const express = require('express');
const { append } = require('express/lib/response');
const mongoose =require('mongoose');

// const URI = 'mongodb://localhost/project';

// mongoose.connect(URI)
//     .then(db => console.log('DB is connected'))
//     .catch(err => console.error(err));


const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));

//Connect to Atlas
mongoose.connect("mongodb+srv://JuanFernandoZuluaga:tSChsAq0uhxAJej1@appreactv1.vpfncrd.mongodb.net/AppReactV1")
    .then(db => console.log('DB is conected'))
    .catch(err => console.log(err));
module.exports = mongoose;


//Used Statics Files
// if(process.env.NODE_ENV === 'mode production'){

//     app.use(express.static('src/public'));
//     app.get("*", (req, res =>{
//         res.sendFile((__dirname + "/src/public/index.html"));
//     })
// }
 
//Change port
let port  =  process.env.PORT;
if (port == null ||  port ==""){
        port = 5000;
}


//Conected to another port
app.listen(port, function(){
    console.log ('DB running');
})