import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}
export interface SongSummary {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
interface GenreCount {
  _id: string;
  count: number;
}

interface ArtistCount {
  _id: string;
  count: number;
}

interface AlbumCount {
  _id: string;
  artist: string;
  numOfAlbums: number;
  numOfSongs: number;
}

export interface Album {
  _id: string;
  count: number;
}
interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  pageNumber: number,
  rowsPerPage: number,
  searchText:string;
  total:number;
  totalSongs: number;
  totalArtists:number;
  totalAlbums:number;
  totalGenres:number;

  genreCounts: GenreCount[];
  artistCounts: ArtistCount[];
  albumCount: AlbumCount[];
  albumCounts: Album[];
  backgroundColor:string[];
  //
}
const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  successMessage: null,
  pageNumber:0,
  rowsPerPage:5,
  searchText:"",
  total:0,
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,

  genreCounts: [],
  artistCounts: [],

  albumCount: [],
  albumCounts: [],
  backgroundColor:[],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      return state;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    removeSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    addSongSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    updateSongSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    searchSongs: (state, action: PayloadAction<string>) => {
      // Handle the search action here
    },
    //Total # of songs, artists, albums, genres
    setTotalSongs: (state, action: PayloadAction<number>) => {
      state.totalSongs = action.payload;
    },
    setTotalArtists: (state, action: PayloadAction<number>) => {
      state.totalSongs = action.payload;
    },
    setTotalAlbums: (state, action: PayloadAction<number>) => {
      state.totalSongs = action.payload;
    },
    setTotalGenres: (state, action: PayloadAction<number>) => {
      state.totalSongs = action.payload;
    },
    setBackgroundcolor: (state, action: PayloadAction<string[]>) => {
      state.backgroundColor = action.payload;
    },
    setGenreCounts: (state, action: PayloadAction<GenreCount[]>) => {
      state.genreCounts = action.payload;
    },
  
    setArtistCounts: (state, action: PayloadAction<ArtistCount[]>) => {
      state.artistCounts = action.payload;
    },
    //both songs and albums for each artist
    setAlbumCount: (state, action: PayloadAction<AlbumCount[]>) => {
      state.albumCount = action.payload;
    },
    //albums for each artist
    setAlbumCounts: (state, action: PayloadAction<Album[]>) => {
      state.albumCounts = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const {setTotalSongs,setTotalArtists,setTotalAlbums,setTotalGenres,setAlbumCount,setGenreCounts,setAlbumCounts,
  setSongs,
  addSong,
  updateSong,
  removeSong,
  setLoading,
  setError,
  addSongSuccess,
  deleteSongSuccess,
  updateSongSuccess,
  clearSuccessMessage,
  searchSongs,setPageNumber,setRowsPerPage,setSearchText,setTotal,setBackgroundcolor
} = songSlice.actions;
export default songSlice.reducer;
