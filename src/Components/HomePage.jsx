
import React, { useEffect, useRef, useState } from "react";

const HomePage = (props) => {
    const { setaudiostream, setfile } = props
    const [recordingAudioStatus, setrecordingAudioStatus] = useState('inactive');
    const [audioChunks, setaudioChunks] = useState([]);
    const [duration, setduration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'

    const startRecording = async () => {
        let tempStream

        console.log("Start Recording")

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            })

            tempStream = streamData
        } catch (error) {
            console.log(error.message)
            return
        }
        setrecordingAudioStatus('recording')
        console.log(tempStream);
        console.log(tempStream instanceof MediaStream);
        //create new Media  recorder instance using the stream
        const media = new MediaRecorder(tempStream, { mimeTypetype: mimeType })
        mediaRecorder.current = media

        mediaRecorder.current.start();
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === undefined) { return };
            if (e.data.size === 0) { return };

            localAudioChunks.push(e.data);
            setaudioChunks(localAudioChunks)

        }
    }

    const stopRecording = async () => {
        setrecordingAudioStatus('inactive');

        console.log('Stop Recording');

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {
                type: mimeType
            });

            setaudiostream(audioBlob);
            setaudioChunks([]);
            setduration(0);
        };

        mediaRecorder.current.stop();
    };

    useEffect(() => {
        if (recordingAudioStatus === 'inactive') { return }
        const interval = setInterval(() => {
            setduration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })
    return (<>
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 '>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'>Record<span className='text-blue-500'>&rarr;</span>Transcribe<span className='text-blue-500'>&rarr;</span>Translate</h3>
            <button onClick={recordingAudioStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <p className='text-blue-400'>{recordingAudioStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
                <div className='flex items-center gap-2'>
                    { duration !== 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )}
                    <i className={"fa-solid duration-200 fa-microphone " + (recordingAudioStatus === 'recording' ? ' text-rose-300' : "")}></i>
                </div>
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