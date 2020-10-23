import React, {useState} from 'react';
import './styles.css';
import RoombaTable from './RoombaTable';

export function Upload() {
  const [files, setFiles] = useState("");
  var inputJson = "";

  const handleChange = e => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        inputJson = JSON.parse(e.target.result);
        setFiles(inputJson);
      };
    } 
    catch(err) {
      inputJson = "";
      alert("A file must be selected!")
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload Json file</h1>
        <input type="file" onChange={handleChange} />
        <RoombaTable data={files}></RoombaTable>
      </header>
    </div>
  );
}

export default Upload;
