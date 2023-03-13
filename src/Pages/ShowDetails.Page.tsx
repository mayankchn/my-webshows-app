import { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { showIdChangeAction } from "../actions/shows";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import LoadingSpinner from "../Components/LoadingSpinner";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { showCastSelector, showSelector, showsSelector } from "../selectors/shows";
import { State } from "../store";

type OwnProps = WithRouterProps;
type ShowDetailPageProps = ReduxProps & OwnProps

const placeHolderSummary = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam et eligendi, necessitatibus voluptatum consequatur harum dolore ex corrupti eaque, saepe maiores optio? Minima optio dignissimos, quam laudantium voluptate officiis fuga."

const placeHolderImage = "https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

const placeHolderImageCast = "https://cdn-icons-png.flaticon.com/512/225/225238.png?w=740&t=st=1678183245~exp=1678183845~hmac=ae8ef0a4a605546ce737e4697098fa063cc4c54d6b6a011df4933b5ff5b426cd"

const ShowDetailPage: FC<ShowDetailPageProps> = ({ id, show, cast, showIdChange }) => {

  useEffect(() => {
    showIdChange(id)
  }, [id])

  if (!show) {
    return <LoadingSpinner />
  }

  return (
    <div className="my-5 border flex flex-col gap-2">
      <Link to="/" className="underline text-red-500 font-medium self-start">Back</Link>
      <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
      <div className="flex gap-2 bg-gray-300 px-1 py-2 rounded-sm items-center">
        {show.genres.map((genre) => {
          return <GenrePill key={genre} name={genre} />
        })}
      </div>
      <div className="flex flex-col max-w-xl mx-auto gap-2 sm:flex-row sm:max-w-5xl">
        <img
          src={show.image?.medium || show.image?.original || placeHolderImage}
          alt=""
          className="object-cover object-center w-full aspect-square rounded-t-md h-full sm:h-72"
        />
        <div className="">
          <p dangerouslySetInnerHTML={{ __html: show.summary || placeHolderSummary }}></p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: {show.rating?.average ? <span className="text-gray-700">{show.rating.average}/10</span> : <span className="text-base font-semibold">not available</span>}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap gap-1">
          {cast.map((item) => {
            return <CastCard key={item.id} avatarLink={item.image?.medium || item.image?.original || placeHolderImageCast} name={item.name} />
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const id = +ownProps.params.show_id
  return {
    id,
    shows: showsSelector(state),
    show: showSelector(state)!,
    cast: showCastSelector(state),
  }
}
const mapDispatchToProps = {
  showIdChange: showIdChangeAction,
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default withRouter(connector(ShowDetailPage));
