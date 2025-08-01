import mongoose from 'mongoose'

export let connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        
        console.log('DB connected successfully');
        
    } catch(err){
        console.log(err);
    }
}
