const xlsx = require('xlsx');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const excelPath = "C:\\Users\\PC\\Desktop\\ANTIGRAVITY SKILLS\\COBERTURA - ENVIOS EXPRESS.xlsx";
const docPath = "C:\\Users\\PC\\Desktop\\ANTIGRAVITY SKILLS\\ENVIOSXPRESS_Guia_v3.1.docx";

console.log("=== EXCEL DATA ===");
const workbook = xlsx.readFile(excelPath);
workbook.SheetNames.forEach(sheetName => {
  console.log(`\nSheet: ${sheetName}`);
  const data = xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]);
  console.log(data);
});

console.log("\n=== DOCX DATA ===");
mammoth.extractRawText({path: docPath})
  .then(function(result) {
    console.log(result.value);
  })
  .catch(function(err) {
    console.error(err);
  });
