import { useState } from "react";
import { useHistory } from 'react-router-dom';
import env from './env';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Dave');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = {title, body, author};
    setIsPending(true);
    const rawResponse = await fetch(`http://${env.LOCAL_IP}:8000/blogs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)
    });
    console.log("New blog added");
    const content = await rawResponse.json();
    console.log(content);
    setIsPending(false);
    history.push('/');
  }

  return ( 
    <div className="create">
      <h2>Write a new blog</h2>
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
          type="text"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Dave">Dave</option>
          <option value="Natalka">Natalka</option>
        </select>
        {!isPending ? <button>Add Blog</button> : <button disabled>Adding Blog</button>}
      </form>
    </div>
   );
}
 
export default Create;