import React, { useState } from "react";
import HomePage from "./Components/HomePage";
import Header from "./Components/Header";
import FileDisplay from "./Components/FileDisplay";
function App() {
  const [file, setfile] = useState(null);
  const [audiostream, setaudiostream] = useState(null);
  const isAudioAvailable = file || audiostream
  function handleAudioReset() {
    setfile(null);
    setaudiostream(null);
  }
  return (
    <div className='`flex flex-col  max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {
          isAudioAvailable ?
            (<FileDisplay handleAudioReset = {handleAudioReset} file={file} audiostream={setaudiostream} />)
            : (<HomePage setaudiostream={setaudiostream} setfile={setfile} />)}
      </section>
      <footer></footer>
    </div>
  );
}
export default App