import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("history: ", history);

    const blog = { title, body, author };

    setIsLoading(true);

    const postBlog = async () => {
      try {
        const response = await fetch("http://localhost:8000/blogs", {
          method: "Post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blog),
        });
        if (!response.ok) {
          setError(response.status);
          throw Error("could not post data:", error);
        }
        const data = await response.json();
        console.log("data posted", data);
        setIsLoading(false);
        // history.go(-1);
        history.push("/");
      } catch (err) {
        if (err.name === "AbortError") {
          console.log(err.message);
        } else {
          setError(err.message);
          console.log(err.message);
          setIsLoading(false);
        }
      }
    };

    postBlog();
    setAuthor("");
    setBody("");
    setTitle("");
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Author:</label>
        <select value="author" onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isLoading && <button>Add Blog</button>}
        {isLoading && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
