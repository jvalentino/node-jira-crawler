var xl = require('excel4node');
const out = require("../util/console-out");

function generate(outFile, flattenedList) {
  out.log(`Writing ${flattenedList.length} records to ${outFile}`);
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet('Sheet 1');

  // Create a reusable style
var style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  });

  // determine the keys/headers based on the first record
  const keys = Object.keys(flattenedList[0]);

  // write the headers
  let row = 1;
  for (let i = 0; i < keys.length; i++) {
    ws.cell(row, i + 1).string(keys[i]).style(style);
  }

  // write the records
  for (let record of flattenedList) {
    row++;
    for (let i = 0; i < keys.length; i++) {
      ws.cell(row, i + 1).string(`${record[keys[i]]}`).style(style);
    }
  }

  wb.write(outFile);

  out.log(" ");
}

module.exports = {
  generate: generate,
};