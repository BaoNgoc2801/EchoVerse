"use client"
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal} from 'lucide-react';
import Sidebar from "@/components/common/sidebar";

const SocialMediaPosts = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            username: "alex_photographer",
            userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
            postImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
            caption: "Golden hour magic at the mountains 🌅 Sometimes nature just takes your breath away!",
            likes: 2847,
            isLiked: false,
            timeAgo: "2 hours ago",
            comments: [
                {
                    id: 1,
                    username: "sarah_adventures",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b796?w=40&h=40&fit=crop&crop=face",
                    comment: "Absolutely stunning! What camera did you use for this shot?",
                    timeAgo: "1 hour ago",
                    likes: 24
                },
                {
                    id: 2,
                    username: "mike_wanderer",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                    comment: "The colors are incredible! Adding this to my travel bucket list 😍",
                    timeAgo: "45 minutes ago",
                    likes: 18
                },
                {
                    id: 3,
                    username: "nature_lover_jen",
                    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
                    comment: "This is why I love your photography! Pure magic ✨",
                    timeAgo: "30 minutes ago",
                    likes: 12
                }
            ]
        },
        {
            id: 2,
            username: "foodie_chronicles",
            userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
            postImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop",
            caption: "Homemade pizza night success! 🍕 Who wants the recipe?",
            likes: 1563,
            isLiked: true,
            timeAgo: "4 hours ago",
            comments: [
                {
                    id: 1,
                    username: "chef_mario",
                    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
                    comment: "That crust looks perfect! Drop the recipe please 👨‍🍳",
                    timeAgo: "3 hours ago",
                    likes: 45
                },
                {
                    id: 2,
                    username: "pizza_enthusiast",
                    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop&crop=face",
                    comment: "Making me hungry! Is that basil from your garden?",
                    timeAgo: "2 hours ago",
                    likes: 28
                }
            ]
        },
        {
            id: 3,
            username: "urban_explorer",
            userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
            postImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=600&h=600&fit=crop",
            caption: "City lights never get old 🌃 Late night photography session in downtown",
            likes: 892,
            isLiked: false,
            timeAgo: "6 hours ago",
            comments: [
                {
                    id: 1,
                    username: "night_photographer",
                    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face",
                    comment: "Love the long exposure! What settings did you use?",
                    timeAgo: "5 hours ago",
                    likes: 15
                }
            ]
        },
        {
            id: 4,
            username: "coffee_daily",
            userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
            postImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
            caption: "Monday motivation ☕️ Starting the week with my favorite latte art",
            likes: 734,
            isLiked: true,
            timeAgo: "8 hours ago",
            comments: [
                {
                    id: 1,
                    username: "barista_life",
                    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
                    comment: "That rosetta is clean! Nice pour technique 👏",
                    timeAgo: "7 hours ago",
                    likes: 32
                },
                {
                    id: 2,
                    username: "coffee_addict_sam",
                    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
                    comment: "Now I need coffee! Where is this cafe?",
                    timeAgo: "6 hours ago",
                    likes: 19
                }
            ]
        }
    ]);

    const [newComments, setNewComments] = useState({});

    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    const handleCommentChange = (postId, value) => {
        setNewComments({ ...newComments, [postId]: value });
    };

    const handleAddComment = (postId) => {
        const commentText = newComments[postId];
        if (!commentText || !commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            username: "current_user",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
            comment: commentText.trim(),
            timeAgo: "now",
            likes: 0
        };

        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, comments: [...post.comments, newComment] }
                : post
        ));

        setNewComments({ ...newComments, [postId]: '' });
    };

    const handleKeyPress = (e, postId) => {
        if (e.key === 'Enter') {
            handleAddComment(postId);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black flex">

            {/* Main Content */}
            <main className="max-w-6xl mx-auto py-8 px-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-2xl border border-green-800/30 mb-8">
                        {/* Post Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={post.userAvatar}
                                    alt={post.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-green-300">{post.username}</h3>
                                    <p className="text-sm text-gray-400">{post.timeAgo}</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-green-800/30 rounded-full transition-colors">
                                <MoreHorizontal className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>

                        {/* Post Image */}
                        <div className="relative">
                            <img
                                src={post.postImage}
                                alt="Post content"
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        {/* Post Actions */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
                                    >
                                        <Heart
                                            className={`w-6 h-6 ${post.isLiked ? 'fill-green-500 text-green-500' : 'text-gray-300'}`}
                                        />
                                    </button>
                                    <button className="hover:opacity-70 transition-opacity">
                                        <MessageCircle className="w-6 h-6 text-gray-300" />
                                    </button>
                                    <button className="hover:opacity-70 transition-opacity">
                                        <Share className="w-6 h-6 text-gray-300" />
                                    </button>
                                </div>
                                <button className="hover:opacity-70 transition-opacity">
                                    <Bookmark className="w-6 h-6 text-gray-300" />
                                </button>
                            </div>

                            {/* Likes Count */}
                            <p className="font-semibold text-green-300 mb-2">
                                {post.likes.toLocaleString()} likes
                            </p>

                            {/* Caption */}
                            <p className="text-gray-200 mb-4">
                                <span className="font-semibold mr-2 text-green-300">{post.username}</span>
                                {post.caption}
                            </p>

                            {/* Comments */}
                            <div className="space-y-3 mb-4">
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className="flex items-start space-x-3">
                                        <img
                                            src={comment.avatar}
                                            alt={comment.username}
                                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm">
                                                <span className="font-semibold text-green-300 mr-2">{comment.username}</span>
                                                <span className="text-gray-200">{comment.comment}</span>
                                            </p>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                                                <span className="text-xs text-gray-500">{comment.likes} likes</span>
                                                <button className="text-xs text-gray-400 hover:text-green-300 font-medium transition-colors">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                        <button className="p-1">
                                            <Heart className="w-3 h-3 text-gray-500 hover:text-green-400 transition-colors" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add Comment */}
                            <div className="flex items-center space-x-3 pt-4 border-t border-green-800/30">
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                                    alt="Your avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={newComments[post.id] || ''}
                                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        onKeyPress={(e) => handleKeyPress(e, post.id)}
                                        className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <button
                                    onClick={() => handleAddComment(post.id)}
                                    className="text-green-400 hover:text-green-300 font-semibold text-sm disabled:opacity-50 transition-colors"
                                    disabled={!newComments[post.id]?.trim()}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default SocialMediaPosts;