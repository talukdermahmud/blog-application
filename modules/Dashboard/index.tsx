"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "@/services/dataServices";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Post } from "@/types/types";
import { Activity, NotebookPen, Users } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const router = useRouter();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsPerUser, setPostsPerUser] = useState<{ [key: string]: number }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUserCount(users.length);

        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setPostCount(fetchedPosts.length);

        const postsByUser: { [key: string]: number } = {};
        fetchedPosts.forEach((post) => {
          postsByUser[post.userId] = (postsByUser[post.userId] || 0) + 1;
        });
        setPostsPerUser(postsByUser);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const chartData = {
    labels: Object.keys(postsPerUser).map((userId) => `User ${userId}`),
    datasets: [
      {
        label: "Posts",
        data: Object.values(postsPerUser),
        backgroundColor: "#2B717D",
        borderColor: "#2B7E3C",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--foreground"
          ),
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--foreground"
          ),
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--foreground"
          ),
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="p-4 max-sm:!p-0">
      <motion.h1
        className="text-lg font-bold mb-8 text-center md:text-left"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          onClick={() => router.push("/users")}
          className="cursor-pointer h-full"
        >
          <DashboardCard
            title="Total Users"
            value={userCount}
            icon={<Users />}
            color={"#1890ff"}
          />
        </div>
        <div
          onClick={() => router.push("/posts")}
          className="cursor-pointer h-full"
        >
          <DashboardCard
            title="Total Posts"
            value={postCount}
            icon={<NotebookPen />}
            color={"#2B7E3C"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          className="bg-[var(--primary)] p-6 rounded-xl shadow-lg border border-[var(--primary)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4 text-[var(--foreground)]">
            Posts Distribution by User
          </h2>
          <Bar data={chartData} options={chartOptions} />
        </motion.div>

        <motion.div
          className="bg-[var(--primary)] p-6 rounded-xl shadow-lg border border-[var(--primary)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4 text-[var(--foreground)]">
            Recent Posts
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full h-full bg-[var(--background)] text-sm rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-[var(--secondary)] text-left ">
                  <th className="py-2 px-4 border-r border-[var(--primary)] text-left">
                    Post Title
                  </th>
                  <th className="py-2 px-4 text-left">By</th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, 7).map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[var(--secondary)] last:border-b-0 hover:bg-[var(--secondary-hover)] transition-colors duration-200"
                  >
                    <td className="py-2 px-4 text-[var(--foreground)] opacity-90 border-r border-[var(--secondary)] w-3/4">
                      {post.title}
                    </td>
                    <td className="py-2 px-4 text-[var(--foreground)] opacity-90">
                      User {post.userId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
