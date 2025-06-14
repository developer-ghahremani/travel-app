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
import Pagination from "~/components/pagination";
import { stringifyUrl } from "node_modules/query-string/base";

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
    navigate(stringifyUrl({ url: pageNames.admin.trips.list, query: { page: item } }));
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-4 min-h-[500px]">
        {props.loaderData.trips.map((item) => (
          <TripItem trip={item} />
        ))}
      </div>

      <Pagination
        responseSize={props.loaderData.trips.length}
        page={+page}
        total={props.loaderData.total}
        onChange={(page) => handleNavigate(page)}
      />
    </div>
  );
};

export default TripList;
