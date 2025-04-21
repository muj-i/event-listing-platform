import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="space-y-8">
      <section className="bg-blue-500 text-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold">Discover Local Events</h2>
        <p className="mt-2">Find what's happening near you and never miss out!</p>
        <Link to="/events" className="mt-4 inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow">
          Browse Events
        </Link>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-2">Popular Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Music", "Tech", "Art", "Sports"].map((cat) => (
            <div key={cat} className="bg-gray-100 p-4 text-center rounded shadow">
              {cat}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-2">Upcoming Events</h3>
        <p>(This will be dynamically fetched later)</p>
      </section>
    </div>
  );
};

export default Homepage;