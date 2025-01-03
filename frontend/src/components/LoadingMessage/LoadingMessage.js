import React from 'react';

const LoadingMessage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
        }}>
            {/* Spinner */}
            <div style={{
                width: '6rem',  // Increased from 4rem
                height: '6rem', // Increased from 4rem
                marginBottom: '2rem', // Increased margin
                border: '6px solid #e5e7eb', // Increased border width
                borderTop: '6px solid #3b82f6', // Increased border width
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }}>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </div>

            {/* Loading Message */}
            <h3 style={{
                fontSize: '2.75rem', // Increased from 1.25rem
                fontWeight: 700,     // Made slightly bolder
                marginBottom: '1rem',
                color: '#1f2937'
            }}>
                Starting up the server...
            </h3>

            {/* Explanation */}
            <p style={{
                fontSize: '2.1rem',  // Increased from default
                color: '#4b5563',
                marginBottom: '1.5rem',
                maxWidth: '32rem'    // Increased from 28rem
            }}>
                This might take a few extra seconds due to cold start. The server automatically scales down during periods of inactivity to optimize resource usage.
            </p>

            {/* Technical Note */}
            <p style={{
                fontSize: '2rem',    // Increased from 0.875rem
                color: '#6b7280',
                fontStyle: 'italic',
                maxWidth: '28rem'    // Increased from 24rem
            }}>
                Using serverless architecture with auto-scaling for cost-effective deployment.
            </p>
        </div>
    );
};

export default LoadingMessage;