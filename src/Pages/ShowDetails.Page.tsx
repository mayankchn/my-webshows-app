import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCast, getShow } from "../api";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import LoadingSpinner from "../Components/LoadingSpinner";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { Cast, Show } from "../models/index";

type ShowDetailPageProps = WithRouterProps;

const placeHolderSummary = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam et eligendi, necessitatibus voluptatum consequatur harum dolore ex corrupti eaque, saepe maiores optio? Minima optio dignissimos, quam laudantium voluptate officiis fuga."

const placeHolderImage = "https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

const placeHolderImageCast = "https://cdn-icons-png.flaticon.com/512/225/225238.png?w=740&t=st=1678183245~exp=1678183845~hmac=ae8ef0a4a605546ce737e4697098fa063cc4c54d6b6a011df4933b5ff5b426cd"

const ShowDetailPage: FC<WithRouterProps> = ({ params }) => {
  const id = +params.show_id;

  const [show,setShow] = useState<Show>({})
  const [cast,setCast] = useState<Cast[]>([])
  // console.log('show is ',show)
  console.log('cast is ',cast)
  const [showLoading,setShowLoading] = useState<boolean>(true)
  const [castLoading,setCastLoading] = useState<boolean>(true)

  useEffect(()=>{
    getShow(id).then((item)=>{
      setShow(item)
      setShowLoading(false)
    }).catch((error)=>{
      setShow({})
      setShowLoading(false)
    })

    getCast(id).then((item)=>{
      setCast(item)
      setCastLoading(false)
    }).catch((error)=>{
      setCast([])
      setCastLoading(false)
    })
    
  },[id])


  if(showLoading){
    return <LoadingSpinner className=""/>
  }

  return (
    <div className="my-5 border flex flex-col gap-2">
      <Link to="/" className="underline text-red-500 font-medium self-start">Back</Link>
      <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
      <div className="flex gap-2 bg-gray-300 px-1 py-2 rounded-sm items-center">
        {show.genres.map((genre)=>{
          return <GenrePill key={genre} name={genre} />
        })}
      </div>
      <div className="flex flex-col max-w-xl mx-auto sm:flex-row sm:max-w-5xl">
        <img
          src={show.image?.medium || show.image?.original || placeHolderImage}
          alt=""
          className="object-cover object-center w-full aspect-square rounded-t-md h-full sm:h-72"
        />
        <div className="">
          <p>{show.summary || placeHolderSummary}</p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: {show.rating?.average ? <span className="text-gray-700">{show.rating.average}/10</span> : <span className="text-base font-semibold">not available</span>}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap gap-1">
          {cast ? cast.map((item)=>{
            return <CastCard key={item.id} avatarLink={item.image?.medium || item.image?.original || placeHolderImageCast} name={item.name} />
          }):<LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ShowDetailPage);
