import React, { useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Container, Grow, Grid, Button, Input } from '@material-ui/core';
import Form from '../../../components/Form/Form';
import { getPosts } from '../../../actions/posts';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';



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


const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [uploadPost, setUploadPost] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();

  return (
    <div className="post">

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
                  <Form 
                  currentId={currentId} 
                  setCurrentId={setCurrentId} />
                </Grid>
            </Container>
          </Grow></form>
        </div>
      </Modal>


      <div className="post__header">
        <div className="post__headerspace">
          <Avatar
            className="post__avatar"
            alt='Siroj'
            src="/static/images/avatar/1.jpg"
          />
          <h3>
            {/* {username} */}
            {post.creator}
          </h3>
        </div>
        <div>
          <Button style={{ color: 'gray' }} size="small" onClick={() => setCurrentId(post._id) && setUploadPost(true)}>
              <MoreHorizIcon fontSize="default" onClick={() => setUploadPost(true)}/>
          </Button>
        </div>
      </div>

      <img className="post__image" src=
      {post.selectedFile}
      // {imageUrl}
       alt=""/>
      {/* <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} /> */}
      
      <div className="post__likedelete">
        <Button size="small" color="lightgray"  onClick={() => dispatch(likePost(post._id))}>
            <FavoriteBorderIcon fontSize="large" style={{ marginRight: '5px' }}/> {post.likeCount} </Button>
        <Button size="small" color="lightgray" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteOutlineIcon fontSize="large" /> 
        </Button>
      </div>

      <h4 className="post__text"><strong>{post.creator}</strong> {post.title}</h4>

      <div className="post__tag">{post.tags.map((tag) => `#${tag} `)}</div>
      
      {/* <div className="post__text" variant="body2" color="textSecondary" component="p">{post.message}</div> */}

      <div className="post__moment">{moment(post.createdAt).fromNow()}</div>
    </div>
  );
};

export default Post;