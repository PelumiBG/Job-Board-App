import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name:{ type:String, required:true, trim:true},
        username:{ type:String, required:true, unique:true, trim:true },
        email:{ type:String, required:true, unique:true, lowercase:true, trim:true },
        password:{ type:String, required:true, number:true, unique:true, minlength:8},
        phone:{ type:String, required:true, number:true },
        role:{ type:String, required:true, enum:['Candidate','Employer'], default:'User'}
    },
    {timestamps:true}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Password comparison before login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};
const User = mongoose.model("User", userSchema);

export default User;