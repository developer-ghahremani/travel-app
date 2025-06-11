import type { Route } from "./+types/detail";
import { Query, type Models } from "appwrite";
import { pageNames } from "~/utils/pagenames";
import TripItem from "~/components/trip-item";
import type { TripModel } from "~/models/trip.model";
import TripDetailComponent from "~/components/trip-detail";
import { useNavigate, type LoaderFunctionArgs } from "react-router";
import { appWriteConfig, appWriteDatabase } from "~/appwrite/config";

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

const TripDetailPage = (props: Route.ComponentProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto lg:w-[60%]">
      <TripDetailComponent tripDetail={props.loaderData.trip} />

      {props.loaderData.tripSuggestions.documents.length > 0 && (
        <div className="mt-4">
          <p className="font-bold text-xl">Popular Itineraries</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-4">
            {props.loaderData.tripSuggestions.documents.map((item) => (
              <TripItem
                trip={item}
                onClick={() => {
                  window.open(pageNames.admin.trips.details + item.$id, "_blank");
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
