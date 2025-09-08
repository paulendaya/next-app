import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome back, {session.user?.name}!
        </h2>
        <p className="text-gray-600 mb-4">
          You are now signed in and can access the dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Profile</h3>
            <p className="text-blue-600 text-sm">
              Manage your account settings
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Analytics</h3>
            <p className="text-green-600 text-sm">
              View your activity and statistics
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Settings</h3>
            <p className="text-purple-600 text-sm">
              Configure your preferences
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
