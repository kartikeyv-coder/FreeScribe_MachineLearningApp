import React, { useState } from "react";
import Transciption from "./Transcription";
import Translation from "./Translation";

const Information = () => {
    const [tab, settab] = useState('transcription')
    return (
        <>
            <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 max-w-prose w-full mx-auto  '>
                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>
                <div className='flex mx-auto bg-white border-2 border-solid border-blue-300  shadow rounded-full overflow-hidden items-center gap-2'>
                    <button onClick={() => { settab('transcription') }} className={'px-4 py-1 duration-200  font-medium ' + (tab === 'transcription' ? 'bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
                    <button onClick={() => { settab('translation') }} className={'px-4 py-1 duration-200  font-medium ' + (tab === 'translation' ? ' bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-600')}>Translation</button>
                </div>
                <div>
                    {tab === 'transcription' ? <Transciption/> : <Translation/>}
                </div>
            </main>



        </>
    )
}

export default Information