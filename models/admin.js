import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const adminSchema = new mongoose.Schema({
    email:{ type:String, required:true, trim:true },
    password:{ type:String, required:true, length:[{min:5,max:8}]},
    role:{ type:String, required:true, enum:['User','Admin'], default:'Admin'}
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Password comparison before login
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


adminSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;