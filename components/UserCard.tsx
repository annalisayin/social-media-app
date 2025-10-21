import Link from 'next/link';
import React from 'react';

export default function UserCard({ user }: { user: any }) {
  const handleClick = () => {
    sessionStorage.setItem(`user_${user.login.uuid}`, JSON.stringify(user));
  };

  return (
    <Link href={`/users/${user.login.uuid}`} onClick={handleClick}>
      <div className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition cursor-pointer">
        <div className="flex items-center gap-4">
          <img src={user.picture.medium} alt="avatar" className="rounded-full w-12 h-12" />
          <div>
            <div className="font-medium">{user.name.first} {user.name.last}</div>
            <div className="text-sm text-gray-500">{user.location.city}, {user.location.state}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
