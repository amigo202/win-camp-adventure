
import React from 'react';

const EmptyStudentsMessage: React.FC = () => {
  return (
    <div className="bg-white/5 p-8 rounded-lg text-center">
      <p className="text-gray-300">לא נמצאו תלמידים. הוסיפו תלמידים במסך ניהול התלמידים.</p>
    </div>
  );
};

export default EmptyStudentsMessage;
