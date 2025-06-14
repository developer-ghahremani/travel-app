import { SvgIcon } from "@progress/kendo-react-common";
import { dashboardOutlineIcon, logoutIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router";
import { pageNames } from "~/utils/pagenames";

type Props = {};

const MainNavbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="py-3 main-container">
        <div className="flex justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/", { replace: true })}>
            <img src="/assets/icons/logo.svg" className="w-8 h-8" alt="" />
            <p className="text-2xl font-semibold">Tourvisto</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/assets/images/david.webp" className="w-10 h-10 rounded-full" alt="" />
              <p>Reza</p>
            </div>
            <SvgIcon
              className="cursor-pointer"
              icon={dashboardOutlineIcon}
              onClick={() => navigate(pageNames.admin.dashboard)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
