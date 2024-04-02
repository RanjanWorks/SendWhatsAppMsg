// developed by ranjan kashyap 
// 6266245085
let model = document.querySelector(".model");
let header = document.getElementById("header");
let footer = document.getElementById("footer");
let time = document.getElementById("time");
let msg = document.getElementById("text");
let chat = document.querySelector(".chat");
let previews = chat.querySelectorAll("span");
let uploadContainer = document.getElementById("uploadContainer");
let viewContainer = document.getElementById("viewContainer");

uploadContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadContainer.classList.add("drag-over");
});

uploadContainer.addEventListener("dragleave", () => {
  uploadContainer.classList.remove("drag-over");
});

uploadContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadContainer.classList.remove("drag-over");
  handleFiles(e.dataTransfer.files);
});
viewContainer.style.display = "none";
function hideUploadContainer() {
  viewContainer.style.display = "grid";
  uploadContainer.style.display = "none";
}
function show() {
  previews[0].innerHTML = header.value;
  previews[1].innerHTML = text.value;
  previews[2].innerHTML = time.value;
  previews[3].innerHTML = footer.value;
  model.classList.add("show");
}
function closem() {
  model.classList.remove("show");
}
// Event listener for file input
document
  .getElementById("fileinput")
  .addEventListener("change", handleFile);
const data = [];

function handleFile(e) {
  const file = e.target.files[0];

  if (file) {
    hideUploadContainer();
    readCSV(file);
  }
}

function handleFiles(dataTransfer) {
  if (dataTransfer.length > 0) {
    hideUploadContainer();
    readCSV(dataTransfer[0]);
  }
}

function readCSV(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const contents = e.target.result;
    const lines = contents.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line) {
        const values = line.split(",");
        data.push(values);
      }
    }

    // Display the CSV data (you can customize this part)
    displayData(data);
  };

  reader.readAsText(file);
}

function displayData(data) {
  let displayArea = document.getElementById("display");

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Create table header
  const headerRow = document.createElement("tr");
  for (const header of data[0]) {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);

  // Create table rows for data
  for (let i = 1; i < data.length; i++) {
    const row = document.createElement("tr");
    for (const value of data[i]) {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  // Clear any existing content and append the table
  displayArea.innerHTML = "";
  displayArea.appendChild(table);
}

function maketable(data) {
  const existingTable = document.querySelector(".tablePreview table");
  if (existingTable) {
    existingTable.remove(); // Remove the existing table
  }

  const table = document.createElement("table");
  table.className = "Ranjan";
  const headerNames = [
    "Name",
    "Number",
    "Message",
    "Whatsapp",
    "Message",
  ];

  // Create the table headers
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const uniqueNumbers = new Set();
  for (let i = 0; i < 5; i++) {
    const th = document.createElement("th");
    th.innerHTML = headerNames[i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement("tbody");

  for (let i = 1; i < data.length; i++) {
    const middle = `Dear ${data[i][0]}, ${text.value}`;
    const message = `${header.value}\n${middle}\n${time.value}\n${footer.value}`;
    const name = data[i][0];
    const mob = data[i][1].trim();
    let number = removeFirstTwoDigits(mob);
    const link = `https://wa.me/91${number}?text=${encodeURIComponent(
      message
    )}`;
    const link2 = `sms:91${number}?body=${encodeURIComponent(message)}`;

    const row = document.createElement("tr");
    if (uniqueNumbers.has(number)) {
      row.classList.add("duplicate");
    } else {
      uniqueNumbers.add(number);
    }
    // Create a cell for the "Name" column and append the name
    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    row.appendChild(nameCell);

    // Create a cell for the "Number" column and append the number

    const numberCell = document.createElement("td");
    numberCell.textContent = number;

    row.appendChild(numberCell);
    const numberCell1 = document.createElement("td");
    numberCell1.textContent = message;
    row.appendChild(numberCell1);

    const actionCell = document.createElement("td");
    const textCell = document.createElement("td");

    const actionLink = document.createElement("a");
    actionLink.href = link;
    let it = document.createElement("i");
    it.classList.add("material-icons");
    it.textContent = "send";
    actionLink.append(it);
    actionLink.target = "_blank"; // Open link in a new tab
    const textlink = document.createElement("a");
    textlink.href = link2;
    let ti = document.createElement("i");
    ti.classList.add("material-icons");
    ti.textContent = "send";
    textlink.append(ti);
    textlink.target = "_blank"; // Open link in a new tab

    actionCell.appendChild(actionLink);
    textCell.appendChild(textlink);
    row.appendChild(actionCell);
    row.appendChild(textCell);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append the table to the document or any specific container
  document.querySelector(".tablePreview").appendChild(table);
}

function newTab() {
  maketable(data);
  setTimeout(() => {
    let a = document.createElement("a");
    a.href = "#scroll";

    viewContainer.scrollIntoView({ behavior: "smooth" });
    a.click();
  }, 200);
}

function removeFirstTwoDigits(phoneNumber) {
  if (phoneNumber.length === 12 && /^\d+$/.test(phoneNumber)) {
    return phoneNumber.slice(2);
  }
  return phoneNumber; // If the number is not 12 digits, return the original number
}

//   var cleave = new Cleave('#text', {
//     prefix: 'Dear {NAME},',
//     delimiter: '-',
//     uppercase: false
// })
