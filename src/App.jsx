
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import {BrowserRouter,Routes,Route,Link,useNavigate,} from "react-router-dom";

const CartContext = createContext();
function Products() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setProducts(res.data))
    
  }, []);

  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
    navigate("/cart");
  }

  return (
    <>
   
   <Link to="/cart">Cart ({cart.length})</Link>

   {products.map((product) => (
    <div key={product.id}>
        <h3>{product.title}</h3>
    <button onClick={() => addToCart(product)}>
    Add to Cart      </button>
        </div>
  ))}
    </>
 );
}

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <h1>My Cart ({cart.length})</h1>
    <Link to="/">Back to Products</Link>

   {cart.map((item, index) => (
        <div key={`${item.id}-${index}`}>
   <h3>{item.title}</h3>
    </div>
 ))}
    </>
  );
}

function App() {
 const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>   <BrowserRouter>
    <Routes>
     <Route path="/" element={<Products />} />
   <Route path="/cart" element={<Cart />} />
    </Routes>
  </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
