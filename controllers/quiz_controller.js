var models=require('../models/models.js');

// AUTOLOAD
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz=quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req, res){
	if (req.query.search){
		models.Quiz.findAll({where: ["pregunta like ?", 
			'%'+req.query.search.replace(/\s/g, "%")+'%']}).then(function(quizes){
				res.render('quizes/index.ejs', {quizes: quizes, errors: []});
			}).catch(function(error) {next(error);});
	}
	else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if (req.query.respuesta===req.quiz.respuesta){
			resultado = 'Correcto';
		}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res){
	/*console.log(req.body.quiz);
	var quiz=models.Quiz.build(req.body.quiz);
	quiz
	.save({fields:["pregunta", "respuesta"]})
	.then(function(){
		res.redirect('/quizes');
	});*/

	console.log(req.body.quiz);
	var quiz=models.Quiz.build(req.body.quiz);
	err=quiz.validate();
	console.log(err);
			if (err) {
				console.log('HAY ERRORES'+err.errors);
				res.render('quizes/new', {quiz: quiz, errors: [err.pregunta, err.respuesta]});
			}
			else {
				console.log('3');
				quiz
				.save({fields:["pregunta", "respuesta"]})
				.then(function(){
					res.redirect('/quizes');
				});
			}


	/*console.log(req.body.quiz);
	var quiz=models.Quiz.build(req.body.quiz);
	quiz
	.validate()
	.then(
		function(err){
			console.log('2');
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}
			else {
				console.log('3');
				quiz
				.save({fields:["pregunta", "respuesta"]})
				.then(function(){
					res.redirect('/quizes');
				});
			}
		}
	);*/
};


// GET /quizes/question
/*exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res){
	if (req.query.respuesta==='Roma'){
		res.render('quizes/answer', {respuesta:'Correcto'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
};*/