import React from 'react';
import { Info } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function NutritionTable({ data }) {
  // Helper function to parse numeric values for the pie chart
  const parseNumericValue = (value) => {
    return parseFloat(value?.replace(/[^0-9.]/g, '') || 0);
  };

  // Extract relevant parts of the data
  const extractedInfo = data?.extracted_info || {};
  const nutritionalInfo = extractedInfo?.nutritional_info || {};
  const otherDetails = extractedInfo?.other_details || {};
  const recommendation = data?.recommendation || {};

  // Prepare data for the PieChart using all nutrients
  const allNutrients = Object.entries(nutritionalInfo?.per_100g || {}).map(([name, amount]) => ({
    name,
    value: parseNumericValue(amount)
  }));

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#ffbb28', '#00c49f', '#ff6384', '#a832a2'];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{extractedInfo?.product_name || 'Product Name'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Serving Size: {Object.keys(nutritionalInfo?.per_serve_size_20g || {}).length > 0 ? '20 g' : 'N/A'}
          </p>
        </div>

        {/* Ingredients Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Ingredients</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            {extractedInfo?.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )) || <li>No ingredients available</li>}
          </ul>
        </div>

        {/* Nutrition Facts Table */}
        <div className="space-y-1 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nutrition Facts</h4>
          {Object.entries(nutritionalInfo?.per_100g || {}).map(([name, amount], index) => (
            <div
              key={name}
              className={`group relative py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors ${
                index !== Object.keys(nutritionalInfo?.per_100g || {}).length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
                <div className="relative group">
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {`Per 100g: ${amount}`}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{amount || '-'}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem] text-right">
                  {nutritionalInfo?.per_serve_size_20g?.[name] || '-'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Other Details Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Other Details</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            {Object.entries(otherDetails).map(([key, value]) => {
              if (typeof value === 'object') {
                return (
                  <li key={key}>
                    <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong>
                    <ul className="list-disc pl-5">
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey}>
                          <strong>{subKey.replace(/_/g, ' ').toUpperCase()}:</strong> {subValue}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={key}>
                  <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Recommendation Section */}
        {/* <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recommendation</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Recommendation:</strong> {recommendation?.recommendation || 'N/A'}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Reason:</strong> {recommendation?.reason || 'N/A'}
          </p>
        </div> */}

        {/* Pie Chart Section for All Nutrients */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Nutrient Breakdown (per 100g)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={allNutrients}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {allNutrients.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}