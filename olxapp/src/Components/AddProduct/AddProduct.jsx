import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';
import { AuthContext } from '../../context/AuthContext';

const AddProduct = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories/');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/subcategories/?category_id=${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      } else {
        console.error('Failed to fetch subcategories');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'category') {
      fetchSubcategories(value);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      console.error('User not authenticated');
      return;
    }
  
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('category', formData.category);
    form.append('subcategory', formData.subcategory);
  
    for (let file of formData.images) {
      form.append('images', file);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/products/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };  

  return (
    <div className="add-product-container">
      <br /><br />
      <h2>Sell a Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label>
          Subcategory:
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select>
        </label>
        <label>
          Images:
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
