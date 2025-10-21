import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserDetail() {
  const router = useRouter();
  const { uuid } = router.query;
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uuid) return;
    const cached = sessionStorage.getItem(`user_${uuid}`);
    if (cached) {
      setUser(JSON.parse(cached));
      return;
    }

    // fallback: fetch one new user
    setLoading(true);
    fetch('/api/randomuser/users?results=50')
      .then(r => r.json())
      .then(json => {
        const found = json.results?.find((u: any) => u.login.uuid === uuid);
        setUser(found || null);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head><title>User Detail</title></Head>
      <header className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Detail</h1>
        <Link href="/users"><span className="text-blue-600 cursor-pointer">Back</span></Link>
      </header>

      <main className="max-w-4xl mx-auto">
        {loading && <div>Loading...</div>}
        {!loading && !user && <div className="text-gray-600">User not found</div>}
        {user && (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex gap-6 items-center">
              <img alt="avatar" src={user.picture.large} className="rounded-full w-32 h-32" />
              <div>
                <h2 className="text-xl font-semibold">{user.name.first} {user.name.last}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state} {user.location.postcode}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
