import React, { useState, useEffect } from "react";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      getData();
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const getData = () => {
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(false);
        setItems(result);
      })
      .catch((e) => {
        setIsLoaded(false);
      });
  };

  if (isLoaded) return <div>LOADING.......</div>;
  else if (items)
    return (
      <div>
        {/*JSON.stringify(items)*/}
        {items.data.map((ele, index) => (
          <p
            key={ele.id}
            style={{ backgroundColor: "red", padding: 5, margin: 5 }}
          >
            {index + 1}
            <br /> Name:- {ele.first_name}
            <br />
            Email:- {ele.email}
            <br />
            <img src={ele.avatar}></img>
          </p>
        ))}
      </div>
    );
  else return <div>Loading...</div>;
};

export default App;
