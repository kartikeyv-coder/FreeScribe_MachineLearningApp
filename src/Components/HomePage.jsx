
import React, { useRef, useState } from "react";

const HomePage = (props) => {
    const { setaudiostream, setfile } = props
    const [recordingAudio, setrecordingAudio] = useState('inactive');
    const [audioChunks, setaudioChunks] = useState([]);
    const [duration, setduration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'

    const startRecording = async () => {
        let tempStream

        console.log("Start Recording")

        try {
            const streamData = navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            })

            tempStream = streamData
        } catch (error) {
            console.log(error.message)
            return
        }
        //create new Media  recorder instance using the stream
        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media

        mediaRecorder.current.start();
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (e) => {
            if(typeof e.data === undefined) { return};
            if(e.data.size === 0 ){return };
        
            localAudioChunks.push(e.data);
            setaudioChunks(localAudioChunks)

        }

    }
    return (<>
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 '>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'>Record<span className='text-blue-500'>&rarr;</span>Transcribe<span className='text-blue-500'>&rarr;</span>Translate</h3>
            <button className='flex specialBtn px-4 py-3 rounded-lg text-emerald-300 items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <p>Record</p>
                <i className="fa-solid fa-microphone-lines"></i>
            </button>

            <p className='text-base'>Or <label className='text-blue-500 cursor-pointer hover:text-blue-600 duration-200'>Upload<input onChange={(e) => {
                const tempFile = e.target.files[0];
                setfile(tempFile)
            }} className='hidden'
                type="file" accept='.mp3,.wave' /></label> a mp3 file</p>
            <p className='italic text-slate-400'>Free now free forever</p>
        </main>
    </>)
}

export default HomePage