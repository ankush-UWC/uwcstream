// Copyright Epic Games, Inc. All Rights Reserved.
import React, { useEffect, useState } from 'react';
import { PixelStreamingWrapper } from './PixelStreamingWrapper';

const App = () => {
    
    const [commandExecuted, setCommandExecuted] = useState(false);
    const [wsCon, setWsCon] = useState('');
    const playerStartCommand = `C:\\Users\\Administrator\\Downloads\\Stella\\StellaDev\\stellarunner.lnk -log -RenderOffScreen -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=++++ -PixelStreamingH264Profile=BASELINE`;
    const serverStartCommand = `C:\\Users\\Administrator\\Downloads\\Stella\\StellaDev\\OneBHK\\Samples\\PixelStreaming\\WebServers\\SignallingWebServer\\platform_scripts\\cmd\\run_local.bat --HttpPort +port+ --StreamerPort ++++ --SFUPort +++-`;
    const runCommand = async () => {
        try {
            const response = await fetch('http://35.183.19.111:4000/runCommand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               
                body: JSON.stringify({
                    ServerCommand: serverStartCommand,
                    PlayerCommand: playerStartCommand
                })
            });

            if (!response.ok) {
                throw new Error(
                    `Server returned ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

           

            setWsCon(`ws://35.183.19.111:${data.port}`)
           
            setCommandExecuted(true);
            
            console.log(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    

    return (
        <div
            style={{
                height: '100%',
                width: '100%'
            }}
        >
        {wsCon!=='' && <PixelStreamingWrapper
                key={wsCon}
                initialSettings={{
                    AutoPlayVideo: true,
                    AutoConnect: true,
                    ss: wsCon,
                    StartVideoMuted: true,
                    HoveringMouse: true
                }}
            />}   
            {!commandExecuted && (
                <button onClick={runCommand}>Run Command</button>
            )}
        </div>
    );
};

export default App;
