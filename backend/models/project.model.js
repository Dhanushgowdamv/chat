import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
name:{
    type:String,
    lowercase:true,
    required:true,
    trim:true,
    unique:[true,'project name shoul be unique'],
},
users:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
}
],

})

const project = mongoose.model('project',projectSchema);

export default project;