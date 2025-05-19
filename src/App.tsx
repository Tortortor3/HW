import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Login";
import Form from "./Form";
import axios from "axios";

// Recommended
function App() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="root">
      {/* <h1 id="title" className="">
        Na
      </h1>
      <Login /> 
      <Form />*/}
      <h1 style={{color:"white" , paddingBottom:"15px"}}>ThumDD Shop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card">
            <h1 >{product.title}</h1>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;