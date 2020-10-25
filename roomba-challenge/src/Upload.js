import React, {useState} from 'react';
import './styles.css';
import RoombaTable from './RoombaTable';

/**
 * Upload component that asks the user for a JSON
 */
export function Upload() {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        var inputJson = JSON.parse(e.target.result);
        setFiles(inputJson);
      };
    } 
    //if the user exits out before selecting a file
    catch(err) {
      alert("A file must be selected!")
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Upload Json file</h1>
        <input type="file" onChange={handleChange} placeholder="" />
        <RoombaTable data={files}></RoombaTable>
      </header>
    </div>
  );
}

export default Upload;
