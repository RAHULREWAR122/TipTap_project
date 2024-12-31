import React from 'react'
import parse from "html-react-parser";


function ShowEditorText({desc}) {
  return (
    <>
       <div className="bg-gray-100  md:px-6 md:py-2">
          <h2 className='font-semibold text-xl'>Preview</h2>
          <div className="shadow-xl min-h-[300px] h-full w-full border px-6">
          {parse(desc)}
          </div>
        </div>      
    </>
  )
}

export default ShowEditorText