const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/authPrac');
        console.log("connected to mongodb.");
    } catch (err) {
        console.log(err.message);
    }
}

mongoose.connection.on('connected', ()=> {
    console.log("mongoose connected");
})

mongoose.connection.on('error', (err)=> {
    console.log(err.message);
})

mongoose.connection.on('disconnected', ()=> {
    console.log("mongoose disconnected.");
})

process.on('SIGINT', async ()=> {
    await mongoose.connection.close()
    process.exit(0);
})

module.exports = connectDB;