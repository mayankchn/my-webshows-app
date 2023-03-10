import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { FC } from "react"
import { State } from "../store";
import { showsQueryChangeAction } from "../actions/shows";
import { connect, ConnectedProps } from "react-redux";
import { showsLoadingSelector, showsQuerySelector, showsSelector } from "../selectors/shows";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListPageProps = {} & ReduxProps

const ShowListPage: FC<ShowListPageProps> = ({ showsQueryChange, query, shows, loading }) => {

  const handleOnChange = (e: any) => {
    showsQueryChange(e.target.value)
  }

  return (
    <div className="mt-2">
      <SearchBar value={query} onChange={handleOnChange} />
      {loading ? <div className="max-w-screen-2xl mx-auto flex items-center justify-center h-screen ">
        <LoadingSpinner className="text-3xl" />
      </div> : <div className="max-w-sm mx-auto my-5 grid grid-cols-1 gap-2 sm:max-w-2xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
        {shows && shows.map((show) => {
          return <ShowCard key={show.id} show={show} />
        })}
      </div>}
    </div>
  );
}

const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
    loading:showsLoadingSelector(state),
  }
}

const mapDispatchToProps = {
  showsQueryChange: showsQueryChangeAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ShowListPage);
