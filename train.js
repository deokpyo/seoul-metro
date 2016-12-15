// initialize firebase
var config = {
    apiKey: "AIzaSyCD4SpRabP773FK-oN3QPpdPP2DzqJ8CH0",
    authDomain: "codingbootcamp-a5fa9.firebaseapp.com",
    databaseURL: "https://codingbootcamp-a5fa9.firebaseio.com",
    storageBucket: "codingbootcamp-a5fa9.appspot.com",
    messagingSenderId: "915705317589"
};

firebase.initializeApp(config);

// create a variable to reference the database
var database = firebase.database();

// capture on submit button click
$("#submit").on("click", function() {

    // reference input values from text boxes
    var name = $("#name").val().trim();
    var dest = $("#dest").val().trim();
    var time = $("#time").val().trim();
    var freq = $("#freq").val().trim();

    // clear input fields
    $("#name").val("");
    $("#dest").val("");
    $("#time").val("");
    $("#freq").val("");

    // push the data to firebase
    database.ref().push({
        name: name,
        dest: dest,
        time: time,
        freq: freq
    });
    return false;
});

database.ref().on("child_added", function(snapshot) {
    // variable references
    var data = snapshot.val();
    var name = data.name;
    var dest = data.dest;
    var time = data.time;
    var freq = data.freq;
    var trTag = $("<tr>");
    var tdTag = $("<td>");
    var tArray = calTime(time, freq);
    var next = tArray[0];
    var away = tArray[1];
    var fTime = moment(time, "hh:mm")

    // append td tags to tr tag
    trTag.append("<td>" + name + "</td>" + "<td>" + dest + "</td>" + "<td>" + fTime.format("hh:mm a") + "</td>" + "<td>" + freq + " minutes</td>" + "<td>" + next + "</td>" + "<td>" + away + " minutes</td>");
    // append tr tag to tbody
    $("#tbody").append(trTag);

    // handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// function to calculate the train times
function calTime(time, freq) {
    // frequency
    var tFreq = freq;
    // first train time
    var tFirst = time;
    // first train time converted using momentjs
    var tStart = moment(tFirst, "hh:mm");
    // current time
    var tCurrent = moment();
    // difference between times
    var tDiff = tCurrent.diff(tStart, "minutes");
    // time apart
    var tRemain = tDiff % tFreq;
    // minutes till next train
    var tMin = tFreq - tRemain;
    // next train time
    var tNext = tCurrent.add(tMin, "minutes");
    // store return values in array
    var tArray = [tNext.format("hh:mm a"), tMin];
    return tArray;
}

// function to update the current time
var updateTime = function(){
    var currentTime = moment().format('MMMM Do YYYY, hh:mm:ss a');
    $("#current-time").html(currentTime);
}
// call function every second
setInterval(updateTime, 1000);