import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { FaSearch, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchTime, setSearchTime] = useState('');
  const [deleteIndex, setDeleteIndex] = useState(null);

  const searchWeather = async (e) => {
    e.preventDefault();
    const API_KEY = '98a1529477b25d9f2ab323b079ea93f3';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(URL);
    const data = response.data;
    setWeather(data);
    const currentTime = new Date();
    setSearchTime(
      `${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()} ${currentTime.getHours()}:${String(
        currentTime.getMinutes()
      ).padStart(2, '0')}`
    );
    setHistory([...history, `${data.name}, ${data.sys.country}`]);
    setCity('');
    setCountry('');
  };

  const clearSearch = () => {
    setCity('');
    setCountry('');
  };

  const deleteHistory = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${dd}-${mm}-${yyyy} ${hours % 12}:${minutes}${ampm}`;
  };

  return (
    <>
      <div className="bg-image">
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
                <Row>
                  <Col xs={6}>
                    <Button variant="secondary" onClick={clearSearch}>
                      Clear
                    </Button>{' '}
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {weather && (
            <div>
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
              <Row>
                <Col>
                  <ListGroup.Item variant="light">
                    {`${weather.name}, ${weather.sys.country}`}
                    <Button variant="link" className="float-right" onClick={searchWeather}>
                      <FaSearch /> {searchTime}
                    </Button>
                    <Button
                      variant="danger"
                      className="float-right"
                      onClick={() => deleteHistory(deleteIndex)}
                    >
                      <FaTrash />
                    </Button>
                  </ListGroup.Item>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </>
  );

}

export default App;
