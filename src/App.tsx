import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Login";
import Form from "./Form";
import axios from "axios";

// Recommended
function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const filteredProducts = selectedProduct
    ? products.filter(product => product.category.name === selectedProduct)
    : products;
  
  const uniqueCategories = Array.from(new Set(products.map(product => product.category.name)));

  return (
    <div className="root">
      {/* <h1 id="title" className="">
        Na
      </h1>
      <Login /> 
      <Form />*/}
      <h1 style={{color:"white" , paddingBottom:"15px", fontSize:"100px"}}>ThumDD Shop</h1>
      <p style={{color:"white" , paddingBottom:"5px"}}>Selected Product Type</p>
      
      <select onChange={handleFilterChange} value={selectedProduct} style={{ marginBottom: "20px" }}>
        <option value="">Select a product</option>
        {uniqueCategories.map((category, index) => ( 
        <option key={index} value={category}>
          {category}
        </option>
      ))}
      </select>
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card">
            <h1 >{product.title}</h1>
            <h2 >price {product.category.name} baht</h2>
            <img width = "200px" height="200px" src={product.images[0]} alt="" />
            
            <p style={{fontSize:"100"}}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
