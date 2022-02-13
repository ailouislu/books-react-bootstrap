import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from "./common/Spinner";
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { getAuthor } from "../services/authorService";
 
function AuthorDetails(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const getData = async () => {
        try {
            const result = await getAuthor(props.match.params.id);
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
        props.history.push('/authors')
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
                <Breadcrumb.Item onClick={handelBackToBooks}>Authors</Breadcrumb.Item>
                <Breadcrumb.Item active>{data.fullName}</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
            <Col sm={3}>
            </Col>
            <Col sm={9}>
                <h1 className="authorDetails__fullName">
                    {data.fullName}
                </h1>
                <ColoredLine color="black" />
                    <div className="authorDetails__born">
                        <h5>
                            Born:
                        </h5>
                        <h5>
                            <label className="authorDetails__bornAddress">
                                {data.born}
                            </label>
                        </h5>
                    </div>
                <ColoredLine color="black" />
                <div className="authorDetails__type">
                    <h5>
                        <Badge pill bg="primary">
                            {data.type}
                        </Badge>
                    </h5>
                    <h5 className="authorDetails__yearsActive">
                        Years Active: {data.yearsActive}
                    </h5>
                </div>
                <ColoredLine color="black" />
                <h5>
                    <div className="authorDetails__books">
                        Books: {data.books}
                    </div>
                </h5>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>
                            {data.description}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="authorDetails__btn">
                    <Button variant="primary" onClick={handelBackToBooks}>Back</Button>{''}
                </div>
            </Col>
        </Row>
    </div>
    )
}


export default AuthorDetails

