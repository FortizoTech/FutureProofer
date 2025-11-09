import { CourseCard } from '../course-card';

export default function CourseCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <CourseCard
        title="Introduction to Data Science"
        description="Learn the fundamentals of data analysis, statistics, and machine learning."
        duration="6 weeks"
        difficulty="beginner"
        category="Data Science"
        thumbnail="placeholder"
        enrolled={true}
        progress={35}
        onAction={() => console.log('Course action')}
      />
      <CourseCard
        title="Advanced Python for AI"
        description="Master Python programming for artificial intelligence and deep learning applications."
        duration="8 weeks"
        difficulty="advanced"
        category="Programming"
        thumbnail="placeholder"
        onAction={() => console.log('Course action')}
      />
    </div>
  );
}
