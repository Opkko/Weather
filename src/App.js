import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const searchWeather = async (e) => {
    e.preventDefault();
    const API_KEY = 'YOUR_API_KEY';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(URL);
    const data = response.data;
    setWeather(data);
    setHistory([...history, `${data.name}, ${data.sys.country}`]);
    setCity('');
    setCountry('');
  };

  const clearSearch = () => {
    setCity('');
    setCountry('');
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Today's Weather</h2>
          <hr />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} sm={6}>
          <Form onSubmit={searchWeather}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>{' '}
            <Button variant="secondary" onClick={clearSearch}>
              Clear
            </Button>
          </Form>
        </Col>
        <Col xs={12} sm={6}>
          <ListGroup>
            <ListGroup.Item variant="light">Search History</ListGroup.Item>
            {history.map((item, index) => (
              <ListGroup.Item key={index}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {weather && (
        <Row>
          <Col>
            <h4>{`${weather.name}, ${weather.sys.country}`}</h4>
            <p>{`Current Temperature: ${weather.main.temp}°C`}</p>
            <p>{`Feels Like: ${weather.main.feels_like}°C`}</p>
            <p>{`Max Temperature: ${weather.main.temp_max}°C`}</p>
            <p>{`Min Temperature: ${weather.main.temp_min}°C`}</p>
            <p>{`Humidity: ${weather.main.humidity}%`}</p>
            <p>{`Wind Speed: ${weather.wind.speed} m/s`}</p>
            <p>{`Description: ${weather.weather[0].description}`}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
