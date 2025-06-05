import { Drawer, DrawerContent } from "@progress/kendo-react-layout";

import { useState } from "react";
import { Outlet } from "react-router";
import AdminNavbar from "./navbar";
import { homeIcon } from "@progress/kendo-svg-icons";

type Props = {};

const AdminLayout = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggleSidebar = () => {
    setIsExpanded((s) => !s);
  };
  return (
    <Drawer
      mini
      className="h-screen"
      position="start"
      mode="push"
      expanded={isExpanded}
      onOverlayClick={toggleSidebar}
      items={[{ text: "residam", svgIcon: homeIcon }]}>
      <DrawerContent>
        <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isExpanded} />
        <div className="overflow-y-auto h-[calc(100vh-50px)] p-4">
          <Outlet />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminLayout;
