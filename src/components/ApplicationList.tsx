"use client";

interface Application {
  id: number;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
}

interface ApplicationListProps {
  applications: Application[];
  onDelete: (id: number) => void;
}

const statusColor = {
  "Applied": "bg-blue-100 text-blue-800",
  "Interview Scheduled": "bg-yellow-100 text-yellow-800",
  "Interviewed": "bg-purple-100 text-purple-800",
  "Offer Received": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
  "Withdrawn": "bg-gray-300 text-gray-700",
};

export default function ApplicationList({ applications, onDelete }: ApplicationListProps) {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Your Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Company</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Job Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date Applied</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{app.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        statusColor[app.status as keyof typeof statusColor]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button className="text-sm text-blue-600 hover:underline">Edit</button>
                    <button
                      onClick={() => onDelete(app.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
