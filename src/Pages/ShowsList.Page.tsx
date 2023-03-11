import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import {useState, FC} from "react"
import { Show } from "../models";
import LoadingSpinner from "../Components/LoadingSpinner";
import { State } from "../store";
import { showsLoadedAction, showsQueryChangeAction } from "../actions/shows";
import { connect } from "react-redux";
import { showsQuerySelector, showsSelector } from "../selectors/shows";

type ShowListPageProps = {
  showsLoaded:(shows:Show[])=>void;
  showsQueryChange:(query:string)=>void;
  query:string;
  shows:Show[];
}

const ShowListPage:FC<ShowListPageProps> = ({showsQueryChange,query,shows}) => {
  // const [query,setQuery] = useState<string>("")
  // const [loading, setLoading] = useState<boolean>(true)
  // const [shows,setShows] = useState<Show[]>([])

  const handleOnChange = (e:any) => {
    showsQueryChange(e.target.value)
  }

  // useEffect(()=>{
  //   searchShows(query).then((items)=>{
  //     showsLoaded(items)
  //     setLoading(false)
  //   }).catch((error)=>{
  //     setLoading(false)
  //   })
  // },[query])
  
  // if(loading){
  //   return <LoadingSpinner className=""/>
  // }

  return (
    <div className="mt-2">
      <SearchBar value={query} onChange={handleOnChange} />
      <div className="max-w-sm mx-auto my-5 grid grid-cols-1 gap-2 sm:max-w-2xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
        {shows && shows.map((show)=>{
          return <ShowCard key={show.id} show={show} />
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state:State) => {
  return {
      query:showsQuerySelector(state),
      shows:showsSelector(state),
  }
}

const mapDispatchToProps = {
  // showsLoaded:showsLoadedAction,
  showsQueryChange:showsQueryChangeAction,
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowListPage);
