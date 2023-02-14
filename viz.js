import { csvParse, select } from 'd3';
import { scatterPlot } from './scatterPlot';

export const viz = (
  container,
  { state, setState, bitString }
) => {
  const width = window.innerWidth - 100;
  const height = window.innerHeight - 100;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An array of objects
  const { data } = state;

  if (data && data !== 'LOADING') {
    svg.call(scatterPlot, {
      data,
      width,
      height,
      xValue: (d) => d.Rating,
      yValue: (d) => d.Revenue,
      genre: (d) => d.Genre,
      bitString: document.getElementById("bitstring").innerHTML,
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
        const data = csvParse(csvString);

        setState((state) => ({
          ...state,
          data,
        }));
      });
  }
};
