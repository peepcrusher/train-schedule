//firebase information

var config = {
    apiKey: "AIzaSyAdmTB181XR8ful-Zm6oDnkE_IN2RL3cdc",
    authDomain: "click-counter-8ce7c.firebaseapp.com",
    databaseURL: "https://click-counter-8ce7c.firebaseio.com",
    projectId: "click-counter-8ce7c",
    storageBucket: "click-counter-8ce7c.appspot.com",
    messagingSenderId: "836071760575"
};
firebase.initializeApp(config);

var database = firebase.database();





//with that information, create variables to store the math for calculating time until next train, and the next arrival

//make an on click listener 
$("#submit-train").on("click", function (event) {
    event.preventDefault();

    //create variables that will hook onto the information that the user Submits 
    var trainName = $("#train-name").val()
    var trainDestination = $("#train-destination").val()
    var firstTrain = $("#first-train").val()
    var trainFrequency = $("#frequency").val()

    var firstConvertedTime = moment(firstTrain, "HH:mm");
    console.log(firstConvertedTime);

    var currentTime = moment();
console.log("Current time: " + currentTime.format("hh:mm"));
    var diffTime = currentTime.diff(moment(firstConvertedTime), "minutes");
console.log(diffTime);
    var remainder = diffTime % trainFrequency;
console.log(remainder + "remainder");
    var tillNextTrain = trainFrequency - remainder;
console.log(tillNextTrain + " minutes till next train");
    var nextTrain = currentTime.add(tillNextTrain, "minutes");
console.log("arrival time" + nextTrain.format("hh:mm"));
    
})

//take the user information and the new next train and next arrival variables, and store it in a firebase folder



//display the information stored in firebase, to the DOM
//using Jquery create table rows for each data point and append them to the DOM
