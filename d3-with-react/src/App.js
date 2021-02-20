import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ProTip from './ProTip';
import Panel from './Panel';


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
          Base wireframe
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Panel />
      </Grid>
      
      {/*<Container maxWidth="sm">
       <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <ProTip />
        <Copyright />
      </Box> // tu
      <Panel />
    </Container>*/}
    </Grid>
  );
}
