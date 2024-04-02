import React, { useState } from 'react';
import axios from 'axios';

const MenuForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('ItemName', itemName);
      formData.append('Description', description);
      formData.append('Price', price);
      formData.append('file', file);

      // Make a POST request to your API endpoint for creating a menu item
      const response = await axios.post('http://127.0.0.1:8080/api/menu-create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          
        },
      });

      console.log(response.data);
      // Handle success, reset form, show success message, etc.
    } catch (error) {
      console.error('Error creating menu item:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Create Menu Item</h2>
      <form onSubmit={handleSubmit} >
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MenuForm;
