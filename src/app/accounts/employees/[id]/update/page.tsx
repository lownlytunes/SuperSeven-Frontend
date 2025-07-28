'use client';

import { RegisterAccount } from '@/sections/accounts/AddAccount';
import { useRouter } from 'next/navigation';
import { fetchEmployeeById } from '@/lib/api/fetchAccount';
import { useEffect, useState, use } from 'react';
import { User } from '@/types/user';
import Preloader from '@/components/Preloader';
import { Box } from '@mui/material';
import { NavBar } from '@/components/SideBar';
import { TopBar } from '@/components/topbar';

export default function UpdateEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [account, setAccount] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = use(params);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const data = await fetchEmployeeById(id);
        setAccount(data);
      } catch (err) {
        console.error('Error loading account:', err); // Debugging line
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };

    loadAccount();
  }, [id]);

  if (loading) return <Preloader />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <NavBar />
      <Box sx={{ flexDirection: 'column', flex: 1 }}>
        <TopBar />
        
        <RegisterAccount 
          account={account}
          isEditMode={true}
          onBackClick={() => router.push('/accounts')}
          onSuccess={() => router.push('/accounts')}
        />
      </Box>
    </Box>
  );
}