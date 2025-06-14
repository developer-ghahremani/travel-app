import { Query, type Models } from "appwrite";
import { type LoaderFunctionArgs } from "react-router";
import { appWriteConfig, appWriteDatabase } from "~/appwrite/config";
import TripDetailComponent from "~/components/trip-detail";
import TripItem from "~/components/trip-item";
import type { TripModel } from "~/models/trip.model";
import type { Route } from "./+types/trip-detail";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const trip = await appWriteDatabase.getDocument<Models.Document & TripModel>(
    appWriteConfig.databaseId,
    appWriteConfig.tripCollection,
    (params as { tripId: string }).tripId
  );
  const tripSuggestions = await appWriteDatabase.listDocuments<Models.Document & TripModel>(
    appWriteConfig.databaseId,
    appWriteConfig.tripCollection,
    [Query.equal("country", trip.country), Query.notEqual("$id", trip.$id), Query.limit(2)]
  );
  return { trip, tripSuggestions };
};

const ClientTripDetailPage = (props: Route.ComponentProps) => {
  return (
    <div className="mt-8">
      <TripDetailComponent tripDetail={props.loaderData.trip} />

      {props.loaderData.tripSuggestions.documents.length > 0 && (
        <div className="mt-4">
          <p className="font-bold text-xl">Popular Itineraries</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-4">
            {props.loaderData.tripSuggestions.documents.map((item) => (
              <TripItem trip={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTripDetailPage;
