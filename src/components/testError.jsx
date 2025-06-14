// My test error page is here
import { useState } from 'react'

function TestError() {
  const [shouldThrowError, setShouldThrowError] = useState(false)

  if (shouldThrowError) {
    throw new Error('This is a test error to trigger the ErrorBoundary!')
  }

  return (
    <main className="font-lato min-h-screen bg-[#0F4C5C] text-white px-4 py-8 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Error Boundary Test Page</h1>
        <p className="text-gray-300">Click the button below to trigger an error and test the ErrorBoundary</p>
        
        <button
          onClick={() => setShouldThrowError(true)}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Trigger Test Error
        </button>

        <div className="mt-8">
          <a
            href="/"
            className="text-blue-300 hover:text-blue-200 underline"
          >
            ← Back to Todo App
          </a>
        </div>
      </div>
    </main>
  )
}

export default TestError