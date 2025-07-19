import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-green-400 to-green-600 dark:from-gray-800 dark:to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to Toernooi Manager</h1>
      <p className="text-xl mb-8 drop-shadow">Manage your football tournaments with ease!</p>
      <div>
        <button onClick={() => setTheme("light")} className="mr-2 px-4 py-2 bg-white text-green-600 rounded shadow">Light</button>
        <button onClick={() => setTheme("dark")} className="px-4 py-2 bg-gray-900 text-white rounded shadow">Dark</button>
      </div>
    </main>
  );
} 