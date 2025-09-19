"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { fetchUsers } from "@/services/dataServices";
import { User } from "@/types/types";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import ErrorMessage from "@/components/Error";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: users, loading, error } = useFetch<User[]>(fetchUsers);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {users && (
        <>
          <Table users={users} onRowClick={setSelectedUser} />
          <Modal
            isOpen={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
}
