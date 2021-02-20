import { useState } from 'react';
import Visualise from './Visualise';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



const Panel = () => {
  const [locations, setLocations] = useState([ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

  return (
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Visualise locations={locations}/>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={() => setLocations(locations.filter(value => value < 35))}>
            Filter data
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={() => setLocations(locations.map(value => value + 5))}>
            Update data
          </Button>
        </Grid>
      </Grid>
   );
}
 
export default Panel;