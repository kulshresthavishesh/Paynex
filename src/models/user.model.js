const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is required'],
        trim:true,
        lowercase:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please fill a valid email address'],
        unique:[true,"email already exists"]
    },
    name:{
        type:String,
        required:[true, 'Name is required'],
        trim:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        trim:true,
        minlength:[6, 'Password must be at least 6 characters long'],
        select:false
    }

},
{
    timestamps:true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    else{
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();  
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

