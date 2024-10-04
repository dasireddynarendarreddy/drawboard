

import './index.css'
import { BrowserRouter } from 'react-router-dom';
import ReactDOMClient from 'react-dom/client';
import App from './App.jsx'

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <BrowserRouter><App /> </BrowserRouter>);

if (import.meta.hot) {
  import.meta.hot.accept();
}
