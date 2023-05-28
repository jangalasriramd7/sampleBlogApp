const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogApp', {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log("Connection has established successfully "); 
}).catch((err) => {
       
console.log("Connection has ended with Error : " + err);
});

module.exports = mongoose;
