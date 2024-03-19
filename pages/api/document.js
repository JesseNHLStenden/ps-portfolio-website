const fs = require('fs');
const path = require('path');

// Define document and image directories
const documentDirectory = path.join(process.cwd(), 'public', 'documents');
const imageDirectory = path.join(documentDirectory, 'thumbnails');

export default function handler(req, res) {
  // Read the contents of the document directory
  fs.readdir(documentDirectory, (err, files) => {
    if (err) {
      console.error('Error reading document directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Filter PDF files
    const pdfFiles = files.filter(file => path.extname(file) === '.pdf');

    // Initialize array to store thumbnails
    const thumbnails = [];

    // Process each PDF file
    pdfFiles.forEach(pdfLink => {
      const webpPath = path.join(imageDirectory, `${path.parse(pdfLink).name}.webp`);
      const imageFile = fs.existsSync(webpPath) ? `/documents/thumbnails/${path.parse(pdfLink).name}.webp` : "https://placehold.co/240x340";
      const documentName = extractDocumentName(pdfLink);

      // Extract year and semester information from the filename
      const [year, semester] = extractYearAndSemester(pdfLink);

      // Add thumbnail details to the array
      thumbnails.push({
        thumbnail: imageFile,
        documentName: documentName,
        pdfLink: `/documents/${pdfLink}`,
        year: year,
        semester: semester
      });
    });

    // Set response content type to JSON
    res.status(200).json(thumbnails);
  });
}

// Function to extract year and semester information from the filename
function extractYearAndSemester(filename) {
  // Assuming the filename follows the format: "Voorberijden Individuele Presentaties - Y1S1.pdf"
  const match = filename.match(/Y(\d)S(\d)/);
  if (match) {
    const year = parseInt(match[1]);
    const semester = parseInt(match[2]);
    return [year, semester];
  } else {
    // Default to year 1, semester 1 if no match is found
    return [1, 1];
  }
}

// Function to extract the document name without the year and semester information
function extractDocumentName(filename) {
  // Assuming the filename follows the format: "Voorberijden Individuele Presentaties - Y1S1.pdf"
  const match = filename.match(/^(.*?)\s*-\s*Y\d+S\d+\.pdf$/);
  if (match) {
    return match[1];
  } else {
    // Return the filename if the format doesn't match
    return path.parse(filename).name;
  }
}
