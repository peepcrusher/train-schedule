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

var trainName = ""
var trainDestination = ""
var firstTrain = 0
var trainFrequency = 0



//with that information, create variables to store the math for calculating time until next train, and the next arrival

//make an on click listener 
$("#submit-train").on("click", function (event) {
    event.preventDefault();



    //create variables that will hook onto the information that the user Submits 
     trainName = $("#train-name").val()
     trainDestination = $("#train-destination").val()
     firstTrain = $("#first-train").val()
     trainFrequency = $("#frequency").val()


    //convert first train into time usable for data
    var firstConvertedTime = moment(firstTrain, "HH:mm");
    console.log(firstConvertedTime);
    //the current time
    var currentTime = moment();
    console.log("Current time: " + currentTime.format("hh:mm"));
    //the difference in minutes between the current time, and the time of the first train
    var diffTime = currentTime.diff(moment(firstConvertedTime), "minutes");
    console.log(diffTime);

    //calculate the remainder between the train frequency and the time that has passed since the first train
    var remainder = diffTime % trainFrequency;
    console.log(remainder + "remainder");
    //calculate the time until the next train
    var tillNextTrain = trainFrequency - remainder;
    console.log(tillNextTrain + " minutes till next train");

    //calculate what time the next train will arrive
    var nextTrain = currentTime.add(tillNextTrain, "minutes");
    console.log("arrival time" + nextTrain.format("hh:mm"));


    database.ref().push({
        TrainName: trainName,
        trainDestination: trainDestination,
        frequency: trainFrequency,
        nextArrival: nextTrain.format("hh:mm:A").toString(),
        tillNextTrain: tillNextTrain,
    });

});

//create a listener for on_child
database.ref().on("child_added", function (snapshot) {
    //append the database data to the DOM in the form of a table
    $("#rows-and-data-here").append(
        "<tr>" +
        "<td>" + snapshot.val().TrainName + "</td>" +
        "<td>" + snapshot.val().trainDestination + "</td>" +
        "<td>" + snapshot.val().frequency + "</td>" +
        "<td>" + snapshot.val().nextArrival + "</td>" +
        "<td>" + snapshot.val().tillNextTrain + "</td>" +
        "</tr>"
    )
})


//display the information stored in firebase, to the DOM
//using Jquery create table rows for each data point and append them to the DOM


// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation');
//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener('submit', function(event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
//         }, false);
//       });
//     }, false);
//   })();