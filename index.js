import { select, selectAll,extent,
  scaleLinear,
  symbol,
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceLink, } from 'd3';
import { viz } from './viz';
const container = d3.select('#app').node();
let state = {};

const checkboxes = select('#checkboxes');
const actorSearch = document.getElementById('actor-search');
const actorSearchCheckbox = document.getElementById('actor-search-checkbox');
const networkOrigin = document.getElementById('network-origin');
const networkOriginCheckbox = document.getElementById('network-origin-checkbox');
const genres = selectAll('.checkbox');
const xOptions = selectAll('.xAxis');
const yOptions = selectAll('.yAxis');

checkboxes.on('click', (e) => {
  e.preventDefault();
});

function updateCheckboxes() {
  let bitString = '';
  for (const genre of genres) {
    if (genre.checked) {
      bitString += '1';
    } else {
      bitString += '0';
    }
  }
  document.getElementById("bitstring").innerHTML = bitString;
}

function updateXAxisButtons() {
  let bitString = '';
  for (const xOption of xOptions) {
    if (xOption.checked) {
      bitString += '1';
    } else {
      bitString += '0';
    }
  }
  document.getElementById("xAxisBitstring").innerHTML = bitString;
}

function updateYAxisButtons() {
  let bitString = '';
  for (const yOption of yOptions) {
    if (yOption.checked) {
      bitString += '1';
    } else {
      bitString += '0';
    }
  }
  document.getElementById("yAxisBitstring").innerHTML = bitString;
}

const render = () => {
  viz(container, {
    state,
    setState,
  });
};

function updateActorInput() {
  
}

actorSearch.addEventListener('input', updateActorInput)
actorSearch.addEventListener('input', render)

actorSearchCheckbox.addEventListener('click', render);

for (const genre of genres) {
  genre.addEventListener('click', updateCheckboxes);
  genre.addEventListener('click', render);
}

for (const xOption of xOptions) {
  xOption.addEventListener('click', updateXAxisButtons);
  xOption.addEventListener('click', render);
}

for (const yOption of yOptions) {
  yOption.addEventListener('click', updateYAxisButtons);
  yOption.addEventListener('click', render);
}

const setState = (next) => {
  state = next(state);
  render();
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the modal
var howTo = document.getElementById("howTo");

// Get the button that opens the modal
var howToBtn = document.getElementById("howToBtn");

// Get the modal
var about = document.getElementById("about");

// Get the button that opens the modal
var aboutBtn = document.getElementById("aboutBtn");

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
howToBtn.onclick = function() {
  howTo.style.display = "block";
}

aboutBtn.onclick = function() {
  about.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
for (const span of spans) {
	span.onclick = function() {
	  howTo.style.display = "none";
	  about.style.display = "none";
	}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

render();



let nodes = [];
let links = [];
let svg = select('#graph')
    .append('svg')
    .attr('width', 10000)
    .attr('height', 10000);
const renderNetwork = () => {
//read in actors and configure them as nodes JSON
d3.csv('data.csv').then(function (allData) {
  selectAll("svg").remove();
  let svg = select('#graph')
    .append('svg')
    .attr('width', 10000)
    .attr('height', 10000);
  nodes = [];
	links = [];
  for (const data of allData) {
    if (document.getElementById("network-origin-checkbox").checked) {
      console.log("checked")
      if (data.Actors.split(',').includes(document.getElementById("network-origin").value) || data.Actors.split(',').includes(" " + document.getElementById("network-origin").value)) { 
        console.log("found " + document.getElementById("network-origin").value)
        for (const actor of data.Actors.split(',')) {
          if (actor.charAt(0) === ' ') {
            if (
              !nodes.some(
                (a) => a.id === actor.slice(1)
              )
            ) {
              //initialize JSON fields
              nodes.push({
                id: actor.slice(1),
              });
            }
          } else {
            if (!nodes.some((a) => a.id === actor)) {
              nodes.push({
                id: actor,
              });
            }
          }
        }
        for (
      var i = 0;
      i < data.Actors.split(',').length - 1;
      i++
    ) {
      for (
        var j = 1;
        j < data.Actors.split(',').length;
        j++
      ) {
        var actorI = data.Actors.split(',')[i];
        var actorJ = data.Actors.split(',')[j];
        if (i !== j) {
          if (actorI.charAt(0) === ' ') {
            var sourceIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorI.slice(1);
              }
            );
          } else {
            var sourceIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorI;
              }
            );
          }
          if (actorJ.charAt(0) === ' ') {
            var targetIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorJ.slice(1);
              }
            );
          } else {
            var targetIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorJ;
              }
            );
          }
          links.push({
            source: nodes[sourceIndex],
            target: nodes[targetIndex],
          });
        }
      }
    }
      }
    } else {
      console.log("unchecked")
      for (const actor of data.Actors.split(',')) {
        if (actor.charAt(0) === ' ') {
          if (
            !nodes.some(
              (a) => a.id === actor.slice(1)
            )
          ) {
            //initialize JSON fields
            nodes.push({
              id: actor.slice(1),
            });
          }
        } else {
          if (!nodes.some((a) => a.id === actor)) {
            nodes.push({
              id: actor,
            });
          }
        }
      }
      for (
      var i = 0;
      i < data.Actors.split(',').length - 1;
      i++
    ) {
      for (
        var j = 1;
        j < data.Actors.split(',').length;
        j++
      ) {
        var actorI = data.Actors.split(',')[i];
        var actorJ = data.Actors.split(',')[j];
        if (i !== j) {
          if (actorI.charAt(0) === ' ') {
            var sourceIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorI.slice(1);
              }
            );
          } else {
            var sourceIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorI;
              }
            );
          }
          if (actorJ.charAt(0) === ' ') {
            var targetIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorJ.slice(1);
              }
            );
          } else {
            var targetIndex = nodes.findIndex(
              function (a, i) {
                return a.id === actorJ;
              }
            );
          }
          links.push({
            source: nodes[sourceIndex],
            target: nodes[targetIndex],
          });
        }
      }
    }
    }
  }
  console.log(links);
  console.log(nodes);

  const circles = svg
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('stroke', 'white')
    .attr('fill', 'white')
    .attr('r', 10);
  const texts = svg
    .selectAll('text')
    .data(nodes)
    .join('text')
    .attr('stroke', 'red')
    .attr('fill', 'red')
    .text((d) => d.id);
  const lines = svg
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', 'white')
    .attr('fill', 'white');
  const simulation = d3
    .forceSimulation(nodes, (d) => d.id)
  	.force('charge', forceManyBody())
    .force('link', forceLink(links))
    .force(
      'center',
      forceCenter(5000 / 2, 7000 / 2)
    );

  simulation.on('tick', () => {
    circles
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y);

    texts
      .attr('x', (node) => node.x)
      .attr('y', (node) => node.y);

    lines
      .attr('x1', (link) => link.source.x)
      .attr('x2', (link) => link.target.x)
      .attr('y1', (link) => link.source.y)
      .attr('y2', (link) => link.target.y);
  });
});
}


const showScatter = function() {
  document.getElementById('scatterPlot').style.display = 'block';
  document.getElementById('graph').style.display = 'none';
}

const showNetwork = function() {
  document.getElementById('scatterPlot').style.display = 'none';
  document.getElementById('graph').style.display = 'block';
  renderNetwork();
}

const scatter_plot_button = document.getElementById('scatter_plot');
scatter_plot_button.addEventListener('click', showScatter);

const actor_network_button = document.getElementById('actor_network');
actor_network_button.addEventListener('click', showNetwork);

networkOriginCheckbox.addEventListener('click', renderNetwork);