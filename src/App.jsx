import React, { useEffect, useRef, useState } from "react";
import HomePage from "./Components/HomePage";
import Header from "./Components/Header";
import FileDisplay from "./Components/FileDisplay";
import Information from "./Components/Information";
import Transcribing from "./Components/Transcribing";
function App() {
  const [file, setfile] = useState(null);
  const [audiostream, setaudiostream] = useState(null);
  const [output, setoutput] = useState(null)
  const [loading, setloading] = useState(false)
  const [finished, setfinished] = useState(false)
  const [downloading, setdownloading] = useState(false)
  const isAudioAvailable = file || audiostream
  function handleAudioReset() {
    setfile(null);
    setaudiostream(null);
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./Utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setdownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setloading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setoutput(e.data.results)
     
          break;
        case 'INFERENCE_DONE':
         setfinished(true)
         console.log("DONE")
          break;
      }
    }


  },[])
  return (
    <div className='`flex flex-col  max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ?
          (
            <FileDisplay handleAudioReset={handleAudioReset} file={file} audiostream={setaudiostream} />)
          : (
            <HomePage setaudiostream={setaudiostream} setfile={setfile} />)
        }

      </section>
      <footer></footer>
    </div>
  );
}
export default App