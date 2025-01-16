import React from "react";
import parse from "html-react-parser";

function ShowEditorText({ desc, darkMode }) {
  // console.log(desc)
  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} p-6 shadow-lg transition-all duration-300 ease-in-out`}>
      <h2 className="font-semibold text-xl mb-4">Preview</h2>
      <div
        className="shadow-xl min-h-[300px] h-full w-full border px-4 py-2 rounded "
        placeholder="Content will appear here..."
      >
        {desc ? parse(desc) : <p className="text-gray-400 italic">Start typing in the editor to see the preview here...</p>}
      </div>
    </div>
  );
}

export default ShowEditorText;
