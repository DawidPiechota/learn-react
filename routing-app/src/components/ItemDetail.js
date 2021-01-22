import React, {useState, useEffect} from 'react'
import '../App.css';
import '../img/default.jpg';

function ItemDetail({match}) {
  const [items, setItems] = useState({});
  

  useEffect(() => {
    async function fetchItem() {
      const response = await fetch(
        `https://fortnite-api.com/v2/cosmetics/br/${match.params.id}`
      );
      const data = await response.json();
      setItems(data.data);
    }
    console.log(match);
    fetchItem();
  }, [match])

  return (
    <div>
      <h1>{items?.name}</h1>
      {items?.images?.icon &&
        <img src={items.images.icon} alt={""}/>
      }
    </div>
  )
}

export default ItemDetail;
