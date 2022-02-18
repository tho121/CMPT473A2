const { test, expect } = require('@jest/globals');
var csv2json = require('csv2json');
var fs = require('fs');
const { FilesManager } = require('turbodepot-node');
let filesManager = new FilesManager();
 

//fs.createReadStream('csv/data.csv').pipe(csv2json({separator: ';'})).pipe(fs.createWriteStream('json/data.json'));
//fs.createReadStream('csv/data2.csv').pipe(csv2json()).pipe(fs.createWriteStream('json/data2.json'));
//fs.createReadStream('csv/no_header.csv').pipe(csv2json()).pipe(fs.createWriteStream('json/no_header.json'));
//fs.createReadStream('csv/dynamic.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/dynamic.json'));
//fs.createReadStream('csv/dynamic_bounds.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/dynamic_bounds.json'));
//fs.createReadStream('csv/quotes1.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/quotes1.json'));
//fs.createReadStream('csv/quotes2.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/quotes2.json'));
//fs.createReadStream('csv/line_break.csv').pipe(csv2json({dynamicTyping: true})).pipe(fs.createWriteStream('json/line_break.json'));

describe("no header, not double quote enclosed, no dynamic typing, comma separated, tab not as separator, valid input and output path, csv", () => {
    test("Test_1", async() => {
        var expected;
        var generated;
        
        var promise = new Promise((resolve, reject) => {
            var writeStream = fs.createWriteStream('json/test1.json');
            fs.createReadStream('csv/test1.csv').pipe(csv2json({separator: ','})).pipe(writeStream).on('finish', resolve).on('error', reject);
        });

        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync('expectedOutput/test1.json', 'utf-8'));
            generated = JSON.parse(fs.readFileSync('json/test1.json', 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});

describe("Header, double quote enclosed, contains double quotes, dynamic typing, tab as separator, valid input and output path, csv", () => {
    test("Test_2", async() => {
        var expected;
        var generated;
        
        var promise = new Promise((resolve, reject) => {
            var writeStream = fs.createWriteStream('json/test2.json');
            fs.createReadStream('csv/test2.csv').pipe(csv2json({dynamicTyping: true, separator: '~'})).pipe(writeStream).on('finish', resolve).on('error', reject);
        });

        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync('expectedOutput/test2.json', 'utf-8'));
            generated = JSON.parse(fs.readFileSync('json/test2.json', 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});

describe("no header, not double quote enclosed, no dynamic typing, default separator, valid input path, invalid output path, random", () => {
    test("Test_3", async() => {
        var expected;
        var generated;
        const writeStream = fs.createWriteStream('invalid/path/hi');
        writeStream.on('error', function(e) {
            expect(e.errno).toEqual(-2);
        });

        writeStream.on('ready', function() {
            var promise = new Promise((resolve, reject) => {
                fs.createReadStream('csv/randomInput.csv').pipe(csv2json()).pipe(writeStream).on('finish', resolve).on('error', reject);
            });
            return promise.finally(()=>{
                expected = JSON.parse(fs.readFileSync('expectedOutput/test3.json/but/this/doesnt/exist', 'utf-8'));
                generated = JSON.parse(fs.readFileSync('json/test3.son/but/this/doesnt/exist', 'utf-8'));
                expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
            });
        });
    });
});

describe("no header, not double quote enclosed, no dynamic typing, default separator, invalid input and output path, random", () => {
    test("Test_4", async() => {
        var expected;
        var generated;
        const writeStream = fs.createWriteStream('invalid/wouldthiswork/invalid_path');
        const readStream = fs.createReadStream('invalid/path/again');
        writeStream.on('error', function(e) {
            expect(e.errno).toEqual(-2);
        });
        readStream.on('error', function(e) {
            expect(e.errno).toEqual(-2);
        });

        writeStream.on('ready', function() {
            readStream.on('ready', async function() {
                var promise = new Promise((resolve, reject) => {
                    readStream.pipe(csv2json()).pipe(writeStream).on('finish', resolve).on('error', reject);
                });
                try {
                    return await promise;
                } finally {
                    expected = JSON.parse(fs.readFileSync('expectedOutput/test4.json/but/this/doesnt/exist', 'utf-8'));
                    generated = JSON.parse(fs.readFileSync('json/test4.son/but/this/doesnt/exist', 'utf-8'));
                    expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
                }
            });
        });
    });
});

