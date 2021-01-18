import { Express } from 'express';

interface WorkExample {
  title: string;
}

const portfolio: WorkExample[] = [
  { title: 'Awesome Project #1' },
  { title: 'Awesome Project #2' },
];
let numProjectAdded = portfolio.length;

export function addPortfolioRoutes(app: Express) {
  app.get('/api/portfolio', (req, resp) => resp.send(portfolio));
  app.post('/api/addWorkExample', (req, resp) => {
    numProjectAdded++;
    const newWorkExample = {
      title: `Awesome Project #${numProjectAdded}`,
    };
    portfolio.push(newWorkExample);
    resp.send(newWorkExample);
  });
}
