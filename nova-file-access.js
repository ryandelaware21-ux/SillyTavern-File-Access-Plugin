// nova-file-access.js
(function() {
    const fs = require('fs');
    const path = require('path');

    function listFiles(args) {
        const targetPath = args.join(' ') || '.';
        try {
            const files = fs.readdirSync(targetPath);
            return `Files in ${path.resolve(targetPath)}:\n${files.join('\n')}`;
        } catch (error) {
            return `Error listing files: ${error.message}`;
        }
    }

    function readFile(args) {
        const filePath = args.join(' ');
        if (!filePath) {
            return 'Error: Please provide a file path to read.';
        }
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            return `Content of ${path.resolve(filePath)}:\n\n${content}`;
        } catch (error) {
            return `Error reading file: ${error.message}`;
        }
    }

    registerSlashCommand('list', listFiles, ['all'], '<path>', 'Lists files in a directory. Defaults to the current directory.');
    registerSlashCommand('read', readFile, ['all'], '<file_path>', 'Reads the content of a specified file.');

    console.log('NOVA File Access Plugin loaded successfully.');
})();
