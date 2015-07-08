var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// GET author
router.get('/author', function(req, res) {
	res.render('author', {errors: []});
});

router.param('quizId', sessionController.watchMaxTimeInactive, quizController.load);
router.param('commentId', sessionController.watchMaxTimeInactive, commentController.load);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes', sessionController.watchMaxTimeInactive, quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.watchMaxTimeInactive, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.watchMaxTimeInactive, quizController.answer);

router.get('/quizes/new', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.watchMaxTimeInactive, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.watchMaxTimeInactive, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, sessionController.watchMaxTimeInactive, commentController.publish);
//router.get('/quizes:search/')

module.exports = router;var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// GET author
router.get('/author', function(req, res) {
	res.render('author', {errors: []});
});

router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes', sessionController.watchMaxTimeInactive, quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.watchMaxTimeInactive, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.watchMaxTimeInactive, quizController.answer);

router.get('/quizes/new', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, sessionController.watchMaxTimeInactive, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.watchMaxTimeInactive, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.watchMaxTimeInactive, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, sessionController.watchMaxTimeInactive, commentController.publish);
//router.get('/quizes:search/')

module.exports = router;