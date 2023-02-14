import { extent, scaleLinear, symbol } from 'd3';

export const scatterPlot = (
  selection,
  { data, width, height, xValue, yValue, genre, bitString }
) => {
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([100, width]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([height, 0]);

  const dotAppears = function(genre, bitString) {
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

  selection
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xScale(xValue(d)))
    .attr('cy', (d) => yScale(yValue(d)))
    .attr('r', (d) => dotAppears(genre(d), bitString));
};
