console.log("Hello World");

var csv2json = require('csv2json');
var fs = require('fs');
 

//fs.createReadStream('csv/data.csv').pipe(csv2json({separator: ';'})).pipe(fs.createWriteStream('json/data.json'));
//fs.createReadStream('csv/data2.csv').pipe(csv2json()).pipe(fs.createWriteStream('json/data2.json'));
//fs.createReadStream('csv/no_header.csv').pipe(csv2json()).pipe(fs.createWriteStream('json/no_header.json'));
//fs.createReadStream('csv/dynamic.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/dynamic.json'));
//fs.createReadStream('csv/dynamic_bounds.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/dynamic_bounds.json'));
//fs.createReadStream('csv/quotes1.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/quotes1.json'));
fs.createReadStream('csv/line_break.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/line_break.json'));