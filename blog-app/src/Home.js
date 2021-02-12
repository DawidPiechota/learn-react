import React, { useState, useEffect } from 'react';
import Bloglist from './Bloglist';
import env from './env';

const Home = () => {

const [blogs, setBlogs] = useState(null);
const [isPending, setIsPending] = useState(true);
const [errorMessage, setErrorMessage] = useState(null);

useEffect(() => {
  async function fetchBlogs(endpoint) {
    const response =  await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    setBlogs(jsonData);
    setIsPending(false);
    setErrorMessage(null);
  }
  setTimeout(() => {
    fetchBlogs(`http://${env.LOCAL_IP}:8000/blogs`).catch( e => {
      setErrorMessage("We are experiencing technical difficulties. Please try again in a few minutes");
      setIsPending(false);
      console.log('There has been a problem with fetchBlogs(): ' + e.message);
    });
  },1000) // Fake request delay
}, []);

    return ( 
        <div className='home'>
            { errorMessage && <div>{errorMessage}</div> }
            { isPending && <div>Loading...</div> }
            { blogs && <Bloglist blogs={blogs} title='All Blogs' />}
        </div>
     );
}
 
export default Home;