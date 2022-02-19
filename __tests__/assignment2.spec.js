const { test, expect } = require('@jest/globals');
var csv2json = require('csv2json');
var fs = require('fs');
 


describe("no header, not double quote enclosed, no dynamic typing, comma separated, valid input and output path, csv", () => {
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

describe("Header, double quote enclosed, contains double quotes, dynamic typing, valid input and output path, csv", () => {
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
            expect(e.code).toEqual('ENOENT');
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
            expect(e.code).toEqual('ENOENT');
        });
        readStream.on('error', function(e) {
            expect(e.code).toEqual('ENOENT');
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

describe("no header, not double quote enclosed, no dynamic typing, default separator, default input path, invalid output path, random", () => {
    test("Test_5", async() => {
        const writeStream = fs.createWriteStream('invalid/wouldthiswork/invalid_path');
        const readStream = fs.createReadStream('');
        writeStream.on('error', function(e) {
            expect(e.code).toEqual('ENOENT');
        });
        readStream.on('error', function(e) {
            expect(e.path).toEqual('');
        });
    });
});

describe("no header, not double quote enclosed, no dynamic typing, default separator, valid input path, default output path, empty", () => {
    test("Test_6", async() => {
        var writeStream = fs.createWriteStream('');
        writeStream.on('error', function(e) {
            expect(e.path).toEqual('');
        });
    });
});

describe("no header, not double quote enclosed, no dynamic typing, default separator, valid input and output path, empty", () => {
    test("Test_7", async() => {
        var expected;
        var generated;
        
        var promise = new Promise((resolve, reject) => {
            var writeStream = fs.createWriteStream('json/test7.json');
            fs.createReadStream('csv/emptyInput.csv').pipe(csv2json({})).pipe(writeStream).on('finish', resolve).on('error', reject);
        });

        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync('expectedOutput/empty.json', 'utf-8'));
            generated = JSON.parse(fs.readFileSync('json/test7.json', 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});

describe("no header, not double quote enclosed, no dynamic typing, default separator, valid input and output path, random", () => {
    test("Test_8", async() => {
        var expected;
        var generated;
        
        var promise = new Promise((resolve, reject) => {
            var writeStream = fs.createWriteStream('json/test8.json');
            fs.createReadStream('csv/randomInput.csv').pipe(csv2json({})).pipe(writeStream).on('finish', resolve).on('error', reject);
        });

        return promise.finally(()=>{
            expected = JSON.parse(fs.readFileSync('expectedOutput/random.json', 'utf-8'));
            generated = JSON.parse(fs.readFileSync('json/test8.json', 'utf-8'));
            expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
        });
    });
});

describe("no header, not double quote enclosed, no dynamic typing, default separator, valid input, default output path, random", () => {
    test("Test_9", async() => {
        const writeStream = fs.createWriteStream('');
        const readStream = fs.createReadStream('csv/randomInput.csv');
        writeStream.on('error', function(e) {
            expect(e.path).toEqual('');
        });
    });
});


describe("no header, not double quote enclosed, no dynamic typing, not comma separated, valid input but invalid output path, no content(empty)", () => {
    test("Test_10", async() => {
        var expected;
        var generatedPath = 'invalid_path/test10.json';
        var writeStream = fs.createWriteStream(generatedPath);
        var readStream = fs.createReadStream('csv/test10.csv');

        writeStream.on('error', function(e) {
            expect(e.code).toEqual('ENOENT');
        });
        readStream.on('error', function(e) {
            expect(e.code).toEqual('ENOENT');
        });

        writeStream.on('ready', function() {
            readStream.on('ready', async function() {
                var promise = new Promise((resolve, reject) => {
                    readStream.pipe(csv2json()).pipe(testFilePath).on('finish', resolve).on('error', reject);
                });
                try {
                    return await promise;
                } finally {
                    expected = JSON.parse(fs.readFileSync('expectedOutput/test10.json', 'utf-8'));
                    generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
                    expect(JSON.stringify(expected)==JSON.stringify(generated)).toEqual(true);
                }
            });
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