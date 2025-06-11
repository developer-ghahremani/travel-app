export interface TripModel {
  createdBy: string;
  name: string;
  description: string;
  estimatedPrice: number;
  duration: number;
  budget: string;
  travelStyle: string;
  country: string;
  groupType: string;
  bestTimeToVisit: string[];
  weatherInfo: string[];
  interests: string;
  tripImages: TripImage[];
  itinerary: Itinerary[];
  location: Location;
}
export interface TripImage {
  url: string;
  name: string;
  description: string;
}

export interface Itinerary {
  day: number;
  location: string;
  activities: { title: string; description: string }[];
}

export interface Location {
  city: string;
  openStreetMap: string;
  coordinates: number[];
}
