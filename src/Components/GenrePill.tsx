import {FC, memo } from "react";

type GenrePillProps = {
  name:string;
}

const GenrePill:FC<GenrePillProps> = ({name}) => {
  return <p className="font-semibold">{name}</p>;
};
GenrePill.defaultProps={};
export default memo(GenrePill);
