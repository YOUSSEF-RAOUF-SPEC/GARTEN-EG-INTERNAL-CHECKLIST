const xlsx = require('xlsx');
const fs = require('fs');

const files = [
    'Garten_Bar_Checklist (1).xlsx',
    'Garten_Service_Checklist.xlsx',
    'Garten_Shisha_Checklist.xlsx'
];

const result = {};

for (const file of files) {
    if (fs.existsSync(file)) {
        const workbook = xlsx.readFile(file);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        result[file] = data.slice(0, 50); // Get first 50 rows to preview
    } else {
        console.log(`File not found: ${file}`);
    }
}

fs.writeFileSync('preview.json', JSON.stringify(result, null, 2));
console.log('Done mapping.');
