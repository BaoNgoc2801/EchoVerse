"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    fetchImageDetail,
    fetchComments,
    CommentItem,
    ImageDetail,
} from "@/services/dashboard-api";

import {
    uploadComment,
} from "@/services/image-api"

const ImageDetailPage = () => {
    const params = useParams();
    const id = params?.id as string;

    const [image, setImage] = useState<ImageDetail | null>(null);
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (id) {
            fetchImageDetail(id).then(setImage);
            fetchComments(id).then(setComments);
        }
    }, [id]);

    const handlePostComment = async () => {
        const userId = comments[0]?.userId || localStorage.getItem("user_id");
        if (!newComment.trim() || !userId) return;

        const success = await uploadComment(id, newComment, userId);
        if (success) {
            setNewComment("");
            const updatedComments = await fetchComments(id);
            setComments(updatedComments);
        }
    };

    return (
        <div className="p-6 text-white">
            {image ? (
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={image.url}
                            alt={image.title}
                            className="rounded-xl w-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                        <p className="text-sm text-gray-400 mb-4">
                            By: {image.creator?.name || "Unknown"}
                        </p>

                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2">Comments</h3>
                            <div className="space-y-3">
                                {comments.length === 0 ? (
                                    <p className="text-gray-500">No comments yet.</p>
                                ) : (
                                    comments.map((cmt) => (
                                        <div key={cmt.id} className="bg-gray-800 p-3 rounded-lg">
                                            <strong>{cmt.user?.name || "Unknown"}:</strong> {cmt.text}
                                        </div>
                                    ))
                                )}
                            </div>
                            <textarea
                                className="w-full mt-4 p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handlePostComment();
                                    }
                                }}
                            />
                            <button
                                onClick={handlePostComment}
                                className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading image detail...</p>
            )}
        </div>
    );
};

export default ImageDetailPage;
