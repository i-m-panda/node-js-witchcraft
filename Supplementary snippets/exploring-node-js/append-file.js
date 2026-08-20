import fs from 'fs/promises';

async function appendFile() {
    try {
        await fs.appendFile('example.txt', '\nThis is a new line.');
        console.log('Content appended successfully.');
    } catch (error) {
        console.error('Error appending file:', error.message);
    }
}
appendFile();
