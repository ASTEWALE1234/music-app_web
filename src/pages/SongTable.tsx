import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Song, SongSummary } from "@/songSlice";
import { Button, styled } from "@mui/material";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import EditIcon from "@mui/icons-material/Edit";
import { SidebarData } from "./SidebarData";


type Order = "asc" | "desc";


export default function SongTable() {
  const dispatch = useDispatch();
  const page = useSelector((state:RootState) => state.pageNumber);
  const rowsPerPage = useSelector((state:RootState) => state.rowsPerPage);
  const searchText = useSelector((state:RootState) => state.searchText);
  const songState = useSelector((state: RootState) => state.songs);
  const total = useSelector((state: RootState) => state.total);
  
  const successMessage = useSelector(
    (state: RootState) => state.successMessage
  );


  const [dense, setDense] = React.useState(false);
  const [songs, setSongs] = React.useState(songState);
 



  let rows: Song[];
  React.useEffect(() => {

    dispatch({ type: "GET_SONGS", payload:{pageIndex:page,pageSize:rowsPerPage,searchText:searchText}});

  }, [searchText, page, rowsPerPage]);
  rows = songs;
  
React.useEffect(()=> {
  setSongs(songState)
}, [songState])

  const newMemberAddBtn = document.querySelector(
    ".addMemberBtn"
  ) as HTMLElement | null;
  const darkBg = document.querySelector(".dark_bg") as HTMLElement | null;
  const popupForm = document.querySelector(".popup") as HTMLElement | null;
  const submitBtn = document.querySelector(".submitBtn") as HTMLElement | null;
  const closeBtn = document.querySelector(".closeBtn") as HTMLElement | null;
  const modalTitle = document.querySelector(
    ".modalTitle"
  ) as HTMLElement | null;
  const popupFooter = document.querySelector(
    ".popupFooter"
  ) as HTMLElement | null;
  const form = document.querySelector("form") as HTMLFormElement | null;
 

  
  if (newMemberAddBtn != null) {
    newMemberAddBtn!.addEventListener("click", () => {
      setIsEdit(false); // Set the mode to add
      clearPopupFields();
      submitBtn!.innerHTML = "Submit";
      modalTitle!.innerHTML = "Fill the Form";
      popupFooter!.style.display = "block";
      darkBg!.classList.add("active");
      popupForm!.classList.add("active");
    });
  }

  if (closeBtn != null) {
    closeBtn!.addEventListener("click", () => closePopupForm());
  }
  const closePopupForm = () => {
    darkBg!.classList.remove("active");
    popupForm!.classList.remove("active");
    form!.reset();
  };
  const clearPopupFields = () => {
    setSong({ _id: "", title: "", artist: "", album: "", genre: "" });
  };
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Song>("title");
  const [selected, setSelected] = React.useState<readonly string[]>([]);


  const handleRequestSort = (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof Song
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleCheckboxClick = (id: string, song: Song) => {
    
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    setSong(song);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row._id); // Assuming _id is the unique identifier for each row
      setSelected(newSelected);
    } else {
      setSelected([]); // Clear the selection if the checkbox is unchecked
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch({type:"PAGE_INDEX",payload:newPage})
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({type:"PAGE_SIZE",payload:event.target.value})
    dispatch({type:"PAGE_INDEX  ",payload:0})
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  

  const [song, setSong] = React.useState<Song>({
    _id: "",
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [songDetail, setSongDetail] = React.useState<SongSummary>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [isEdit, setIsEdit] = React.useState<boolean>(false); // State to track whether it's an edit or add operation
 

  const handleChange =
    (prop: keyof Song) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSong({ ...song, [prop]: event.target.value });
    };

  React.useEffect(() => {
    if (isEdit) {
      modalTitle!.innerHTML = "update the Form";
      popupFooter!.style.display = "block";
      darkBg!.classList.add("active");
      popupForm!.classList.add("active");
    }
  }, [song]); // Log the updated song state whenever it changes

  const handleEdit = (selectedSong: Song) => {
    console.log("selectedSong::", selectedSong);
    setIsEdit(true); // Set the mode to edit
    setSong({ ...selectedSong }); // Set the selected song to populate the popup fields
   
    
  };
  const handleSubmit = () => {
    if (isEdit) {
      console.log("data to be updated", song);
      // If in edit mode, call the update song saga
      dispatch({ type: "UPDATE_SONG", payload: song });
      dispatch({ type: "REMOVE_MESSAGE" });
      closePopupForm();
    } else {
      // If not in edit mode, call the add song saga
      console.log("data to song", song);
      setSongDetail({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
      });
      console.log("songDetail to be insert", songDetail);
      dispatch({
        type: "ADD_SONG",
        payload: {
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
        },
      });
      closePopupForm();
      dispatch({ type: "GET_SONGS", payload:{pageIndex:page,pageSize:rowsPerPage,searchText:searchText}});
      dispatch({ type: "REMOVE_MESSAGE" });
    }
  };
  
  const handleDelete = (selectedSong: Song) => {
    dispatch({ type: "DELETE_SONG", payload: selectedSong._id });
    dispatch({ type: "REMOVE_MESSAGE" });
  };
 
  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
   dispatch({type:"SEARCH_TEXT", payload:event.target.value})
  };

  

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
        <header>
          <div className="filterEntries">
            <div className="entries"> <h1>Music List</h1>
            </div>

            <div className="filter">
              <label htmlFor="search">Search:</label>
              <input
                type="search"
                name=""
                id="search"
                placeholder="Enter title/name/album/genre"
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="addMemberBtn">
            <button>Add New Artist</button>
          </div>
        </header>
        <div className="boxContainer">
        <Box sx={{ width: "100%", backgroundColor: 'gray' }} className="boxContainer">
          <Paper sx={{ width: "100%", mb: 2 }} className="tableContainer">
            <EnhancedTableToolbar
              numSelected={selected.length}
              songToDelete={song}
            />
            <TableContainer className="tableContainer">
              <Table
                sx={{ minWidth: 900 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {songs.length > 0 ? (
                  songs.map((row) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${row._id}`;

                    return (
                      <TableRow>
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) =>
                              handleCheckboxClick(row._id, row)
                            }
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.title}
                        </StyledTableCell>
                        <StyledTableCell >{row.artist}</StyledTableCell>
                        <StyledTableCell >{row.album}</StyledTableCell>
                        <StyledTableCell >{row.genre}</StyledTableCell>
                        <TableCell >
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEdit(row)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ):(
                  <TableRow>
                  <TableCell colSpan={4} align="center">No items to display</TableCell>
                </TableRow>
                )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25,50,100]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
        </div>
        <div className="snackbar">
        <h1></h1>
        <h2>{successMessage}</h2>
      </div>
        <div className="dark_bg">
          <div className="popup">
            <header>
              <h2 className="modalTitle">Fill the Form</h2>
              <button className="closeBtn">&times;</button>
            </header>

            <div className="body">
              <form action="#" id="myForm">
                <div className="inputFieldContainer">
                  <div className="form_control">
                    <div className="form_control">
                      <label htmlFor="title">Title</label>
                      <input
                        onChange={(e) => handleChange("title")(e)} // Call handleChange with the "title" property
                        value={song.title} // Set the initial value of the input to the title property of song
                        type="text"
                        name=""
                        id="title"
                        required
                      />
                    </div>
                  </div>

                  <div className="form_control">
                    <div className="form_control">
                      <label htmlFor="artist">Artist Name</label>
                      <input
                        onChange={(e) => handleChange("artist")(e)} // Call handleChange with the "title" property
                        value={song.artist} // Set the initial value of the input to the title property of song
                        type="text"
                        name=""
                        id="title"
                        required
                      />
                    </div>
                  </div>

                  <div className="form_control">
                    <div className="form_control">
                      <label htmlFor="album">Album:</label>
                      <input
                        onChange={(e) => handleChange("album")(e)} // Call handleChange with the "title" property
                        value={song.album} // Set the initial value of the input to the title property of song
                        type="text"
                        name=""
                        id="title"
                        required
                      />
                    </div>
                  </div>

                  <div className="form_control">
                    <label htmlFor="genre">Genre</label>
                    <input
                      onChange={(e) => handleChange("genre")(e)} // Call handleChange with the "title" property
                      value={song.genre} // Set the initial value of the input to the title property of song
                      type="text"
                      name=""
                      id="title"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <footer className="popupFooter">
              {/* <button  form="myForm" className="submitBtn">Submit</button> */}
              <Button
                variant="contained"
                onClick={() => handleSubmit()}
                className="submitBtn"
              >
                {isEdit ? "Update" : "Submit"}
              </Button>
              ;
            </footer>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2F4050",
    color: theme.palette.common.white,
    fontWeight: "normal",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    // backgroundColor: "#2F4050",
    color: theme.palette.common.white,
    fontWeight: 500,
  },
}));