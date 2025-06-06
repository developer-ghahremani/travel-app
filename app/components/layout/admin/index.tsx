import { Drawer, DrawerContent } from "@progress/kendo-react-layout";

import { connectorIcon, inboxIcon } from "@progress/kendo-svg-icons";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate, type LoaderFunctionArgs } from "react-router";
import { appWriteAccount } from "~/appwrite/config";
import { createUser, getGoogleImage, getUsers } from "~/appwrite/utils";
import { UserStatusEnum } from "~/models/user.model";
import AdminNavbar from "./navbar";

const AdminLayout = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsExpanded((s) => !s);
  };

  useEffect(() => {
    clientLoader();
  }, []);

  const clientLoader = async () => {
    try {
      const currentUser = await appWriteAccount.get();
      if (!currentUser.$id) navigate("/admin/auth");

      const { documents } = await getUsers([Query.equal("accountId", currentUser.$id)]);
      if (documents.length > 0) return null;

      const imageUrl = await getGoogleImage();
      await createUser({
        imageUrl,
        joinedAt: new Date(),
        email: currentUser.email,
        name: currentUser.name,
        accountId: currentUser.$id,
        status: UserStatusEnum.Admin,
      });
    } catch (error) {
      console.log(error, "Error occurred");
      navigate("/admin/auth");
    }
  };

  return (
    <Drawer
      mini
      className="h-screen"
      position="start"
      mode="push"
      expanded={isExpanded}
      onOverlayClick={toggleSidebar}
      items={[
        { text: "Home", svgIcon: inboxIcon },
        { text: "Settings", svgIcon: connectorIcon },
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
