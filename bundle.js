(function (d3$1) {
  'use strict';

  const axes = (
    selection,
    {
      xScale,
      yScale,
      xAxisLabel,
      yAxisLabel,
      xAxisLabelOffset = 25,
      yAxisLabelOffset = 30,
    }
  ) => {
    selection
      .selectAll('g.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
    	.attr('stroke-width', 3)
      .attr(
        'transform',
        `translate(${xScale.range()[0]},0)`
      )
      .call(d3$1.axisLeft(yScale));

    selection
      .selectAll('g.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
    	.attr('stroke-width', 3)
      .attr(
        'transform',
        `translate(0,${yScale.range()[0]})`
      )
      .call(d3$1.axisBottom(xScale));

    selection
      .selectAll('text.x-axis-label')
      .data([null])
      .join('text')
      .attr(
        'x',
        (xScale.range()[0] + xScale.range()[1]) / 2
      )
      .attr(
        'y',
        yScale.range()[0] + xAxisLabelOffset
      )
      .attr('class', 'x-axis-label')
      .attr('alignment-baseline', 'hanging')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
    	.style('fill', "white")
      .text(xAxisLabel);

    selection
      .selectAll('text.y-axis-label')
      .data([null])
      .join('text')
      .attr('class', 'y-axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .style('fill', "white")
      .attr('font-family', 'sans-serif')
      .attr(
        'x',
        -(yScale.range()[0] + yScale.range()[1]) / 2
      )
      .attr(
        'y',
        xScale.range()[0] - yAxisLabelOffset
      )
      .text(yAxisLabel);
  };

  const scatterPlot = (
    selection,
    { data, width, height, genre, actors, bitString, margin, xAxisSelection,
      	yAxisSelection, setHoveredValue,
      hoveredValue, }
  ) => {
    
    const dotAppears = function(genre, actors, bitString) {
      if (document.getElementById("actor-search-checkbox").checked) {
        if (actors.includes(document.getElementById("actor-search").value)) {
          return 3;
        } else {
          return 0;
        }
      } else {
        if ((genre.includes("Action") && bitString.charAt(0) === "1") ||
            (genre.includes("Adventure") && bitString.charAt(1) === "1") ||
            (genre.includes("Animation") && bitString.charAt(2) === "1") ||
            (genre.includes("Biography") && bitString.charAt(3) === "1") ||
            (genre.includes("Comedy") && bitString.charAt(4) === "1") ||
            (genre.includes("Crime") && bitString.charAt(5) === "1") ||
            (genre.includes("Drama") && bitString.charAt(6) === "1") ||
            (genre.includes("Family") && bitString.charAt(7) === "1") ||
            (genre.includes("Fantasy") && bitString.charAt(8) === "1") ||
            (genre.includes("History") && bitString.charAt(9) === "1") ||
            (genre.includes("Horror") && bitString.charAt(10) === "1") ||
            (genre.includes("Mystery") && bitString.charAt(11) === "1") ||
            (genre.includes("Romance") && bitString.charAt(12) === "1") ||
            (genre.includes("Sci-Fi") && bitString.charAt(13) === "1") ||
            (genre.includes("Thriller") && bitString.charAt(14) === "1")) {
              return 3;
            } else {
              return 0;
        		}
      }
    };
    
    const dotColor = function(genre) {
      if (genre.includes("Action")) {
        return "#f54242";
      } else if (genre.includes("Adventure")) {
        return "#ff9100";
      } else if (genre.includes("Animation")) {
        return "#e5ff00";
      } else if (genre.includes("Biography")) {
        return "#66ff00";
      } else if (genre.includes("Comedy")) {
        return "#00ff2f";
      } else if (genre.includes("Crime")) {
        return "#00ffee";
      } else if (genre.includes("Drama")) {
        return "#00aaff";
      } else if (genre.includes("Family")) {
        return "#0059ff";
      } else if (genre.includes("Fantasy")) {
        return "#0800ff";
      } else if (genre.includes("History")) {
        return "#5100ff";
      } else if (genre.includes("Horror")) {
        return "#b700ff";
      } else if (genre.includes("Mystery")) {
        return "#fb00ff";
      } else if (genre.includes("Romance")) {
        return "#ff00b7";
      } else if (genre.includes("Sci-Fi")) {
        return "#ff0077";
      } else {
        return "#ff0019";
      }
    };
    
    let xAxisLabel = "-";
    for(let i = 0; i < xAxisSelection.length; i++) {
      if(xAxisSelection[i].checked) {
      	xAxisLabel = xAxisSelection[i].value;
      }
    }
    
    let yAxisLabel = "-";
    for(let i = 0; i < yAxisSelection.length; i++) {
      if(yAxisSelection[i].checked) {
        yAxisLabel = yAxisSelection[i].value;
      }
    }
    let xValue;
    let yValue;
    
    if (xAxisLabel == "year") {
      xValue = (d) => d.Year;
    }
    
    if (xAxisLabel == "runtime") {
      xValue = (d) => d.Runtime;
    }
    
    if (xAxisLabel == "imdb_rating") {
      xValue = (d) => d.Rating;
    }
    
    if (xAxisLabel == "metascore") {
      xValue = (d) => d.Metascore;
    }
    
    if (xAxisLabel == "num_votes") {
      xValue = (d) => d.Votes;
    }
    
    if (xAxisLabel == "revenue") {
      xValue = (d) => d.Revenue;
    }
    
    if (yAxisLabel == "year") {
      yValue = (d) => d.Year;
    }
    
    if (yAxisLabel == "runtime") {
      yValue = (d) => d.Runtime;
    }
    
    if (yAxisLabel == "imdb_rating") {
      yValue = (d) => d.Rating;
    }
    
    if (yAxisLabel == "metascore") {
      yValue = (d) => d.Metascore;
    }
    
    if (yAxisLabel == "num_votes") {
      yValue = (d) => d.Votes;
    }
    
    if (yAxisLabel == "revenue") {
      yValue = (d) => d.Revenue;
    }
        
        
  	const xScale = d3$1.scaleLinear()
      .domain(d3$1.extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const yScale = d3$1.scaleLinear()
      .domain(d3$1.extent(data, yValue))
      .range([height - margin.bottom, margin.top]);
    
    
    selection.call(axes, {
      xScale,
      yScale,
      xAxisLabel,
      yAxisLabel,
    });

    selection
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('cy', (d) => yScale(yValue(d)))
    	.style('fill', (d) => dotColor(genre(d)))
      .attr('r', (d) => dotAppears(genre(d), actors(d), bitString))
    	.on('mouseover', (event, d) => {
        setHoveredValue(d);
      })
      .on('mouseout', () => {
        setHoveredValue(null);
      });};

  const viz = (
    container,
    { state, setState, bitString }
  ) => {
    const width = window.innerWidth;
    const height = window.innerHeight - 50;

    const svg = d3$1.select(container)
      .selectAll('svg')
      .data([null])
      .join('svg')
      .attr('width', width)
      .attr('height', height);

    // state.data could be:
    // * undefined
    // * 'LOADING'
    // * An array of objects
    const { data, hoveredValue } = state;

    const setHoveredValue = (d) => {
      setState((state) => ({
        ...state,
        hoveredValue: d,
      }));
      document.getElementById(
        'current-movie'
      ).innerHTML = d.Title;
    };

    if (data && data !== 'LOADING') {
      svg.call(scatterPlot, {
        data,
        width,
        height,
        genre: (d) => d.Genre,
        actors: (d) => d.Actors,
        bitString: document.getElementById(
          'bitstring'
        ).innerHTML,
        margin: {
          top: 40,
          right: 100,
          bottom: 80,
          left: 60,
        },
        xAxisSelection: document.getElementsByName(
          'xAxis'
        ),
        yAxisSelection: document.getElementsByName(
          'yAxis'
        ),
        setHoveredValue,
        hoveredValue,
      });
    }

    if (data === undefined) {
      setState((state) => ({
        ...state,
        data: 'LOADING',
      }));
      fetch('data.csv')
        .then((response) => response.text())
        .then((csvString) => {
          const data = d3$1.csvParse(csvString);

          setState((state) => ({
            ...state,
            data,
          }));
        });
    }
  };

  const container = d3.select('#app').node();
  let state = {};

  const checkboxes = d3$1.select('#checkboxes');
  const actorSearch = document.getElementById('actor-search');
  const actorSearchCheckbox = document.getElementById('actor-search-checkbox');
  const networkOrigin = document.getElementById('network-origin');
  const networkOriginCheckbox = document.getElementById('network-origin-checkbox');
  const genres = d3$1.selectAll('.checkbox');
  const xOptions = d3$1.selectAll('.xAxis');
  const yOptions = d3$1.selectAll('.yAxis');

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

  actorSearch.addEventListener('input', updateActorInput);
  actorSearch.addEventListener('input', render);

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
  };

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
  };

  aboutBtn.onclick = function() {
    about.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  for (const span of spans) {
  	span.onclick = function() {
  	  howTo.style.display = "none";
  	  about.style.display = "none";
  	};
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  render();



  let nodes = [];
  let links = [];
  let svg = d3$1.select('#graph')
      .append('svg')
      .attr('width', 10000)
      .attr('height', 10000);
  const renderNetwork = () => {
  //read in actors and configure them as nodes JSON
  d3.csv('data.csv').then(function (allData) {
    d3$1.selectAll("svg").remove();
    let svg = d3$1.select('#graph')
      .append('svg')
      .attr('width', 10000)
      .attr('height', 10000);
    nodes = [];
  	links = [];
    for (const data of allData) {
      if (document.getElementById("network-origin-checkbox").checked) {
        console.log("checked");
        if (data.Actors.split(',').includes(document.getElementById("network-origin").value) || data.Actors.split(',').includes(" " + document.getElementById("network-origin").value)) { 
          console.log("found " + document.getElementById("network-origin").value);
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
        console.log("unchecked");
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
    	.force('charge', d3$1.forceManyBody())
      .force('link', d3$1.forceLink(links))
      .force(
        'center',
        d3$1.forceCenter(5000 / 2, 7000 / 2)
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
  };


  const showScatter = function() {
    document.getElementById('scatterPlot').style.display = 'block';
    document.getElementById('graph').style.display = 'none';
  };

  const showNetwork = function() {
    document.getElementById('scatterPlot').style.display = 'none';
    document.getElementById('graph').style.display = 'block';
    renderNetwork();
  };

  const scatter_plot_button = document.getElementById('scatter_plot');
  scatter_plot_button.addEventListener('click', showScatter);

  const actor_network_button = document.getElementById('actor_network');
  actor_network_button.addEventListener('click', showNetwork);

  networkOriginCheckbox.addEventListener('click', renderNetwork);

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImF4ZXMuanMiLCJzY2F0dGVyUGxvdC5qcyIsInZpei5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF4aXNMZWZ0LCBheGlzQm90dG9tIH0gZnJvbSAnZDMnO1xuXG5leHBvcnQgY29uc3QgYXhlcyA9IChcbiAgc2VsZWN0aW9uLFxuICB7XG4gICAgeFNjYWxlLFxuICAgIHlTY2FsZSxcbiAgICB4QXhpc0xhYmVsLFxuICAgIHlBeGlzTGFiZWwsXG4gICAgeEF4aXNMYWJlbE9mZnNldCA9IDI1LFxuICAgIHlBeGlzTGFiZWxPZmZzZXQgPSAzMCxcbiAgfVxuKSA9PiB7XG4gIHNlbGVjdGlvblxuICAgIC5zZWxlY3RBbGwoJ2cueS1heGlzJylcbiAgICAuZGF0YShbbnVsbF0pXG4gICAgLmpvaW4oJ2cnKVxuICAgIC5hdHRyKCdjbGFzcycsICd5LWF4aXMnKVxuICBcdC5hdHRyKCdzdHJva2Utd2lkdGgnLCAzKVxuICAgIC5hdHRyKFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICBgdHJhbnNsYXRlKCR7eFNjYWxlLnJhbmdlKClbMF19LDApYFxuICAgIClcbiAgICAuY2FsbChheGlzTGVmdCh5U2NhbGUpKTtcblxuICBzZWxlY3Rpb25cbiAgICAuc2VsZWN0QWxsKCdnLngtYXhpcycpXG4gICAgLmRhdGEoW251bGxdKVxuICAgIC5qb2luKCdnJylcbiAgICAuYXR0cignY2xhc3MnLCAneC1heGlzJylcbiAgXHQuYXR0cignc3Ryb2tlLXdpZHRoJywgMylcbiAgICAuYXR0cihcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgYHRyYW5zbGF0ZSgwLCR7eVNjYWxlLnJhbmdlKClbMF19KWBcbiAgICApXG4gICAgLmNhbGwoYXhpc0JvdHRvbSh4U2NhbGUpKTtcblxuICBzZWxlY3Rpb25cbiAgICAuc2VsZWN0QWxsKCd0ZXh0LngtYXhpcy1sYWJlbCcpXG4gICAgLmRhdGEoW251bGxdKVxuICAgIC5qb2luKCd0ZXh0JylcbiAgICAuYXR0cihcbiAgICAgICd4JyxcbiAgICAgICh4U2NhbGUucmFuZ2UoKVswXSArIHhTY2FsZS5yYW5nZSgpWzFdKSAvIDJcbiAgICApXG4gICAgLmF0dHIoXG4gICAgICAneScsXG4gICAgICB5U2NhbGUucmFuZ2UoKVswXSArIHhBeGlzTGFiZWxPZmZzZXRcbiAgICApXG4gICAgLmF0dHIoJ2NsYXNzJywgJ3gtYXhpcy1sYWJlbCcpXG4gICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAuYXR0cignZm9udC1mYW1pbHknLCAnc2Fucy1zZXJpZicpXG4gIFx0LnN0eWxlKCdmaWxsJywgXCJ3aGl0ZVwiKVxuICAgIC50ZXh0KHhBeGlzTGFiZWwpO1xuXG4gIHNlbGVjdGlvblxuICAgIC5zZWxlY3RBbGwoJ3RleHQueS1heGlzLWxhYmVsJylcbiAgICAuZGF0YShbbnVsbF0pXG4gICAgLmpvaW4oJ3RleHQnKVxuICAgIC5hdHRyKCdjbGFzcycsICd5LWF4aXMtbGFiZWwnKVxuICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgIC5zdHlsZSgnZmlsbCcsIFwid2hpdGVcIilcbiAgICAuYXR0cignZm9udC1mYW1pbHknLCAnc2Fucy1zZXJpZicpXG4gICAgLmF0dHIoXG4gICAgICAneCcsXG4gICAgICAtKHlTY2FsZS5yYW5nZSgpWzBdICsgeVNjYWxlLnJhbmdlKClbMV0pIC8gMlxuICAgIClcbiAgICAuYXR0cihcbiAgICAgICd5JyxcbiAgICAgIHhTY2FsZS5yYW5nZSgpWzBdIC0geUF4aXNMYWJlbE9mZnNldFxuICAgIClcbiAgICAudGV4dCh5QXhpc0xhYmVsKTtcbn07XG4iLCJpbXBvcnQgeyBleHRlbnQsIHNjYWxlTGluZWFyLCBzeW1ib2wsIHNlbGVjdEFsbCB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGF4ZXMgfSBmcm9tICcuL2F4ZXMnO1xuXG5leHBvcnQgY29uc3Qgc2NhdHRlclBsb3QgPSAoXG4gIHNlbGVjdGlvbixcbiAgeyBkYXRhLCB3aWR0aCwgaGVpZ2h0LCBnZW5yZSwgYWN0b3JzLCBiaXRTdHJpbmcsIG1hcmdpbiwgeEF4aXNTZWxlY3Rpb24sXG4gICAgXHR5QXhpc1NlbGVjdGlvbiwgc2V0SG92ZXJlZFZhbHVlLFxuICAgIGhvdmVyZWRWYWx1ZSwgfVxuKSA9PiB7XG4gIFxuICBjb25zdCBkb3RBcHBlYXJzID0gZnVuY3Rpb24oZ2VucmUsIGFjdG9ycywgYml0U3RyaW5nKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0b3Itc2VhcmNoLWNoZWNrYm94XCIpLmNoZWNrZWQpIHtcbiAgICAgIGlmIChhY3RvcnMuaW5jbHVkZXMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhY3Rvci1zZWFyY2hcIikudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgoZ2VucmUuaW5jbHVkZXMoXCJBY3Rpb25cIikgJiYgYml0U3RyaW5nLmNoYXJBdCgwKSA9PT0gXCIxXCIpIHx8XG4gICAgICAgICAgKGdlbnJlLmluY2x1ZGVzKFwiQWR2ZW50dXJlXCIpICYmIGJpdFN0cmluZy5jaGFyQXQoMSkgPT09IFwiMVwiKSB8fFxuICAgICAgICAgIChnZW5yZS5pbmNsdWRlcyhcIkFuaW1hdGlvblwiKSAmJiBiaXRTdHJpbmcuY2hhckF0KDIpID09PSBcIjFcIikgfHxcbiAgICAgICAgICAoZ2VucmUuaW5jbHVkZXMoXCJCaW9ncmFwaHlcIikgJiYgYml0U3RyaW5nLmNoYXJBdCgzKSA9PT0gXCIxXCIpIHx8XG4gICAgICAgICAgKGdlbnJlLmluY2x1ZGVzKFwiQ29tZWR5XCIpICYmIGJpdFN0cmluZy5jaGFyQXQoNCkgPT09IFwiMVwiKSB8fFxuICAgICAgICAgIChnZW5yZS5pbmNsdWRlcyhcIkNyaW1lXCIpICYmIGJpdFN0cmluZy5jaGFyQXQoNSkgPT09IFwiMVwiKSB8fFxuICAgICAgICAgIChnZW5yZS5pbmNsdWRlcyhcIkRyYW1hXCIpICYmIGJpdFN0cmluZy5jaGFyQXQoNikgPT09IFwiMVwiKSB8fFxuICAgICAgICAgIChnZW5yZS5pbmNsdWRlcyhcIkZhbWlseVwiKSAmJiBiaXRTdHJpbmcuY2hhckF0KDcpID09PSBcIjFcIikgfHxcbiAgICAgICAgICAoZ2VucmUuaW5jbHVkZXMoXCJGYW50YXN5XCIpICYmIGJpdFN0cmluZy5jaGFyQXQoOCkgPT09IFwiMVwiKSB8fFxuICAgICAgICAgIChnZW5yZS5pbmNsdWRlcyhcIkhpc3RvcnlcIikgJiYgYml0U3RyaW5nLmNoYXJBdCg5KSA9PT0gXCIxXCIpIHx8XG4gICAgICAgICAgKGdlbnJlLmluY2x1ZGVzKFwiSG9ycm9yXCIpICYmIGJpdFN0cmluZy5jaGFyQXQoMTApID09PSBcIjFcIikgfHxcbiAgICAgICAgICAoZ2VucmUuaW5jbHVkZXMoXCJNeXN0ZXJ5XCIpICYmIGJpdFN0cmluZy5jaGFyQXQoMTEpID09PSBcIjFcIikgfHxcbiAgICAgICAgICAoZ2VucmUuaW5jbHVkZXMoXCJSb21hbmNlXCIpICYmIGJpdFN0cmluZy5jaGFyQXQoMTIpID09PSBcIjFcIikgfHxcbiAgICAgICAgICAoZ2VucmUuaW5jbHVkZXMoXCJTY2ktRmlcIikgJiYgYml0U3RyaW5nLmNoYXJBdCgxMykgPT09IFwiMVwiKSB8fFxuICAgICAgICAgIChnZW5yZS5pbmNsdWRlcyhcIlRocmlsbGVyXCIpICYmIGJpdFN0cmluZy5jaGFyQXQoMTQpID09PSBcIjFcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgIFx0XHR9XG4gICAgfVxuICB9XG4gIFxuICBjb25zdCBkb3RDb2xvciA9IGZ1bmN0aW9uKGdlbnJlKSB7XG4gICAgaWYgKGdlbnJlLmluY2x1ZGVzKFwiQWN0aW9uXCIpKSB7XG4gICAgICByZXR1cm4gXCIjZjU0MjQyXCI7XG4gICAgfSBlbHNlIGlmIChnZW5yZS5pbmNsdWRlcyhcIkFkdmVudHVyZVwiKSkge1xuICAgICAgcmV0dXJuIFwiI2ZmOTEwMFwiO1xuICAgIH0gZWxzZSBpZiAoZ2VucmUuaW5jbHVkZXMoXCJBbmltYXRpb25cIikpIHtcbiAgICAgIHJldHVybiBcIiNlNWZmMDBcIjtcbiAgICB9IGVsc2UgaWYgKGdlbnJlLmluY2x1ZGVzKFwiQmlvZ3JhcGh5XCIpKSB7XG4gICAgICByZXR1cm4gXCIjNjZmZjAwXCI7XG4gICAgfSBlbHNlIGlmIChnZW5yZS5pbmNsdWRlcyhcIkNvbWVkeVwiKSkge1xuICAgICAgcmV0dXJuIFwiIzAwZmYyZlwiO1xuICAgIH0gZWxzZSBpZiAoZ2VucmUuaW5jbHVkZXMoXCJDcmltZVwiKSkge1xuICAgICAgcmV0dXJuIFwiIzAwZmZlZVwiO1xuICAgIH0gZWxzZSBpZiAoZ2VucmUuaW5jbHVkZXMoXCJEcmFtYVwiKSkge1xuICAgICAgcmV0dXJuIFwiIzAwYWFmZlwiO1xuICAgIH0gZWxzZSBpZiAoZ2VucmUuaW5jbHVkZXMoXCJGYW1pbHlcIikpIHtcbiAgICAgIHJldHVybiBcIiMwMDU5ZmZcIjtcbiAgICB9IGVsc2UgaWYgKGdlbnJlLmluY2x1ZGVzKFwiRmFudGFzeVwiKSkge1xuICAgICAgcmV0dXJuIFwiIzA4MDBmZlwiO1xuICAgIH0gZWxzZSBpZiAoZ2VucmUuaW5jbHVkZXMoXCJIaXN0b3J5XCIpKSB7XG4gICAgICByZXR1cm4gXCIjNTEwMGZmXCI7XG4gICAgfSBlbHNlIGlmIChnZW5yZS5pbmNsdWRlcyhcIkhvcnJvclwiKSkge1xuICAgICAgcmV0dXJuIFwiI2I3MDBmZlwiO1xuICAgIH0gZWxzZSBpZiAoZ2VucmUuaW5jbHVkZXMoXCJNeXN0ZXJ5XCIpKSB7XG4gICAgICByZXR1cm4gXCIjZmIwMGZmXCI7XG4gICAgfSBlbHNlIGlmIChnZW5yZS5pbmNsdWRlcyhcIlJvbWFuY2VcIikpIHtcbiAgICAgIHJldHVybiBcIiNmZjAwYjdcIjtcbiAgICB9IGVsc2UgaWYgKGdlbnJlLmluY2x1ZGVzKFwiU2NpLUZpXCIpKSB7XG4gICAgICByZXR1cm4gXCIjZmYwMDc3XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIiNmZjAwMTlcIjtcbiAgICB9XG4gIH1cbiAgXG4gIGxldCB4QXhpc0xhYmVsID0gXCItXCI7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCB4QXhpc1NlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGlmKHhBeGlzU2VsZWN0aW9uW2ldLmNoZWNrZWQpIHtcbiAgICBcdHhBeGlzTGFiZWwgPSB4QXhpc1NlbGVjdGlvbltpXS52YWx1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIGxldCB5QXhpc0xhYmVsID0gXCItXCI7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCB5QXhpc1NlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGlmKHlBeGlzU2VsZWN0aW9uW2ldLmNoZWNrZWQpIHtcbiAgICAgIHlBeGlzTGFiZWwgPSB5QXhpc1NlbGVjdGlvbltpXS52YWx1ZTtcbiAgICB9XG4gIH1cbiAgbGV0IHhWYWx1ZTtcbiAgbGV0IHlWYWx1ZTtcbiAgbGV0IGdldFllYXJzID0gKGQpID0+IGQuWWVhcjtcbiAgXG4gIGlmICh4QXhpc0xhYmVsID09IFwieWVhclwiKSB7XG4gICAgeFZhbHVlID0gKGQpID0+IGQuWWVhcjtcbiAgfVxuICBcbiAgaWYgKHhBeGlzTGFiZWwgPT0gXCJydW50aW1lXCIpIHtcbiAgICB4VmFsdWUgPSAoZCkgPT4gZC5SdW50aW1lO1xuICB9XG4gIFxuICBpZiAoeEF4aXNMYWJlbCA9PSBcImltZGJfcmF0aW5nXCIpIHtcbiAgICB4VmFsdWUgPSAoZCkgPT4gZC5SYXRpbmc7XG4gIH1cbiAgXG4gIGlmICh4QXhpc0xhYmVsID09IFwibWV0YXNjb3JlXCIpIHtcbiAgICB4VmFsdWUgPSAoZCkgPT4gZC5NZXRhc2NvcmU7XG4gIH1cbiAgXG4gIGlmICh4QXhpc0xhYmVsID09IFwibnVtX3ZvdGVzXCIpIHtcbiAgICB4VmFsdWUgPSAoZCkgPT4gZC5Wb3RlcztcbiAgfVxuICBcbiAgaWYgKHhBeGlzTGFiZWwgPT0gXCJyZXZlbnVlXCIpIHtcbiAgICB4VmFsdWUgPSAoZCkgPT4gZC5SZXZlbnVlO1xuICB9XG4gIFxuICBpZiAoeUF4aXNMYWJlbCA9PSBcInllYXJcIikge1xuICAgIHlWYWx1ZSA9IChkKSA9PiBkLlllYXI7XG4gIH1cbiAgXG4gIGlmICh5QXhpc0xhYmVsID09IFwicnVudGltZVwiKSB7XG4gICAgeVZhbHVlID0gKGQpID0+IGQuUnVudGltZTtcbiAgfVxuICBcbiAgaWYgKHlBeGlzTGFiZWwgPT0gXCJpbWRiX3JhdGluZ1wiKSB7XG4gICAgeVZhbHVlID0gKGQpID0+IGQuUmF0aW5nO1xuICB9XG4gIFxuICBpZiAoeUF4aXNMYWJlbCA9PSBcIm1ldGFzY29yZVwiKSB7XG4gICAgeVZhbHVlID0gKGQpID0+IGQuTWV0YXNjb3JlO1xuICB9XG4gIFxuICBpZiAoeUF4aXNMYWJlbCA9PSBcIm51bV92b3Rlc1wiKSB7XG4gICAgeVZhbHVlID0gKGQpID0+IGQuVm90ZXM7XG4gIH1cbiAgXG4gIGlmICh5QXhpc0xhYmVsID09IFwicmV2ZW51ZVwiKSB7XG4gICAgeVZhbHVlID0gKGQpID0+IGQuUmV2ZW51ZTtcbiAgfVxuICAgICAgXG4gICAgICBcblx0Y29uc3QgeFNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHhWYWx1ZSkpXG4gICAgLnJhbmdlKFttYXJnaW4ubGVmdCwgd2lkdGggLSBtYXJnaW4ucmlnaHRdKTtcblxuICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZGF0YSwgeVZhbHVlKSlcbiAgICAucmFuZ2UoW2hlaWdodCAtIG1hcmdpbi5ib3R0b20sIG1hcmdpbi50b3BdKTtcbiAgXG4gIFxuICBzZWxlY3Rpb24uY2FsbChheGVzLCB7XG4gICAgeFNjYWxlLFxuICAgIHlTY2FsZSxcbiAgICB4QXhpc0xhYmVsLFxuICAgIHlBeGlzTGFiZWwsXG4gIH0pO1xuXG4gIHNlbGVjdGlvblxuICAgIC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgLmRhdGEoZGF0YSlcbiAgICAuam9pbignY2lyY2xlJylcbiAgICAuYXR0cignY3gnLCAoZCkgPT4geFNjYWxlKHhWYWx1ZShkKSkpXG4gICAgLmF0dHIoJ2N5JywgKGQpID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICBcdC5zdHlsZSgnZmlsbCcsIChkKSA9PiBkb3RDb2xvcihnZW5yZShkKSkpXG4gICAgLmF0dHIoJ3InLCAoZCkgPT4gZG90QXBwZWFycyhnZW5yZShkKSwgYWN0b3JzKGQpLCBiaXRTdHJpbmcpKVxuICBcdC5vbignbW91c2VvdmVyJywgKGV2ZW50LCBkKSA9PiB7XG4gICAgICBzZXRIb3ZlcmVkVmFsdWUoZCk7XG4gICAgfSlcbiAgICAub24oJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgc2V0SG92ZXJlZFZhbHVlKG51bGwpO1xuICAgIH0pOztcbn07XG4iLCJpbXBvcnQgeyBjc3ZQYXJzZSwgc2VsZWN0LCBzZWxlY3RBbGwgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBzY2F0dGVyUGxvdCB9IGZyb20gJy4vc2NhdHRlclBsb3QnO1xuXG5leHBvcnQgY29uc3Qgdml6ID0gKFxuICBjb250YWluZXIsXG4gIHsgc3RhdGUsIHNldFN0YXRlLCBiaXRTdHJpbmcgfVxuKSA9PiB7XG4gIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gIGNvbnN0IHN2ZyA9IHNlbGVjdChjb250YWluZXIpXG4gICAgLnNlbGVjdEFsbCgnc3ZnJylcbiAgICAuZGF0YShbbnVsbF0pXG4gICAgLmpvaW4oJ3N2ZycpXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCk7XG5cbiAgLy8gc3RhdGUuZGF0YSBjb3VsZCBiZTpcbiAgLy8gKiB1bmRlZmluZWRcbiAgLy8gKiAnTE9BRElORydcbiAgLy8gKiBBbiBhcnJheSBvZiBvYmplY3RzXG4gIGNvbnN0IHsgZGF0YSwgaG92ZXJlZFZhbHVlIH0gPSBzdGF0ZTtcblxuICBjb25zdCBzZXRIb3ZlcmVkVmFsdWUgPSAoZCkgPT4ge1xuICAgIHNldFN0YXRlKChzdGF0ZSkgPT4gKHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgaG92ZXJlZFZhbHVlOiBkLFxuICAgIH0pKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICdjdXJyZW50LW1vdmllJ1xuICAgICkuaW5uZXJIVE1MID0gZC5UaXRsZTtcbiAgfTtcblxuICBpZiAoZGF0YSAmJiBkYXRhICE9PSAnTE9BRElORycpIHtcbiAgICBzdmcuY2FsbChzY2F0dGVyUGxvdCwge1xuICAgICAgZGF0YSxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgZ2VucmU6IChkKSA9PiBkLkdlbnJlLFxuICAgICAgYWN0b3JzOiAoZCkgPT4gZC5BY3RvcnMsXG4gICAgICBiaXRTdHJpbmc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAnYml0c3RyaW5nJ1xuICAgICAgKS5pbm5lckhUTUwsXG4gICAgICBtYXJnaW46IHtcbiAgICAgICAgdG9wOiA0MCxcbiAgICAgICAgcmlnaHQ6IDEwMCxcbiAgICAgICAgYm90dG9tOiA4MCxcbiAgICAgICAgbGVmdDogNjAsXG4gICAgICB9LFxuICAgICAgeEF4aXNTZWxlY3Rpb246IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFxuICAgICAgICAneEF4aXMnXG4gICAgICApLFxuICAgICAgeUF4aXNTZWxlY3Rpb246IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFxuICAgICAgICAneUF4aXMnXG4gICAgICApLFxuICAgICAgc2V0SG92ZXJlZFZhbHVlLFxuICAgICAgaG92ZXJlZFZhbHVlLFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHNldFN0YXRlKChzdGF0ZSkgPT4gKHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZGF0YTogJ0xPQURJTkcnLFxuICAgIH0pKTtcbiAgICBmZXRjaCgnZGF0YS5jc3YnKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAudGhlbigoY3N2U3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjc3ZQYXJzZShjc3ZTdHJpbmcpO1xuXG4gICAgICAgIHNldFN0YXRlKChzdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHNlbGVjdCwgc2VsZWN0QWxsLGV4dGVudCxcbiAgc2NhbGVMaW5lYXIsXG4gIHN5bWJvbCxcbiAgZm9yY2VTaW11bGF0aW9uLFxuICBmb3JjZUNlbnRlcixcbiAgZm9yY2VNYW55Qm9keSxcbiAgZm9yY2VMaW5rLCB9IGZyb20gJ2QzJztcbmltcG9ydCB7IHZpeiB9IGZyb20gJy4vdml6JztcbmNvbnN0IGNvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2FwcCcpLm5vZGUoKTtcbmxldCBzdGF0ZSA9IHt9O1xuXG5jb25zdCBjaGVja2JveGVzID0gc2VsZWN0KCcjY2hlY2tib3hlcycpO1xuY29uc3QgYWN0b3JTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0b3Itc2VhcmNoJyk7XG5jb25zdCBhY3RvclNlYXJjaENoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjdG9yLXNlYXJjaC1jaGVja2JveCcpO1xuY29uc3QgbmV0d29ya09yaWdpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXR3b3JrLW9yaWdpbicpO1xuY29uc3QgbmV0d29ya09yaWdpbkNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldHdvcmstb3JpZ2luLWNoZWNrYm94Jyk7XG5jb25zdCBnZW5yZXMgPSBzZWxlY3RBbGwoJy5jaGVja2JveCcpO1xuY29uc3QgeE9wdGlvbnMgPSBzZWxlY3RBbGwoJy54QXhpcycpO1xuY29uc3QgeU9wdGlvbnMgPSBzZWxlY3RBbGwoJy55QXhpcycpO1xuXG5jaGVja2JveGVzLm9uKCdjbGljaycsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiB1cGRhdGVDaGVja2JveGVzKCkge1xuICBsZXQgYml0U3RyaW5nID0gJyc7XG4gIGZvciAoY29uc3QgZ2VucmUgb2YgZ2VucmVzKSB7XG4gICAgaWYgKGdlbnJlLmNoZWNrZWQpIHtcbiAgICAgIGJpdFN0cmluZyArPSAnMSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJpdFN0cmluZyArPSAnMCc7XG4gICAgfVxuICB9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYml0c3RyaW5nXCIpLmlubmVySFRNTCA9IGJpdFN0cmluZztcbn1cblxuZnVuY3Rpb24gdXBkYXRlWEF4aXNCdXR0b25zKCkge1xuICBsZXQgYml0U3RyaW5nID0gJyc7XG4gIGZvciAoY29uc3QgeE9wdGlvbiBvZiB4T3B0aW9ucykge1xuICAgIGlmICh4T3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgIGJpdFN0cmluZyArPSAnMSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJpdFN0cmluZyArPSAnMCc7XG4gICAgfVxuICB9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwieEF4aXNCaXRzdHJpbmdcIikuaW5uZXJIVE1MID0gYml0U3RyaW5nO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVZQXhpc0J1dHRvbnMoKSB7XG4gIGxldCBiaXRTdHJpbmcgPSAnJztcbiAgZm9yIChjb25zdCB5T3B0aW9uIG9mIHlPcHRpb25zKSB7XG4gICAgaWYgKHlPcHRpb24uY2hlY2tlZCkge1xuICAgICAgYml0U3RyaW5nICs9ICcxJztcbiAgICB9IGVsc2Uge1xuICAgICAgYml0U3RyaW5nICs9ICcwJztcbiAgICB9XG4gIH1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ5QXhpc0JpdHN0cmluZ1wiKS5pbm5lckhUTUwgPSBiaXRTdHJpbmc7XG59XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgdml6KGNvbnRhaW5lciwge1xuICAgIHN0YXRlLFxuICAgIHNldFN0YXRlLFxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZUFjdG9ySW5wdXQoKSB7XG4gIFxufVxuXG5hY3RvclNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZUFjdG9ySW5wdXQpXG5hY3RvclNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlbmRlcilcblxuYWN0b3JTZWFyY2hDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbmRlcik7XG5cbmZvciAoY29uc3QgZ2VucmUgb2YgZ2VucmVzKSB7XG4gIGdlbnJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlQ2hlY2tib3hlcyk7XG4gIGdlbnJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyKTtcbn1cblxuZm9yIChjb25zdCB4T3B0aW9uIG9mIHhPcHRpb25zKSB7XG4gIHhPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVYQXhpc0J1dHRvbnMpO1xuICB4T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyKTtcbn1cblxuZm9yIChjb25zdCB5T3B0aW9uIG9mIHlPcHRpb25zKSB7XG4gIHlPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVZQXhpc0J1dHRvbnMpO1xuICB5T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyKTtcbn1cblxuY29uc3Qgc2V0U3RhdGUgPSAobmV4dCkgPT4ge1xuICBzdGF0ZSA9IG5leHQoc3RhdGUpO1xuICByZW5kZXIoKTtcbn07XG5cbi8vIEdldCB0aGUgPHNwYW4+IGVsZW1lbnQgdGhhdCBjbG9zZXMgdGhlIG1vZGFsXG52YXIgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKVswXTtcblxuLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cbn1cblxuLy8gR2V0IHRoZSBtb2RhbFxudmFyIGhvd1RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3dUb1wiKTtcblxuLy8gR2V0IHRoZSBidXR0b24gdGhhdCBvcGVucyB0aGUgbW9kYWxcbnZhciBob3dUb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93VG9CdG5cIik7XG5cbi8vIEdldCB0aGUgbW9kYWxcbnZhciBhYm91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIik7XG5cbi8vIEdldCB0aGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG1vZGFsXG52YXIgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0QnRuXCIpO1xuXG4vLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxudmFyIHNwYW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpO1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbCBcbmhvd1RvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgaG93VG8uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuYWJvdXRCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBhYm91dC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbmZvciAoY29uc3Qgc3BhbiBvZiBzcGFucykge1xuXHRzcGFuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcblx0ICBob3dUby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdCAgYWJvdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9XG59XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG59XG5cbnJlbmRlcigpO1xuXG5cblxubGV0IG5vZGVzID0gW107XG5sZXQgbGlua3MgPSBbXTtcbmxldCBzdmcgPSBzZWxlY3QoJyNncmFwaCcpXG4gICAgLmFwcGVuZCgnc3ZnJylcbiAgICAuYXR0cignd2lkdGgnLCAxMDAwMClcbiAgICAuYXR0cignaGVpZ2h0JywgMTAwMDApO1xuY29uc3QgcmVuZGVyTmV0d29yayA9ICgpID0+IHtcbi8vcmVhZCBpbiBhY3RvcnMgYW5kIGNvbmZpZ3VyZSB0aGVtIGFzIG5vZGVzIEpTT05cbmQzLmNzdignZGF0YS5jc3YnKS50aGVuKGZ1bmN0aW9uIChhbGxEYXRhKSB7XG4gIHNlbGVjdEFsbChcInN2Z1wiKS5yZW1vdmUoKTtcbiAgbGV0IHN2ZyA9IHNlbGVjdCgnI2dyYXBoJylcbiAgICAuYXBwZW5kKCdzdmcnKVxuICAgIC5hdHRyKCd3aWR0aCcsIDEwMDAwKVxuICAgIC5hdHRyKCdoZWlnaHQnLCAxMDAwMCk7XG4gIG5vZGVzID0gW107XG5cdGxpbmtzID0gW107XG4gIGZvciAoY29uc3QgZGF0YSBvZiBhbGxEYXRhKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV0d29yay1vcmlnaW4tY2hlY2tib3hcIikuY2hlY2tlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja2VkXCIpXG4gICAgICBpZiAoZGF0YS5BY3RvcnMuc3BsaXQoJywnKS5pbmNsdWRlcyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldHdvcmstb3JpZ2luXCIpLnZhbHVlKSB8fCBkYXRhLkFjdG9ycy5zcGxpdCgnLCcpLmluY2x1ZGVzKFwiIFwiICsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXR3b3JrLW9yaWdpblwiKS52YWx1ZSkpIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgXCIgKyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldHdvcmstb3JpZ2luXCIpLnZhbHVlKVxuICAgICAgICBmb3IgKGNvbnN0IGFjdG9yIG9mIGRhdGEuQWN0b3JzLnNwbGl0KCcsJykpIHtcbiAgICAgICAgICBpZiAoYWN0b3IuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgIW5vZGVzLnNvbWUoXG4gICAgICAgICAgICAgICAgKGEpID0+IGEuaWQgPT09IGFjdG9yLnNsaWNlKDEpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvL2luaXRpYWxpemUgSlNPTiBmaWVsZHNcbiAgICAgICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGFjdG9yLnNsaWNlKDEpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFub2Rlcy5zb21lKChhKSA9PiBhLmlkID09PSBhY3RvcikpIHtcbiAgICAgICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGFjdG9yLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGkgPCBkYXRhLkFjdG9ycy5zcGxpdCgnLCcpLmxlbmd0aCAtIDE7XG4gICAgICBpKytcbiAgICApIHtcbiAgICAgIGZvciAoXG4gICAgICAgIHZhciBqID0gMTtcbiAgICAgICAgaiA8IGRhdGEuQWN0b3JzLnNwbGl0KCcsJykubGVuZ3RoO1xuICAgICAgICBqKytcbiAgICAgICkge1xuICAgICAgICB2YXIgYWN0b3JJID0gZGF0YS5BY3RvcnMuc3BsaXQoJywnKVtpXTtcbiAgICAgICAgdmFyIGFjdG9ySiA9IGRhdGEuQWN0b3JzLnNwbGl0KCcsJylbal07XG4gICAgICAgIGlmIChpICE9PSBqKSB7XG4gICAgICAgICAgaWYgKGFjdG9ySS5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZUluZGV4ID0gbm9kZXMuZmluZEluZGV4KFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoYSwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmlkID09PSBhY3Rvckkuc2xpY2UoMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2VJbmRleCA9IG5vZGVzLmZpbmRJbmRleChcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGEsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYWN0b3JJO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0b3JKLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SW5kZXggPSBub2Rlcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIChhLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuaWQgPT09IGFjdG9ySi5zbGljZSgxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gbm9kZXMuZmluZEluZGV4KFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoYSwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmlkID09PSBhY3Rvcko7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmtzLnB1c2goe1xuICAgICAgICAgICAgc291cmNlOiBub2Rlc1tzb3VyY2VJbmRleF0sXG4gICAgICAgICAgICB0YXJnZXQ6IG5vZGVzW3RhcmdldEluZGV4XSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ1bmNoZWNrZWRcIilcbiAgICAgIGZvciAoY29uc3QgYWN0b3Igb2YgZGF0YS5BY3RvcnMuc3BsaXQoJywnKSkge1xuICAgICAgICBpZiAoYWN0b3IuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbm9kZXMuc29tZShcbiAgICAgICAgICAgICAgKGEpID0+IGEuaWQgPT09IGFjdG9yLnNsaWNlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvL2luaXRpYWxpemUgSlNPTiBmaWVsZHNcbiAgICAgICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgICAgICBpZDogYWN0b3Iuc2xpY2UoMSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFub2Rlcy5zb21lKChhKSA9PiBhLmlkID09PSBhY3RvcikpIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgICAgICBpZDogYWN0b3IsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoXG4gICAgICB2YXIgaSA9IDA7XG4gICAgICBpIDwgZGF0YS5BY3RvcnMuc3BsaXQoJywnKS5sZW5ndGggLSAxO1xuICAgICAgaSsrXG4gICAgKSB7XG4gICAgICBmb3IgKFxuICAgICAgICB2YXIgaiA9IDE7XG4gICAgICAgIGogPCBkYXRhLkFjdG9ycy5zcGxpdCgnLCcpLmxlbmd0aDtcbiAgICAgICAgaisrXG4gICAgICApIHtcbiAgICAgICAgdmFyIGFjdG9ySSA9IGRhdGEuQWN0b3JzLnNwbGl0KCcsJylbaV07XG4gICAgICAgIHZhciBhY3RvckogPSBkYXRhLkFjdG9ycy5zcGxpdCgnLCcpW2pdO1xuICAgICAgICBpZiAoaSAhPT0gaikge1xuICAgICAgICAgIGlmIChhY3RvckkuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2VJbmRleCA9IG5vZGVzLmZpbmRJbmRleChcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGEsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYWN0b3JJLnNsaWNlKDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc291cmNlSW5kZXggPSBub2Rlcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIChhLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuaWQgPT09IGFjdG9ySTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdG9ySi5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gbm9kZXMuZmluZEluZGV4KFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoYSwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmlkID09PSBhY3Rvckouc2xpY2UoMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRJbmRleCA9IG5vZGVzLmZpbmRJbmRleChcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGEsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYWN0b3JKO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaW5rcy5wdXNoKHtcbiAgICAgICAgICAgIHNvdXJjZTogbm9kZXNbc291cmNlSW5kZXhdLFxuICAgICAgICAgICAgdGFyZ2V0OiBub2Rlc1t0YXJnZXRJbmRleF0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKGxpbmtzKTtcbiAgY29uc29sZS5sb2cobm9kZXMpO1xuXG4gIGNvbnN0IGNpcmNsZXMgPSBzdmdcbiAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgIC5kYXRhKG5vZGVzKVxuICAgIC5qb2luKCdjaXJjbGUnKVxuICAgIC5hdHRyKCdzdHJva2UnLCAnd2hpdGUnKVxuICAgIC5hdHRyKCdmaWxsJywgJ3doaXRlJylcbiAgICAuYXR0cigncicsIDEwKTtcbiAgY29uc3QgdGV4dHMgPSBzdmdcbiAgICAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAuZGF0YShub2RlcylcbiAgICAuam9pbigndGV4dCcpXG4gICAgLmF0dHIoJ3N0cm9rZScsICdyZWQnKVxuICAgIC5hdHRyKCdmaWxsJywgJ3JlZCcpXG4gICAgLnRleHQoKGQpID0+IGQuaWQpO1xuICBjb25zdCBsaW5lcyA9IHN2Z1xuICAgIC5zZWxlY3RBbGwoJ2xpbmUnKVxuICAgIC5kYXRhKGxpbmtzKVxuICAgIC5qb2luKCdsaW5lJylcbiAgICAuYXR0cignc3Ryb2tlJywgJ3doaXRlJylcbiAgICAuYXR0cignZmlsbCcsICd3aGl0ZScpO1xuICBjb25zdCBzaW11bGF0aW9uID0gZDNcbiAgICAuZm9yY2VTaW11bGF0aW9uKG5vZGVzLCAoZCkgPT4gZC5pZClcbiAgXHQuZm9yY2UoJ2NoYXJnZScsIGZvcmNlTWFueUJvZHkoKSlcbiAgICAuZm9yY2UoJ2xpbmsnLCBmb3JjZUxpbmsobGlua3MpKVxuICAgIC5mb3JjZShcbiAgICAgICdjZW50ZXInLFxuICAgICAgZm9yY2VDZW50ZXIoNTAwMCAvIDIsIDcwMDAgLyAyKVxuICAgICk7XG5cbiAgc2ltdWxhdGlvbi5vbigndGljaycsICgpID0+IHtcbiAgICBjaXJjbGVzXG4gICAgICAuYXR0cignY3gnLCAobm9kZSkgPT4gbm9kZS54KVxuICAgICAgLmF0dHIoJ2N5JywgKG5vZGUpID0+IG5vZGUueSk7XG5cbiAgICB0ZXh0c1xuICAgICAgLmF0dHIoJ3gnLCAobm9kZSkgPT4gbm9kZS54KVxuICAgICAgLmF0dHIoJ3knLCAobm9kZSkgPT4gbm9kZS55KTtcblxuICAgIGxpbmVzXG4gICAgICAuYXR0cigneDEnLCAobGluaykgPT4gbGluay5zb3VyY2UueClcbiAgICAgIC5hdHRyKCd4MicsIChsaW5rKSA9PiBsaW5rLnRhcmdldC54KVxuICAgICAgLmF0dHIoJ3kxJywgKGxpbmspID0+IGxpbmsuc291cmNlLnkpXG4gICAgICAuYXR0cigneTInLCAobGluaykgPT4gbGluay50YXJnZXQueSk7XG4gIH0pO1xufSk7XG59XG5cblxuY29uc3Qgc2hvd1NjYXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjYXR0ZXJQbG90Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmFwaCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmNvbnN0IHNob3dOZXR3b3JrID0gZnVuY3Rpb24oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2F0dGVyUGxvdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmFwaCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICByZW5kZXJOZXR3b3JrKCk7XG59XG5cbmNvbnN0IHNjYXR0ZXJfcGxvdF9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhdHRlcl9wbG90Jyk7XG5zY2F0dGVyX3Bsb3RfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1NjYXR0ZXIpO1xuXG5jb25zdCBhY3Rvcl9uZXR3b3JrX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY3Rvcl9uZXR3b3JrJyk7XG5hY3Rvcl9uZXR3b3JrX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dOZXR3b3JrKTtcblxubmV0d29ya09yaWdpbkNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyTmV0d29yayk7Il0sIm5hbWVzIjpbImF4aXNMZWZ0IiwiYXhpc0JvdHRvbSIsInNjYWxlTGluZWFyIiwiZXh0ZW50Iiwic2VsZWN0IiwiY3N2UGFyc2UiLCJzZWxlY3RBbGwiLCJmb3JjZU1hbnlCb2R5IiwiZm9yY2VMaW5rIiwiZm9yY2VDZW50ZXIiXSwibWFwcGluZ3MiOiI7OztFQUVPLE1BQU0sSUFBSSxHQUFHO0VBQ3BCLEVBQUUsU0FBUztFQUNYLEVBQUU7RUFDRixJQUFJLE1BQU07RUFDVixJQUFJLE1BQU07RUFDVixJQUFJLFVBQVU7RUFDZCxJQUFJLFVBQVU7RUFDZCxJQUFJLGdCQUFnQixHQUFHLEVBQUU7RUFDekIsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFO0VBQ3pCLEdBQUc7RUFDSCxLQUFLO0VBQ0wsRUFBRSxTQUFTO0VBQ1gsS0FBSyxTQUFTLENBQUMsVUFBVSxDQUFDO0VBQzFCLEtBQUssSUFBSSxD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USxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0VBQ3RFLFdBQVcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztFQUNuRSxXQUFXLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7RUFDbEUsV0FBVyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0VBQ2xFLFdBQVcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztFQUNuRSxXQUFXLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7RUFDcEUsV0FBVyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0VBQ3BFLFdBQVcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQztFQUNwRSxXQUFXLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUM7RUFDckUsV0FBVyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDO0VBQ3JFLFdBQVcsS0FB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