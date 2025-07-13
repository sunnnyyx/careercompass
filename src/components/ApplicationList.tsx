"use client";

type Application = {
  id: string;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
};

interface ApplicationListProps {
  applications: Application[];
  onDelete: (id: string) => void;
  onEdit: (app: Application) => void;
}

const statusColor = {
  Applied: "bg-blue-100 text-blue-800",
  "Interview Scheduled": "bg-yellow-100 text-yellow-800",
  Interviewed: "bg-purple-100 text-purple-800",
  "Offer Received": "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Withdrawn: "bg-gray-300 text-gray-700",
};

export default function ApplicationList({
  applications,
  onDelete,
  onEdit,
}: ApplicationListProps) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Company</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Job Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date Applied</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">{app.company}</td>
                  <td className="px-6 py-4">{app.title}</td>
                  <td className="px-6 py-4">{app.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        statusColor[app.status as keyof typeof statusColor]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => onEdit(app)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
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
    </>
  );
}
