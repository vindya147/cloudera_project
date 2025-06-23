import React, { useState, useRef, useEffect } from "react";
import "./Chatui.css";
import images from '../../constants/images';
import { FaBars, FaSun, FaMoon, FaCog, FaGlobe, FaPlus, FaPaperPlane, FaUserCircle, FaChevronDown, FaCopy, FaEdit, FaTrash, FaThumbsUp, FaThumbsDown, FaCheck, FaTimes, FaQuestionCircle, FaSignOutAlt, FaDownload } from "react-icons/fa";

// Utility: debounce
function useDebounce(fn, delay, deps = []) {
  useEffect(() => {
    const handler = setTimeout(fn, delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, deps);
}

export default function ChatUI() {
  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleNavToggle = () => setSidebarOpen((v) => !v);

  // Profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => {
    const close = () => setProfileOpen(false);
    if (profileOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [profileOpen]);

  // Settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, role: "system", content: "Hello! How can I assist you today?", time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(null); // {id, content}
  const [typing, setTyping] = useState(false);

  // Responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chat input auto-resize
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;
    const newId = Date.now();
    setMessages([
      ...messages,
      { id: newId, role: "user", content: input, time: new Date().toLocaleTimeString() }
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { id: newId + 1, role: "system", content: "This is a sample AI response.", time: new Date().toLocaleTimeString(), userMessageId: newId }
      ]);
      setTyping(false);
    }, 1000);
  };

  // Copy message
  const handleCopy = (content) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content);
      alert("Copied to clipboard!");
    }
  };

  // Edit message
  const openEdit = (msg) => setEditing({ id: msg.id, content: msg.content });
  const closeEdit = () => setEditing(null);
  const confirmEdit = () => {
    setMessages((msgs) =>
      msgs.map((m) =>
        m.id === editing.id ? { ...m, content: editing.content + " (edited)" } : m
      )
    );
    closeEdit();
  };

  // Delete message (only last user message)
  const handleDelete = (id) => {
    if (id !== messages.filter((m) => m.role === "user").slice(-1)[0]?.id) {
      alert("You can only delete the most recent message.");
      return;
    }
    setMessages((msgs) => msgs.filter((m) => m.id !== id && m.userMessageId !== id));
  };

  // Reaction
  const [reactions, setReactions] = useState({});
  const handleReact = (id, type) => setReactions({ ...reactions, [id]: type });

  // Sidebar width
  const sidebarStyle = {
    width: sidebarOpen ? 320 : 0,
    minWidth: sidebarOpen ? 320 : 0,
    transition: "width 0.2s"
  };

  // Responsive chat container width
  let chatContainerMaxWidth = "100%";
  if (windowWidth > 1200) chatContainerMaxWidth = "900px";
  else if (windowWidth > 1024) chatContainerMaxWidth = "800px";

  // Render
  return (
    <div className={`chatui-root ${theme}-theme`}>
      {/* Sidebar */}
      <aside className="sidebar" style={sidebarStyle}>
        <div className="sidebar-header">
          <img src={images.mlc_logo} alt="Logo" className="sidebar-logo" style={{ width: 40, height: 40, marginBottom: 8 }} />
          <div>
            <div className="sidebar-title">Cloud ERA</div>
            <div className="sidebar-desc">AI Models Running in Browser</div>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button className="sidebar-btn">Prompts</button>
          <button className="sidebar-btn" onClick={() => setSettingsOpen(true)}>Settings</button>
        </div>
        <div className="sidebar-conversations">
          <div className="conversation-item active">
            <div>
              <div className="conversation-title">New Conversation</div>
              <div className="conversation-meta">0 messages <span className="conversation-time">{new Date().toLocaleDateString()}</span></div>
            </div>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-control-group">
            <button className="sidebar-ctrl-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle Theme">
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <button className="sidebar-ctrl-btn" title="Settings" onClick={() => setSettingsOpen(true)}>
              <FaCog />
            </button>
            <button className="sidebar-ctrl-btn" title="Open Web">
              <FaGlobe />
            </button>
          </div>
          <button className="new-chat-btn">
            <FaPlus style={{ marginRight: 6 }} />
            New Chat
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-panel">
        <header className="main-header">
          <button id="nav-toggle-btn" className="nav-toggle" aria-label="Toggle Navigation" onClick={handleNavToggle}>
            <FaBars />
          </button>
          <div className="header-right">
            <div className="user-profile-container">
              <button className="user-profile-btn" id="user-profile-btn" onClick={e => { e.stopPropagation(); setProfileOpen((v) => !v); }}>
                <FaUserCircle />
                <span className="user-name">Kanda</span>
                <FaChevronDown />
              </button>
              {profileOpen && (
                <div className="profile-dropdown" id="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar">K</div>
                    <div className="profile-details">
                      <div className="profile-name">Kanda Kumar</div>
                      <div className="profile-email">kanda@example.com</div>
                    </div>
                  </div>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-value">{messages.filter(m => m.role === "user").length}</span>
                      <span className="stat-label">Chats</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{messages.length}</span>
                      <span className="stat-label">Messages</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">Pro</span>
                      <span className="stat-label">Plan</span>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <button className="profile-action" id="profile-settings"><FaUserCircle /> Profile Settings</button>
                    <button className="profile-action" id="help-support"><FaQuestionCircle /> Help & Support</button>
                    <button className="profile-action danger" id="logout-btn"><FaSignOutAlt /> Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Chat */}
        <div className="chat-main" id="chat-main">
          <div className="chat-container" style={{ maxWidth: chatContainerMaxWidth }}>
            <div className="chat-messages" id="chat-messages">
              {messages.map((msg, i) => (
                <div key={msg.id} className={`chat-message ${msg.role}`} data-message-id={msg.id}>
                  <div className="message-content">{msg.content}</div>
                  <div className="message-actions">
                    <button className="action-btn copy" onClick={() => handleCopy(msg.content)} title="Copy"><FaCopy /></button>
                    {msg.role === "user" && (
                      <>
                        <button className="action-btn edit" onClick={() => openEdit(msg)} title="Edit"><FaEdit /></button>
                        <button className="action-btn delete" onClick={() => handleDelete(msg.id)} title="Delete"><FaTrash /></button>
                      </>
                    )}
                    <button className={`action-btn thumbs-up ${reactions[msg.id] === "positive" ? "active" : ""}`} onClick={() => handleReact(msg.id, "positive")} title="Thumbs Up"><FaThumbsUp /></button>
                    <button className={`action-btn thumbs-down ${reactions[msg.id] === "negative" ? "active" : ""}`} onClick={() => handleReact(msg.id, "negative")} title="Thumbs Down"><FaThumbsDown /></button>
                  </div>
                  <div className="msg-meta">{msg.time}</div>
                </div>
              ))}
              {typing && (
                <div className="chat-message system">
                  <div className="message-content">...</div>
                  <div className="msg-meta">AI is typing</div>
                </div>
              )}
            </div>
            <div className="chat-input-container">
              <div className="chat-input-wrapper" style={{ maxWidth: chatContainerMaxWidth === "100%" ? "100%" : chatContainerMaxWidth - 40 }}>
                <textarea
                  ref={inputRef}
                  id="chat-input"
                  placeholder="Type your message here..."
                  rows={1}
                  maxLength={2000}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button id="send-btn" className="send-btn" disabled={!input.trim()} onClick={handleSend}>
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="settings-modal" id="settings-modal">
          <div className="settings-content">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-btn" id="close-settings" onClick={() => setSettingsOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="settings-body">
              <div className="setting-item">
                <label htmlFor="model-select">Change Model:</label>
                <select id="model-select">
                  <option value="gpt-3.5">GPT-3.5</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="claude">Claude</option>
                </select>
              </div>
              <div className="setting-item">
                <button className="setting-btn danger" id="clear-chats-btn" onClick={() => setMessages([])}>
                  <FaTrash /> Clear All Chats
                </button>
              </div>
              <div className="setting-item">
                <button className="setting-btn" id="export-chat-btn" onClick={() => alert("Exported!")}>
                  <FaDownload /> Export Current Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="edit-modal" id="edit-modal">
          <div className="edit-modal-content">
            <div className="edit-modal-header">
              <h3>Edit Message</h3>
              <button className="edit-modal-close" onClick={closeEdit}><FaTimes /></button>
            </div>
            <div className="edit-modal-body">
              <textarea
                className="edit-textarea"
                value={editing.content}
                onChange={e => setEditing({ ...editing, content: e.target.value })}
                autoFocus
              />
            </div>
            <div className="edit-modal-footer">
              <button className="edit-btn cancel" onClick={closeEdit}><FaTimes /> Cancel</button>
              <button className="edit-btn update" onClick={confirmEdit}><FaCheck /> Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
