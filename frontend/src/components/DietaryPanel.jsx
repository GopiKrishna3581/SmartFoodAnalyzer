import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Shield, Leaf, Wheat } from 'lucide-react';

const Badge = ({ text, type }) => {
  const icons = {
    'Vegan': Leaf,
    'Gluten-Free': Wheat,
    'Contains Sugar': AlertTriangle,
    'Processed': Shield,
    'High Fat': AlertCircle,
    'High Sodium': AlertCircle,
    'Contains Nuts': AlertCircle,
    'Dairy': AlertCircle,
  };

  const Icon = icons[text] || Shield;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
};

const AlertComponent = ({ type, title, description, icon: Icon, badges }) => {
  const styles = {
    safe: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-200',
    moderate: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-900 dark:text-yellow-200',
    unsafe: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900 dark:text-red-200',
  };

  return (
    <div className={`p-6 mb-4 border rounded-xl ${styles[type]} transform transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2">{title}</h4>
          <p className="text-sm opacity-90 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} text={badge} type={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DietaryPanel({ data }) {
  // Extract recommendation and reason from the data
  const recommendationType = data?.recommendation?.recommendation || 'unsafe'; // Default to 'unsafe' if missing
  const reason = data?.recommendation?.reason || 'No specific reason provided.';

  // Define alert content based on the recommendation type
  const alertContent = {
    safe: {
      type: 'safe',
      title: 'Safe for Consumption',
      description: reason,
      icon: CheckCircle,
      badges: ['Vegan', 'Gluten-Free'],
    },
    moderate: {
      type: 'moderate',
      title: 'Moderate Consumption Advised',
      description: reason,
      icon: AlertTriangle,
      badges: ['Contains Sugar', 'Processed'],
    },
    unsafe: {
      type: 'unsafe',
      title: 'Not Recommended',
      description: reason,
      icon: AlertCircle,
      badges: ['High Fat', 'High Sodium'],
    },
  };

  // Select the appropriate alert content based on the recommendation type
  const selectedAlert = alertContent[recommendationType] || alertContent.unsafe;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Dietary Analysis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Based on the ingredients and nutritional content
        </p>
      </div>

      {/* Render the dynamic alert */}
      <AlertComponent {...selectedAlert} />

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
          This analysis is based on the provided food label information. Always consult with a healthcare professional for specific dietary advice.
        </p>
      </div>
    </div>
  );
}