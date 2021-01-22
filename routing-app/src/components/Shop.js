import React, {useState, useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Shop() {

  const [items, setItems] = useState([]);

  useEffect(()=> {
    async function fetchData() {
      const response = await fetch(
        "https://fortnite-api.com/v2/cosmetics/br/new"
      );

      const data = await response.json();
      setItems(data.data.items);
    }
    fetchData();
  }, []);

  useEffect(() => console.log(items), [items]);

    return (
        <div className="App">
          {items.map(item => {
            return (
              <Link to={`/shop/${item.id}`}>
                <h1>{item.name}</h1>
              </Link>
            )
          })}
        </div>
    )
}

export default Shop;
