import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, ArrowRight, X, Copy, Check, Shuffle, Lock, Unlock } from 'lucide-react';

const JoinRoom = ({ onJoin, onClose }) => {
  const [roomInput, setRoomInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [roomType, setRoomType] = useState('public'); // 'public' or 'private'
  const [copied, setCopied] = useState(false);
  const [generatedRoomId, setGeneratedRoomId] = useState('');

  const generateRoomId = () => {
    const adjectives = ['Creative', 'Brilliant', 'Dynamic', 'Innovative', 'Swift', 'Bright', 'Smart', 'Quick'];
    const nouns = ['Canvas', 'Board', 'Space', 'Studio', 'Lab', 'Workshop', 'Hub', 'Zone'];
    const randomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const roomId = `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}-${randomId}`;
    setGeneratedRoomId(roomId);
    setRoomInput(roomId);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (roomInput.trim()) {
      onJoin(roomInput.trim(), roomType);
    }
  };

  const handleCreateNew = () => {
    generateRoomId();
    setIsCreating(true);
  };

  const quickJoinOptions = [
    { id: 'brainstorm-room', name: 'Brainstorm Room', users: 3, type: 'public' },
    { id: 'design-session', name: 'Design Session', users: 7, type: 'public' },
    { id: 'team-meeting', name: 'Team Meeting', users: 12, type: 'private' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 relative">
           
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                <Users size={24} />
              </div>
              <h2 className="text-2xl font-bold">Join Whiteboard</h2>
            </div>
            <p className="text-indigo-100">Collaborate in real-time with your team</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Quick Join Options */}
            {!isCreating && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Active Rooms
                </h3>
                <div className="space-y-2">
                  {quickJoinOptions.map((room) => (
                    <motion.button
                      key={room.id}
                      onClick={() => {
                        setRoomInput(room.id);
                        setRoomType(room.type);
                      }}
                      className="w-full p-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-between group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 group-hover:bg-indigo-100 rounded-lg transition-colors">
                          {room.type === 'private' ? <Lock size={16} /> : <Unlock size={16} />}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-800">{room.name}</div>
                          <div className="text-sm text-gray-500">{room.users} users active</div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Room Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room ID
                </label>
                <div className="relative">
                  <input
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    type="text"
                    placeholder="Enter room ID or create new..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                    autoFocus
                  />
                  {roomInput && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(roomInput)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} className="text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Room Type Selection */}
              {isCreating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Room Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRoomType('public')}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
                        roomType === 'public'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Unlock size={16} />
                      <span className="font-medium">Public</span>
                    </button>
                    <button
                      onClick={() => setRoomType('private')}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
                        roomType === 'private'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Lock size={16} />
                      <span className="font-medium">Private</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isCreating ? (
                  <>
                    <motion.button
                      onClick={handleCreateNew}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={18} />
                      Create New
                    </motion.button>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!roomInput.trim()}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Users size={18} />
                      Join Room
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      onClick={() => {
                        setIsCreating(false);
                        setRoomInput('');
                        setGeneratedRoomId('');
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-all duration-200 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={generateRoomId}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title="Generate new room ID"
                    >
                      <Shuffle size={18} />
                    </motion.button>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!roomInput.trim()}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={18} />
                      Create & Join
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {isCreating
                  ? 'Share the room ID with your team to start collaborating'
                  : 'Enter an existing room ID or create a new room'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JoinRoom;