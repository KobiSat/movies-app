import mongoose from 'mongoose'
import validator from 'validator'
import bcryptond from 'bcryptjs'
import crypto from 'crypto'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'User must have a name']
    },
    email:{
        type: String,
        required: true,
        unique: [true, 'Email already registered, please login'],
        validate:{
            // validator: function(){return this.email.match('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')},
            validator: function(){return validator.isEmail(this.email)},
            message: 'Please provide a valid email address.',
        },
    },
    password:{
        type: String,
        minLength: [8, "Password must be over 8 characters"],
        required: [true, "User must have a valid password"],
        select:false
    },
    confirmPassword:{
        type: String,
        minLength: [8, "Password must be over 8 characters"],
        required: [true, "Retype the password please"],
        select:false,
        validate:{
            validator: function(){return this.password === this.confirmPassword},
            message: 'Confirm password doesn`t match'
        }
    },
    role:{
        type:String,
        enum:{
            values:[`free`, `premium`, `admin`],
            message:'the role can only be free, premium or admin'
        },
        default: `free`
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    }//,{versionKey: false}
)

//Ducument middleware = THIS refers to a current document before the save into DB 
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        this.confirmPassword = undefined
    }
    next()
})

userSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew)
        this.passwordChangedAt = Date.now()-1000 //שומרים שניה אחורה כדי שלא יגיד שהשינוי קרה אחרי החיבור.
    next()
})

userSchema.methods.checkPassword = async function(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword)
}
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto
        .randomBytes(32)
        .toString("hex")
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    this.passwordResetExpires = Date.now() + 5*60*1000
    return resetToken
}

const User = mongoose.model("User", userSchema)

export default User