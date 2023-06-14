const mongoose =require('mongoose');
const tasksschema=new mongoose.Schema({
    "title":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true
    },
    "timeanddate":{
        type:String,
        required:true
    },
    "status":{
        type:String,
        default:"On progress"
    }
})

module.exports=tasksmodel=mongoose.model('tasksmodel', tasksschema)