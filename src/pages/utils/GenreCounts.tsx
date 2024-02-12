import * as React from 'react';
import { Card, CardContent, Typography, Stack, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const GenreCounts: React.FC = () => {
  const genreCount = useSelector((state: RootState) => state.genreCounts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: 'OVER_ALL_STATISTICS' });
  }, [dispatch]);

  return (
    <Card sx={{ backgroundColor: '#2F4050' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ color: 'white' }}>
          Genre Counts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
              Genre
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
              Number of Songs
            </Typography>
          </Grid>
          {genreCount.map((genre) => (
            <React.Fragment key={genre._id}>
              <Grid item xs={6}>
                <Typography variant="body1" component="div" sx={{ color: 'white' }}>
                  {genre._id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" component="div" sx={{ color: 'white' }}>
                  {genre.count}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GenreCounts;
