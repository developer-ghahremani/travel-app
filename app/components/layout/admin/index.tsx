import { Drawer, DrawerContent } from "@progress/kendo-react-layout";

import type { DrawerSelectEvent } from "@progress/kendo-react-layout";
import { connectorIcon, inboxIcon } from "@progress/kendo-svg-icons";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router";
import { appWriteAccount } from "~/appwrite/config";
import { createUser, getGoogleImage, getUsers } from "~/appwrite/utils";
import { UserStatusEnum } from "~/models/user.model";
import { pageNames } from "~/utils/pagenames";
import AdminNavbar from "./navbar";

export const meta = () => [{ title: "Admin dashboard" }];

export async function clientLoader() {
  try {
    const currentUser = await appWriteAccount.get();
    if (!currentUser.$id) return redirect("/admin/auth");

    const { documents } = await getUsers([Query.equal("accountId", currentUser.$id)]);
    if (documents.length > 0) return { user: documents[0] };

    const imageUrl = await getGoogleImage();
    const newUser = {
      imageUrl,
      joinedAt: new Date(),
      email: currentUser.email,
      name: currentUser.name,
      accountId: currentUser.$id,
      status: UserStatusEnum.Admin,
    };
    await createUser({
      imageUrl,
      joinedAt: new Date(),
      email: currentUser.email,
      name: currentUser.name,
      accountId: currentUser.$id,
      status: UserStatusEnum.Admin,
    });
    return { user: newUser };
  } catch (error) {
    console.log(error, "Error occurred");
    return redirect("/admin/auth");
  }
}

const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(() => window.outerWidth < 600);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((s) => !s);
  };

  function handleOnSelect(event: DrawerSelectEvent): void {
    if (event.itemIndex === 0) navigate(pageNames.admin.dashboard);
    else if (event.itemIndex === 1) navigate(pageNames.admin.users);
    else if (event.itemIndex === 2) navigate(pageNames.admin.trips.list);
  }

  return (
    <Drawer
      mini={!isMobile}
      className="h-screen"
      position="start"
      mode={!isMobile ? "push" : "overlay"}
      expanded={isExpanded}
      onOverlayClick={toggleSidebar}
      onSelect={handleOnSelect}
      items={[
        {
          text: "Home",
          svgIcon: inboxIcon,
          selected: pathname === "/",
        },
        {
          text: "Users",
          svgIcon: connectorIcon,
          selected: pathname === pageNames.admin.users,
        },
        {
          text: "Trips",
          svgIcon: connectorIcon,
          selected: pathname === pageNames.admin.trips.list,
        },
      ]}>
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
