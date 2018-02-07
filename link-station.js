
// Link stations [x,y,r] with points (x, y) and reach (r)
const linkStations = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12]
];

// devices at points [x,y]
const points = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18]
];

/**
 * getDistance
 *
 * Calculates device's distance from link station
 * @param pointStation
 * @param pointDevice
 * @returns {number}
 */
function getDistance(pointStation, pointDevice) {
  return Math.sqrt(Math.pow((pointDevice[0] - pointStation[0]), 2) + Math.pow((pointDevice[1] - pointStation[1]), 2));
}

/**
 * getPower
 *
 * Calculates link station’s power
 * @param station
 * @param point
 * @returns {number}
 */
function getPower(station, point) {
  const distance = getDistance(station, point);
  return distance > station[2] ? 0 : +Math.pow(station[2] - distance, 2).toFixed(2);
}

/**
 * calculateMaxPowerStation
 *
 * Calculates most suitable link station (with most power) for a device
 * @param stations
 * @param point
 * @return {void}
 */
function calculateMaxPowerStation(stations, point) {
  let maxStation = stations.map(station => {
    station[3] = getPower(station, point);
    return station;
  }).reduce((a, b) => a[3] > b[3] ? a : b);

  if (maxStation[3] === 0) {
    console.log('No link station within reach for point ' + point[0] + ',' + point[1]);
  } else {
    console.log('Best station for point ' + point[0] + ',' + point[1] +
      ' is ' + maxStation[0] + ',' + maxStation[1] + ' with power ' + maxStation[3]);
  }
}

// Calculate most suitable link station for each given device location (point)
points.forEach(point => calculateMaxPowerStation(linkStations, point));
