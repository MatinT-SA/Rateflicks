import { ClipLoader } from "react-spinners";

export function Loader() {
  return (
    <div className="loader">
      <ClipLoader size={80} color={"#68161c"} loading={true} />
    </div>
  );
}
