import { SvgIcon } from "@progress/kendo-react-common";
import {
  chevronDoubleLeftIcon as ArrowLeft,
  chevronDoubleRightIcon as ArrowRight,
  userOutlineIcon,
  chevronDownIcon,
} from "@progress/kendo-svg-icons";
import { useEffect, useState } from "react";
import { getCurrentUser } from "~/appwrite/utils";
import type { UserModel } from "~/models/user.model";
type Props = { isSidebarOpen: boolean; toggleSidebar: () => void };

const AdminNavbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between pr-4 border-b border-b-gray-200">
      <SvgIcon
        className="my-4 cursor-pointer"
        onClick={() => props.toggleSidebar()}
        icon={!props.isSidebarOpen ? ArrowRight : ArrowLeft}
      />
      <UserSection />
    </div>
  );
};

const UserSection = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [userState, setUserState] = useState<null | UserModel>(null);
  const toggleUserMenu = () => {
    setIsExpanded((s) => !s);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const user = await getCurrentUser();
      setUserState(user);
    } catch (error) {}
  };

  function handleLogout(): void {}

  return (
    <div
      className={`flex cursor-pointer items-center relative min-w-54 justify-between border border-gray-200 rounded-xl p-2 ${
        isExpanded ? "rounded-b-none border-b-0" : ""
      }`}
      onClick={toggleUserMenu}>
      <div className="flex  items-center gap-1">
        <SvgIcon icon={userOutlineIcon} />
        <p>{userState?.name}</p>
      </div>
      <SvgIcon icon={chevronDownIcon} />
      {isExpanded && (
        <div className="bg-white w-54 right-[-1px] absolute top-[40px] border-gray-200 rounded-b-xl border">
          <p className="p-2 cursor-pointer">Profile account</p>
          <p className="p-2 cursor-pointer">Transactions</p>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <p onClick={() => handleLogout()} className="p-2 cursor-pointer">
            Log out
          </p>
        </div>
      )}
    </div>
  );
};
export default AdminNavbar;
