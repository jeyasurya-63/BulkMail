const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[sheetName];
    const emailList = XLSX.utils.sheet_to_json(workSheet, { header: "A" });
    console.log(emailList);
  };
  reader.readAsBinaryString(file);
});
