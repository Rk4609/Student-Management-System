import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase:true
  },
  gender: {
    type: String,
    enum:["Male","Female","Other"],
    required: true
  },
  standard:{
    type:String,
    required:true,
    lowercase:true
  },
  age:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  status:{
    type:String,
    enum:["Active","Inactive"],
    required:true
  }

},{timestamps:true})

export const Student = mongoose.model("Student", studentSchema)
