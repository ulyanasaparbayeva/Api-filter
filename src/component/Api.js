import {useEffect, useState} from 'react';
import instance from './api/axios';

const Api = () => {
  const [allData, setAllData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          instance.get('/categories'),
          instance.get('/products')
        ]);

        console.log('Products Response:', productsResponse.data);

        setCategories(categoriesResponse.data);
        setAllData(productsResponse.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred");
        setLoading(false);
      }
    }
    fetchData();
  }, []);




  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    if (categoryId) {
      instance.get(`/products/?categoryId=${categoryId}`)
        .then(response => {
          setAllData(response.data.data);
        })
        .catch(err => {
          console.error("Error fetching category specific products:", err);
          setAllData([]);
        });
    } else {
      instance.get('/products')
        .then(response => {
          setAllData(response.data.data);
        })
        .catch(err => {
          console.error("Error fetching all products:", err);
          setAllData([]);
        });
    }
  };
  return (
    <>
      <div>
        <div className="title">Today Is Only For You</div>
        <select onChange={handleCategoryChange} style={{marginLeft:"100px",marginTop:"20px"}}>
          <option value="">Select category</option>
          { categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="container">
          {allData && allData.length > 0 && (
            <div className="container">
              {allData.map((product, index) => (
                <div key={index} className="card" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: "#E6E8EC" }}>
                    {product.images && product.images.length > 0 && <img className="products-images" src={product.images[0]}/>}
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
          )}
        </div>
      </div>
    </>
  )
}

export default Api;
