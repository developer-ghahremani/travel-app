import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { arrowRightIcon, dashboardOutlineIcon } from "@progress/kendo-svg-icons";
import { Query, type Models } from "appwrite";
import { useNavigate } from "react-router";
import { appWriteConfig, appWriteDatabase } from "~/appwrite/config";
import MainFooter from "~/components/layout/main/footer";
import TripItem from "~/components/trip-item";
import type { TripModel } from "~/models/trip.model";
import { pageNames } from "~/utils/pagenames";
import type { Route } from "./+types/home";

export const clientLoader = async () => {
  const { documents } = await appWriteDatabase.listDocuments<Models.Document & TripModel>(
    appWriteConfig.databaseId,
    appWriteConfig.tripCollection,
    [Query.limit(5)]
  );
  return { trips: documents };
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home = (props: Route.ComponentProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative h-screen">
        <img
          src="assets/images/hero-img.png"
          className="h-screen w-full object-cover absolute"
          alt=""
        />
        <div className="h-screen w-full absolute bg-gradient-to-br z-10 from-white " />
        <div className="absolute w-full mx-2 md:!w-[64%] md:mx-[18%] top-[40px] z-20">
          <div className="flex justify-between items-center  px-4 py-1 ">
            <div className="flex items-center gap-2">
              <img src="assets/icons/logo.svg" alt="" />
              <p className="text-2xl font-semibold">Tourvista</p>
              <p></p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <img
                  alt=""
                  src="assets/images/david.webp"
                  className="object-cover w-10 h-10 rounded-full"
                />
                <p>Reza Ghahremani</p>
              </div>
              <SvgIcon
                icon={dashboardOutlineIcon}
                className="cursor-pointer"
                onClick={() => navigate(pageNames.admin.dashboard)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-[100px] w-[28rem]">
            <h1 className="text-[4rem] font-bold">Plan your trip with ease</h1>
            <p>
              Customize your trip with itinerary in minutes-- pick your destination, set your
              preferences, and explore with confidence
            </p>
            <Button className="w-70 !py-2 !bg-[#256FF1] !text-white">Get started</Button>
          </div>
        </div>
      </div>
      <div className="w-full md:!w-[64%] mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">Featured Travel Destinations</p>
            <p className="mt-2">
              Check out some of the best places you can visit around the world.
            </p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate({ pathname: pageNames.trips.list })}>
            <p className="text-primary-500 mb-1">Show more items</p>
            <SvgIcon icon={arrowRightIcon} color="#175cd3" />
          </div>
        </div>
        <div className="mt-4">
          <TripItem trip={props.loaderData.trips[0]} navigateTo="client-side" />
          <div className="grid grid-cols-2 gap-3 mt-2">
            {props.loaderData.trips.slice(1, 7).map((item) => (
              <TripItem trip={item} key={item.$id} navigateTo="client-side" />
            ))}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Home;
