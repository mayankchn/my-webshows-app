import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { Show } from "../models";

type ShowCardProps = {
  show:Show;
}

const placeHolderSummary = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam et eligendi, necessitatibus voluptatum consequatur harum dolore ex corrupti eaque, saepe maiores optio? Minima optio dignissimos, quam laudantium voluptate officiis fuga."

const placeHolderImage = "https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

const ShowCard:FC<ShowCardProps> = ({show}) => {
  return (
    <div className="flex flex-col gap-2 p-2 max-w-sm rounded-md shadow-md">
      <img
        src={show.image?.medium || show.image?.original || placeHolderImage}
        alt={show.name}
        className="object-cover object-center aspect-square w-full rounded-t-md h-72"
      />
      <div className="h-full flex flex-col justify-between px-2 gap-1">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p dangerouslySetInnerHTML={{__html:show.summary || placeHolderSummary}}></p>
        </div>
        <Link
          to={"/show/"+show.id}
          className="font-semibold tracking-wide uppercase text-sm text-gray-500 bg-gray-200 rounded-md p-3 w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
ShowCard.defaultProps={};
export default ShowCard;
