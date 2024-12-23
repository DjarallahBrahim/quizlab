import React from 'react';
import { User } from 'lucide-react';

interface UserSelectProps {
  users: Array<{ player_name: string; id: string }>;
  selectedUserId: string | null;
  onSelectUser: (userId: string | null) => void;
}

export function UserSelect({ users, selectedUserId, onSelectUser }: UserSelectProps) {
  return (
    <div className="flex items-center space-x-4">
      <User className="w-5 h-5 text-gray-500" />
      <select
        value={selectedUserId || ''}
        onChange={(e) => onSelectUser(e.target.value || null)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.player_name}
          </option>
        ))}
      </select>
    </div>
  );
}