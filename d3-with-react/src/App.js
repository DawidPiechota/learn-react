import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Visualise from './Visualise';


export default function App() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Travelling salesman problem
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Visualise />
      </Grid>
    </Grid>
  );
}
