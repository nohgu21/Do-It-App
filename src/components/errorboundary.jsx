import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="font-lato min-h-screen bg-[#0F4C5C] text-white flex flex-col items-center justify-center px-6 text-center space-y-4">
          <h2 className="text-2xl font-bold">Yikes. Something went wrong 😬</h2>
          <p className="text-gray-300">It’s not you, it’s us. Try refreshing or head back home.</p>
          <a href="/"
            className="inline-block bg-white text-[#0F4C5C] font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            Go Home
          </a>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
