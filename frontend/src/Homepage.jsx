import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Github, Users, RefreshCcw, MousePointerClick, Palette, Download, Lock, Unlock, MessageCircle, Video, Undo, Redo, Trash2, Zap, Star, ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <RefreshCcw size={24} className="text-indigo-600" />,
    title: "Real-time Sync",
    desc: "Instantly draw and see updates with collaborators using WebSocket technology.",
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: <MousePointerClick size={24} className="text-emerald-600" />,
    title: "Infinite Canvas",
    desc: "Unlimited space for brainstorming, diagrams, wireframes, and creative work.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: <Users size={24} className="text-blue-600" />,
    title: "Multi-user Rooms",
    desc: "Create public or private rooms with customizable permissions and access control.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: <Palette size={24} className="text-pink-600" />,
    title: "Rich Drawing Tools",
    desc: "Pen, shapes, text, eraser, color picker, and advanced drawing capabilities.",
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: <Download size={24} className="text-orange-600" />,
    title: "Save & Export",
    desc: "Export your work as high-quality images or PDFs for sharing and archiving.",
    color: "from-orange-500 to-amber-600"
  },
  {
    icon: <Undo size={24} className="text-violet-600" />,
    title: "Smart Actions",
    desc: "Undo/redo functionality, clear canvas, and intelligent canvas management.",
    color: "from-violet-500 to-purple-600"
  }
];

const tools = [
  { icon: <Pencil size={16} />, name: "Drawing" },
  { icon: <MousePointerClick size={16} />, name: "Shapes" },
  { icon: <Palette size={16} />, name: "Colors" },
  { icon: <MessageCircle size={16} />, name: "Comments" },
  { icon: <Video size={16} />, name: "Voice Chat" },
  { icon: <Lock size={16} />, name: "Permissions" }
];

const stats = [
  { number: "50+", label: "Concurrent Users" },
  { number: "∞", label: "Canvas Size" },
  { number: "< 10ms", label: "Sync Latency" },
  { number: "24/7", label: "Uptime" }
];

const WhiteboardPreview = () => {
  const [drawings, setDrawings] = useState([]);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setDrawings(prev => {
        const newDrawings = [...prev];
        if (newDrawings.length > 8) {
          newDrawings.shift();
        }
        newDrawings.push({
          id: Date.now(),
          x: Math.random() * 300,
          y: Math.random() * 200,
          color: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
        });
        return newDrawings;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative  bg-white rounded-2xl shadow-2xl overflow-y-auto  border-4 border-gray-200">
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-600 ml-2">Collaborative Whiteboard</div>
      </div>
      <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50">
        <svg className="absolute inset-0 w-full h-full">
          {drawings.map((drawing, index) => (
            <motion.circle
              key={drawing.id}
              cx={drawing.x}
              cy={drawing.y}
              r="4"
              fill={drawing.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
          
          {/* Static illustration elements */}
          <motion.path
            d="M50 180 Q 100 160 150 180 T 250 180"
            stroke="#6366f1"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          <motion.rect
            x="200"
            y="50"
            width="80"
            height="60"
            rx="8"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          
          <motion.circle
            cx="100"
            cy="80"
            r="25"
            stroke="#f59e0b"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </svg>
        
        {/* Floating user cursors */}
        <motion.div
          className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg"
          animate={{
            x: [50, 150, 200, 100, 50],
            y: [100, 80, 150, 180, 100]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg"
          animate={{
            x: [200, 100, 250, 150, 200],
            y: [60, 120, 100, 50, 60]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
    </div>
  );
};

const Homepage = () => {
  const [isHovered, setIsHovered] = useState(false);
   const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 backdrop-blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                  MARS Open Projects 2025
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                Collaborative
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Whiteboard
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
                Experience the future of collaboration with our real-time whiteboard. 
                Draw, brainstorm, and innovate together on an infinite canvas with 
                advanced tools and seamless synchronization.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={()=>navigate("/whiteboard")}
                >
                  <Pencil size={24} />
                  Launch Whiteboard
                  <ArrowRight size={20} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </motion.button>
                
                <motion.button
                  className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  Watch Demo
                </motion.button>
                
                <motion.a
                  href="https://github.com/RRGcodex/collaborative-whiteboard"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  View Source
                </motion.a>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                {tools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {tool.icon}
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <WhiteboardPreview />
              
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Live Collaboration</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">5</div>
                  <div className="text-xs text-gray-600">Active Users</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Modern Teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge technology to deliver the smoothest collaborative experience possible.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-gray-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Ready to Start Collaborating?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using our platform to bring their ideas to life.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={20} />
                Get Started Free
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Collaborative Whiteboard</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Built for MARS Open Projects 2025 — A next-generation real-time collaboration platform 
                that empowers teams to create, share, and innovate together.
              </p>
              <div className="flex gap-4">
                <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Github size={20} />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Play size={20} />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Collaboration</li>
                <li>Infinite Canvas</li>
                <li>Drawing Tools</li>
                <li>Export Options</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Tech Stack</h4>
              <ul className="space-y-2 text-gray-400">
                <li>React.js + Next.js</li>
                <li>Node.js + Socket.io</li>
                <li>MongoDB</li>
                <li>HTML5 Canvas</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MARS Open Projects. Built with ❤️ for collaborative innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;