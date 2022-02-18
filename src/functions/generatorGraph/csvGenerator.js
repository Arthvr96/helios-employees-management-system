function htmlToCSV(html, filename) {
  const shifts = [...html.querySelectorAll('.shifts')];
  const rowsGraph = [];
  const rowsGraphNames = [];

  shifts.forEach((shift) => {
    const numbersOfRows = shift.children[0].querySelectorAll('tr').length;
    const rowsShift = [];

    for (let i = 0; i < numbersOfRows; i += 1) {
      const row = shift.querySelectorAll(`.row${i}`);
      rowsShift.push(row);
    }
    rowsGraph.push(rowsShift);
  });

  rowsGraph.forEach((shift) => {
    const arr = [];
    shift.forEach((el) => {
      const shiftRows = [];
      el.forEach((item, i) => {
        [...item.children].forEach((values, j) => {
          if (i === 0 && j === 0) {
            shiftRows.push(`,`);
            shiftRows.push(`${values.innerHTML}`);
          } else {
            shiftRows.push(values.innerHTML);
          }
        });
      });
      arr.push(shiftRows.join(','));
    });
    rowsGraphNames.push(arr.join('\n'));
  });

  downloadCSVFile(rowsGraphNames.join('\n'), filename);
}

function downloadCSVFile(csv, filename) {
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');
  const placeholder = document.querySelector('.placeholder');

  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  placeholder.appendChild(downloadLink);

  downloadLink.click();
}

export const csvGenerator = () => {
  const table = document.querySelector('.graph');
  htmlToCSV(table, 'students.csv');
};
