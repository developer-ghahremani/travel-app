import { SvgIcon } from "@progress/kendo-react-common";
import {
  chevronDoubleLeftIcon as ArrowLeft,
  chevronDoubleRightIcon as ArrowRight,
} from "@progress/kendo-svg-icons";
type Props = { isSidebarOpen: boolean; toggleSidebar: () => void };

const AdminNavbar = (props: Props) => {
  return (
    <div className="flex justify-between py-4 border-b border-b-gray-200">
      <SvgIcon
        onClick={() => props.toggleSidebar()}
        icon={!props.isSidebarOpen ? ArrowRight : ArrowLeft}
      />
    </div>
  );
};

export default AdminNavbar;
