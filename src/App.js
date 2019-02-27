import React, { Component } from 'react';
import './App.css';
import SimpleAppBar from './components/SimpleAppBar'
import SimpleMap from './components/SimpleMap'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 10,
    height: '600px'
  },
  blurb: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 10
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
       <SimpleAppBar />
       <Paper className={classes.blurb} elevation={1}>
        <p>
          Built a simple map using ArcGIS API. It shows all the schools in the Greater Houston Area based on info from Houston's Open Data Portal. Click{' '}
          <a href="https://cohgis-mycity.opendata.arcgis.com/datasets/schools?geometry=-103.506%2C28.016%2C-87.686%2C31.356&orderBy=IN_Street&orderByAsc=false" target="_blank">here</a>
          {' '}to see the data. Check the Actions tab to send an email to the School Principal. 
        </p>
       </Paper>
       <Paper className={classes.root} elevation={1}>
        <SimpleMap className="ReactMap" />
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
