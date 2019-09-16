$(document).ready(function () {
    var options = [
        {
            question: "Name the biggest Island of the World?", 
            choice: ["Palawan", "Bora Bora", "Maldives", "Greenland"],
            answer: 3,
            photo: "assets/images/img1.jpg"
         },
         {
             question: "What is the diameter of the Earth?", 
            choice: ["12,742 KILOMETER", "54,65,49,333 METER", "1,00,546 CENTIMETER", "500 KILOMETER"],
            answer: 0,
            photo: "assets/images/img2.jpg"
         }, 
         {
             question: "Who is the wife of Barack Obama?", 
            choice: ["Lindsey Lohan", "Hillary Clinton", "Michelle Obama", "Chao-xing" ],
            answer: 2,
            photo: "assets/images/img3.jpg"
        }, 
        {
            question: "Name the largest Continent of the World?", 
            choice: ["North America", "Africa", "Europe", "Asia" ],
            answer: 3,
            photo: "assets/images/img4.jpg"
        }, 
        {
            question: "Which State is known as Empire State?", 
            choice: ["Iowa", "Illinois", "NewYrok", "Ohio" ],
            answer: 2,
            photo: "assets/images/img5.jpg"
        }, 
        {
            question: "Name the largest Ocean of the world?", 
            choice: ["South ocean", "Indian ocean", "Pacific ocean", "Atlantic ocean" ],
            answer: 2,
            photo: "assets/images/img6.jpg"
        }, 
        {
            question: "When was America affected by Hurricane Katarina?", 
            choice: ["2005", "2019", "2025", "1856" ],
            answer: 0,
            photo: "assets/images/img7.jpg"
        }, 
        {
            question: "How many bones are there in Human Body?", 
            choice: ["5.628 Bones", "1,00,000 Bones", "1 Bone", "206 Bones" ],
            answer: 3,
            photo: "assets/images/img8.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "  Seconds</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question from array
    //display question and loop 
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidepic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 10;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's your Result: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        },3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })