import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      setUser(JSON.parse(saved));
      setLoading(false);
    } else {
      fetch('/api/randomuser/profile')
        .then(r => r.json())
        .then(data => {
          const u = data.results?.[0];
          setUser(u);
          localStorage.setItem('currentUser', JSON.stringify(u));
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head><title>Profile — Social Takehome</title></Head>
      <header className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Link href="/users"><span className="text-blue-600 cursor-pointer">Other Users</span></Link>
      </header>

      <main className="max-w-4xl mx-auto">
        {loading && <div>Loading...</div>}
        {user && (
          <div className="bg-white shadow-md rounded-lg p-6 flex gap-6 items-center">
            <img src={user.picture.large} alt="avatar" className="w-28 h-28 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">{user.name.first} {user.name.last}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.location.city}, {user.location.state}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
