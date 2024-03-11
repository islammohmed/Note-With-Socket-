import mongoose from 'mongoose'

export function dbConnection (){ mongoose.connect('mongodb://127.0.0.1:27017/note-soket').catch(()=>{
    console.log('connection faild');
}).then(()=>{
    console.log('connection success');
})}
