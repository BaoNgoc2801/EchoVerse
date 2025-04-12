declare module "agora-rtc-sdk-ng" {
    export interface IAgoraRTC {
        createClient: (options: any) => any;
        createStream: (options: any) => any;
    }

    const AgoraRTC: IAgoraRTC;
    export default AgoraRTC;
}
