const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

// 将json转换为excel
function json2excel (inputDir, outputPath) {
  if (!inputDir || !outputPath) {
    throw "请输入 输入文件夹路径 和 输出文件路径";
  }
  console.log("开始转换……");
  const files = fs.readdirSync(inputDir);
  const fileNames = files.map((name) => name.split(".")[0]);
  const jsonObj = {};
  files.forEach((x, index) => {
    const file_path = path.join(inputDir, x);
    const file = fs.readFileSync(file_path, "utf-8");
    jsonObj[fileNames[index]] = JSON.parse(file);
  });
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
    filename: outputPath,
  });
  const worksheet = workbook.addWorksheet("Sheet");
  const columns = [
    { header: "module", key: "module", width: 10 },
    { header: "key", key: "key", width: 20 },
  ];
  fileNames.forEach((key) => {
    columns.push({
      header: key,
      key: key,
      width: 40,
    });
  });
  worksheet.columns = columns;
  var modules = Object.keys(jsonObj[fileNames[0]]);
  modules.forEach((module) => {
    Object.keys(jsonObj[fileNames[0]][module]).forEach((key) => {
      const rowValue = {
        module: module,
        key: key,
      };
      fileNames.forEach((lang) => {
        rowValue[lang] = jsonObj[lang][module][key];
      });
      worksheet.addRow(rowValue).commit();
    });
  });
  workbook.commit();
  console.log("转换成功！");
}

// 将excel转换为json
async function excel2json (inputPath, outputDir) {
  if (!inputPath || !outputDir) {
    throw "请输入 输入文件路径 和 输出文件夹路径";
  }
  console.log("开始转换……");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputPath);
  const worksheet = workbook.getWorksheet(1);
  const rows = [];
  worksheet.eachRow(function (row, rowNumber) {
    rows.push(row.values.slice(1));
  });
  const jsonObj = {};
  const keys = rows.shift();
  const langs = keys.slice(2);
  langs.forEach((lang) => {
    jsonObj[lang] = {};
  });
  rows.forEach((row) => {
    langs.forEach((lang) => {
      jsonObj[lang][row[0]] = jsonObj[lang][row[0]] || {};
      const index = keys.indexOf(lang);
      jsonObj[lang][row[0]][row[1]] = row[index];
    });
  });
  langs.forEach((lang) => {
    const file_path = path.join(outputDir, lang + ".json");
    fs.writeFileSync(file_path, JSON.stringify(jsonObj[lang], null, 2));
  });
  console.log("转换成功！");
}
module.exports = {
  json2excel,
  excel2json,
};
