import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CountriesSearch = () => {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    const getCountriesData = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
            setFilteredCountries(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCountriesData();
    },[]);

    
    useEffect(() => {
        const debounceTimer = setTimeout(() =>{
            const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
            setFilteredCountries(filtered);
        }, 1000);

        return () => clearTimeout(debounceTimer);
    },[search, countries]);
        

    const cardStyle = {
        width: "200px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    };

    const containerStyle = {
        display: 'flex',
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    };

    const imageStyle = {
        width: '100px',
        height: '100px',
        margin: "auto"
    };


  return (
    <div>
        <input type='text' placeholder='Search for countries...' style={{width: '40vw', height:"5vh", margin:"20px"}} onChange={(e) => setSearch(e.target.value)}/>
        <div style={containerStyle}>
             {filteredCountries.map((item, idx) => {
                return (
                    <div key={idx} style={cardStyle} className='countryCard'>
                        <img src={item.flags.png} alt={`Flag of ${item.name.common}`} style={imageStyle}  />
                        <h2>{item.name.common}</h2>
                    </div>
                )
            })}
        </div>
    </div>
    
  )
}

export default CountriesSearch