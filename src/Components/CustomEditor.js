import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaBold } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { RxLetterCaseLowercase } from "react-icons/rx";
import { BiSolidColorFill } from "react-icons/bi";
import { IoColorWand } from "react-icons/io5";
import { MdDarkMode,  MdOutlineDarkMode } from "react-icons/md";

function CustomEditor({ setDesc, darkMode, setDarkMode }) {
  const editorRef = useRef(null);
  const [linkPopup, setLinkPopup] = useState(false);
  const [linkText, setLinkText] = useState("");
  let [linkUrl, setLinkUrl] = useState("");
  const [activeFormats, setActiveFormats] = useState({});
  const [bgColorApplied, setBgColorApplied] = useState(false);
  const [textColorApplied, setTextColorApplied] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   
  const applyFormat = (command, value = null) => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
      toggleActiveFormat(command);
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const toggleActiveFormat = (format) => {
    setActiveFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const transformText = (type) => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    editorRef.current.focus();

    if (range && range.toString()) {
      const selectedText = range.toString();
      console.log(selectedText);
      const transformedText =
        type === "uppercase"
          ? selectedText.toUpperCase()
          : selectedText.toLowerCase();

      range.deleteContents();
      range.insertNode(document.createTextNode(transformedText));
      editorRef.current.focus();
    }
  };

  const handleLinkSubmit = () => {
    if (linkText && linkUrl) {
      if (!linkUrl.startsWith("http://") && !linkUrl.startsWith("https://")) {
        linkUrl = "http://" + linkUrl;
      }

      const link = document.createElement("a");
      link.href = linkUrl;
      link.innerText = linkText;
      link.target = "_blank";

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      if (range) {
        range.deleteContents();
        range.insertNode(link);
      }

      setLinkPopup(false);
    }

    editorRef.current.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      setDesc(editorRef.current.innerHTML);
    }
  };

  const handleBgChange = () => {
    const color = bgColorApplied
      ? darkMode
        ? "black"
        : "white"
      : prompt("Enter background color (e.g., yellow):");

    if (color) {
      applyFormat("backColor", color);
      setBgColorApplied(!bgColorApplied);
    }
  };

  const handleTextChange = () => {
    const color = textColorApplied
      ? darkMode
        ? "white"
        : "black"
      : prompt("Enter text color (e.g., red):");

    if (color) {
      applyFormat("foreColor", color);
      setTextColorApplied(!textColorApplied);
    }
  };
  
  const handleEmojiClick = (emojiObject) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(emojiObject.emoji));
    editorRef.current.focus();
  };

  const handleFontChange = (fontName) => {
    applyFormat("fontName", fontName);
    editorRef.current.focus();
  };

  const handleFontSizeChange = (size) => {
    applyFormat("fontSize", size);
    editorRef.current.focus();
  };

  const handleRemoveAllEffects = () => {
    applyFormat("removeFormat");
    setActiveFormats({});
    setTextColorApplied(false);
    setBgColorApplied(false);
    editorRef.current.focus();
  };

  return (
    <div className={`p-6 ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-all duration-300 ease-in-out`}>
      <h1 className="text-center mb-3 mt-3 md:text-3xl text-xl underline font-semibold">Awesome Text Editor App</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => applyFormat("bold")}
          className={`px-2 py-1 rounded ${
            activeFormats.bold ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => applyFormat("italic")}
          className={`px-2 py-1 rounded ${
            activeFormats.italic ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => applyFormat("underline")}
          className={`px-2 py-1 rounded ${
            activeFormats.underline ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => applyFormat("insertUnorderedList")}
          className={`px-2 py-1 rounded ${
            activeFormats.insertUnorderedList ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => applyFormat("insertOrderedList")}
          className={`px-2 py-1 rounded ${
            activeFormats.insertOrderedList ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => setLinkPopup(true)}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
        >
          <CiLink />
        </button>
        <button
          onClick={() => transformText("uppercase")}
          className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-700"
        >
          <RxLetterCaseUppercase />
        </button>
        <button
          onClick={() => transformText("lowercase")}
          className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-700"
        >
          <RxLetterCaseLowercase />
        </button>
        <button
          onClick={handleBgChange}
          className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-700"
        >
          <BiSolidColorFill />
        </button>
        <button
          onClick={handleTextChange}
          className="px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-700"
        >
          <IoColorWand />
        </button>

        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          😊
        </button>

        <select
          onChange={(e) => handleFontChange(e.target.value)}
          className={` ${darkMode ? "bg-black text-white" : "bg-white text-black"}px-2 py-1  border rounded cursor-pointer`}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>

        <select
          onChange={(e) => handleFontSizeChange(e.target.value)}
          className={` ${darkMode ? "bg-black text-white" : "bg-white text-black"}px-2 py-1  border rounded cursor-pointer`}
        >
          <option value="0">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
        </select>
  
        <button
    onClick={() => setDarkMode(!darkMode)}
    className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-700"
  >
    {darkMode ? <MdOutlineDarkMode/> : <MdDarkMode/>}
  </button>
        <button
          onClick={handleRemoveAllEffects}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Clear Formatting
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="border p-4 rounded min-h-[300px] outline-none"
      ></div>
   {showEmojiPicker && (
  <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-[3px]">
      <div className="relative w-full max-w-md bg-gray-200 flex justify-center items-center">
      <button onClick={()=>setShowEmojiPicker(!showEmojiPicker)} className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-l-md">X</button>
      <EmojiPicker onEmojiClick={handleEmojiClick}/>
      </div>

  </div>
)}

      {linkPopup && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Add Link</h3>
            <input
              type="text"
              placeholder="Link Text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="url"
              placeholder="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setLinkPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomEditor;
