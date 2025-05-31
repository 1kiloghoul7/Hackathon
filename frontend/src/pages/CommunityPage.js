import React, { useEffect, useState } from 'react';

const COMMUNITIES = [
  {
    id: 'drums',
    name: 'Learn Drums',
    description: 'Share and discuss all things drums!'
  },
  {
    id: 'guitar',
    name: 'Guitar Questions',
    description: 'Ask and answer guitar-related questions.'
  }
];

function getJoinedCommunities() {
  return JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
}

function setJoinedCommunities(ids) {
  localStorage.setItem('joinedCommunities', JSON.stringify(ids));
}

function CommunityPage() {
  const [joined, setJoined] = useState(getJoinedCommunities());

  useEffect(() => {
    setJoined(getJoinedCommunities());
  }, []);

  const handleJoin = (id) => {
    const updated = [...new Set([...joined, id])];
    setJoinedCommunities(updated);
    setJoined(updated);
    window.open(`/community/${id}`, '_blank');
  };

  const handleLeave = (id) => {
    const updated = joined.filter(j => j !== id);
    setJoinedCommunities(updated);
    setJoined(updated);
  };

  const joinedCommunities = COMMUNITIES.filter(c => joined.includes(c.id));
  const availableCommunities = COMMUNITIES.filter(c => !joined.includes(c.id));

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#f9f9f9', padding: 32, borderRadius: 8 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>My Communities</h2>
      {joinedCommunities.length === 0 ? (
        <div style={{ color: '#888', fontSize: 16, marginBottom: 32 }}>You have not joined any communities yet.</div>
      ) : (
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
          {joinedCommunities.map(comm => (
            <div key={comm.id} style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 8px #2563eb11',
              padding: '32px 28px',
              minWidth: 260,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              position: 'relative',
            }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{comm.name}</div>
              <div style={{ color: '#64748b', fontSize: 16, marginBottom: 10, textAlign: 'center' }}>{comm.description}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  style={{
                    background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 16,
                    padding: '10px 28px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #2563eb22'
                  }}
                  onClick={() => window.open(`/community/${comm.id}`, '_blank')}
                >
                  Open
                </button>
                <button
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 16,
                    padding: '10px 18px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #ef444422'
                  }}
                  onClick={() => handleLeave(comm.id)}
                >
                  Leave
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Communities</h2>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {availableCommunities.map(comm => (
          <div key={comm.id} style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 8px #2563eb11',
            padding: '32px 28px',
            minWidth: 260,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            position: 'relative',
          }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{comm.name}</div>
            <div style={{ color: '#64748b', fontSize: 16, marginBottom: 10, textAlign: 'center' }}>{comm.description}</div>
            <button
              style={{
                marginTop: 12,
                background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                padding: '10px 28px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #2563eb22'
              }}
              onClick={() => handleJoin(comm.id)}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
