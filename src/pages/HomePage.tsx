import { Bar, Line,Pie } from 'react-chartjs-2';
import {Chart, ArcElement, ChartOptions} from 'chart.js'
import { Table } from "@mui/material";
import { Song, setLoading, setSongs} from "../songSlice";
import { RootState,AppDispatch } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../sagas/songSaga";

import "./style.css";
import { SidebarData } from "./SidebarData";
import GenreCounts from './utils/GenreCounts';
interface CustomChartOptions extends ChartOptions {
  plugins: {
    legend: {
      position: 'right' | 'top' | 'bottom' | 'left' | 'center' | 'chartArea' | { [scaleId: string]: number } | undefined;
    };
  };
  layout: {
    padding: number;
  };
  responsive: boolean;
  maintainAspectRatio: boolean;
  height: number;
  width: number;
}

Chart.register(ArcElement);

const HomePage:React.FC = ()=>{

const dispatch =useDispatch();
const songs = useSelector((state: RootState) => state.songs);
const totalSongs = useSelector((state:RootState) => state.totalSongs);
const totalArtists = useSelector((state:RootState) => state.totalArtists);
const totalAlbums = useSelector((state:RootState) => state.totalAlbums);
const totalGenre = useSelector((state:RootState) => state.totalGenres);
const genreCount = useSelector((state:RootState) => state.genreCounts);
const albumcount = useSelector((state:RootState) => state.albumCount);
const songsInAlbum = useSelector((state:RootState) => state.albumCounts);
const backgroundColor = useSelector((state:RootState) => state.backgroundColor);


let labelsList: string[] = [];
let dataCount: number[] = [];
  useEffect(() => {
    
 

      dispatch({type:'OVER_ALL_STATISTICS'});
      labelsList=genreCount.map((item) => item._id);
      dataCount=genreCount.map((item) => item.count);
     
    
  }, []);
    const [totalCounts, setTotalCounts] = useState({
      songs: totalSongs,
      artists: totalArtists,
      albums: totalAlbums,
      genres: totalGenre,
    });
    const genreLabels = genreCount.map((item) => item._id);
    const genreCountsData = genreCount.map((item) => item.count);
    
    const genreData = {
      labels: genreLabels,
      datasets: [
        {
          label: 'My First Dataset',
          data: genreCountsData,
          backgroundColor:backgroundColor
        },
      ],
    };
 
return (
    <div className="parent">
      <div className="sidebar">
        <ul className="sidebarList">
          {SidebarData.map((value,key)=>{
            return (
              <li className="row"
              id={window.location.pathname==value.link? "active":""}
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
       {/* <div className="dashboard"><h1 className="dashboard-text">Dashboard</h1></div>
       <div className="table-sidebar"><h1 className="dashboard-text">Dashboard</h1></div> */}
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