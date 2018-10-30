// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var country_capital_pairs = pairs;
var index = 0;
var isCorrect = true;
var recordIndex = 0;
var correctRecord = [];
var wrongRecord = [];

generateQuestion();

$( document ).ready(function() {
    emptyHistory();
    document.getElementById("pr2__answer").focus();
});

function generateQuestion(){
    index = Math.floor(Math.random() * 170);  //returns a random integer from 0 to 170
    document.getElementById("pr2__question").innerHTML = country_capital_pairs[index].country;
}

function emptyHistory(){
   document.getElementById("pr2__answer").value = "";
}

function seeAnswer(){
    addRows();
    generateQuestion();
    emptyHistory();
    document.getElementById("pr2__answer").focus();
    if((document.getElementById('correct').checked == true && (!isCorrect)) || (document.getElementById('wrong').checked == true && (isCorrect)))
        document.getElementById('all').checked = "checked";
    filter();
}

function correctAnswer(){
    if(document.getElementById("pr2__answer").value == country_capital_pairs[index].capital)
        isCorrect = true;
    else
        isCorrect = false;
}

function addRows() {
    var table = document.getElementById("answerHistory");
    var row = table.insertRow(3);
    row.id = "entry" + recordIndex;

    var countryName = row.insertCell(0);
    var capitalName = row.insertCell(1);
    var rightAnswer = row.insertCell(2);
    correctAnswer();
    if (isCorrect) {
        countryName.innerHTML =  "<font color=\"blue\">" + document.getElementById("pr2__question").innerHTML +"</font>";
        capitalName.innerHTML =  "<font color=\"blue\">" + document.getElementById("pr2__answer").value +"</font>";
        rightAnswer.innerHTML = "<font color=\"blue\"><i class=\"fas fa-check\"></i></font><input type=\"button\" value=\"Delete\" onclick=\"deleteRow(this)\">";
        correctRecord.push(recordIndex);
    }
    else {
        countryName.innerHTML =  "<font color=\"red\">" + document.getElementById("pr2__question").innerHTML +"</font>";
        capitalName.innerHTML =  "<font color=\"red\"><strike>" + document.getElementById("pr2__answer").value +"</strike></font>";
        rightAnswer.innerHTML = "<font color=\"red\">wrong</font><input type=\"button\" value=\"Delete\" onclick=\"deleteRow(this)\">";
        wrongRecord.push(recordIndex);
    }
    recordIndex++;
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("answerHistory").deleteRow(i);
}

var filters = document.getElementsByName('filter');
for(var i = 0; i < filters.length; ++i)
    filters[i].addEventListener("input", filter);

function filter(){
    filterAll();
    filterWrongOnly();
    filterCorrectOnly();
}
function filterAll(){
    if(document.getElementById('all').checked == true){
        var tr = document.getElementById("answerHistory").getElementsByTagName("tr");
        for(var i = 3; i < tr.length; ++i)
        {
            tr[i].style.display = "";
        }
    }
}

function filterCorrectOnly(){
    if(document.getElementById('correct').checked == true)
    {
        var tr = document.getElementById("answerHistory").getElementsByTagName("tr");
        for(var i = 3; i < tr.length; ++i)
        {
            tr[i].style.display = "none";
        }
        for(var i = 0; i < correctRecord.length; ++i)
        {
            var idTag = "entry" + correctRecord[i];
            var trById = document.getElementById(idTag);
            if(trById) trById.style.display = "";
        }
    }
}

function filterWrongOnly(){
    if(document.getElementById('wrong').checked == true)
    {
        var tr = document.getElementById("answerHistory").getElementsByTagName("tr");
        for(var i = 3; i < tr.length; ++i)
        {
            tr[i].style.display = "none";
        }
        for(var i = 0; i < wrongRecord.length; ++i)
        {
            var idTag = "entry" + wrongRecord[i];
            var trById = document.getElementById(idTag);
            if(trById) trById.style.display = "";
        }
    }
}

$( function() {
    var capitalList = [];
    for(var i= 0; i < country_capital_pairs.length; ++i)
    {
        capitalList.push(country_capital_pairs[i].capital);
    }
    $( "#pr2__answer" ).autocomplete({
          minLength: 2,
          source: capitalList,
          focus: function( event, ui ) {
        $( "#pr2__answer" ).val( ui.item.label );
        return false;
        },
          select: function( event, ui ) {
            seeAnswer();
            return false;
          }
        })
  } );
