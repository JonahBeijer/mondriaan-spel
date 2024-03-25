document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  const cellCount = 10;
  const cells = [];

  let currentColor = '';

  function createGrid() {
    for (let i = 0; i < cellCount * cellCount; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      canvas.appendChild(cell);
      cells.push(cell);
    }
  }

  createGrid();

  function getRandomCell() {
    const randomIndex = Math.floor(Math.random() * cells.length);
    return cells[randomIndex];
  }

  function setColor(cell, color) {
    cell.classList.remove('red', 'blue', 'black', 'yellow', 'white');
    if (color === 'white') {
      cell.style.backgroundColor = 'white';
    } else {
      cell.classList.add(color);
    }
  }

  function isBlockOverlap(startRow, startCol, randomSize) {
    // Loop through the cells that the new block will occupy
    for (let i = startRow; i < Math.min(startRow + randomSize, cellCount); i++) {
      for (let j = startCol; j < Math.min(startCol + randomSize, cellCount); j++) {
        const index = i * cellCount + j;
        const cell = cells[index];
        // Check if the cell is already colored with a different color
        if (cell.classList.length > 1) {
          return true; // Block overlaps
        }
      }
    }
    return false; // Block does not overlap
  }

  function drawBlock(startIndex) {
    const startRow = Math.floor(startIndex / cellCount);
    const startCol = startIndex % cellCount;

    let randomSize;

    if (currentColor === 'white') {
      randomSize = Math.floor(Math.random() * 4) + 1; // Random grootte: 1, 2, 3 of 4 (1x1, 2x2, 3x3 of 4x4 voor wit)
    } else {
      randomSize = Math.floor(Math.random() * 3) + 1; // Random grootte: 1, 2 of 3 (1x1, 2x1 of 2x2)
    }

    // Check if the new block will overlap with existing blocks
    if (isBlockOverlap(startRow, startCol, randomSize)) {
      // If there's overlap, do not draw the block
      return;
    }

    let sameColorCells = 0;

    for (let i = startRow; i < Math.min(startRow + randomSize, cellCount); i++) {
      for (let j = startCol; j < Math.min(startCol + randomSize, cellCount); j++) {
        const index = i * cellCount + j;
        const cell = cells[index];
        setColor(cell, currentColor);

        // Check if the cell has the same color as the current color
        if (cell.classList.contains(currentColor)) {
          sameColorCells++;
        }
      }
    }

    }

  function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    switch (key) {
      case 'r':
        currentColor = 'red';
        break;
      case 'b':
        currentColor = 'blue';
        break;
      case 'z':
        currentColor = 'black';
        break;
      case 'g':
        currentColor = 'yellow';
        break;
      case 'w':
        currentColor = 'white';
        break;
      default:
        break;
    }
    if (['r', 'b', 'z', 'g', 'w'].includes(key)) {
      const randomCell = getRandomCell();
      drawBlock(cells.indexOf(randomCell));
    }
  }

  document.addEventListener('keydown', handleKeyPress);
});
