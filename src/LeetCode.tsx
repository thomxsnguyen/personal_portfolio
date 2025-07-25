import React from "react";

const LeetCode: React.FC = () => {
  return (
    <section id="leetcode" className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">LeetCode</h2>
        <p className="text-xl text-gray-600">
          My coding problem solutions and progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Easy Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Easy</h3>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-500 text-center italic">
              Problems will be showcased here
            </p>
            {/* Placeholder for future problems */}
            {/* 
            <div className="p-3 bg-green-50 rounded-md border-l-4 border-green-400">
              <h4 className="font-semibold text-gray-800">Problem Name</h4>
              <p className="text-sm text-gray-600">Brief description</p>
            </div>
            */}
          </div>
        </div>

        {/* Medium Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-yellow-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">Medium</h3>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-500 text-center italic">
              Problems will be showcased here
            </p>
            {/* Placeholder for future problems */}
            {/* 
            <div className="p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-800">Problem Name</h4>
              <p className="text-sm text-gray-600">Brief description</p>
            </div>
            */}
          </div>
        </div>

        {/* Hard Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-red-600 mb-2">Hard</h3>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-500 text-center italic">
              Problems will be showcased here
            </p>
            {/* Placeholder for future problems */}
            {/* 
            <div className="p-3 bg-red-50 rounded-md border-l-4 border-red-400">
              <h4 className="font-semibold text-gray-800">Problem Name</h4>
              <p className="text-sm text-gray-600">Brief description</p>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCode;
