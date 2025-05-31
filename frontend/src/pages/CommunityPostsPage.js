import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const COMMUNITY_MAP = {
  drums: {
    name: 'Learn Drums',
    description: 'Share and discuss all things drums!'
  },
  guitar: {
    name: 'Guitar Questions',
    description: 'Ask and answer guitar-related questions.'
  }
};

function getPosts(communityId) {
  return JSON.parse(localStorage.getItem(`posts_${communityId}`) || '[]');
}

function savePost(communityId, post) {
  const posts = getPosts(communityId);
  localStorage.setItem(`posts_${communityId}`,
    JSON.stringify([post, ...posts]));
}

function markPostDeleted(communityId, idx) {
  const posts = getPosts(communityId);
  if (posts[idx]) {
    posts[idx] = { ...posts[idx], title: '[deleted by user]', content: '[deleted by user]', deleted: true };
    localStorage.setItem(`posts_${communityId}`, JSON.stringify(posts));
  }
}

export default function CommunityPostsPage() {
  const { id } = useParams();
  const community = COMMUNITY_MAP[id];
  const [posts, setPosts] = useState([]);
  const [askOpen, setAskOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    setPosts(getPosts(id));
  }, [id]);

  const handleAsk = () => setAskOpen(true);
  const handleClose = () => {
    setAskOpen(false);
    setForm({ title: '', content: '' });
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const user = JSON.parse(localStorage.getItem('user'));
    const post = {
      title: form.title,
      content: form.content,
      user: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
      createdAt: new Date().toISOString(),
    };
    savePost(id, post);
    setPosts([post, ...posts]);
    handleClose();
  };

  const handleDelete = idx => {
    markPostDeleted(id, idx);
    setPosts(getPosts(id));
  };

  if (!community) return <div style={{ padding: 40 }}>Community not found.</div>;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#f9f9f9', padding: 32, borderRadius: 8 }}>
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 6 }}>{community.name}</div>
      <div style={{ color: '#64748b', fontSize: 16, marginBottom: 24 }}>{community.description}</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ fontWeight: 600, fontSize: 20, flex: 1 }}>All Posts</div>
        <button
          style={{
            background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            padding: '8px 22px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #2563eb22'
          }}
          onClick={handleAsk}
        >Ask</button>
      </div>
      {askOpen && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px #2563eb11' }}>
          <div style={{ marginBottom: 12 }}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              style={{ width: '100%', padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', marginBottom: 10 }}
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              rows={4}
              style={{ width: '100%', padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, padding: '8px 22px', cursor: 'pointer' }}>Post</button>
            <button type="button" onClick={handleClose} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, padding: '8px 22px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}
      {posts.length === 0 ? (
        <div style={{ color: '#888', fontSize: 16 }}>No posts yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {posts.map((post, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px #2563eb11', position: 'relative' }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{post.title}</div>
              <div style={{ color: '#444', margin: '10px 0 8px 0', fontSize: 15 }}>{post.content}</div>
              <div style={{ fontSize: 13, color: '#888' }}>By {post.user} | {new Date(post.createdAt).toLocaleString()}</div>
              {(() => {
                const user = JSON.parse(localStorage.getItem('user'));
                const isAuthor = user && `${user.firstName} ${user.lastName}` === post.user;
                if (isAuthor && !post.deleted) {
                  return (
                    <button
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 14,
                        padding: '6px 16px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px #ef444422'
                      }}
                      onClick={() => handleDelete(idx)}
                    >Delete</button>
                  );
                }
                return null;
              })()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 