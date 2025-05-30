import React, { useState } from 'react';

const tabs = ['Feed', 'Groups', 'Events', 'Leaderboard'];

function CommunityPage() {
  const [activeTab, setActiveTab] = useState('Feed');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    if (message.trim()) {
      setPosts([{ text: message, tab: activeTab, date: new Date() }, ...posts]);
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', background: '#f9f9f9', padding: 32, borderRadius: 8 }}>
      <h2>Community</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              background: activeTab === tab ? '#222' : '#eee',
              color: activeTab === tab ? '#fff' : '#222',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder={`Add a message to ${activeTab}`}
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ width: '70%', padding: 8, marginRight: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button onClick={handlePost} style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#4caf50', color: '#fff' }}>
          Post
        </button>
      </div>
      <div>
        <h3>{activeTab}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.filter(p => p.tab === activeTab).length === 0 && <li>No posts yet.</li>}
          {posts.filter(p => p.tab === activeTab).map((p, idx) => (
            <li key={idx} style={{ background: '#fff', marginBottom: 12, padding: 12, borderRadius: 4, boxShadow: '0 1px 3px #ddd' }}>
              <div>{p.text}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{p.date.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommunityPage;
