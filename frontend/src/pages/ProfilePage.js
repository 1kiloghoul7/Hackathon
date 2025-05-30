import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([
    { name: 'Guitar', level: 'Intermediate', progress: 75 },
    { name: 'Music Theory', level: 'Advanced', progress: 90 },
    { name: 'Piano', level: 'Beginner', progress: 30 },
    { name: 'Composition', level: 'Intermediate', progress: 60 }
  ]);

  const achievements = [
    { icon: '🎵', title: 'First Song Mastered', date: '2024-01-15' },
    { icon: '📚', title: 'Theory Expert', date: '2024-02-20' },
    { icon: '🎯', title: 'Perfect Pitch', date: '2024-03-10' },
    { icon: '📅', title: '30-Day Streak', date: '2024-03-25' }
  ];

  const stats = {
    practiceHours: 156,
    courses: 12,
    certificates: 24
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
        setIsLoading(false);
        // Temporary fallback data for testing
        setUser({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '123-456-7890'
        });
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '20px',
        color: '#2563eb'
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'red' 
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#1e293b' }}>My Profile</h1>
        <button
          onClick={() => {/* Add edit functionality */}}
          style={{
            padding: '8px 16px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Personal Information */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Personal Information</h2>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            👤
          </div>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>
              {user.firstName} {user.lastName}
            </h3>
            <p style={{ color: '#64748b', marginBottom: '8px' }}>{user.email}</p>
            <p style={{ color: '#64748b' }}>{user.phone}</p>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: '#fb923c',
              color: 'white',
              borderRadius: '16px',
              fontSize: '14px',
              marginTop: '8px'
            }}>
              Intermediate Level
            </div>
          </div>
        </div>
      </div>

      {/* Skill Progress */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Skill Progress</h2>
        {skills.map((skill, index) => (
          <div key={index} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>{skill.name}</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '14px',
                background: skill.level === 'Advanced' ? '#22c55e' : 
                           skill.level === 'Intermediate' ? '#fb923c' : '#64748b',
                color: 'white'
              }}>{skill.level}</span>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '4px', height: '8px' }}>
              <div style={{
                width: `${skill.progress}%`,
                background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)',
                height: '100%',
                borderRadius: '4px',
                transition: 'width 0.5s'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Learning Stats and Achievements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Learning Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
                {stats.practiceHours}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Hours Practiced</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
                {stats.courses}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Courses</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
                {stats.certificates}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Certificates</div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Achievements</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {achievements.map((achievement, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {achievement.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>{achievement.title}</div>
                  <div style={{ color: '#64748b', fontSize: '14px' }}>
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
