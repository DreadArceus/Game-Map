import React from "react";
import Box from "@material-ui/core/Box";
import mapImg from "./map-img.png";
const topLeftEdge = { latitude: 36.341379, longitude: 65.590508 };
const bottomRightEdge = { latitude: 8.714294, longitude: 96.804201 };

const Map = (props) => {
  const plot = () => {
    const points = [];
    const scale = [
      875 / (topLeftEdge.latitude - bottomRightEdge.latitude),
      898 / (bottomRightEdge.longitude - topLeftEdge.longitude),
    ];
    for (var location of props.activeLocations) {
      points.push([
        (topLeftEdge.latitude - location.latitude) * scale[0],
        (location.longitude - topLeftEdge.longitude) * scale[1],
      ]);
    }
    const graph = [];
    for (var i = 0; i < points.length; i++) {
      graph.push(
        <Box
          width={15}
          height={15}
          margin={0}
          marginTop={`${points[i][0]}px`}
          marginLeft={`${points[i][1]}px`}
          border="2px black solid"
          borderRadius="50%"
          position="absolute"
          fontSize="11px"
        >{i}</Box>
      );
    }
    return graph;
  };
  return (
    <Box
      width={898}
      height={875}
      border="2px white solid"
      style={{ backgroundImage: `url(${mapImg})` }}
      >
      {plot()}
    </Box>
  );
};

export default Map;
