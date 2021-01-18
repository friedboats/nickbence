import React, { useEffect, useState } from 'react';

interface WorkExample {
  title: string;
}

export function App() {
  const [portfolio, setPortfolio] = useState<WorkExample[]>([]);

  useEffect(() => {
    fetch('/api/portfolio')
    .then((_) => _.json())
    .then(setPortfolio);
  }, []);

  function addWorkExample():void {
    fetch('/api/addWorkExample', {
      method: 'POST',
      body: '',
    })
    .then((_) => _.json())
    .then((newWorkExample) => {
      setPortfolio([...portfolio,
        newWorkExample]);
    });
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
