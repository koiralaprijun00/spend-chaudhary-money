import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute';
import Image from 'next/image';
import { 
  Trophy, 
  GamepadIcon, 
  ChartLine, 
  Settings, 
  Star, 
  UserCircle2,
} from 'lucide-react';
import Link from 'next/link';
import SignOutButton from '@/app/components/auth/SignOutButton';

// Mock data - replace with actual database queries
const mockUserStats = {
  gamesPlayed: 42,
  totalPoints: 1250,
  achievements: [
    { id: 1, name: 'Nepal Novice', icon: '🏆', description: 'Completed first game' },
    { id: 2, name: 'Geography Guru', icon: '🗺️', description: 'Mastered Districts Quiz' },
    { id: 3, name: 'History Hunter', icon: '👑', description: 'Kings of Nepal Expert' }
  ],
  recentGames: [
    { id: 1, name: 'Nepal GK Quiz', points: 120, date: '2024-05-10' },
    { id: 2, name: 'Name the Districts', points: 95, date: '2024-05-08' },
    { id: 3, name: 'Kings of Nepal', points: 110, date: '2024-05-05' }
  ]
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return null; // This will be handled by ProtectedRoute
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'Profile picture'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserCircle2 className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl">Welcome,</h1>
              <p className="text-2xl font-bold">{session?.user?.name}!</p>
            </div>
          </div>
          <SignOutButton />
        </div>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Stats Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GamepadIcon className="w-6 h-6 mr-3 text-blue-500" />
                    <span>Games Played</span>
                  </div>
                  <span className="font-bold">{mockUserStats.gamesPlayed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 mr-3 text-yellow-500" />
                    <span>Total Points</span>
                  </div>
                  <span className="font-bold">{mockUserStats.totalPoints}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-6 h-6 mr-3 text-green-500" />
                    <span>Achievements</span>
                  </div>
                  <span className="font-bold">{mockUserStats.achievements.length}</span>
                </div>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
              <div className="space-y-3">
                {mockUserStats.achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="text-2xl mr-3">{achievement.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Recent Games Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Games</h2>
              <div className="space-y-4">
                {mockUserStats.recentGames.map((game) => (
                  <div 
                    key={game.id} 
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{game.name}</h3>
                      <p className="text-sm text-gray-600">{game.date}</p>
                    </div>
                    <span className="font-bold text-blue-600">{game.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  href="/general-knowledge" 
                  className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 flex flex-col items-center transition"
                >
                  <ChartLine className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-800">GK Quiz</span>
                </Link>
                
                <Link 
                  href="/kings-of-nepal" 
                  className="bg-green-50 hover:bg-green-100 rounded-lg p-4 flex flex-col items-center transition"
                >
                  <Trophy className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-800">Kings Quiz</span>
                </Link>
                
                <Link 
                  href="/name-districts" 
                  className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 flex flex-col items-center transition"
                >
                  <GamepadIcon className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-800">Districts</span>
                </Link>
                
                <Link 
                  href="/dashboard/settings" 
                  className="bg-orange-50 hover:bg-orange-100 rounded-lg p-4 flex flex-col items-center transition"
                >
                  <Settings className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-orange-800">Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}