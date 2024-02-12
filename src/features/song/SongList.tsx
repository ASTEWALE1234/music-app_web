import React, {useEffect} from 'react';
import {useDispatch, useSelector} from'react-redux';
import { RootState } from '../../store';
import { setSongs } from '../../songSlice';
import Button from '../../components/Button';
import { Song } from "../../songSlice";
import {  } from '../../songSlice';

const SongList:React.FC =()=>{

    const dispatch =useDispatch();
    const songs =useSelector((state:RootState)=>state.songs);
    useEffect(()=>{
        const songs: Song[] = [
            { _id: "1", title: "Song 1", artist: "Artist 1", album: "Album 1", genre: "Genre 1" },
            { _id: "2", title: "Song 2", artist: "Artist 2", album: "Album 2", genre: "Genre 2" },
            // Add more songs as needed
        ];
        dispatch(setSongs(songs));
    },[dispatch]);
    return (
<div>
    <h2>Song List</h2>
    <ul>
        {songs.map((song)=>(
            <li>
                {song.title} - {song.artist} -{song.album} - {song.genre}
            </li>
        ))}
    </ul>
</div>
    );
}