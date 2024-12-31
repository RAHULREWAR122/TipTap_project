import React from "react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaListUl,
  FaListOl,
  FaQuoteRight,
} from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 bg-blue-500 flex flex-wrap gap-2 justify-between items-center  w-[100%] md:flex-row flex-col">
      <div className="md:w-[30%] w-full flex md:gap-3 gap-4 flex-wrap items-center ">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("bold") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={`p-2 text-xl rounded-full text-white hover:bg-blue-700 bg-blue-400`}
        >
          <TbArrowsExchange />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("italic") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("strike") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("underline") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("code") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaCode />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("bulletList") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("orderedList") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 text-xl rounded-full text-white ${
            editor.isActive("blockquote") ? "bg-blue-700" : "bg-blue-400"
          }`}
        >
          <FaQuoteRight />
        </button>
      </div>

      <div className="md:w-[30%] w-full flex md:justify-end items-center md:gap-6 gap-4 ">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 text-xl rounded-full text-white bg-blue-400 hover:bg-blue-700"
        >
          <IoArrowBackOutline />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 text-xl rounded-full text-white bg-blue-400 hover:bg-blue-700"
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
};

const showExtensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    Underline: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const MyEditor = ({ setDesc, desc }) => {
  const editor = useEditor({
    color: [Color.configure({ types: [TextStyle.name, ListItem.name] })],
    extensions: [StarterKit, Underline, showExtensions],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDesc(html);
    },
  });

  return (
    <div className="md:px-6 md:py-2 bg-gray-100 w-[100%]">
      <MenuBar editor={editor} />

      <div className="bg-white  shadow-md rounded p-4">
        <EditorContent editor={editor} className="min-h-[200px] rounded-md" />
      </div>
    </div>
  );
};

export default MyEditor;
