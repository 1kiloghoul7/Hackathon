import React, { useEffect, useState } from 'react';

const API = 'http://localhost:5000/api';

function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    fetch(`${API}/communities`)
      .then(res => res.json())
      .then(data => setCommunities(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCommunity && user) {
      setJoined(selectedCommunity.members.includes(user._id));
      fetch(`${API}/posts/community/${selectedCommunity._id}`)
        .then(res => res.json())
        .then(setPosts);
    }
  }, [selectedCommunity, user]);

  const handleJoin = async (community) => {
    if (!user) return;
    await fetch(`${API}/communities/${community._id}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    });
    setSelectedCommunity({ ...community, members: [...community.members, user._id] });
    setJoined(true);
  };

  const handleLeave = async (community) => {
    if (!user) return;
    await fetch(`${API}/communities/${community._id}/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    });
    setSelectedCommunity({ ...community, members: community.members.filter(id => id !== user._id) });
    setJoined(false);
  };

  const handleSelectCommunity = (community) => {
    setSelectedCommunity(community);
  };

  const handlePost = async () => {
    if (!user || !selectedCommunity) return;
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        communityId: selectedCommunity._id,
        userId: user._id,
        title: newPost.title,
        content: newPost.content
      })
    });
    const post = await res.json();
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '' });
  };

  if (loading) return <div>Loading communities...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#f9f9f9', padding: 32, borderRadius: 8 }}>
      <h2>Communities</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Community List */}
        <div style={{ flex: 1 }}>
          <h3>All Communities</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {communities.map(comm => (
              <li key={comm._id} style={{ background: '#fff', marginBottom: 12, padding: 12, borderRadius: 4, boxShadow: '0 1px 3px #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{comm.name}</strong>
                  <div style={{ fontSize: 13, color: '#888' }}>{comm.description}</div>
                </div>
                <div>
                  <button
                    onClick={() => handleSelectCommunity(comm)}
                    style={{ marginRight: 12, background: selectedCommunity && selectedCommunity._id === comm._id ? '#2563eb' : '#eee', color: selectedCommunity && selectedCommunity._id === comm._id ? '#fff' : '#222', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}
                  >
                    {selectedCommunity && selectedCommunity._id === comm._id ? 'Selected' : 'View'}
                  </button>
                  {user && comm.members.includes(user._id) ? (
                    <button onClick={() => handleLeave(comm)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}>Leave</button>
                  ) : (
                    <button onClick={() => handleJoin(comm)} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}>Join</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Posts Section */}
        <div style={{ flex: 2 }}>
          {selectedCommunity ? (
            <>
              <h3>{selectedCommunity.name} Posts</h3>
              {joined ? (
                <div style={{ marginBottom: 24 }}>
                  <input
                    type="text"
                    placeholder="Post title"
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    style={{ width: '40%', padding: 8, marginRight: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  />
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    style={{ width: '40%', padding: 8, marginRight: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  />
                  <button onClick={handlePost} style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#2563eb', color: '#fff' }}>
                    Post
                  </button>
                </div>
              ) : (
                <div style={{ marginBottom: 24, color: '#888' }}>Join this community to post and comment.</div>
              )}
              <div>
                {posts.length === 0 && <div>No posts yet.</div>}
                {posts.map(post => (
                  <div key={post._id} style={{ background: '#fff', marginBottom: 16, padding: 16, borderRadius: 4, boxShadow: '0 1px 3px #ddd' }}>
                    <div style={{ fontWeight: 600, fontSize: 17 }}>{post.title}</div>
                    <div style={{ color: '#444', margin: '8px 0' }}>{post.content}</div>
                    <div style={{ fontSize: 13, color: '#888' }}>By {post.user?.firstName} {post.user?.lastName} | {new Date(post.createdAt).toLocaleString()}</div>
                    {/* TODO: Upvote/Downvote, Comments */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: '#888' }}>Select a community to view posts.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
