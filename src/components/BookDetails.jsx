import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Spinner from "./common/Spinner";
import { getBook } from "../services/bookService";
 
function BookDetails(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const getData = async () => {
        try {
            const result = await getBook(props.match.params.id);
            setData(result.data.data);
            setIsLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
            props.history.replace("/not-found");
        }
    }

    useEffect(() =>{
        setIsLoading(true);
        getData();
     }, []);



    let imageSrc = require(`../images/default.jpg`);
    if(data.isbn)
        imageSrc = require(`../images/${data.isbn}.jpg`);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    const handelBackToBooks = () =>{
        props.history.push('/books')
    }

    if (isLoading) return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item onClick={handelBackToBooks}>Books</Breadcrumb.Item>
            </Breadcrumb>
            <Spinner />
        </div>
      )

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item onClick={handelBackToBooks}>Books</Breadcrumb.Item>
                <Breadcrumb.Item active>{data.title}</Breadcrumb.Item>
            </Breadcrumb>

        <Container>
            <Row>
                <Col sm={5}>
                    <Image src={imageSrc} fluid="true" />
                    <Row>
                        <Col md={{ span: 3, offset: 3 }}>
                            <p className="bookDetails__p">
                                <Button variant="primary" onClick={handelBackToBooks}>Back</Button>{''}
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col sm={7}>
                <div>
                    <h1>
                        {data.title}
                    </h1>
                    <h5 className="bookDetails__subtitle">
                        {data.subtitle}
                    </h5>
                    <ColoredLine color="black" />
                        <div className="booksDetails__author">
                            <div className="booksDetails__authorColor">
                            <h5>
                                By <label style={{color:'green' }}>
                                    {data.author}
                                </label>
                            </h5>
                            </div>
                            <h5>
                                <label className="booksDetails__bestSeller">
                                    Best Seller
                                </label>
                            </h5>
                        </div>
                    <ColoredLine color="black" />
                    <div className="booksDetails__type">
                        <h5>
                            <Badge pill bg="primary">
                                {data.type}
                            </Badge>
                        </h5>
                        <h5 className="booksDetails__format">
                            {data.format}
                        </h5>
                    </div>
                    <ColoredLine color="black" />
                    <h6>
                        Publisher RRP ${data.publisherRRP}
                    </h6>
                    <h2 className="bookDetails__price">
                        Our price:  ${data.price}
                    </h2>
                    <Accordion className="bookDetails__description" defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Description</Accordion.Header>
                            <Accordion.Body>
                            {data.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <Table striped borderless hover>
                    <tbody>
                        <tr>
                            <td style={{fontWeight: "bold"}}>ISBN</td>
                            <td>{data.isbn}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bold"}}>No. Of Pages</td>
                            <td>{data.pages}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bold"}}>Dimensions</td>
                            <td>{data.dimensions}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bold"}}>On Sale Date</td>
                            <td>{data.releaseDate}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bold"}}>Publisher</td>
                            <td>{data.publisher}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default BookDetails

