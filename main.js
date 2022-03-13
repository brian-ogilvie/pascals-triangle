const triangle = document.getElementById('triangle');
const button = document.getElementById('calculate');
const numRowsInput = document.getElementById('numRows');
const form = document.getElementById('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  calculate();
});

function calculate() {
  const result = [[1n]];
  const numRows = parseInt(numRowsInput.value || '5', 10);
  triangle.innerHTML = null;
  for (let i = 1; i < numRows; i++) {
    const prevRow = result[i - 1];
    const newRow = [];
    for (let j = 0; j <= prevRow.length; j++) {
      if (j === 0 || j === prevRow.length) {
        newRow.push(1n);
        continue;
      }
      const sum = prevRow[j] + prevRow[j - 1];
      newRow.push(sum);
    }
    result.push(newRow);
  }

  result.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    row.forEach(entry => {
      const hex = buildHex(entry);
      rowDiv.appendChild(hex);
    });
    triangle.appendChild(rowDiv);
  });
}

function buildHex(val) {
  const hex = document.createElement('div');
  hex.classList.add('hex');
  hex.tabIndex = '0';
  const top = document.createElement('div');
  top.classList.add('top');
  const content = document.createElement('div');
  content.classList.add('content');
  content.textContent = val;

  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.textContent = val;

  const bottom = document.createElement('div');
  bottom.classList.add('bottom');

  hex.appendChild(top);
  hex.appendChild(content);
  hex.appendChild(bottom);
  hex.appendChild(tooltip);

  return hex;
}

button.addEventListener('click', calculate);
