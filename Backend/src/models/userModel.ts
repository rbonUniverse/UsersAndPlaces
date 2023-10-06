import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IPlaceModel } from "./placeModel";

export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  image: string;
  password: string;
  places: IPlaceModel[];
}

export const userSchema = new mongoose.Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PlaceModel",
      },
    ],
  },
  {
    versionKey: false, // Don't add __v for new documents
  }
);

userSchema.plugin(uniqueValidator);

export const UserModel = mongoose.model<IUserModel>("User", userSchema);
