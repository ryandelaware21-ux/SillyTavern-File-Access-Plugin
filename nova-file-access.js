// Filename: index.js
const fs = require('fs').promises;
const path = require('path');

const handler = async (command, args) => {
    if (command !== '/list' && command !== '/read') {
        return { is_valid: false };
    }const fullPath = args.join(' ');

if (!fullPath || !path.isAbsolute(fullPath)) {
    return { is_valid: true, response: "Error: Please provide an absolute path (e.g., C:\\Users\\Ryan\\Desktop)." };
}

try {
    let responseText = '';
    if (command === '/list') {
        const files = await fs.readdir(fullPath);
        responseText = files.length === 0 ? `Directory is empty: "${fullPath}"` : `Listing for "${fullPath}":\n- ${files.join('\n- ')}`;
    }

    if (command === '/read') {
        const content = await fs.readFile(fullPath, 'utf8');
        responseText = `Contents of "${fullPath}":\n\n---\n${content}\n---`;
    }

    return { is_valid: true, response: responseText };

} catch (error) {
    console.error("NOVA File Access Plugin Error:", error);
    return { is_valid: true, response: `Error accessing path "${fullPath}".\nDetails: ${error.message}` };
}
};

// This time, we only export the handler. The package.json provides the rest.
module.exports = {
    handler: handler,
};
