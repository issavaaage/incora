import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import LoginForm from './pages/Login';
import AllArticles from './pages/Articles';
import SingleArticleView from './pages/SingleArticle(view)';
import SingleArticleEdit from './pages/SingleArticle(edit)';

function App() {
 
  const [currentUser, setCurrentUser] = React.useState({});

  // const handlePostClick = async (id) => {
  //     try {
  //         let post = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
  //         console.log(post);
  //     } catch(e) {
  //         console.log(e);
  //     }
  // }

  return (
    <div className="container">
      <Router>
        <Switch>

          <Route path="/" exact>
            <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>

          <Route path="/articles" exact>
            <AllArticles currentUser={currentUser} />
          </Route>

          <Route path="/articles/:id" exact>
            <SingleArticleView currentUser={currentUser} />
          </Route> 

          <Route path="/articles/:id/edit" exact>
            <SingleArticleEdit currentUser={currentUser} />
          </Route> 

        </Switch>
      </Router>
    </div>
  )
}

export default App;
