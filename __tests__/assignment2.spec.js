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

var isEqualsJson = (obj1,obj2)=>{
    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);

    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}

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


describe("no header, not double quote enclosed, no dynamic typing, not comma separated, valid input but invalid output path, no content(empty)", () => {
    test("Test_10", async() => {
        var expected;
        var generatedPath = 'invalid_path/test10.json';

        //TODO:: Handling the error in tryCatch

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream('csv/test10.csv').pipe(csv2json()).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync('expectedOutput/test1.json', 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});


describe("header, double quote enclosed, dynamic typing, not comma separated, valid input and output path, no content(empty)", () => {
    test("Test_11", async() => {
        var expected;
        let generatedPath = 'json/test11.json'
        let expectedPath = 'expectedOutput/test11.json'
        let testFilePath = 'csv/test11.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json({dynamicTyping: true,separator: ''})).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});


describe("header, double quote enclosed,no dynamic typing, not comma separated, valid input and output path, csv content", () => {
    test("Test_12", async() => {
        var expected;
        let generatedPath = 'json/test12.json'
        let expectedPath = 'expectedOutput/test12.json'
        let testFilePath = 'csv/test12.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json({separator: ','})).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});


describe("no header, double quote enclosed, dynamic typing, ~ separated, valid input and output path, csv content", () => {
    test("Test_13", async() => {
        var expected;
        let generatedPath = 'json/test13.json'
        let expectedPath = 'expectedOutput/test13.json'
        let testFilePath = 'csv/test13.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json({dynamicTyping: true, separator: '~'})).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});


describe("header, no double quote enclosed, dynamic typing, ~ separated, valid input and output path, csv content", () => {
    test("Test_14", async() => {
        var expected;
        let generatedPath = 'json/test14.json'
        let expectedPath = 'expectedOutput/test14.json'
        let testFilePath = 'csv/test14.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json({dynamicTyping: true, separator: '~'})).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});



describe("header, double quote enclosed, no dynamic typing, no separator, valid input and output path, csv content", () => {
    test("Test_15", async() => {
        var expected;
        let generatedPath = 'json/test15.json'
        let expectedPath = 'expectedOutput/test15.json'
        let testFilePath = 'csv/test15.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json()).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});



describe("no header, no double quote enclosed, dynamic typing, comma seprated, valid input and output path, csv content", () => {
    test("Test_16", async() => {
        var expected;
        let generatedPath = 'json/test16.json'
        let expectedPath = 'expectedOutput/test16.json'
        let testFilePath = 'csv/test16.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json({dynamicTyping: true, separator: ','})).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});



describe("header, double quote enclosed, no dynamic typing, ~ seprated, valid input and output path, csv content", () => {
    test("Test_17", async() => {
        var expected;
        let generatedPath = 'json/test17.json'
        let expectedPath = 'expectedOutput/test17.json'
        let testFilePath = 'csv/test17.csv'

        var promise = new Promise((resolve, reject) => {
                    
            var writeStream = fs.createWriteStream(generatedPath);
            fs.createReadStream(testFilePath).pipe(csv2json({separator: '~'})).pipe(writeStream).on('finish', resolve).on('error', reject);

        });


        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync(expectedPath, 'utf-8'));
            generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});