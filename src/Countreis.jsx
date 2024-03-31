import React, { useState, useEffect } from 'react';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Countries Search</h1>
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="countries-list">
                {filteredCountries.map(country => (
                    <div key={country.cca3} className="country">
                        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                        <p>{country.name.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Countries;
