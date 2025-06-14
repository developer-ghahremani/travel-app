import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Query, type Models } from "appwrite";

import qs from "query-string";
import { useLocation, useNavigate, type LoaderFunctionArgs } from "react-router";
import { appWriteConfig, appWriteDatabase } from "~/appwrite/config";
import Pagination from "~/components/pagination";
import TripItem from "~/components/trip-item";
import type { TripModel } from "~/models/trip.model";
import { tripOptions } from "~/utils/constants";
import type { Route } from "./+types/trips";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { page = "1", orderBy, ...parsedQuery } = qs.parseUrl(request.url).query;

  const response = await fetch("https://restcountries.com/v3.1/region/europe?fields=name");
  const data = (await response.json()) as {
    name: {
      common: string;
      official: string;
    };
  }[];
  const appWriteFilter = [
    ...Object.keys(parsedQuery).map((item) => Query.equal(item, parsedQuery[item] as string)),
    Query.limit(8),
  ];

  if (page) appWriteFilter.push(Query.offset((+page - 1) * 8));
  if (orderBy === "priceDesc") appWriteFilter.push(Query.orderDesc("estimatedPrice"));
  if (orderBy === "priceAsc") appWriteFilter.push(Query.orderAsc("estimatedPrice"));

  const { documents, total } = await appWriteDatabase.listDocuments<Models.Document & TripModel>(
    appWriteConfig.databaseId,
    appWriteConfig.tripCollection,
    appWriteFilter
  );

  return { countries: data, trips: documents, total };
};

const Trips = (props: Route.ComponentProps) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const parsedQs = qs.parse(search);

  const onFilterChange = (filterObject: Object) => {
    let query = qs.parse(search);
    const keyValueFilter = Object.entries(filterObject);

    query[keyValueFilter[0]?.[0]] = keyValueFilter[0]?.[1];
    navigate(qs.stringifyUrl({ url: pathname, query }), { replace: true });
  };

  return (
    <div>
      <div className="flex items-center justify-between"></div>
      <div className="flex justify-between">
        <p>Filters</p>
        <div className="flex gap-2">
          <Button onClick={() => navigate(qs.stringifyUrl({ url: pathname }), { replace: true })}>
            Clear filters
          </Button>

          <DropDownList
            className="!w-[150px]"
            dataItemKey="value"
            itemRender={({}, item) => (
              <p
                onClick={() => {
                  navigate(qs.stringifyUrl({ url: "", query: { orderBy: item.dataItem.value } }));
                }}
                className="cursor-pointer">
                {item.dataItem.label}
              </p>
            )}
            data={[
              { label: "Price; lowest to highest", value: "priceAsc" },
              { label: "Price; highest to lowest", value: "priceDesc" },
            ]}
          />
        </div>
      </div>
      <div className="grid  lg:grid-cols-5 grid-cols-1 gap-2">
        <DropDownList
          label="Country"
          className="w-40"
          value={parsedQs.country}
          data={props.loaderData.countries}
          itemRender={({}, item) => (
            <p
              className="cursor-pointer"
              onClick={() => onFilterChange({ country: item.dataItem.name.common })}>
              {item.dataItem.name.common}
            </p>
          )}
        />
        {tripOptions.map((item) => (
          <DropDownList
            value={parsedQs[item.formKey]}
            className="w-40"
            label={item.caption}
            data={item.options}
            delay={100}
            onChange={(event) => onFilterChange({ [item.filterKey || item.formKey]: event.value })}
          />
        ))}
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 my-4 gap-2 min-h-[400px]">
        {props.loaderData.trips.map((trip) => (
          <TripItem navigateTo="client-side" trip={trip} />
        ))}
      </div>
      <Pagination
        onChange={(page) => {
          navigate(qs.stringifyUrl({ url: "", query: { ...parsedQs, page } }));
        }}
        total={props.loaderData.total}
        page={+(parsedQs.page as string) || 1}
        responseSize={props.loaderData.countries.length}
      />
    </div>
  );
};

export default Trips;
