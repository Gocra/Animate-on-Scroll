const convertGridToRows = (grid) => {
  const gridElements = [...grid.children];
  let rows = [[]];

  let currentY = gridElements[0].getBoundingClientRect().y;
  gridElements.forEach((child, i) => {
    const newY = child.getBoundingClientRect().y;
    if (newY > currentY) {
      currentY = newY;
      rows.push([]);
    }
    rows[rows.length - 1].push(child);
  });

  return rows;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

// add delay to all grid elements
const GRID_TRANSITION_DELAY = 250;
const grids = document.querySelectorAll(".grid");

grids.forEach((grid) => {
  // animate each row in time
  if (grid.classList.contains("animate-rows")) {
    const gridRows = convertGridToRows(grid);
    gridRows.forEach((row) => {
      row.forEach((el, i) => {
        el.style.transitionDelay = `${i * GRID_TRANSITION_DELAY}ms`;
      });
    });

    // animate each item
  } else {
    gridElements = [...grid.children];
    gridElements.forEach((el, i) => {
      el.style.transitionDelay = `${i * GRID_TRANSITION_DELAY}ms`;
    });
  }
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
