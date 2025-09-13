import { useState, useEffect, useRef } from "react";

const bootMessages = [
  "🚀 Initializing neural networks...",
  "⚡ Loading developer protocols...",
  "🔥 Compiling awesome sauce...",
  "🎯 Calibrating code cannons...",
  "✨ Activating beast mode...",
  "🔒 Terminal locked and loaded!",
];

const commands = {
  help: `Available commands:
  help     - Show this help message
  about    - Learn about me
  skills   - View my technical skills
  projects - See my awesome projects
  contact  - Get in touch
  education- Academic background
  resume   - Download my resume
  whoami   - Current user info
  date     - Show current date
  neofetch - System information
  clear    - Clear terminal history
  exit     - Close terminal`,

  about: `Hi there! 👋 I'm Dijash
  
A passionate full-stack developer who loves turning coffee into code.
I specialize in building scalable web applications and enjoy tackling
complex problems with elegant solutions.

When I'm not coding, you'll find me exploring new technologies,
contributing to open source, or mentoring fellow developers.`,

  skills: `Technical Arsenal:
  
Frontend:  JavaScript/TypeScript, React, Vue.js, Next.js
Backend:   Node.js, Python, Express, FastAPI
Database:  PostgreSQL, MongoDB, Redis
Cloud:     AWS, Docker, Kubernetes
Tools:     Git, VS Code, Linux, Figma
Other:     GraphQL, REST APIs, CI/CD, Testing`,

  projects: `Featured Projects:
  
🚀 E-Commerce Platform
   → Full-stack React/Node.js app with payment integration
   → GitHub: github.com/Dijash-dev/ecommerce
   
🎮 Real-time Chat App
   → WebSocket-based chat with rooms and file sharing
   → GitHub: github.com/Dijash-dev/chat-app
   
📊 Data Visualization Dashboard
   → D3.js powered analytics dashboard
   → GitHub: github.com/Dijash-dev/dashboard`,

  contact: `Let's Connect! 📬
  
Email:    Dijash.dev@example.com
GitHub:   github.com/Dijash-dev
LinkedIn: linkedin.com/in/Dijash-dev
Twitter:  @Dijash_codes
Website:  Dijash.dev`,

  education: `Academic Background 🎓
  
BSc Computer Science
Islington College (2020-present)

Relevant Coursework:
• Data Structures & Algorithms
• Software Engineering`,

  resume: `📄 Resume Download
  
→ PDF Version: resume.Dijash.dev/pdf
→ Web Version: resume.Dijash.dev
→ Last Updated: ${new Date().toLocaleDateString()}

Tip: Use 'wget resume.Dijash.dev/pdf' to download via terminal 😉`,

  whoami: "Dijash",
  
  date: new Date().toString(),
  
  neofetch: `dijash@portfolio
                    ━━━━━━━━━━━━━━━━━━━━━
        ╭───────╮     OS: Terminal Portfolio v3.0 ⚡
      ╭─╯███████╲─╮     Host: dijash.dev 🌐
     ╱████▀▀▀▀▀████╲    Kernel: React 18.2.0-dev 🔥
    ╱███▀  ▄▄▄  ▀███╲   Uptime: ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)} hours
   ╱██▀ ▄██▀▀▀██▄ ▀██╲  Resolution: ∞ × ∞ pixels
  ╱██ ██▀  ▄  ▀██ ██╲ | DE: Custom Terminal Environment
  ██  ██  ███  ██  ██ | WM: Browser Window Manager
  ██  ██▄ ▀█▀ ▄██  ██ | Terminal: dijash-terminal v3.0
  ╲██  ▀██▄▄▄██▀  ██╱ | Shell: zsh 5.9 💻
   ╲██▄  ▀▀███▀▀  ▄██╱  CPU: Developer Brain Pro Max (∞ cores)
    ╲███▄▄▄▄▄▄▄▄▄███╱   GPU: Imagination Engine RTX 4090
     ╲█████████████╱    Memory: Infinite Coffee Buffer (∞ GB)
      ╲───────────╱     Disk: Cloud Storage (∞ TB SSD)
                        Network: Fiber Optic Thoughts

         ████████████████████████████████████████
         ████████████████████████████████████████
         
🚀 Active Processes: [coding, debugging, innovating]
📦 Installed Packages: 42,069 (npm), 1,337 (yarn)
⚡ Power Level: Over 9000
🔧 Currently Running: creativity.exe, passion.service
💡 Last Commit: "Fixed universe.js - reality now stable`,
};

