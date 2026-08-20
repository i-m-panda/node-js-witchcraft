import fs from 'fs/promises';

async function checkFile() {
    try {
        await fs.access('example.txt');
        console.log('File exists.');
    } catch {
        console.log('File does not exist.');
    }
}
checkFile();
