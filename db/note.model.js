import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:String,
    description:String
})

export const  noteModel =  mongoose.model('noteModel',Schema)


