import React from 'react';

const user = {
  name: 'Alex Johnson',
  progress: 65,
  practiceTime: '24h 30m',
  coursesCompleted: 3,
  skillLevel: 'Intermediate',
  communityRank: 127,
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
  achievements: [
    { icon: '🏅', title: 'First Lesson Complete', date: 'Yesterday' },
    { icon: '🔥', title: 'Practice Streak: 7 Days', date: 'Today' },
    { icon: '🧠', title: 'Theory Master', date: '2 days ago' },
  ],
};

const navItems = [
  { label: 'Home', icon: '🏠', path: '/home' },
  { label: 'Profile', icon: '👤', path: '/profile' },
  { label: 'Courses', icon: '📚', path: '/courses' },
  { label: 'Practice', icon: '🎯', path: '/practice' },
  { label: 'Community', icon: '🌐', path: '/community' },
];

function HomePage() {
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
          <input
            type="text"
            placeholder="Search courses, lessons..."
            style={{
              flex: 1,
              padding: '10px 18px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: 16,
              marginRight: 32,
              background: '#f3f4f6'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="profile" style={{ width: 34, height: 34, borderRadius: '50%' }} />
            </div>
          </div>
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
            <button style={{
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
            }}>
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
            <div style={{ fontSize: 15, color: '#888', marginBottom: 6 }}>Courses Completed</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{user.coursesCompleted}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ fontSize: 15, color: '#888', marginBottom: 6 }}>Skill Level</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{user.skillLevel}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ fontSize: 15, color: '#888', marginBottom: 6 }}>Community Rank</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>#{user.communityRank}</div>
          </div>
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
          {/* Achievements */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Recent Achievements</div>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 8px #2563eb11'
            }}>
              {user.achievements.map((ach, idx) => (
                <div key={ach.title} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: idx < user.achievements.length - 1 ? 18 : 0
                }}>
                  <span style={{ fontSize: 26, marginRight: 14 }}>{ach.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{ach.title}</div>
                    <div style={{ color: '#888', fontSize: 13 }}>{ach.date}</div>
                  </div>
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
