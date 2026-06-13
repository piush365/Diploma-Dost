import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#111] text-[#f0ede6] p-6 text-center">
          <h1 className="text-4xl font-ui font-extrabold mb-4">Something went wrong.</h1>
          <p className="text-[#888] mb-8 max-w-md">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary text-sm px-6 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#e8453c]"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;