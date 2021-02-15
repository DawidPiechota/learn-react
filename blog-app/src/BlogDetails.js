import { useHistory, useParams } from "react-router-dom";
import env from './env';
import useFetch from './useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, errorMessage, isPending } = useFetch(`http://${env.LOCAL_IP}:8000/blogs/${id}`);
  const history = useHistory();

  const handleDelete = async () => {
    await fetch(`http://${env.LOCAL_IP}:8000/blogs/${id}`, {
      method: 'DELETE'
    });
    history.push('/');
  }

  return ( 
    <div className="blog-details">
      { errorMessage }
      { isPending && <div>Loading...</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleDelete}>delete</button>
        </article>
      )}
    </div>
   );
}
 
export default BlogDetails;