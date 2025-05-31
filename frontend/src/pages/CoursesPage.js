import React, { useEffect, useState } from 'react';

const ALL_COURSES = [
  {
    id: 'guitar',
    title: 'Guitar Mastery',
    description: 'Learn guitar from basics to advanced techniques.',
    icon: '🎸',
    tag: 'Intermediate',
  },
  {
    id: 'piano',
    title: 'Piano Essentials',
    description: 'Master the piano with step-by-step lessons.',
    icon: '🎹',
    tag: 'Basic',
  },
  {
    id: 'drums',
    title: 'Drum Pro',
    description: 'Become a pro at drums with rhythm and groove.',
    icon: '🥁',
    tag: 'Advanced',
  },
  {
    id: 'violin',
    title: 'Violin Virtuoso',
    description: 'Start your journey to violin mastery.',
    icon: '🎻',
    tag: 'Basic',
  },
  {
    id: 'flute',
    title: 'Flute Fundamentals',
    description: 'Learn the essentials of flute playing.',
    icon: '🎶',
    tag: 'Intermediate',
  },
  {
    id: 'singing',
    title: 'Singing Star',
    description: 'Develop your singing skills and confidence.',
    icon: '🎤',
    tag: 'Advanced',
  },
];

function CoursesPage() {
  const [myCourses, setMyCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    // Load from localStorage
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setMyCourses(ALL_COURSES.filter(c => enrolled.includes(c.id)));
    setAvailableCourses(ALL_COURSES.filter(c => !enrolled.includes(c.id)));
  }, []);

  const enroll = (courseId) => {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(courseId)) {
      const updated = [...enrolled, courseId];
      localStorage.setItem('enrolledCourses', JSON.stringify(updated));
      setMyCourses(ALL_COURSES.filter(c => updated.includes(c.id)));
      setAvailableCourses(ALL_COURSES.filter(c => !updated.includes(c.id)));
    }
  };

  const unenroll = (courseId) => {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const updated = enrolled.filter(id => id !== courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(updated));
    setMyCourses(ALL_COURSES.filter(c => updated.includes(c.id)));
    setAvailableCourses(ALL_COURSES.filter(c => !updated.includes(c.id)));
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#f9f9f9', padding: 32, borderRadius: 8 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>My Courses</h2>
      {myCourses.length === 0 ? (
        <div>No courses enrolled.</div>
      ) : (
        <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
          {myCourses.map(course => (
            <div key={course.id} style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px #2563eb11',
              padding: '28px 24px',
              minWidth: 220,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              position: 'relative',
            }}>
              <span style={{ fontSize: 40 }}>{course.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{course.title}</div>
              <div style={{ color: '#64748b', fontSize: 15, textAlign: 'center' }}>{course.description}</div>
              <button
                style={{
                  marginTop: 12,
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  padding: '8px 22px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #ef444422',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onClick={() => unenroll(course.id)}
              >
                <span style={{ fontSize: 20, fontWeight: 700 }}>-</span> Unenroll
              </button>
            </div>
          ))}
        </div>
      )}
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 18, marginTop: 32 }}>Available Courses</h2>
      {availableCourses.length === 0 ? (
        <div>All courses enrolled!</div>
      ) : (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {availableCourses.map(course => (
            <div key={course.id} style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px #2563eb11',
              padding: '28px 24px',
              minWidth: 220,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              position: 'relative',
            }}>
              <span style={{ fontSize: 40 }}>{course.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{course.title}</div>
              <div style={{ color: '#64748b', fontSize: 15, textAlign: 'center' }}>{course.description}</div>
              <span style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: course.tag === 'Basic' ? '#22c55e' : course.tag === 'Intermediate' ? '#f59e42' : '#2563eb',
                color: '#fff',
                fontWeight: 600,
                fontSize: 13,
                borderRadius: 6,
                padding: '4px 12px',
                boxShadow: '0 2px 8px #2563eb22',
              }}>{course.tag}</span>
              <button
                style={{
                  marginTop: 12,
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
                onClick={() => enroll(course.id)}
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
