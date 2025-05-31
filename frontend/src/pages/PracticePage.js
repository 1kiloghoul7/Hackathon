import React from 'react';

function PracticePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Drums Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 8px #2563eb11',
            padding: '32px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            position: 'relative',
            cursor: 'pointer',
          }}
          onClick={() => window.open('/drum.html', '_blank')}
        >
          <span style={{ fontSize: 40, marginRight: 18 }}>🥁</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Practice some drums</div>
            <div style={{ color: '#64748b', fontSize: 16, marginBottom: 10 }}>
              Unlock premium drum practice sessions and improve your rhythm skills!
            </div>
            <span style={{
              background: 'linear-gradient(90deg, #f59e42 60%, #2563eb 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 6,
              padding: '4px 14px',
              position: 'absolute',
              top: 24,
              right: 24,
              boxShadow: '0 2px 8px #f59e4222'
            }}>
              Premium
            </span>
          </div>
        </div>
        {/* Piano Card */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 8px #2563eb11',
          padding: '32px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          position: 'relative',
        }}>
          <span style={{ fontSize: 40, marginRight: 18 }}>🎹</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Practice some piano</div>
            <div style={{ color: '#64748b', fontSize: 16, marginBottom: 10 }}>
              Access premium piano practice sessions to master your keys!
            </div>
            <span style={{
              background: 'linear-gradient(90deg, #f59e42 60%, #2563eb 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 6,
              padding: '4px 14px',
              position: 'absolute',
              top: 24,
              right: 24,
              boxShadow: '0 2px 8px #f59e4222'
            }}>
              Premium
            </span>
          </div>
        </div>
        {/* Guitar Card */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 8px #2563eb11',
          padding: '32px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          position: 'relative',
        }}>
          <span style={{ fontSize: 40, marginRight: 18 }}>🎸</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Practice some guitar</div>
            <div style={{ color: '#64748b', fontSize: 16, marginBottom: 10 }}>
              Enjoy free guitar practice sessions and improve your strumming!
            </div>
            <span style={{
              background: '#22c55e',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 6,
              padding: '4px 14px',
              position: 'absolute',
              top: 24,
              right: 24,
              boxShadow: '0 2px 8px #22c55e22'
            }}>
              Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticePage; 