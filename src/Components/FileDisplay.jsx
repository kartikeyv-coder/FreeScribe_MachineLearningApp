import { main } from "flowbite-react/cli/main";
import React from "react";

const FileDisplay = (props) => {
    const { handleAudioReset, file, audiostream } = props
    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20  '>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-blue-400 bold'>File</span></h1>
            <div className='mx-auto flex flex-col text-left'>
                <h3 className='font-semibold'>Name</h3>
                <p>{file ? file?.name : 'Custom_Audio'}</p>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-600 duration-200'>
                    Reset
                </button>
                <button className='specialBtn p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium px-4  '>
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </div>
        </main>


    );
}

export default FileDisplay