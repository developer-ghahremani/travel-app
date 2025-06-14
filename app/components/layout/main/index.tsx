import { Outlet } from "react-router";
import MainFooter from "./footer";
import MainNavbar from "./navbar";

type Props = {};

const MainLayout = (props: Props) => {
  return (
    <div>
      <MainNavbar />
      <div className="main-container">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
