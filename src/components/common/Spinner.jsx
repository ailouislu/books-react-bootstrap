import React from 'react'
import ReactSpinner from 'react-bootstrap/Spinner'

function Spinner(props) {
    return (
        <div>
            <ReactSpinner style={{ position: 'absolute', top:'50%', left:'50%' }} animation="border" variant="primary" />
        </div>
    )
}

export default Spinner
