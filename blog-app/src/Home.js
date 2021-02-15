import Bloglist from './Bloglist';
import env from './env';
import useFetch from './useFetch';

const Home = () => {
  const { data: blogs, isPending, errorMessage } = useFetch(`http://${env.LOCAL_IP}:8000/blogs`);

    return ( 
        <div className='home'>
            { errorMessage && <div>{errorMessage}</div> }
            { isPending && <div>Loading...</div> }
            { blogs && <Bloglist blogs={blogs} title='All Blogs' />}
        </div>
     );
}
 
export default Home;