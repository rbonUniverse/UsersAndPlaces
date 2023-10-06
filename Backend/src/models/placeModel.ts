import mongoose from "mongoose";
import { IUserModel } from "./userModel";

export interface IPlaceModel extends mongoose.Document {
  creatorId: IUserModel;
  title: string;
  description: string;
  image: string;
  address: string;
  location: { lat: number; lng: number };
}

export const placeSchema = new mongoose.Schema<IPlaceModel>(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    versionKey: false, // Don't add __v for new documents
  }
);

export const PlaceModel = mongoose.model<IPlaceModel>("Place", placeSchema);
