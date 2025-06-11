import { Button } from "@progress/kendo-react-buttons";
import { Query, type Models } from "appwrite";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router";
import { appWriteConfig, appWriteDatabase } from "~/appwrite/config";
import type { TripModel } from "~/models/trip.model";
import { pageNames } from "~/utils/pagenames";
import type { Route } from "./+types/list";

import lodash from "lodash";
import TripItem from "~/components/trip-item";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const page = qs.parse(request.url.split("?")?.[1])?.page || 1;

  const { documents, total } = await appWriteDatabase.listDocuments<Models.Document & TripModel>(
    appWriteConfig.databaseId,
    appWriteConfig.tripCollection,
    [Query.limit(8), Query.offset((+page - 1) * 8)]
  );
  return { trips: documents, total };
};

const TripList = (props: Route.ComponentProps) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const page = qs.parse(search)?.page || 1;

  const handleCreateTripPage = () => {
    navigate(pageNames.admin.trips.add);
  };

  const handleNavigate = (item: number) => {
    window.open(`${pageNames.admin.trips.list}?page=${item}`, "_blank");
  };

  const handleDetail = (id: string) => {
    navigate(pageNames.admin.trips.details + id);
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <p className="text-2xl">Trips</p>
          <p>View and generate AI plans</p>
        </div>
        <Button onClick={() => handleCreateTripPage()}>Create a new trip</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-4">
        {props.loaderData.trips.map((item) => (
          <TripItem onClick={() => handleDetail(item.$id)} trip={item} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p
          onClick={() => +page !== 1 && handleNavigate(+page - 1)}
          className={`border rounded-lg border-gray-300 px-3 py-1 ${
            +page === 1 ? "" : "cursor-pointer"
          }`}>
          Previous
        </p>
        <div className="flex gap-2">
          {lodash.range(1, Math.ceil(props.loaderData.total / 8) + 1).map((item: number) => (
            <p
              onClick={() => handleNavigate(+page + 1)}
              className="border rounded-lg border-gray-300 px-3 py-1 cursor-pointer"
              key={item}>
              {item}
            </p>
          ))}
        </div>
        <p
          onClick={() => handleNavigate(+page + 1)}
          className="border rounded-lg border-gray-300 px-3 py-1 cursor-pointer">
          Next
        </p>
      </div>
    </div>
  );
};

export default TripList;
