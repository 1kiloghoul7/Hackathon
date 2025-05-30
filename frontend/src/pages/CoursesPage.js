import React, { useEffect, useState } from 'react';

function CoursesPage() {
  const [myCourses, setMyCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      // Replace with actual API endpoints and authentication as needed
      try {
        const myRes = await fetch('http://localhost:5000/api/courses/my');
        const availRes = await fetch('http://localhost:5000/api/courses/available');
        const myData = myRes.ok ? await myRes.json() : [];
        const availData = availRes.ok ? await availRes.json() : [];
        setMyCourses(myData);
        setAvailableCourses(availData);
      } catch {
        setMyCourses([]);
        setAvailableCourses([]);
      }
      setLoading(false);
    }
    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#f9f9f9', padding: 32, borderRadius: 8 }}>
      <h2>My Courses</h2>
      {myCourses.length === 0 ? (
        <div>No courses enrolled.</div>
      ) : (
        <ul>
          {myCourses.map(course => (
            <li key={course._id || course.id}>
              <strong>{course.title}</strong> - {course.description}
            </li>
          ))}
        </ul>
      )}
      <h2 style={{ marginTop: 32 }}>Available Courses</h2>
      {availableCourses.length === 0 ? (
        <div>No available courses.</div>
      ) : (
        <ul>
          {availableCourses.map(course => (
            <li key={course._id || course.id}>
              <strong>{course.title}</strong> - {course.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CoursesPage;
