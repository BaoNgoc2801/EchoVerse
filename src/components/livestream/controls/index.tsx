import Controls from "./controls";
import {useState} from "react";

const MyStreamComponent = () => {
    const [stream, setStream] = useState(false);

    const startStreaming = () => {
        console.log("Start livestream...");
        setStream(true);
    };

    const stopStreaming = () => {
        console.log("Stop livestream...");
        setStream(false);
    };

    const saveVideo = () => {
        console.log("Save video...");
    };

    return (
        <div>
            <Controls
                stream={stream}
                startStreaming={startStreaming}
                stopStreaming={stopStreaming}
                saveVideo={saveVideo}
            />
        </div>
    );
};

export default MyStreamComponent;
