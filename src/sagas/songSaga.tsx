import { takeLatest, call, put, delay } from "redux-saga/effects";
import axios from "axios";
import {
  setSongs,
  addSong,
  updateSong,
  removeSong,
  setLoading,
  addSongSuccess,
  deleteSongSuccess,
  updateSongSuccess,
  clearSuccessMessage,
  setPageNumber,
  setRowsPerPage,
  setSearchText,
  setTotal,
  setTotalSongs,
  setTotalArtists,
  setTotalAlbums,
  setTotalGenres,
  setAlbumCount,
  setGenreCounts,
  setAlbumCounts,
  setBackgroundcolor,
} from "../songSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export function* fetchSongs(
  action: PayloadAction<{
    pageIndex: number;
    pageSize: number;
    searchText: string;
  }>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const response = yield call(
      axios.get,
      `https://test-project-by-astewal.onrender.com/api/songs?search_text=${action.payload.searchText}&page_size=${action.payload.pageSize}&page_index=${action.payload.pageIndex}`
    );
    // const formateSong=yield response.json();
    yield put(setSongs(response.data.songs));
    yield put(setTotal(response.data.total));
  } catch (error) {
    console.error("Error in fetching songs", error);
  } finally {
    yield put(setLoading(false));
  }
}
function* addSongSaga(
  action: ReturnType<typeof addSong>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const response = yield call(
      axios.post,
      "https://test-project-by-astewal.onrender.com/api/songs",
      action.payload
    );
    if (response) {
      yield put(addSongSuccess("Song added successfully"));
      yield put(addSong(response.data));
    }
  } catch (error) {
    console.error("Error in adding song", error);
  } finally {
    yield put(setLoading(false));
  }
}
function* deleteSongSaga(
  action: ReturnType<typeof removeSong>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const songId = action.payload;

    const response = yield call(
      axios.delete,
      `https://test-project-by-astewal.onrender.com/api/songs/${songId}`
    );
    if (response) {
      yield put(deleteSongSuccess("Song deleted successfully"));

      yield put(removeSong(songId));
    }
  } catch (error) {
    console.error("Error in adding song", error);
  } finally {
    yield put(setLoading(false));
  }
}
function* updateSongSaga(
  action: ReturnType<typeof updateSong>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    console.log("payload", action.payload);
    console.log("id", action.payload._id);
    const id = action.payload._id;
    const response = yield call(
      axios.patch,
      `https://test-project-by-astewal.onrender.com/api/songs/${id}`,
      action.payload
    );
    if (response) {
      yield put(updateSongSuccess("Song updated successfully"));

      yield put(updateSong(response.data));
    }
  } catch (error) {
    console.error("Error in adding song", error);
  } finally {
    yield put(setLoading(false));
  }
}

function* clearSuccessMessageSaga() {
  yield delay(2000); // Clear the success message after 5 seconds
  yield put(clearSuccessMessage());
}

function* searchTextChange(action: ReturnType<typeof setSearchText>) {
  yield put(setSearchText(action.payload));
}
function* pageIndexChange(action: ReturnType<typeof setPageNumber>) {
  yield put(setPageNumber(action.payload));
}
function* PageSizechange(action: ReturnType<typeof setRowsPerPage>) {
  yield put(setRowsPerPage(action.payload));
}
function* overAllStatistics(): Generator<any, void, any> {
  yield put(setLoading(true));
  const response = yield call(
    axios.get,
    `https://test-project-by-astewal.onrender.com/api/songs/totals`
  );
  console.log("all statistics areee:::", response);

  yield put(setTotalSongs(response.data.totalSongs));
  yield put(setTotalArtists(response.data.artistCounts.length));
  yield put(setTotalAlbums(response.data.songInAlbum.length));
  yield put(setTotalGenres(response.data.genreCounts.length));
  yield put(setGenreCounts(response.data.genreCounts));
  yield put(setAlbumCount(response.data.albumCount));
  yield put(setAlbumCounts(response.data.songInAlbum));
  const backgroundColors: string[] = [];
  for (let i = 0; i < response.data.albumCount.length; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    backgroundColors.push(color);
  }
  yield put(setBackgroundcolor(backgroundColors));
  yield put(setLoading(false));
  // yield put(setTotalSongs(action.payload));
}

function* watchSongSaga() {
  yield takeLatest("GET_SONGS", fetchSongs);
  yield takeLatest("ADD_SONG", addSongSaga);
  yield takeLatest("DELETE_SONG", deleteSongSaga);
  yield takeLatest("UPDATE_SONG", updateSongSaga);
  yield takeLatest("REMOVE_MESSAGE", clearSuccessMessageSaga);
  yield takeLatest("SEARCH_TEXT", searchTextChange);
  yield takeLatest("PAGE_INDEX", pageIndexChange);
  yield takeLatest("PAGE_SIZE", PageSizechange);
  //statistics

  yield takeLatest("OVER_ALL_STATISTICS", overAllStatistics);
}
export default watchSongSaga;
