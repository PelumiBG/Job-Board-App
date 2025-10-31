import mongoose from 'mongoose';

export const employerSchema = new mongoose.Schema({
    employerName:{ type:String, required:true },
    companyName:{ type:String, required:true, trim:true },
    email:{ type:String, required:true, trim:true },
    phone:{ type:String, required:true },
    password:{ type:String, required:true, length:[{min:5,max:8}]}
});

employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Password comparison before login
employerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


employerSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const Employer = mongoose.model("User", employerSchema);

export default Employer;