export default function App() {
  const [boot, setBoot] = useState<boolean>(true);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [currentPath] = useState<string>("~");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence with typing effect
  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    let currentMessage = "";
    
    const typeMessage = () => {
      if (messageIndex < bootMessages.length) {
        if (charIndex < bootMessages[messageIndex].length) {
          currentMessage += bootMessages[messageIndex][charIndex];
          setBootLog(prev => {
            const newLog = [...prev];
            newLog[messageIndex] = currentMessage;
            return newLog;
          });
          charIndex++;
          setTimeout(typeMessage, 50);
        } else {
          messageIndex++;
          charIndex = 0;
          currentMessage = "";
          setTimeout(typeMessage, 800);
        }
      } else {
        setTimeout(() => {
          setBoot(false);
          // Show welcome message
          setHistory([{
            cmd: "",
            output: `Welcome to Dijash's Terminal Portfolio! 🎉
Type 'help' to see available commands.
            
╭─────────────────────────────────────╮
│  "Code is poetry in motion" 🎵      │
╰─────────────────────────────────────╯`
          }]);
        }, 1500);
      }
    };

    // Initialize empty array for boot messages
    setBootLog(new Array(bootMessages.length).fill(""));
    setTimeout(typeMessage, 1000);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, boot]);

  // Focus input when terminal is active
  useEffect(() => {
    if (!boot && inputRef.current) {
      inputRef.current.focus();
    }
  }, [boot]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }
    
    if (trimmedCmd === "exit") {
      window.close();
      return;
    }

    let output: string;
    if (Object.prototype.hasOwnProperty.call(commands, trimmedCmd)) {
      output = commands[trimmedCmd as keyof typeof commands];
    } else if (trimmedCmd === "") {
      output = "";
    } else {
      output = `zsh: command not found: ${trimmedCmd}

Did you mean one of these?
${Object.keys(commands).slice(0, 5).join(", ")}

Type 'help' to see all available commands.`;
    }

    setHistory(prev => [...prev, { cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput("");
    }
    // Handle Ctrl+C
    else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInput("");
      setHistory(prev => [...prev, { cmd: input + "^C", output: "" }]);
    }
    // Handle Ctrl+L (clear)
    else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    }
  };

  if (boot) {
    return (
      <div className="min-h-screen p-8 font-mono text-green-400 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          {/* ASCII Art Header */}
          <pre className="text-2xl leading-none text-transparent md:text-4xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text animate-pulse">
{`
██████  ██      ██  █████  ███████ ██   ██ 
██   ██ ██      ██ ██   ██ ██      ██   ██ 
██   ██ ██      ██ ███████ ███████ ███████ 
██   ██ ██ ██   ██ ██   ██      ██ ██   ██ 
██████  ██  █████  ██   ██ ███████ ██   ██
`}
          </pre>
          
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text">
              Terminal Portfolio
            </h1>
            <p className="mt-2 text-gray-400">Loading developer experience...</p>
          </div>

          {/* Boot Messages */}
          <div className="mt-8 space-y-3">
            {bootLog.map((msg, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  msg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${
                  idx % 3 === 0 
                    ? "text-pink-400" 
                    : idx % 3 === 1 
                    ? "text-cyan-400" 
                    : "text-yellow-400"
                }`}
              >
                <span className="mr-2">▶</span>
                {msg}
                <span className="animate-pulse">|</span>
              </div>
            ))}
          </div>

          {/* Loading Bar */}
          <div className="w-full h-2 mt-8 bg-gray-800 rounded-full">
            <div className="h-2 transition-all duration-1000 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 animate-pulse"
                 style={{width: `${Math.min((bootLog.filter(msg => msg).length / bootMessages.length) * 100, 100)}%`}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Terminal Window */}
      <div className="max-w-6xl p-4 mx-auto">
        <div className="mt-40 overflow-hidden bg-gray-900 border border-gray-700 rounded-lg shadow-2xl ">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="font-mono text-sm text-gray-400">
              Dijash💀portfolio: {currentPath}
            </div>
            <div className="text-xs text-gray-500">
              Terminal v2.0
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="p-4 h-96 md:h-[500px] overflow-y-auto bg-black font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Command History */}
            {history.map((item, idx) => (
              <div key={idx} className="mb-2">
                {item.cmd && (
                  <div className="flex items-center">
                    <span className="mr-1 text-pink-400">╭─</span>
                    <span className="font-bold text-cyan-400">Dijash</span>
                    <span className="">💀</span>
                    <span className="text-purple-400">portfolio</span>
                    <span className="mx-2 text-yellow-400">~</span>
                    <span className="text-green-400">{item.cmd}</span>
                  </div>
                )}
                {item.output && (
                  <div className="mt-1 mb-3">
                    <span className="text-pink-400">╰─▶ </span>
                    <pre className="inline text-gray-300 whitespace-pre-wrap">{item.output}</pre>
                  </div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center">
              <span className="mr-1 text-pink-400">╭─</span>
              <span className="font-bold text-cyan-400">Dijash</span>
              <span className="">💀</span>
              <span className="text-purple-400">portfolio</span>
              <span className="mx-2 text-yellow-400">~</span>
              <input
                ref={inputRef}
                className="flex-1 text-green-400 bg-transparent focus:outline-none caret-green-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <span className="ml-1 text-green-400 animate-pulse">█</span>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Press Ctrl+L to clear • Ctrl+C to cancel</span>
              <span>Online • Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}