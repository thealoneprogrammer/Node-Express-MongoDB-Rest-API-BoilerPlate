const { required } = require('@hapi/joi');

const router = require('express').Router();
const verify = require('./auth/verifyJwtToken');
const Post = require('../models/Post');

//get all the posts
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send(error)
    }
})

//post a post
router.post('/', verify, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save();
        res.status(200).send(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get a specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send(err);
    }
})

//delete a post
router.delete('/:postId', async (req, res) => {
    try {
        const deletedPost = await Post.remove({ _id: req.params.postId });
        res.status(200).send(deletedPost);
    } catch (err) {
        res.status(400).send(err);
    }
})

//update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set:
                {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        );
        res.status(200).send(updatedPost);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router
