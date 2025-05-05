import { RouterProvider } from 'react-router-dom';
import router from './Componenets/routes.jsx';
import './index.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;