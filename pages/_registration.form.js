
export default function RegistrationForm() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-xl shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-orange-800 underline">
          Create Account
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              for="first-name"
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>
            <input type="text"
              name="first-name"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="last-name"
              className="block text-sm font-semibold text-gray-800"
            >
              Last Name
            </label>
            <input type="text"
              name="last-name"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password-confirmation"
              className="block text-sm font-semibold text-gray-800"
            >
              Re-type Password
            </label>
            <input
              type="password"
              name="password-confirmation"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-800">
            {" "}
            Already have an account?{" "}
            <a
                href="#"
                className="font-medium text-white hover:underline"
            >
                Login
            </a>
        </p>
      </div>
    </div>
  );
}