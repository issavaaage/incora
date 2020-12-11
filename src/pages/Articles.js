import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function Articles({currentUser}) {

    const [posts, setPosts] = React.useState([]);
    const [redirectTo, setRedirectTo] = React.useState(undefined);
    const [addedWork, setAddedWork] = React.useState({});
    const [successAddedWork, setSuccessAddedWork] = React.useState(undefined);

    React.useEffect(async () => {

        if(currentUser.status === 'success' || currentUser.status !== undefined) {
            const result = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`);
            setPosts(result.data);
        }
    }, []);

    const handleView = (el) => {
        setRedirectTo(`/articles/${el.id}`);
    }

    const handleEdit = (el) => {
        setRedirectTo(`/articles/${el.id}/edit`);
    }

    const handleDelete = async (i) => {
        let fetchId = posts[i].id
        let newList = [...posts];
        newList = newList.filter((_, index) => index !== i );
        setPosts(newList);

        let result = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${fetchId}`);
        console.log(result);
    }

    const handleChange = (e, part) => {
        setAddedWork({...addedWork, [part]: e.target.value});
    }

    const handleAdd = async () => {
        try {
            let finalEditedWork = {...addedWork};
            finalEditedWork.userId = currentUser.id;
            finalEditedWork.id = posts.length;

            let newList = [...posts];
            newList.push(finalEditedWork);
            setPosts(newList);

            let result = await axios.post('https://jsonplaceholder.typicode.com/posts', finalEditedWork);
            console.log(result);

            if(result.status === 201) {
                setSuccessAddedWork('Succesfully added work!');
            }
            else {
                setSuccessAddedWork('Check dev tools to view status code');
            }

        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        redirectTo === undefined ? 

        <div className="user-all-posts">
            <h1>List of posts</h1>
            <ol>
                {
                    posts.length !== 0 ? 

                    <div>
                        {
                            posts.map((el, i) => {
                                return (
                                <li key={i}>{el.title} 
                                    <small className="view" onClick={() => handleView(el)}>get details</small>
                                    <small className="edit" onClick={() => handleEdit(el)}>edit</small>
                                    <small className="delete" onClick={() => handleDelete(i)}>delete</small>
                                </li>
                                )
                                })
                        }
                        

                        <div className="user-all-posts__add">
                            <h4>Add new article!</h4>
                            <div className="user-all-posts__add--inp">
                                <p>Title</p>
                                <textarea value={addedWork.title} onChange={(e) => handleChange(e, 'title')}/>
                            </div>
                            <div className="user-all-posts__add--inp">
                                <p>Body</p>
                                <textarea value={addedWork.body} onChange={(e) => handleChange(e, 'body')}/>
                            </div>
                            <button className="user-all-posts__add--sub" onClick={() => handleAdd()}>Add new article</button>
                            {
                                successAddedWork&&
                                <p>{successAddedWork}</p>
                            }
                        </div>
                    </div>

                    :

                    <div className="login-in"><Link to="/">Please first login in</Link></div>
                    
                }
            </ol>
        </div>

        :

        <Redirect to={redirectTo} />
    )
}

export default Articles
