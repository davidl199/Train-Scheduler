
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

		//Creates local "temporary" object for holding train data
		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTime,
			frequency: frequency,
		}

		//Upload data to firebase
		trainDatabase.ref().push(newTrain);

		//clear previous input
		$("#train-name-input").val("");
		$("#destination-input").val("");
		$("#train-time-input").val("");
		$("#frequency-input").val("");

		false;
    });

    //Create Firebase event for adding train to the database and a row in the HTML table when a user adds an entry
    trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey){
        
        var trainName = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var trainTime = childSnapshot.val().trainTime;
		var frequency = childSnapshot.val().frequency;

		var timeRemaining = moment().diff(moment.unix(trainTime), "minutes") % frequency ;
		var minutes = frequency - timeRemaining;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

		//add train to table
        $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>"+ destination + "</td><td>" + frequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});