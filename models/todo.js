var mongoose = require('mongoose');
const todoSchema=new mongoose.Schema({
    chat:{
        type:String,
        require:true
    }
});

module.exports=mongoose.model("chat",todoSchema);