const Home = () => {

    const handleClick = (e) => {
        console.log(e.target);
    }
    const handleClick2 = (name) => {
        console.log("hi " + name);
    }


    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={() => handleClick2("Dawid")}>Click me2</button>
        </div>
     );
}
 
export default Home;