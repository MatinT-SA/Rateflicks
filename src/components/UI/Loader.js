import { ClipLoader } from "react-spinners";

export function Loader() {
  return (
    <div className="loader">
      <ClipLoader size={80} color={"#6741d9"} loading={true} />
    </div>
  );
}
