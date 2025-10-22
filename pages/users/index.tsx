import Head from "next/head";
import UserCard from "../../components/UserCard";
import { useFetch } from "../../hooks/useFetch";
import Link from "next/link";

export default function Users() {
  const { data, loading, error } = useFetch("/api/randomuser/users?results=12");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head>
        <title>Other Users</title>
      </Head>
      <header className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Other Users</h1>
        <Link href="/" className="text-blue-600">
          My Profile
        </Link>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {data?.results?.map((u: any) => (
          <UserCard key={u.login.uuid} user={u} />
        ))}
      </main>
    </div>
  );
}
