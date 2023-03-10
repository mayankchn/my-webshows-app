import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import {useState,useEffect} from "react"
import { searchShows } from "../api";
import { Show } from "../models";
import LoadingSpinner from "../Components/LoadingSpinner";

function ShowListPage() {
  const [query,setQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [shows,setShows] = useState<Show[]>([])

  console.log('shows: ',shows)

  const handleOnChange = (e:any) => {
    setQuery(e.target.value)
  }

  useEffect(()=>{
    searchShows(query).then((items)=>{
      setShows(items)
      setLoading(false)
    }).catch((error)=>{
      setShows([])
      setLoading(false)
    })
  },[query])
  
  if(loading){
    return <LoadingSpinner className=""/>
  }

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

export default ShowListPage;
