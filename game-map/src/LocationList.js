import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
  item: {
    border: "2px white solid",
  },
});

const LocationListItem = (props) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.item}>
      <ListItemText>{props.index}</ListItemText>
      <ListItemText>Latitude: {props.latitude}</ListItemText>
      <ListItemText>Longitude: {props.longitude}</ListItemText>
    </ListItem>
  );
};

const LocationList = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.activeLocations.map((item, index) => {
        return (
          <LocationListItem
            index={index}
            latitude={item.latitude}
            longitude={item.longitude}
          />
        );
      })}
    </List>
  );
};

export default LocationList;
