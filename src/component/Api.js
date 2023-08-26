import {useEffect, useState} from 'react';
import instance from './api/axios';

const Api = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get('products');
        setProducts(response.data);
        
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);


  return (
      <div>
        <div className="title">Today Is Only For You</div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
            <div className="container">
              {filteredProducts.map((product, index) => (
                <div key={index} className="card" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: "#E6E8EC" }}>
                    <img className="products-images" src={product.image} alt={product.title} />
                  </div>
                  <div className="products-item">
                    <div className="title-bg">
                      <div className="products-title">{product.title}</div>
                    </div>
                    <div className="products-description">{product.description}</div>
                    <div className="id-price">
                      <div className="products-price">{product.price}</div>
                      <div className="products-id">{product.id}</div>
                    </div>
                    <div className="products-time">
                      <div className="products-creationAt">{product.creationAt}</div>
                      <div className="products-creationAt">{product.updatedAt}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
  )
}

export default Api;
