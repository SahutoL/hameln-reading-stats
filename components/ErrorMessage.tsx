
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md relative text-center" role="alert">
      <strong className="font-bold">エラー: </strong>
      <span className="block sm:inline">{message}</span>
      {onRetry && (
         <button 
            onClick={onRetry}
            className="ml-4 mt-2 sm:mt-0 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
            再試行
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
