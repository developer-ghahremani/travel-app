import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { DropDownList, type ListItemProps } from "@progress/kendo-react-dropdowns";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { plusIcon } from "@progress/kendo-svg-icons";
import { Formik, type FormikHelpers } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { number, object, string } from "yup";
import type { Route } from "./+types/add";
import { pageNames } from "~/utils/pagenames";

interface TripInfo {
  country: string;
  groupType: string;
  travelStyle: string;
  interest: string;
  budgetEstimate: string;
  numberOfDays: number;
}
const selectors = [
  {
    caption: "Group type",
    formKey: "groupType",
    options: ["Solo", "Couple", "Family", "Friends", "Business"],
  },
  {
    caption: "Travel style",
    formKey: "travelStyle",
    options: [
      "Relaxed",
      "Luxury",
      "Adventure",
      "Cultural",
      "Nature & Outdoors",
      "City Exploration",
    ],
  },
  {
    caption: "Interest",
    formKey: "interest",
    options: [
      "Food & Culinary",
      "Historical Sites",
      "Hiking & Nature Walks",
      "Beaches & Water Activities",
      "Museums & Art",
      "Nightlife & Bars",
      "Photography Spots",
      "Shopping",
      "Local Experiences",
    ],
  },
  {
    caption: "Budget estimate",
    formKey: "budgetEstimate",
    options: ["Budget", "Mid-range", "Luxury", "Premium"],
  },
];
type Props = {};

export const loader = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/region/europe?fields=name,flag,latlng,maps,cca2"
  );
  const data = (await response.json()) as {
    name: {
      common: string;
      official: string;
    };
    latlng: [number, number];
    flag: string;
    code: string;
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
  }[];

  return data.map((country: any) => ({
    name: country.name.common,
    flag: country.cca2,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMap,
  }));
};

const AddTrip = (props: Route.ComponentProps) => {
  const navigate = useNavigate();
  const handleSubmit = async (values: TripInfo, formikHelpers: FormikHelpers<TripInfo>) => {
    try {
      await fetch("/admin/api/create-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: values.country,
          numberOfDays: values.numberOfDays,
          travelStyle: values.travelStyle,
          interests: values.interest,
          budget: values.budgetEstimate,
          groupType: values.groupType,
          userId: "100256",
        }),
      });

      navigate(pageNames.admin.trips.list);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold text-xl">Add a new trip</p>
          <p className="mt-2">View and generate AI travel plans</p>
        </div>
        <Button size="large" disabled>
          <SvgIcon icon={plusIcon} />
          Generate A trip
        </Button>
      </div>
      <Formik<TripInfo>
        initialValues={{
          country: "",
          groupType: "",
          travelStyle: "",
          interest: "",
          budgetEstimate: "",
          numberOfDays: 6,
        }}
        validationSchema={object({
          country: string().required("Country is required"),
          groupType: string().required("Group type is required."),
          travelStyle: string().required("Travel style is required."),
          interest: string().required("Interest is required."),
          budgetEstimate: string().required("Budget is required."),
          numberOfDays: number().required("Days is required."),
        })}
        onSubmit={handleSubmit}>
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <form
            className="lg:w-[70%] lg:mx-auto border border-gray-200 p-4 mt-4 rounded-lg "
            onSubmit={handleSubmit}>
            <>
              <p>Country</p>
              <DropDownList
                value={values.country}
                className="!mt-2"
                data={props.loaderData}
                itemRender={({}, item: ListItemProps) => (
                  <div
                    className="flex items-center gap-2 mt-2 mx-1 cursor-pointer"
                    onClick={() => setFieldValue("country", item.dataItem.name)}>
                    <img
                      className="rounded-full"
                      src={`https://flagsapi.com/${item.dataItem.flag}/shiny/32.png`}></img>
                    <p>{item.dataItem.name}</p>
                  </div>
                )}
              />
              {errors.country && <p className="text-red-700 text-xs">{errors.country}</p>}
            </>
            <div className="mt-2">
              <p>The number of day</p>

              <NumericTextBox
                min={0}
                max={20}
                value={values.numberOfDays}
                className="!mt-2"
                fillMode="solid"
                placeholder="please enter the number of day"
              />
              {errors.numberOfDays && <p className="text-red-700 text-xs">{errors.numberOfDays}</p>}
            </div>

            {selectors.map((item) => (
              <div className="mt-2">
                <p>{item.caption}</p>
                <DropDownList
                  onChange={({ value }) => {
                    setFieldValue(item.formKey, value);
                  }}
                  value={values[item.formKey as keyof TripInfo]}
                  className="!mt-1"
                  data={item.options}
                />
                {errors?.[item.formKey as keyof TripInfo] && (
                  <p className="text-red-700 text-xs">
                    {errors?.[item.formKey as keyof TripInfo] || ""}
                  </p>
                )}
              </div>
            ))}

            <Button className="mt-2 w-full py-2" themeColor="info" type="submit">
              Create A trip
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddTrip;
