
//Initialize Firebase
var config = {
    apiKey: "AIzaSyC5fF9e7IUz69aruBNA_HrvomKWHaBkmLY",
    authDomain: "trainscheduler-52b21.firebaseapp.com",
    databaseURL: "https://trainscheduler-52b21.firebaseio.com",
    projectId: "trainscheduler-52b21",
    storageBucket: "trainscheduler-52b21.appspot.com",
    messagingSenderId: "835026173343"
  };
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  //Add trains
	$("#add-train-btn").on("click", function(){
        event.preventDefault();

		//user input variables
		var trainName = $("#train-name-input").val().trim();
		var destination = $("#destination-input").val().trim();
		var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequency = $("#frequency-input").val().trim();

		//Create a train
		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTime,
			frequency: frequency,
		}

		//insert data to firebase
		trainDatabase.ref().push(newTrain);

		//clear previous input
		$("#train-name-input").val("");
		$("#destination-input").val("");
		$("#train-time-input").val("");
		$("#frequency-input").val("");
    });