import { FC } from "react";

const UploadVideoModal: FC = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-bold mb-4">Upload Your Live Video</h3>
                <input type="file" accept="video/*" className="w-full mb-4" />
                <button className="bg-blue-600 text-white py-2 px-4 rounded-full w-full">Upload</button>
            </div>
        </div>
    );
};

export default UploadVideoModal;
