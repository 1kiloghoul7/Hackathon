import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getPremium() {
  return localStorage.getItem('premiumUser') === 'true';
}

function setPremium(val) {
  localStorage.setItem('premiumUser', val ? 'true' : 'false');
}

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [premium, setPremiumState] = useState(getPremium());
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
    // Use localStorage for user
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
    } else {
      setUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      });
      setIsLoading(false);
    }
    setPremiumState(getPremium());
  }, []);

  const handleGoPremium = () => {
    // Simulate payment portal (Stripe logic placeholder)
    // In real app, redirect to Stripe checkout
    setTimeout(() => {
      setPremium(true);
      setPremiumState(true);
      alert('You are now a premium member!');
    }, 1000);
  };

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
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 28 }}>Profile</div>
          {premium ? (
            <span style={{ background: '#22c55e', color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 600, fontSize: 15 }}>Premium</span>
          ) : (
            <span style={{ background: '#64748b', color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 600, fontSize: 15 }}>Free</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>👤</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 22 }}>{user?.firstName} {user?.lastName}</div>
            <div style={{ color: '#64748b', fontSize: 15 }}>{user?.email}</div>
            <div style={{ color: '#64748b', fontSize: 15 }}>{user?.phone}</div>
          </div>
        </div>
        {!premium && (
          <button
            style={{ marginTop: 24, background: 'linear-gradient(90deg, #2563eb 60%, #f59e42 100%)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 17, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22' }}
            onClick={handleGoPremium}
          >Go Premium</button>
        )}
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
