
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">Your Documents</h1>
          <Link
            to="/create"
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New CV
          </Link>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-display font-semibold mb-4">
              No documents yet
            </h2>
            <p className="text-gray-600 mb-8">
              Create your first CV or cover letter to get started
            </p>
            <Link
              to="/create"
              className="bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
            >
              Create Your First CV <Plus className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Document cards will go here */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
