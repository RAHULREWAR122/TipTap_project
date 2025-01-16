import { useState } from "react";
import ShowEditorText from "./Components/ShowEditorText";
import CustomEditor from "./Components/CustomEditor";

function App() {
  const [desc, setDesc] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="min-h-screen">
      <CustomEditor setDesc={setDesc} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <ShowEditorText desc={desc} darkMode={darkMode} /> 
     </div>
  );
}

export default App;

