export interface Article {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  content: string;
  status: 'Published' | 'Draft';
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    author: 'John Doe',
    publishedDate: '2024-01-15',
    views: 15420,
    likes: 234,
    comments: 45,
    content:
      'React Hooks have revolutionized the way we write React components...',
    status: 'Published',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    author: 'Jane Smith',
    publishedDate: '2024-01-20',
    views: 8930,
    likes: 156,
    comments: 23,
    content:
      'TypeScript offers powerful patterns for building scalable applications...',
    status: 'Published',
  },
  {
    id: '3',
    title: 'Building Responsive Layouts with CSS Grid',
    author: 'Mike Johnson',
    publishedDate: '2024-01-25',
    views: 12340,
    likes: 189,
    comments: 34,
    content: 'CSS Grid provides a powerful way to create complex layouts...',
    status: 'Published',
  },
  {
    id: '4',
    title: 'State Management in Modern React',
    author: 'Sarah Wilson',
    publishedDate: '2024-02-01',
    views: 9876,
    likes: 145,
    comments: 28,
    content: 'Managing state effectively is crucial for React applications...',
    status: 'Draft',
  },
  {
    id: '5',
    title: 'Performance Optimization Techniques',
    author: 'John Doe',
    publishedDate: '2024-02-05',
    views: 18750,
    likes: 298,
    comments: 67,
    content: 'Optimizing performance is essential for user experience...',
    status: 'Published',
  },
  {
    id: '6',
    title: 'Introduction to Next.js 14',
    author: 'Jane Smith',
    publishedDate: '2024-02-10',
    views: 14230,
    likes: 201,
    comments: 41,
    content: 'Next.js 14 brings exciting new features and improvements...',
    status: 'Published',
  },
  {
    id: '7',
    title: 'Testing React Components',
    author: 'Mike Johnson',
    publishedDate: '2024-02-15',
    views: 7650,
    likes: 112,
    comments: 19,
    content:
      'Testing is a crucial part of building reliable React applications...',
    status: 'Published',
  },
  {
    id: '8',
    title: 'GraphQL vs REST APIs',
    author: 'Sarah Wilson',
    publishedDate: '2024-02-20',
    views: 11450,
    likes: 167,
    comments: 35,
    content: 'Comparing GraphQL and REST for modern web development...',
    status: 'Published',
  },
  {
    id: '9',
    title: 'Docker for Frontend Developers',
    author: 'John Doe',
    publishedDate: '2024-02-25',
    views: 6780,
    likes: 89,
    comments: 15,
    content: 'Docker can streamline your frontend development workflow...',
    status: 'Draft',
  },
  {
    id: '10',
    title: 'Accessibility in Web Development',
    author: 'Jane Smith',
    publishedDate: '2024-03-01',
    views: 13560,
    likes: 234,
    comments: 52,
    content:
      "Building accessible web applications is everyone's responsibility...",
    status: 'Published',
  },
  {
    id: '11',
    title: 'Modern CSS Features You Should Know',
    author: 'Mike Johnson',
    publishedDate: '2024-03-05',
    views: 9870,
    likes: 143,
    comments: 27,
    content: 'CSS continues to evolve with powerful new features...',
    status: 'Published',
  },
  {
    id: '12',
    title: 'Building Progressive Web Apps',
    author: 'Sarah Wilson',
    publishedDate: '2024-03-10',
    views: 16420,
    likes: 267,
    comments: 48,
    content: 'PWAs offer native-like experiences on the web...',
    status: 'Published',
  },
];

export const generateChartData = (
  articles: Article[],
  timeframe: 'daily' | 'monthly'
) => {
  const data: { date: string; views: number }[] = [];

  if (timeframe === 'daily') {
    // Generate daily data for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Simulate daily views based on articles
      const dailyViews = Math.floor(Math.random() * 5000) + 1000;
      data.push({
        date: dateStr,
        views: dailyViews,
      });
    }
  } else {
    // Generate monthly data for the last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const dateStr = date.toISOString().slice(0, 7); // YYYY-MM format

      // Simulate monthly views
      const monthlyViews = Math.floor(Math.random() * 50000) + 10000;
      data.push({
        date: dateStr,
        views: monthlyViews,
      });
    }
  }

  return data;
};
