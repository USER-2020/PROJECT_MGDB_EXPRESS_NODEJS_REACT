const mongoose =require('mongoose');

// const URI = 'mongodb://localhost/project';

// mongoose.connect(URI)
//     .then(db => console.log('DB is connected'))
//     .catch(err => console.error(err));

mongoose.connect("mongodb+srv://JuanFernandoZuluaga:tSChsAq0uhxAJej1@appreactv1.vpfncrd.mongodb.net/AppReactV1")
    .then(db => console.log('DB is conected'))
module.exports = mongoose;
