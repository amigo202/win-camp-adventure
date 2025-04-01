
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md shadow-md transition-colors"
      >
        <Home size={20} />
        מעבר לגלריית הכלים
      </button>
    </div>
  );
};

export default AdminHeader;
