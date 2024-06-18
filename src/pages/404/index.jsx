import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="section pt-0 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container text-center">
        <div className="max-w-md mx-auto">
          <img
            className="mb-8 w-full"
            src="/images/404.svg" // Path to the 404 illustration SVG
            alt="404 Not Found"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            404
          </h1>
          <h2 className="text-xl md:text-3xl text-gray-600 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <a className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Go Back Home
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
