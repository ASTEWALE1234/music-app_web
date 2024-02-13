import { IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { Song } from "@/songSlice";
import { useDispatch } from "react-redux";
import React from "react";

interface EnhancedTableToolbarProps {
    numSelected: number;
    songToDelete: Song;
  }
  
  
const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
    const { numSelected, songToDelete } = props;
    console.log("songToDelete",songToDelete);
    console.log("argument values",props);

  const dispatch =useDispatch();
  const handleDelete = (selectedSong: Song) => {
  
    dispatch({ type: 'DELETE_SONG', payload: selectedSong._id });
    dispatch({type:'REMOVE_MESSAGE'});
  
  };

  return (
    numSelected > 0 ?<Toolbar
          sx={{bgcolor:"textSecondary",
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(numSelected > 0 && {
                  bgcolor: (theme) =>
                      alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
              }),
          }}
      >
          {numSelected > 0 ? (
              <Typography
                  sx={{ flex: '1 1 100%' }}
                  color="textSecondary"
                  // "inherit"
                  variant="subtitle1"
                  component="div"
              >
                  {numSelected} selected
              </Typography>
          ) : "Select To Delete"}
          {numSelected > 0 ? (
              <Tooltip title="Delete">
                  <IconButton onClick={()=>{
                        if (numSelected === 1) {
                          handleDelete(songToDelete);
                        } else {
                         <div>You Can not Delete</div>
                        }
                  }}>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
          ) : ""}
      </Toolbar>:null
  );
}

export default EnhancedTableToolbar;