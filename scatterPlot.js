import { extent, scaleLinear, symbol, selectAll } from 'd3';
import { axes } from './axes';

export const scatterPlot = (
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
  }
  
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
  }
  
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
  let getYears = (d) => d.Year;
  
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
      
      
	const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
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
    });;
};
