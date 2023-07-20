const { createFileEntry, getFileById } = require("./file");

// Example usage:
// const fileName = "sample.txt";
// const fileDataBytes = Buffer.from("73616d706c65", "hex"); // Example data in hexadecimal format
// createFileEntry(fileName, fileDataBytes)
//   .then((file) => {
//     console.log("File entry created:", file);
//   })
//   .catch((error) => {
//     console.error("Error creating file entry:", error);
//   });

// Example usage:
const fileId = 'd4cfad91-8ee5-4f29-bae2-4f98c20b12fa'; // Replace this with the actual ID of the file you want to fetch
getFileById(fileId)
  .then((file) => {
    console.log('File fetched by ID:', file);
  })
  .catch((error) => {
    console.error('Error fetching file by ID:', error);
  });