import React from 'react';

function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f8fafc 60%, #f5edea 100%)',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px 60px 0 60px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 24 }}>
          <span role="img" aria-label="music" style={{ fontSize: 28, marginRight: 8 }}>🎵</span>
          <span style={{ color: '#2563eb' }}>MusicEd Pro</span>
        </div>
        <div>
          <a href="/login" style={{ marginRight: 24, color: '#222', textDecoration: 'none', fontWeight: 500 }}>Login</a>
          <a
            href="/signup"
            style={{
              padding: '8px 22px',
              background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
              color: '#fff',
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 16
            }}
          >
            Get Started
          </a>
        </div>
      </header>
      {/* Main Content */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 60
      }}>
        <h1 style={{
          fontSize: 56,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 24,
          lineHeight: 1.1
        }}>
          Master Music with{' '}
          <span style={{
            background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI-Powered
          </span>
          <br />Learning
        </h1>
        <div style={{
          fontSize: 20,
          color: '#444',
          textAlign: 'center',
          maxWidth: 600,
          marginBottom: 36
        }}>
          Join the world's most advanced music education platform. Learn any instrument, master music theory, and connect with a global community of musicians.
        </div>
        <div style={{ display: 'flex', gap: 18, marginBottom: 48 }}>
          <a
            href="/signup"
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
              color: '#fff',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 2px 8px #2563eb22'
            }}
          >
            Start Learning Today
          </a>
          <a
            href="#"
            style={{
              padding: '14px 32px',
              background: '#fff',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span style={{
              display: 'inline-block',
              width: 20,
              height: 20,
              border: '2px solid #2563eb',
              borderRadius: '50%',
              marginRight: 6,
              position: 'relative'
            }}>
              <span style={{
                display: 'block',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: '10px solid #2563eb',
                position: 'absolute',
                left: 4,
                top: 3
              }} />
            </span>
            Watch Demo
          </a>
        </div>
        {/* Soft background card */}
        <div style={{
          width: 900,
          height: 180,
          background: 'linear-gradient(90deg, #e3eafc 60%, #fbe8d2 100%)',
          borderRadius: 32,
          opacity: 0.7,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Placeholder for future content */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              width: 180,
              height: 36,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 8
            }} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
