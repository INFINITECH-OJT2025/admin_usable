"use client";

import { JSX, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'swiper/swiper-bundle.css';
import "../style.css";

const primaryColors = ['blue', 'red', 'green', 'yellow', 'purple', 'navy', 'maroon', 'teal', 'olive', 'black'];
const secondaryColors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow', 'lightgray', 'violet', 'gold', 'silver', 'lime', 'skyblue'];
const ternaryColors = ['white', 'lightgray', 'orange', 'pink', 'cyan', 'magenta', 'beige', 'brown', 'lavender', 'turquoise'];

const defaultColors = [
  ...primaryColors,
  ...secondaryColors,
  ...ternaryColors,
];

export default function CustomColor() {
  const [customColors, setCustomColors] = useState<any[]>([]);
  const [newColor, setNewColor] = useState<string>('');
  const [cardColor, setCardColor] = useState<string>('');
  const [hue, setHue] = useState<number>(200);
  const [saturation, setSaturation] = useState<number>(100);
  const [lightness, setLightness] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const savedColor = sessionStorage.getItem('cardColor');
    if (savedColor) {
      setCardColor(savedColor);
    }
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}colors`);
    const data = response.data;
    setCustomColors(data.map((color: { id: number; color: string; status: string }) => ({
      id: color.id,
      color: color.color,
      status: color.status
    })));
  };

  const handleColorChange = async (colorId: number) => {
    setLoading(true); // Start loading
    try {
      const currentColor = customColors.find(color => color.id === colorId);
      if (currentColor && currentColor.status === 'active') {
        toast.info("This color is already active.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}colors/${colorId}`, {
        status: 'active',
      });

      for (const color of customColors) {
        if (color.id !== colorId) {
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}colors/${color.id}`, {
            status: 'inactive',
          });
        }
      }

      setCardColor(currentColor.color);
      sessionStorage.setItem('cardColor', currentColor.color);
      fetchColors();
      toast.success("Color successfully used!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating color status:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleAddColor = async () => {
    setLoading(true); // Start loading
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
    // Check if the color already exists in the customColors state
    if (customColors.some(color => color.color === hslColor)) {
      toast.error("This color already exists.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false); // Stop loading
      return; // Exit the function early
    } else {
      const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}colors`, {
        color: hslColor,
        status: 'inactive',
      });
  
      if (status === 201) {
        setCustomColors((prevColors) => [...prevColors, data]);
        setNewColor('');
        fetchColors();
        toast.success("Color successfully added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
      setLoading(false);
    }
  };

  const handleRemoveColor = async (colorId: number) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}colors/${colorId}`);

      if (response.status === 200) {
        setCustomColors((prevColors) => prevColors.filter((c) => c.id !== colorId));
      } else {
        console.error('Failed to remove color');
      }
    } catch (error) {
      console.error("Error removing color:", error);
    } finally {
      setLoading(false); // Stop loading
      toast.error("Color Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <label className="form-label">Select Card Color:</label>
      <div>
        <h5>Default Colors</h5>
        {primaryColors.map((color, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <button
              onClick={async () => {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}colors`, {
                  color: color,
                  status: 'inactive',
                });
                if (response.status === 201) {
                  fetchColors();
                }
              }}
              style={{
                backgroundColor: color,
                border: 'none',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
        <br />
        {secondaryColors.map((color, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <button
              onClick={async () => {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}colors`, {
                  color: color,
                  status: 'inactive',
                });
                if (response.status === 201) {
                  fetchColors();
                }
              }}
              style={{
                backgroundColor: color,
                border: 'none',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
        <br />
        {ternaryColors.map((color, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <button
              onClick={async () => {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}colors`, {
                  color: color,
                  status: 'inactive',
                });
                if (response.status === 201) {
                  fetchColors();
                }
              }}
              style={{
                backgroundColor: color,
                border: 'none',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
      </div>

      <div className="mb-2">
        <h5>Custom Colors</h5>
        {customColors.map((color) => (
          <div key={color.id} style={{ display: 'inline-block', marginRight: '5px' }}>
            <button
              onClick={() => handleColorChange(color.id)}
              style={{
                backgroundColor: color.color,
                border: 'none',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                outline: cardColor === color.color ? '4px solid aqua' : 'none'
              }}
            />
            <button
              onClick={() => handleRemoveColor(color.id)}
              style={{
                marginLeft: '2px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'red',
                fontSize: '14px'
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Type 'ADD' to add color"
          className="form-control"
        />
        <button onClick={handleAddColor} className="btn btn-primary mt-2" disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Add Color"
          )}
        </button>
      </div>

      {/* HSL Color Picker */}
      <div className="mt-4">
        <label className="form-label">Adjust Color:</label>
        <div>
          <label>Hue: {hue}</label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="form-range"
          />
        </div>
        <div>
          <label>Saturation: {saturation}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="form-range"
          />
        </div>
        <div>
          <label>Lightness: {lightness}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => setLightness(Number(e.target.value))}
            className="form-range"
          />
        </div>
      </div>

      {/* Display the current color based on HSL values */}
      <div className="mt-3">
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            border: '1px solid #000',
            borderRadius: '5px',
            marginTop: '10px'
          }}
        />
        <p>Add Color: hsl({hue}, {saturation}%, {lightness}%)</p>
      </div>
      <div className="mt-3">
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: cardColor,
            border: '1px solid #000',
            borderRadius: '5px',
            marginTop: '10px'
          }}
        />
        <p>Current Color: {cardColor}</p>
      </div>
    </>
  );
}