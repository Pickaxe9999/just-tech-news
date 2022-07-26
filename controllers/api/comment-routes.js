const router = require('express').Router();
const {Comment, Post} = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'comment_text',
            'user_id',
            'post_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//create a new comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.user_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
})

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if(!dbPostData){
                res.status(404).json({message: 'No post found with that id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;