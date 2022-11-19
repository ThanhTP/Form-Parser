const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
let formidable = require("formidable");
let fs = require("fs");
const fileupload = require("express-fileupload");

const port = 5000;
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(
  fileupload({
    createParentPath: true,
  })
);

//const quickstart = require("./quickstart");
// Where we will keep books
let books = [];

app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/book", (req, res) => {
  // We will be coding here
});

app.post("/api/image-upload", upload.single("image"), (req, res) => {
  const image = req.image;

  var data = upload.single("image");

  //var result = quickstart(image).then((x) => console.log(x));
  res.send(apiResponse({ message: "File uploaded successfully.", image }));
});

app.post("/upload_files", upload.array("myFile"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
}

app.post("/api/image-uploadss", (req, res) => {
  let form = new formidable.IncomingForm();

  //Process the file upload in Node
  form.parse(req, async function (error, fields, file) {
    let filepath = file.image.filepath;
    let newpath = path.join(__dirname, "/uploads/");
    newpath += file.image.originalFilename;

    const resultProcess = await quickstart(newpath);
    //Copy the uploaded file to a custom folder
    fs.rename(filepath, newpath, function () {
      //Send a NodeJS file upload confirmation message
      res.send(resultProcess);
      //res.write("NodeJS File Upload Success!");
      res.end();
    });
  });
});

app.post("/upload-file1", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      console.log(req.files);

      file.mv("./uploads/" + file.name);
      const result = await quickstart("./uploads/" + file.name);
      res.send({
        status: "success",
        message: "File is uploaded",
        data: {
          result,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "global-brook-367615";
const location = "us"; // Format is 'us' or 'eu'
const processorId = "657980abba264a16"; // Create processor in Cloud Console
//const filePath = "./dat.jpg";

const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;

// Instantiates a client
// apiEndpoint regions available: eu-documentai.googleapis.com, us-documentai.googleapis.com (Required if using eu based processor)
// const client = new DocumentProcessorServiceClient({apiEndpoint: 'eu-documentai.googleapis.com'});
const client = new DocumentProcessorServiceClient();

async function quickstart(filePath) {
  let formData = [];
  // The full resource name of the processor, e.g.:
  // projects/project-id/locations/location/processor/processor-id
  // You must create new processors in the Cloud Console first
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  // Read the file into memory.
  const fs = require("fs").promises;
  const imageFile = await fs.readFile(filePath);

  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(imageFile).toString("base64");

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: "image/jpeg",
    },
  };

  // Recognizes text entities in the PDF document
  const [result] = await client.processDocument(request);

  console.log("Document processing complete.");

  // Read the table and form fields output from the processor
  // The form processor also contains OCR data. For more information
  // on how to parse OCR data please see the OCR sample.
  // For a full list of Document object attributes,
  // please reference this page: https://googleapis.dev/nodejs/documentai/latest/index.html
  const { document } = result;
  const { text } = document;
  console.log(`Full document text: ${JSON.stringify(text)}`);
  console.log(`There are ${document.pages.length} page(s) in this document.`);
  const sumDataTable = [];
  for (const page of document.pages) {
    console.log(`\n\n**** Page ${page.pageNumber} ****`);

    console.log(`Found ${page.tables.length} table(s):`);
    for (const table of page.tables) {
      const numCollumns = table.headerRows[0].cells.length;
      const numRows = table.bodyRows.length;
      console.log(`Table with ${numCollumns} columns and ${numRows} rows:`);
      sumDataTable.push(printTableInfo(table, text));
    }
    console.log(`Found ${page.formFields.length} form field(s):`);
    for (const field of page.formFields) {
      const fieldName = getText(field.fieldName.textAnchor, text).trim();
      const fieldValue = getText(field.fieldValue.textAnchor, text).trim();
      let dataValue = {
        fieldName: fieldName,
        fieldValue: fieldValue,
      };

      formData.push(dataValue);

      // console.log(
      //   `\t* ${JSON.stringify(fieldName)}: ${JSON.stringify(fieldValue)}`
      // );
    }

    return { formData: formData, tableData: sumDataTable };
  }
}

const printTableInfo = (table, text) => {
  // Print header row
  let headerRowText = "";
  for (const headerCell of table.headerRows[0].cells) {
    const headerCellText = getText(headerCell.layout.textAnchor, text);
    headerRowText += headerCellText.trim();
  }
  // console.log(
  //   `Collumns: ${headerRowText.substring(0, headerRowText.length - 3)}`
  // );
  //Print first body row
  let bodyRowText = "";
  for (const bodyCell of table.bodyRows[0].cells) {
    //console.log("bodycell", bodyCell);
    const bodyCellText = getText(bodyCell.layout.textAnchor, text);
    bodyRowText += bodyCellText.trim();
  }
  // console.log(
  //   `First row data: ${bodyRowText.substring(0, bodyRowText.length - 3)}`
  // );

  let index = 1;
  var tablcol = [];
  for (const bodyCell1 of table.bodyRows) {
    // console.log("bodydata", data);
    tablcol.push(printRow(bodyCell1, text, index));
    index += 1;
  }
  // console.log(tablcol, "check");
  // Print all body row
  // let bodytextData = [];
  // for (data of table.bodyRows) {
  //   for (cel of data.cells) {
  //     const bodytext = getText(cel.layout.textAnchor, text);
  //     const textRaw = `${JSON.stringify(bodytext.trim())} | `;
  //     bodytextData.push(textRaw);
  //   }
  // }
  // for (a of bodytextData) {
  //   console.log("Check,,,,,", a);
  // }
  return tablcol;
};

// Extract shards from the text field
const getText = (textAnchor, text) => {
  if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
    return "";
  }

  // First shard in document doesn't have startIndex property
  const startIndex = textAnchor.textSegments[0].startIndex || 0;
  const endIndex = textAnchor.textSegments[0].endIndex;

  return text.substring(startIndex, endIndex);
};

function printRow(data, text, i) {
  let bodydata = [];
  let bodyRowText = "";
  for (data of data.cells) {
    const bodyCellText = getText(data.layout.textAnchor, text);
    var datatest = bodyCellText.trim();
    bodydata.push(datatest);
    // bodyRowText += `${JSON.stringify(bodyCellText.trim())} | `;
  }

  //console.log(bodydata);
  // console.log(
  //   `The ${i} row data: ${bodyRowText.substring(0, bodyRowText.length - 3)}`
  // );
  return bodydata;
}
