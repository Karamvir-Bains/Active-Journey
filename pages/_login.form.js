
export default function LoginForm() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white bg-opacity-50 dark:bg-dark-14 rounded-xl shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
            Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
                Email
            </label>
            <input type="email"
              className="block w-full px-4 py-2 mt-2 text-blue-700 dark:bg-dark-14 border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block w-full px-4 py-2 mt-2 text-blue-700 dark:bg-dark-14 border rounded-xl focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a
                href="#"
                className="font-medium text-blue-600 hover:underline"
            >
                Sign up
            </a>
        </p>
      </div>
    </div>
  );
}