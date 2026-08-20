import fs from 'fs/promises';

async function writeFile() {
    try {
        await fs.writeFile('example.txt', 'Hello, Node.js File System!');
        console.log('File written successfully.');
    } catch (error) {
        console.error('Error writing file:', error.message);
    }
}
writeFile();
