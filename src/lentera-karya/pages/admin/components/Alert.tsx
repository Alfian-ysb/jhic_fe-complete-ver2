import { memo } from 'react';

interface AlertProps {
    type: 'success' | 'error';
    message: string;
    onClose?: () => void;
}
const Alert = memo(({ type, message, onClose }: AlertProps) => {
    const isSuccess = type === 'success';
    
    const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
    const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
    const textColor = isSuccess ? 'text-green-700' : 'text-red-700';
    
    return (
        <div className={`mb-4 p-4 ${bgColor} border ${borderColor} ${textColor} rounded-lg flex items-center justify-between`}>
            <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    {isSuccess ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    )}
                </svg>
                <span>{message}</span>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-4 text-sm font-medium hover:underline"
                    aria-label="Close alert"
                >
                    ✕
                </button>
            )}
        </div>
    );
});

Alert.displayName = 'Alert';

export default Alert;
