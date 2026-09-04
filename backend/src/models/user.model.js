import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Password excluded by default, included only when explicitly selected with .select("+password")
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// Part_1: Hash password BEFORE saving into DB.
// Run this function automatically before a user document is saved
userSchema.pre("save", async function () {

    // Stop here if the password was not changed
    if (!this.isModified("password")) return;

    // Hash the plain-text password and replace it with the hashed version
    this.password = await bcrypt.hash(this.password, 10);
});

// Part_2: Compare candidate password with hashed password in DB.
// Add a custom method to the user schema for checking passwords
userSchema.methods.comparePassword = function (candidatePassword) {

    // Compare the entered password with the stored hashed password
    return bcrypt.compare(candidatePassword, this.password);
};



const userModel = mongoose.model('User', userSchema);



export default userModel;
