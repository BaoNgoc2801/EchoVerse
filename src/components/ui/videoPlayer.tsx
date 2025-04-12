import React, { forwardRef } from "react";

const VideoPlayer = forwardRef<HTMLVideoElement>((props, ref) => {
    return <video ref={ref} autoPlay className="w-full rounded-md bg-black" />;
});

export default VideoPlayer;
