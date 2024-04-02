import React, { useState, useEffect } from 'react';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Make API request to fetch menu items
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menu-getall');
        const data = await response.json();

        if (data.success) {
          setMenuItems(data.menuItems);
        } else {
          console.error('Error fetching menu items:', data.error);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchMenuItems();
  }, []);
  
  return (
    <div>
      <h2>Menu Items</h2>
      <table>
        <thead>
          <tr>
            <th>ItemID</th>
            <th>ItemName</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.ItemID}>
              <td>{item.ItemID}</td>
              <td><strong>{item.ItemName}</strong></td>
              <td>{item.Description}</td>
              <td>${item.Price}</td>
                <td>
                  {item.ImageData && (
                    <img
                      src={`data:image/jpeg;base64,${item.ImageData}`}
                      alt={item.ItemName}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuList;
