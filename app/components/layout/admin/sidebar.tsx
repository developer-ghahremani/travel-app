import { Drawer, DrawerContent, DrawerNavigation } from "@progress/kendo-react-layout";
import React, { useState } from "react";
import {
  inboxIcon,
  calendarIcon,
  heartIcon,
  linkIcon,
  bellIcon,
  menuIcon,
} from "@progress/kendo-svg-icons";
import { Button } from "@progress/kendo-react-buttons";

type Props = {};

const AdminSidebar = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  function handleClick(): void {
    setIsExpanded((s) => !s);
  }

  return (
    <Drawer
      // mini
      position="start"
      mode="push"
      expanded={isExpanded}
      onOverlayClick={handleClick}
      items={[{ text: "residam", svgIcon: inboxIcon }]}>
      <DrawerContent>
        <Button onClick={() => handleClick()}>Toggle the drawer state</Button>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminSidebar;
