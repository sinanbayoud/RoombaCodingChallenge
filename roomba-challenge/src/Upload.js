import React, {useState} from 'react';
import './styles.css';

export function Upload() {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    try {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        var inputJson = JSON.parse(e.target.result);
        // console.log(inputJson.roomDimensions);
        // console.log(inputJson.initialRoombaLocation);
        // console.log(inputJson.dirtLocations);
        // console.log(inputJson.drivingInstructions);
        setFiles(inputJson);
      };
    } 
    catch(err) {
      alert("A file must be selected!")
    }
    
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>Upload Json file - Example</h1>
        <input type="file" onChange={handleChange} />
        {files.dirtLocations}
      </header>
    </div>
  );
}

export default Upload;
