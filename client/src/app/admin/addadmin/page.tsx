import React from 'react'

function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="p-2 border rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="p-2 border rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="p-2 border rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" name="confirm-password" id="confirm-password" className="p-2 border rounded" />
          </div>
          <div>
            <button type="submit" className="bg-primary text-white p-2 rounded-lg w-full">Add Admin</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Page