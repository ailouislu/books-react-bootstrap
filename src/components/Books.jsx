import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Spinner from 'react-bootstrap/Spinner'
import SearchBox from "./SearchBox";
import ListGroup from "./common/ListGroup";
import { getBooks } from "../services/bookService";
import { getGenres } from "../services/genreService";

 
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
        <Row>
            <Col sm={3}>
              <Breadcrumb>
                <Breadcrumb.Item active>Books</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col sm={2}>
              <Spinner animation="border" variant="primary" />
            </Col>
        </Row>
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
              <Container fluid>
                <p>Showing {count} books in the database.</p>
                <SearchBox value={searchQuery} onChange={handleSearch} />
                <Row xs={1} md={2} className="g-4">
                { data.map((item, index) => {
                    return <React.Fragment key={index}>
                      <Col>
                        <Link to={`/books/${item.id}`}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" fluid src={require(`../images/${item.isbn}.jpg`).default} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.subtitle}
                                    </Card.Text>
                                        Author: {item.author}
                                </Card.Body>
                                Price: {item.price}
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

