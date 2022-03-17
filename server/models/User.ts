import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model("User", userSchema)