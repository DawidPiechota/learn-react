import { useState, useEffect } from 'react';

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const abortCtrl = new AbortController();
    async function fetchBlogs(endpoint) {
      const response =  await fetch(endpoint, { signal: abortCtrl.signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsPending(false);
      setErrorMessage(null);
    }
    setTimeout(() => {
      fetchBlogs(url).catch( e => {
        if (e.name ==='AbortError') {
          console.log('fetch aborted');
          return;
        }
        setErrorMessage("This blog doesnt exist!");
        setIsPending(false);
        console.log('There has been a problem with fetchBlogs(): ' + e.message);
      });
    },200) // Fake request delay

    return () => abortCtrl.abort();
  }, [url]);

  return { data, isPending, errorMessage}
}

export default useFetch;