import Axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function SingleArticle({currentUser}) {

    let { id } = useParams();
    let [post, setPost] = React.useState({});

    React.useEffect(async () => {
        if(currentUser.status === 'success' || currentUser.status !== undefined) {
            let result = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(result.data);
        }
    }, []);

    return (
    
        <div className="user-single-post">
            <h1>Post number: {post.id}</h1>
            {
                currentUser.status === 'fail' || currentUser.status === undefined ?

                <div className="login-in"><Link to="/">Please first login in</Link></div>
                :
                <p><strong>Title:</strong> {post.title}<br/><br/><strong>Body: </strong>{post.body}</p>
            }
        </div>

    )
}

export default SingleArticle
