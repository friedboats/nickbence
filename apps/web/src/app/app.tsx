import axios from 'axios';
import React, { useState } from 'react';

interface WorkExample {
  title: string;
}

export function App() {
  const [portfolio, setPortfolio] = useState<WorkExample[]>([]);

  /* useEffect(() => {
    fetch('/api/portfolio')
    .then((_) => _.json())
    .then(setPortfolio);
  }, []); */

  function addWorkExample():void {
    console.log('adding');
    
    axios.post('/api/addWorkExample', {
        title: "Awesome Project #3",
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    /*fetch('/api/addWorkExample', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        "title": "Awesome Project #3",
      })
    })
    .then((_) => _.json())
    .then((newWorkExample) => {
      setPortfolio([...portfolio,
        newWorkExample]);
    });*/
  }

  return (
    <main>
      <h1>Portfolio</h1>
      <ul>
        {portfolio.map((workExample) => (
          <li>{workExample.title}</li>
        ))}
      </ul>
      <button onClick={addWorkExample}>Add work example</button>
    </main>
  );
}

export default App;
