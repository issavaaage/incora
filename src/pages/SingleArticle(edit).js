import Axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function SingleArticle({currentUser}) {

    let { id } = useParams();
    let [post, setPost] = React.useState({});
    let [successEdited, setSuccessEdit] = React.useState(undefined);

    React.useEffect(async () => {
        if(currentUser.status === 'success' || currentUser.status !== undefined) {
            let result = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(result.data);
        }
    }, []);

    const handleChange = (e, part) => {
        let newArticle = {...post};
        newArticle[part] = e.target.value;
        setPost(newArticle);
    }

    const handleSubmit = async () => {
        try {
            let result = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, post);
            console.log(result);

            if(result.status === 200) {
                setSuccessEdit('Success edited!');
            }
            else {
                setSuccessEdit('Check dev tools to view status code');
            }
        } catch(e) {
            setSuccessEdit('Something goes wrong!');
            console.log(e);
        }   
    }

    return (
    
        <div className="user-single-post">
            <h1>Post number: {post.id}</h1>
            {
                currentUser.status === 'fail' || currentUser.status === undefined ?

                <div className="login-in"><Link to="/">Please first login in</Link></div>
                :
                // <p><strong>Title:</strong> {post.title}<br/><br/><strong>Body: </strong>{post.body}</p>
                <div className="user-single-post__edit">
                    <div className="user-single-post__edit--inp">
                        <p>Title</p>
                        <textarea value={post.title} onChange={(e) => handleChange(e, 'title')}/>
                    </div>
                    <div className="user-single-post__edit--inp">
                        <p>Body</p>
                        <textarea value={post.body} onChange={(e) => handleChange(e, 'body')}/>
                    </div>
                    <button className="user-single-post__edit--sub" onClick={handleSubmit}>Save</button>
                    {
                        successEdited&&
                            <p>{successEdited}</p>
                            
                    }
                </div>
            }
        </div>

    )
}

export default SingleArticle
