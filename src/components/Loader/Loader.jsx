import { InfinitySpin } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <InfinitySpin width="200" color="#3f51b5" />
    </div>
  );
};

export default Loader;
