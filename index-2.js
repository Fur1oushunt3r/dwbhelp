AOS.init({
  duration: 1200,
})

var scroll = setInterval(function(){ window.scrollBy(0,1); }, 20);





$(document).ready(function(){
  "use strict";
  
  var questions = [{
    question: "Who are the Doctors Without Borders?",
    choices: ['Non-profit Organisation', 'Body of a government', 'Profit Organisation'],
    correctAnswer: 0
  }, {
    question: "What does the organisation do?",
    choices: ["Help the rich", "Help the poor", "Help the people in need of medica lassistance"],
    correctAnswer: 2
  }, {
    question: "What is one goal the organisation wants to achieve by 2020?",
    choices: ['End Poverty', 'Improve Emergency Response', 'Achieve Universal Health Coverage'],
    correctAnswer: 2
  }, {
    question: "How did the organiation help in Syria?",
    choices: ['Stopped the war', 'Set up Hospitals', 'Helped refugees'],
    correctAnswer: 1
  }, {
    question: "How can a student (you) help the organisation?",
    choices: ["Become a doctor", "Donate to the cause", "Do Nothing"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0;
  var selections = []; 
  var quiz = $('.content'); 
  
  displayNext();
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    if (isNaN(selections[questionCounter])) {
      $('#warning').text('Choose an answer!');
    } else {
      questionCounter++;
      displayNext();
	  $('#warning').text('');
    }
  });
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
      
             
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h1>Test your Knowledge: Question ' + (index + 1) + ':</h1>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
	var warningText = $('<p id="warning">');
	qElement.append(warningText);
	
	return qElement;

  }
  
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
       }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  function displayScore() {
    var score = $('<h3>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
	var percentage = numCorrect / questions.length;
	if (percentage >= 0.9){
    	score.append('Incredible! You got ' + numCorrect + ' out of ' +
                 questions.length + ' questions right! Donate to the cause <a href="donate%20page.html">here</a>');
	}
	
	else if (percentage >= 0.7){
    	score.append('Good job! You got ' + numCorrect + ' out of ' +
                 questions.length + ' questions right!Donate to the cause <a href="donate%20page.html">here</a>');
	}
	
	else if (percentage >= 0.5){
    	score.append('You got ' + numCorrect + ' out of ' +
                 questions.length + ' questions right. Donate to the cause <a href="donate%20page.html">here</a>');
	}
	
	else {
    	score.append('You only got ' + numCorrect + ' out of ' +
                 questions.length + ' right. Want to try again? Donate to the cause <a href="donate%20page.html">here</a>');
	}
    return score;
  }
});