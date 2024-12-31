import TipTap from "./Components/TipTap";
import { useState } from "react";
import ShowEditorText from "./Components/ShowEditorText";

function App() {
  const [desc, setDesc] = useState("");

  return (
    <div className="min-h-screen">
      <TipTap setDesc={setDesc} />
      <ShowEditorText desc={desc} />
    </div>
  );
}

export default App;

