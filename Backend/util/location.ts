import axios from "axios";
import HTTPError from "../src/models/http-error";

interface AddressCoordinates {
  lat: number;
  lng: number;
}

const API_KEY: string = "YOUR_API_KEY";

const getCoordinatesForAddress = async (
  address: string
): Promise<AddressCoordinates> => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HTTPError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

export default getCoordinatesForAddress;
