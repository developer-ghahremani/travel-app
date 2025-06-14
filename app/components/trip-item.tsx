import type { Models } from "appwrite";
import type { TripModel } from "~/models/trip.model";
import { pageNames } from "~/utils/pagenames";

type Props = { trip: TripModel & Models.Document; navigateTo?: "admin-side" | "client-side" };

const TripItem = ({ trip, navigateTo = "admin-side" }: Props) => {
  return (
    <div
      onClick={() =>
        window.open(
          navigateTo === "admin-side"
            ? pageNames.admin.trips.details + trip.$id
            : pageNames.trips.details + trip.$id,
          "_blank"
        )
      }
      key={trip.$id}
      className="border border-gray-200 rounded-2xl hover:shadow duration-200 cursor-pointer h-min">
      <div className="h-40 relative">
        <img
          src={trip.tripImages[1].url}
          alt=""
          className="w-full h-40  rounded-t-2xl object-cover"
        />
        <p className="bg-white px-3 text-xs py-1 absolute top-2 right-1 rounded-lg">
          {`$${trip.estimatedPrice}`}
        </p>
      </div>
      <div className="my-2 px-2">
        <p className="font-semibold text-nowrap overflow-ellipsis overflow-hidden">{trip.name}</p>
        <div className="flex justify-between items-center gap-2 mt-2 ">
          <p className="px-2 py-[1px] rounded-xl bg-blue-300 text-white text-sm">{trip.country}</p>
          <p className="px-2 py-[1px] rounded-xl bg-purple-300 text-white text-sm">
            {trip.travelStyle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripItem;
