// CategoryAdd.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './CategoryAdd.css';

const CategoryAdd = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/categories/', { name: categoryName });
      alert('Category added successfully');
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/subcategories/', { name: subcategoryName, category: selectedCategory });
      alert('Subcategory added successfully');
      setSubcategoryName('');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      alert('Error adding subcategory');
    }
  };

  return (
    <div className="category-add">
      <AdminNavbar />
      <div className="form-container">
        <h1 className='heading'>Add Category</h1><br />
        <form onSubmit={handleCategorySubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Category</button>
        </form>
        <h1 className='heading'>Add Subcategory</h1>
        <br />
        <form onSubmit={handleSubcategorySubmit}>
        <div className="form-group">
            <label>Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Subcategory Name</label>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Add Subcategory</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryAdd;
