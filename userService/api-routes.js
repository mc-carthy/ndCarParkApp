let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API functional',
        message: 'UserService API'
    });
});

let userController = require('./userController');

router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router;