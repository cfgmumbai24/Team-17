import React, { useEffect, useState } from 'react';
import { UserButton, useAuth } from '@clerk/clerk-react';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as needed
}

const ProtectedPage: React.FC = () => {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Entered');
      try {
        console.log('try-block');

        const token = await getToken({ template: 'default' });
        console.log('Token fetched from Clerk:', token); // Log the token fetched from Clerk

        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data: UserData = await response.json();
          console.log('User data received from backend:', data); // Log the user data received from backend
          setUserData(data);
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch user data: ${errorText}`);
        }
      } catch (error) {
        console.log('catch-block');
        console.error('Error fetching user data:', error);
        setError(`Error fetching user data: ${(error as Error).message}`);
      }
    };

    fetchUserData();
  }, [getToken]);

  return (
    <div>
      Heyy
    </div>
  );
};

export default ProtectedPage;
