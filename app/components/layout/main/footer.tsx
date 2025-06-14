import { useNavigate } from "react-router";

type Props = {};

const MainFooter = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mt-20">
      <div className="py-8 main-container">
        <div className="flex justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/", { replace: true })}>
            <img src="/assets/icons/logo.svg" className="w-8 h-8" alt="" />
            <p className="text-2xl font-semibold">Tourvisto</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
            </div>
            <a href="mailto:r.ghahremani1991@gmail.com">r.ghahremani1991@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
