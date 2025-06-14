import React from 'react';
import { useNavigate } from 'react-router-dom';

const storedUser = JSON.parse(localStorage.getItem('user'));

function getPracticeTimeString() {
  let seconds = 0;
  try {
    seconds = parseInt(localStorage.getItem('drumPracticeSeconds') || '0', 10);
  } catch (e) { seconds = 0; }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const user = storedUser ? {
  name: storedUser.firstName + ' ' + storedUser.lastName,
  ...storedUser,
  progress: 65,
  practiceTime: getPracticeTimeString(),
  coursesCompleted: 3,
  skillLevel: 'Intermediate',
  continueLearning: [
    {
      icon: '🎸',
      title: 'Guitar Fundamentals',
      lastAccessed: '2 hours ago',
      progress: 75,
    },
    {
      icon: '📚',
      title: 'Music Theory Basics',
      lastAccessed: '1 day ago',
      progress: 45,
    },
    {
      icon: '🎹',
      title: 'Piano Techniques',
      lastAccessed: '3 days ago',
      progress: 60,
    },
  ],
} : {
  name: 'User',
  progress: 65,
  practiceTime: getPracticeTimeString(),
  coursesCompleted: 3,
  skillLevel: 'Intermediate',
  continueLearning: [
    {
      icon: '🎸',
      title: 'Guitar Fundamentals',
      lastAccessed: '2 hours ago',
      progress: 75,
    },
    {
      icon: '📚',
      title: 'Music Theory Basics',
      lastAccessed: '1 day ago',
      progress: 45,
    },
    {
      icon: '🎹',
      title: 'Piano Techniques',
      lastAccessed: '3 days ago',
      progress: 60,
    },
  ],
};

const navItems = [
  { label: 'Home', icon: '🏠', path: '/home' },
  { label: 'Profile', icon: '👤', path: '/profile' },
  { label: 'Courses', icon: '📚', path: '/courses' },
  { label: 'Practice', icon: '🎯', path: '/practice' },
  { label: 'Community', icon: '🌐', path: '/community' },
];

function getEnrolledCourses() {
  const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  const all = [
    { id: 'guitar', title: 'Guitar Mastery', icon: '🎸' },
    { id: 'piano', title: 'Piano Essentials', icon: '🎹' },
    { id: 'drums', title: 'Drum Pro', icon: '🥁' },
    { id: 'violin', title: 'Violin Virtuoso', icon: '🎻' },
    { id: 'flute', title: 'Flute Fundamentals', icon: '🎶' },
    { id: 'singing', title: 'Singing Star', icon: '🎤' },
  ];
  return all.filter(c => enrolled.includes(c.id));
}

function HomePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: '#fff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0 0 0',
        minHeight: '100vh'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 22, padding: '0 32px 32px 32px' }}>
          <span role="img" aria-label="music" style={{ fontSize: 26, marginRight: 8 }}>🎵</span>
          <span style={{ color: '#2563eb' }}>MusicEd Pro</span>
        </div>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: item.label === 'Home' ? '#fff' : '#222',
                background: item.label === 'Home' ? 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)' : 'transparent',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 17,
                padding: '12px 32px',
                borderRadius: 10,
                margin: '4px 12px'
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 40px 0 40px' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 26, color: '#2563eb', marginRight: 32 }}>MusicEd Pro</div>
          <div style={{ flex: 1 }} />
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              padding: '8px 18px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #ef444422'
            }}
          >
            Logout
          </button>
        </div>
        {/* Welcome Card */}
        <div style={{
          background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
          borderRadius: 16,
          color: '#fff',
          padding: '32px 36px',
          marginBottom: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: '0 2px 8px #2563eb22'
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
            Welcome back, {user.name}! <span role="img" aria-label="music">🎵</span>
          </div>
          <div style={{ fontSize: 18, opacity: 0.95, marginBottom: 16 }}>
            Ready to continue your musical journey?
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 12,
              padding: '18px 32px',
              fontWeight: 700,
              fontSize: 22,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span>Overall Progress</span>
              <span style={{ fontSize: 28 }}>{user.progress}%</span>
            </div>
            <button
              style={{
                marginLeft: 12,
                background: '#fff',
                color: '#2563eb',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 18,
                padding: '12px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #2563eb22'
              }}
              onClick={() => navigate('/courses')}
            >
              Continue Learning
            </button>
          </div>
        </div>
        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 32 }}>
          <div style={statCardStyle}>
            <div style={{ fontSize: 15, color: '#888', marginBottom: 6 }}>Total Practice Time</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{user.practiceTime}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ fontSize: 15, color: '#888', marginBottom: 6 }}>Courses Enrolled</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{getEnrolledCourses().length}</div>
          </div>
        </div>
        {/* Enrolled Courses Row */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Your Enrolled Courses</div>
          {getEnrolledCourses().length === 0 ? (
            <div style={{ color: '#888', fontSize: 16 }}>You have not enrolled in any courses yet.</div>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {getEnrolledCourses().map(course => (
                <div key={course.id} style={{
                  background: '#fff',
                  borderRadius: 14,
                  boxShadow: '0 2px 8px #2563eb11',
                  padding: '24px 20px',
                  minWidth: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span style={{ fontSize: 36 }}>{course.icon}</span>
                  <div style={{ fontWeight: 600, fontSize: 17 }}>{course.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Main Grid */}
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Continue Learning */}
          <div style={{ flex: 2 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Continue Learning</div>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 8px #2563eb11'
            }}>
              {user.continueLearning.map((course, idx) => (
                <div key={course.title} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: idx < user.continueLearning.length - 1 ? 22 : 0
                }}>
                  <span style={{ fontSize: 32, marginRight: 18 }}>{course.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 17 }}>{course.title}</div>
                    <div style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Last accessed {course.lastAccessed}</div>
                    <div style={{ background: '#e5e7eb', borderRadius: 6, height: 8, width: '100%' }}>
                      <div style={{
                        width: `${course.progress}%`,
                        background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
                        height: '100%',
                        borderRadius: 6,
                        transition: 'width 0.5s'
                      }} />
                    </div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{course.progress}% complete</div>
                  </div>
                  <button style={{
                    marginLeft: 18,
                    background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 16,
                    padding: '8px 22px',
                    cursor: 'pointer'
                  }}>
                    Resume
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Spacer */}
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

const statCardStyle = {
  flex: 1,
  background: '#fff',
  borderRadius: 12,
  padding: '22px 0 18px 24px',
  boxShadow: '0 2px 8px #2563eb11',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

export default HomePage;
