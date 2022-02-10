import cx from 'classnames';
import { Component } from 'react';

class LikeButton extends Component {
    state = {
        likedNumber: 100
    };



    render() {
        
        function handleLike(){
            //this.button.style = "liked";
            let likedNumber = this.state.likedNumber;
            this.setState({ likedNumber: 101 });
            alert(likedNumber);
            if(likedNumber === 100){
                this.setState({likedNumber:this.state.numberCount + 1});
                return;
            }
    
            this.setState({likedNumber:100});
            
            //this.className = "liked";
        }

        return (
            <>
                <div>
                    <h2>Like Button</h2>
                    <button className="like-button" onClick={handleLike}>Like | {this.state.likedNumber}</button>
                </div>
                <style>{`
                    .like-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                   .liked {
                        font-weight: bold;
                        color: #1565c0;
                   }
                `}</style>
            </>
        );
    }
}

export default LikeButton;