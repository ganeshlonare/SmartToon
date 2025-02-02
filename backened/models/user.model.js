import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the name of your Kid"],
      minLength: [5, "name should be of minimum 5 letters"],
      maxLength: [50, "name should be of max 50 letters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
      // minLength:[8,"password should be of minimum 8 letters"],
      // maxLength:[12,"password should be of maximum 12 letters"],
      trim: true,
      select: false,
    },
    age: {
      type: Number,
      required: [true, "Please enter the age of your kid"],
      min: 0,
      max: 11,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    studyYear: {
      type: String,
      required: [true, "Please enter study year of the student"],
      enum: ["KG1", "KG2", "1ST", "2ND", "3RD", "4TH", "5TH"],
    },
    progress: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
        chapter: {
          type: String,
        }, // Chapter name or number
        page: {
          type: Number,
        }, // Current page number
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_SECRET_KEY_EXPIRY,
    },
  );
};

// compare password
userSchema.methods.comparePassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

//generate dynamic token (for reset password)
userSchema.methods.generatePasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = model("User", userSchema);

export default User;
