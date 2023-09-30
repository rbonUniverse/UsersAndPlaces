import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../../components/PlaceList/PlaceList";

const DUMMY_PLACES: {
  _id: string;
  creatorId: string;
  title: string;
  description: string;
  image: string;
  address: string;
  location: { lat: number; lng: number };
}[] = [
  {
    _id: "p1",
    creatorId: "u1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the wold",
    image:
      "https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw",
    address: "20 W 34th st, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
  {
    _id: "p2",
    creatorId: "u1",
    title: "Romania",
    description: "One of the most famous sky scrapers in the wold",
    image:
      "https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw",
    address: "20 W 34th st, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
];

interface RouteParams {
  userId: string;
}

const UserPlaces: React.FC = () => {
  const { userId } = useParams<RouteParams>();
  const loadedPlaces = DUMMY_PLACES.filter(
    (place) => place.creatorId === userId
  );
  return <PlaceList placeItems={loadedPlaces} />;
};
export default UserPlaces;
