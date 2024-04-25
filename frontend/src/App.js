import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoute/AnimatedRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AnimatedRoutes />
      <ScrollToTop />
    </div>
  );
}

export default App;
