const Blog = ({ title, body, author, id }) => {
  return (
    <div className="blog-preview" key={id}>
      <h3>{title}</h3>
      <h4>Written by: {author}</h4>
      <p>{body}</p>
      <hr></hr>
    </div>
  );
};

export default Blog;
