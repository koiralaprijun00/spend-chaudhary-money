import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useTranslations } from 'next-intl';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {session?.user?.name}!</p>
        
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  );
}