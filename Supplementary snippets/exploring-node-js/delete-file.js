import fs from 'fs/promises';

async function deleteFile() {
    try {
        await fs.unlink('example.txt');
        console.log('File deleted successfully.');
    } catch (error) {
        console.error('Error deleting file:', error.message);
    }
}
deleteFile();
