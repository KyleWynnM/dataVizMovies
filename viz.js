import { csvParse, select, selectAll } from 'd3';
import { scatterPlot } from './scatterPlot';

export const viz = (
  container,
  { state, setState, bitString }
) => {
  const width = window.innerWidth;
  const height = window.innerHeight - 50;

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
        const data = csvParse(csvString);

        setState((state) => ({
          ...state,
          data,
        }));
      });
  }
};
