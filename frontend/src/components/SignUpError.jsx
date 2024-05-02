
import React from 'react'

function SignUpError() {
  return (
    <div>
      
<div class="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
    <div class="bg-white border border-gray-500 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p class="text-2xl md:text-7xl lg:text-3xl font-bold tracking-wider text-gray-800">
            <span className='inline-block w-8 h-8'><img src="src/assets/error.png" alt="error" className='"w-full h-full' /></span>
        </p>
        <p class="text-1xl md:text-1xl lg:text-1xl font-bold tracking-wider text-red-900 mt-4">Invalid email address. Please enter a valid email.</p>
        <p class="text-gray-500 mt-4 pb-4 border-b-2 text-center"></p>
        <a href="#" class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-800 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <span>Return to sign up page</span>
        </a>
    </div>
</div>
    </div>
  )
}

export default SignUpError;




