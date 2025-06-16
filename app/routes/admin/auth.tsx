import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { googleIcon } from "@progress/kendo-svg-icons";
import { loginWithGoogle } from "~/appwrite/utils";
type Props = {};

const AdminAuth = (props: Props) => {
  return (
    <div className="relative">
      <img
        src="/assets/images/auth-img.webp"
        className="absolute w-full h-screen object-cover z-10"
        alt=""
      />
      <div className=" w-full h-screen z-20 absolute bg-gradient-to-tr from-white"></div>
      <div className="flex items-center justify-center h-screen absolute  top-0 left-0 z-30 w-full">
        <div className="shadow-lg mx-4 md:w-[30%] p-4 rounded-xl bg-white">
          <div className="flex items-center gap-2 justify-center">
            <img src="/public/assets/icons/logo.svg" alt="" />
            <h1>Travel app</h1>
          </div>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quas illum deleniti
            aliquam.
          </p>
          <div className="w-full h-[1px] bg-gray-200 my-2"></div>
          <div className="flex ">
            <Button onClick={loginWithGoogle} themeColor="light" className="flex-1">
              <SvgIcon icon={googleIcon} className="mr-2" />
              Log in with google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
