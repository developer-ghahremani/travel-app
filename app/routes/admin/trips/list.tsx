import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router";
import { pageNames } from "~/utils/pagenames";

type Props = {};

const TripList = (props: Props) => {
  const navigate = useNavigate();
  function handleCreateTripPage(): void {
    navigate(pageNames.admin.trips.add);
  }

  return (
    <div>
      <div className="flex justify-between items-center ">
        <p>Trips</p>
        <Button onClick={() => handleCreateTripPage()}>Create a new trip</Button>
      </div>
    </div>
  );
};

export default TripList;
