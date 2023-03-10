import { ImSpinner } from "react-icons/im";
import {FC} from "react"

type LoadingSpinnerProps = {
  className?:string;
}

const LoadingSpinner:FC<LoadingSpinnerProps> = ({ className }) => {
  return <ImSpinner className={"animate-spin "+className} />;
};
LoadingSpinner.defaultProps={}
export default LoadingSpinner;
