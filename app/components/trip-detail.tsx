import type { TripModel } from "~/models/trip.model";
import { SvgIcon } from "@progress/kendo-react-common";
import { calendarDateIcon, locationsIcon } from "@progress/kendo-svg-icons";

type Props = { tripDetail: TripModel };

const TripDetailComponent = (props: Props) => {
  return (
    <div className="flex flex-col ">
      <h1 className="font-semibold text-3xl">{props.tripDetail.name}</h1>
      <div className="flex mt-3 gap-8">
        <div className="flex gap-2 items-center ">
          <SvgIcon icon={calendarDateIcon} />
          <p>{props.tripDetail.duration + " days plan"}</p>
        </div>
        <div className="flex gap-2 items-center">
          <SvgIcon icon={locationsIcon} />
          <p>{props.tripDetail.location.city + "," + props.tripDetail.country}</p>
        </div>
      </div>
      <div className="w-full flex mt-4 h-[600px] gap-2">
        <img
          alt=""
          src={props.tripDetail.tripImages[0].url}
          className="w-[60%] h-[600px] object-cover"
        />
        <div className="flex flex-1 h-[600px] flex-col gap-2">
          <img
            alt=""
            src={props.tripDetail.tripImages[1].url}
            className="flex-1 h-[296px] object-cover"
          />
          <img
            alt=""
            src={props.tripDetail.tripImages[2].url}
            className="flex-1 h-[296px] object-cover"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <p className="bg-red-200 text-red-800 px-4 rounded-2xl">{props.tripDetail.travelStyle}</p>
        <p className="bg-blue-200 text-blue-800 px-4 rounded-2xl">{props.tripDetail.interests}</p>
        <p className="bg-green-200 text-green-800 px-4 rounded-2xl">{props.tripDetail.groupType}</p>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            {props.tripDetail.duration + `-Day ${props.tripDetail.country} Adventure`}
          </h2>
          <p>
            {`${props.tripDetail.travelStyle}, ${props.tripDetail.interests}, ${props.tripDetail.groupType}, ${props.tripDetail.budget}`}
          </p>
        </div>
        <p className="text-xl font-semibold">{"$" + props.tripDetail.estimatedPrice}</p>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mt-4"></div>

      <div className="mt-4">
        <p>{props.tripDetail.description}</p>
        {props.tripDetail.itinerary.map((item) => (
          <div className="mt-4">
            <p className="font-semibold text-lg">{`Day ${item.day}: ${item.location}`}</p>
            {item.activities.map((activity) => (
              <p className="ml-8 mt-1"> {activity.description}</p>
            ))}
          </div>
        ))}
        <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
      </div>

      <div className="mt-4">
        <p className="font-semibold">Best time to travel:</p>
        <div className="mt-2">
          {props.tripDetail.bestTimeToVisit.map((item) => (
            <p className="ml-8 mt-2">{item}</p>
          ))}
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Weather info:</p>
        <div className="mt-2">
          {props.tripDetail.weatherInfo.map((item) => (
            <p className="ml-8 mt-2">{item}</p>
          ))}
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
      </div>
    </div>
  );
};

export default TripDetailComponent;
