import React from "react";

type Props = {
  user: any;
};

export default function ProfileCard({ user }: Props) {
  if (!user) return null;
  const u = user.results?.[0];
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-6 items-center">
      <img
        src={u.picture.large}
        alt="avatar"
        className="w-28 h-28 rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold">
          {u.name.first} {u.name.last}
        </h2>
        <p className="text-sm text-gray-600">{u.email}</p>
        <p className="text-sm text-gray-600">{u.phone}</p>
        <p className="text-sm text-gray-600">
          {u.location.city}, {u.location.state}
        </p>
      </div>
    </div>
  );
}
