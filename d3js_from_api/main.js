window.addEventListener('load', loadFromApi);

// Loads the temperature and humidity log from remote API.
function loadFromApi() {
  const url = 'https://users.aalto.fi/~lehtint6/greenhousedata/log24.json';
  d3.json(url).then(onceApiLoaded);
}

// Creates the page content once log data has loaded.
function onceApiLoaded(data) {
  console.log(data);
let length = data.length;
  // TODO: Use the last item from the list data instead of the fixed object.
  updateLast(data[length - 1]);
  //updateLast({ temperature: 100, humidity: 100, utc: '2050-01-01T12:00:00Z' });

  createBars(data, 45);

}

// Updates the last measurements.
function updateLast(item) {
  document.getElementById('last-temperature').innerHTML = item.temperature;
  document.getElementById('last-humidity').innerHTML = item.humidity;
  document.getElementById('last-time').innerHTML = new Date(item.utc);
}

// Creates bar graph.
function createBars(data, max) {
  const barWidth = 100 / data.length;
  document.querySelector('#day-graph .half').innerHTML = max / 2 + '℃';
  d3.select('#day-graph')
    .selectAll('div.bar')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('left', (d, i) => (i * barWidth) + '%')
    .style('width', barWidth + '%')
    .style('height', (d, i) => getTemperatureBarHeight(d, max) + '%');
}

function getTemperatureBarHeight(item, max) {
  // TODO: Fix the calculation of bar height.
  console.log(max);
let tempHeight = (item.temperature/max)*100;
console.log(tempHeight);
  return tempHeight;
}
