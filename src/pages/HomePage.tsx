import {Chart, ArcElement} from 'chart.js'
import { RootState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { SidebarData } from "./SidebarData";
import GenreCounts from './utils/GenreCounts';


Chart.register(ArcElement);

const HomePage:React.FC = ()=>{

const dispatch =useDispatch();
const totalSongs = useSelector((state:RootState) => state.totalSongs);
const genreCount = useSelector((state:RootState) => state.genreCounts);
const albumcount = useSelector((state:RootState) => state.albumCount);
const songsInAlbum = useSelector((state:RootState) => state.albumCounts);


  useEffect(() => {
    
       dispatch({type:'OVER_ALL_STATISTICS'});
    
  }, [dispatch]);
  
 
return (
    <div className="parent">
      <div className="sidebar">
        <ul className="sidebarList">
          {SidebarData.map((value,key)=>{
            return (
              <li className="row"
              id={window.location.pathname===value.link? "active":""}
               key={key} onClick={()=>{window.location.pathname=value.link}}>
                {" "}
                <div id="icon">{value.icon}</div>
                <div id="title">
                  {value.title}
                </div>
              </li>
            )
          })}
        </ul>
        </div>
      <div className="container">
      <div>
     <div className='space-total-count'>
    

      <div className='card'>
        <h2>Number of Songs in Every Genre</h2>
        <GenreCounts />
      </div>
      <div className='totalCounts'>
        <h2 className='header-title'>Total Counts</h2>
        <table>
          <tbody>
            <tr>
              <td>Total Songs</td>
              <td>{totalSongs}</td>
            </tr>
            <tr>
              <td>Total Artists</td>
              <td>{albumcount.length}</td>
            </tr>
            <tr>
              <td>Total Albums</td>
              <td>{songsInAlbum.length}</td>
            </tr>
            <tr>
              <td>Total Genres</td>
              <td>{genreCount.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
      <div className='space-for-eachArtistAlbum'>
      <div className='songs-each-artist'>
        <h2 className='header-title'>Number of Songs & Albums Each Artist Has</h2>
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Songs</th>
              <th>Albums</th>
            </tr>
          </thead>
          <tbody>
            {albumcount.length>0? albumcount.map((artist, index) => (
              <tr key={index}>
                <td>{artist._id}</td>
                <td>{artist.numOfSongs}</td>
                <td>{artist.numOfAlbums}</td>
              </tr>
            )):<tr>No Data</tr>}
          </tbody>
        </table>
      </div>

      <div className='songs-each-album'>
        <h2 className='header-title'>Songs in Each Album</h2>
        <table>
          <thead>
            <tr>
              <th>Album</th>
              <th>Songs</th>
            </tr>
          </thead>
          <tbody>
            {songsInAlbum.length>0? songsInAlbum.map((album, index) => (
              <tr key={index}>
                <td>{album._id}</td>
                <td>{album.count}</td>
              </tr>
            )):<tr>
              <td>0</td>
              <td>0</td>
              </tr>}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  


        </div>
      <link />
    </div>
  );
}
export default HomePage;