import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import './App.css';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Container, Grow, Grid, Button, Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
// import useStyles from './styles';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [uploadPost, setUploadPost] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);


  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
    <div className="app">

      <div className="app__header">
          <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
      </div>
            
      <div className="app__posts">
        <Posts setCurrentId={setCurrentId} />
      </div>

      <Modal
        open={uploadPost}
        onClose={() => setUploadPost(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
          <Grow in>
            <Container>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Container>
          </Grow></form>
        </div>
      </Modal>
        
      <div className="app__bottom"> 
        <Button  className="app__plus" onClick={() => setUploadPost(true)}>image upload</Button>
      </div>

    </div>
    </UserContext.Provider>
      </BrowserRouter>
    </> 
  );
};

export default App;