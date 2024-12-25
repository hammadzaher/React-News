import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [topic, setTopic] = useState("Corruption");
  const [country, setCountry] = useState("PK");

  const getNewsAxios = async (q, country) => {
    const apiKey = "pub_63098609a3378b785028af87b129ad054fc13";
    const url = `https://newsdata.io/api/1/news`;

    try {
      const response = await axios.get(
        `${url}?apikey=${apiKey}&q=${q}&country=${country}&language=en`
      );
      setNewsData(response.data.results);
    } catch (error) {
      console.error("Error fetching the news:", error);
    }
  };

  useEffect(() => {
    getNewsAxios(topic, country);
  }, [topic, country]);

  return (
    <div className="">
      <div className="one">
        <div className="one1">
          <label htmlFor="topic">
            Topic:
            <select
              id="topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            >
              <option value="Corruption">Corruption</option>
              <option value="Sport">Sport</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Politics">Politics</option>
              <option value="Terrorism">Terrorism</option>
            </select>
          </label>
        </div>
        <div className="one2">
          <label htmlFor="country">
            Country:
            <select
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <option value="PK">Pakistan</option>
              <option value="IN">India</option>
              <option value="US">USA</option>
            </select>
          </label>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center gap-3 two">
        {newsData.map((e, i) => {
          return (
            <Card key={i} style={{ width: "80%", border: "10px solid black", borderRadius: 20 }}>
              <Card.Img variant="top" src={e?.image_url} />
              <Card.Body>
                <Card.Title>{e?.title}</Card.Title>
                <Card.Text>{e?.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href={e?.source_url}>{e?.source_name}</Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default App;
