import BlogList from "./components/BlogList";
import useFetch from "./hooks/useFetch";

export default function Home() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
}
