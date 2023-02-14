import { select } from 'd3';
import { viz } from './viz';
const container = d3.select('#app').node();
let state = {};

const checkboxes = select('#checkboxes');
const genres = selectAll('input');

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

const render = () => {
  viz(container, {
    state,
    setState,
  });
};

for (const genre of genres) {
  genre.addEventListener('click', updateCheckboxes);
  genre.addEventListener('click', render);
}

const setState = (next) => {
  state = next(state);
  render();
};

render();
