'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonSignOut from '@/components/buttonSigOut';
import axiosInstance from '@/lib/axios/axiosInstance';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading' || !session?.user?.token) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`users?page=1&limit=1000`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Erro ao buscar os usuários:', err);
        setError('Erro ao buscar os usuários.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-500">Aguarde, carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Usuário não autenticado ou token ausente.</p>
      </div>
    );
  }

  return (
    <div className="dashboard p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Bem-vindo ao Dashboard, {session.user.name}</h1>

      {loading ? (
        <div className="flex items-center justify-center">
          <p className="text-lg text-gray-500">Carregando usuários...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white rounded-lg shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b">
                <TableHead className="py-2 px-4 text-left text-sm font-medium text-gray-700">ID</TableHead>
                <TableHead className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nome</TableHead>
                <TableHead className="py-2 px-4 text-left text-sm font-medium text-gray-700">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-b hover:bg-gray-50">
                  <TableCell className="py-2 px-4 text-sm text-gray-700">{user.id}</TableCell>
                  <TableCell className="py-2 px-4 text-sm text-gray-700">{user.name}</TableCell>
                  <TableCell className="py-2 px-4 text-sm text-gray-700">{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <ButtonSignOut />
      </div>
    </div>
  );
};

export default Dashboard;
