import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const App = () => {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [emailList, setEmailList] = useState([]);
  function handlemsg(e) {
    setMsg(e.target.value);
  }
  function handlefile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[sheetName];
      const emailList = XLSX.utils.sheet_to_json(workSheet, { header: "A" });
      const totalemail = emailList.map(function (item) {
        return item.A;
      });
      console.log(totalemail);
      setEmailList(totalemail);
    };
    reader.readAsBinaryString(file);
  }
  function send() {
    setStatus(true);
    axios
      .post("http://localhost:8000/sendemail", {
        msg: msg,
        emailList: emailList,
      })
      .then(function (data) {
        if (data.data === true) {
          alert("Email Sent Successfully");
          setStatus(false);
        } else {
          alert("Failed");
        }
      });
  }
  return (
    <div>
      <div className="bg-blue-700 text-white text-center">
        <h1 className="text-2xl font-medium py-5">BulkMail</h1>
      </div>
      <div className="bg-blue-600 text-white text-center">
        <h1 className=" font-medium py-5">
          We can help your business with sending multiple emails at once
        </h1>
      </div>
      <div className="bg-blue-500 text-white text-center">
        <h1 className=" font-medium py-5">Drag and Drop</h1>
      </div>
      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-5 ">
        <textarea
          onChange={handlemsg}
          value={msg}
          className="bg-white w-[80%] h-52 py-2 outline-none px-2 border border-black rounded"
          placeholder="Enter the email text....."
        ></textarea>
        <div>
          <input
            onChange={handlefile}
            type="file"
            className="border-4 border-dashed py-3 px-4 mt-5 mb-5"
          />
        </div>
        <p>Total Emails in the file:{emailList.length}</p>
        <button
          onClick={send}
          className="bg-blue-700 py-2 px-4 text-white font-bold text-xl rounded w-fit mt-5"
        >
          {status ? "Sending..." : "Send"}
        </button>
      </div>
      <div className="bg-blue-300 text-white p-17 text-center"></div>
      <div className="bg-blue-200 p-16 text-white text-center"></div>
    </div>
  );
};

export default App;
