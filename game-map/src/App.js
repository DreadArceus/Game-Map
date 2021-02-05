import "./App.css";
import { useEffect, useState } from "react";
import useCoordinates from "./useCoordinates";
import socketIOClient from "socket.io-client";
import LocationList from "./LocationList";
import Map from "./Map";
import Typography from "@material-ui/core/Typography";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core";

const server = "https://game-map-dread.herokuapp.com/";
let socket = socketIOClient(server, { transports: ["websocket"] });

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    text: {
      primary: "white",
    },
  },
});

function App() {
  const coords = useCoordinates();
  const [currentLocation, setCurrentLocation] = useState({});
  const [activeLocations, setActiveLocations] = useState([]);
  useEffect(() => {
    socket.on("list-update", (locations) => {
      setActiveLocations(Object.values(locations));
    });
  }, []);
  useEffect(() => {
    if (
      coords.latitude !== currentLocation.latitude ||
      coords.longitude !== currentLocation.longitude ||
      coords.error !== currentLocation.error
    ) {
      socket.emit("coord-update", coords);
      setCurrentLocation(coords);
    }
  }, [coords, currentLocation]);
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Typography color="textPrimary">
          Your location: ({coords.latitude}, {coords.longitude})
        </Typography>
        <Typography color="textPrimary">
          All connected locations:
        </Typography>
        <LocationList activeLocations={activeLocations} />
        <Typography color="textPrimary">
          Map:
        </Typography>
        <Map activeLocations={activeLocations}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
