import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import SearchBox from "./SearchBox";
import ListGroup from "./common/ListGroup";
import Spinner from "./common/Spinner";
import { getBooks } from "../services/bookService";
import { getGenres } from "../services/genreService";
import  "../css/style.css";

 
function Books(props) {
    const [data, setData] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const getData = async () => {
      const result = await getBooks();
      setData(result.data.data);
      setAllBooks(result.data.data);
      const TypesResult = await getGenres();
      const genres = [{ id: "", name: "All Genres" }, ...TypesResult.data.data];
      setTypes(genres);
      setIsLoading(false);
    }
    
    useEffect(() =>{
      setIsLoading(true);
      getData();
     }, []);

    const handleGenreSelect = async genre => {
      setType(genre);
      let filtered = allBooks;
      if (genre.name !== "All Genres")
        filtered = filtered.filter(m => m.type === genre.name);
        
      setData(filtered);
      setSearchQuery("");
    }
      

    const handleSearch = async query => {
      let filtered = allBooks;
      if(searchQuery)
          filtered = filtered.filter(m =>
          m.title.toLowerCase().startsWith(query.toLowerCase())
        );
        
      setData(filtered);
      setSearchQuery(query);
      setType(null);
    }

    if (isLoading) return (
      <div>
          <Breadcrumb>
            <Breadcrumb.Item active>Books</Breadcrumb.Item>
          </Breadcrumb>
          <Spinner />
      </div>
    )

    const count = data.length;
    if (count === 0) return <p>There are no books in the database.</p>;
  
    return (
      <div>
        <Breadcrumb>
            <Breadcrumb.Item active>Books</Breadcrumb.Item>
        </Breadcrumb>

        <Container>
          <Row>
            <Col sm={3}>
                <ListGroup
                items={types}
                selectedItem={type}
                onItemSelect={handleGenreSelect}
                />
            </Col>

            <Col sm={9}>
              <Container fluid="true">
                <p>Showing {count} books in the database.</p>
                <SearchBox value={searchQuery} onChange={handleSearch} />
                <Row xs={1} md={2} className="g-4">
                { data.map((item, index) => {
                    return <React.Fragment key={index}>
                      <Col>
                        <Link className="link-list" to={`/books/${item.id}`}>
                            <Card className="card content">
                                <div className="content-overlay"></div>
                                <Card.Img className="card-img" variant="top" fluid="true" src={item.image} />
                                <div className="content-details fadeIn-left">
                                  <h3 className="content-title">{item.title}</h3>
                                  <p className="content-text">{item.subtitle}</p>
                                  <p className="content-text">Author: {item.author}</p>
                                  <p className="content-text">{item.description}</p>
                                </div>
                                <Card.Body className="card-text">
                                    <Card.Title className="card-text">{item.title}</Card.Title>
                                    <Card.Text className="card-text">
                                        Author: {item.title}
                                    </Card.Text>
                                    <h3 className="card-price">Price: {item.price}</h3>
                                </Card.Body>
                                
                            </Card>
                        </Link>
                      </Col>
                    </React.Fragment>
                })
                }
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Books

