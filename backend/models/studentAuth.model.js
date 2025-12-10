import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const studentAuthSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // avatar: {
    //   type: String, //cloudinary
    // },
    // coverImage:{
    //     type:String   //cloudinary
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// studentAuthSchema.pre("save",  function (next) {
//   if (!this.isModified("password")) return next();
//   this.password =  bcrypt.hash(this.password, 10);
//   next();
// });

studentAuthSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


studentAuthSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentAuthSchema.methods.generateAccessToken = function () {
   return jwt.sign(
        {
             _id:this._id,
              fullName:this.fullName,
             email:this.email,
             username:this.username
            
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
         }
)
}
studentAuthSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const StudentAuth = mongoose.model(
  "StudentAuth",
  studentAuthSchema
);
