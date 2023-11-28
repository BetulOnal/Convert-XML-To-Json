const date = new Date();
const formattedDate = date.toLocaleDateString();
document.getElementById('currentDate').innerHTML="Date: " + formattedDate;
var dayOfWeek = date.getDay();
console.log(dayOfWeek)
switch (dayOfWeek) {
  case 1:
    document.getElementsByTagName("p")[0].innerHTML="It's Monday. Time to start the week!";
    break;
  case 2:
    document.getElementsByTagName("p")[0].innerHTML="It's Tuesday. You got this!"
    break;
  case 3:
    document.getElementsByTagName("p")[0].innerHTML="It's Wednesday. Halfway there!";
    break;
  case 4:
    document.getElementsByTagName("p")[0].innerHTML="It's Thursday. Almost done!";
    break;
  case 5:
    document.getElementsByTagName("p")[0].innerHTML="It's Friday. Weekend is near!";
    break;
  case 6:
  case 7:
    document.getElementsByTagName("p")[0].innerHTML="It's the weekend. Enjoy!";
    break;
  default:
    document.getElementsByTagName("p")[0].innerHTML="Invalid day of the week";
}


function xmlToJson(){
    var x2js = new X2JS();  
    var xmlText = document.getElementById("xmlText").value;
    var jsonObj = x2js.xml_str2json(xmlText);
    document.getElementById("jsonText").innerHTML=JSON.stringify(jsonObj,null,2);
}

function downloadJson(){
    var jsonText = document.getElementById('jsonText').value;
    var data_json = "data:text/json;charset=utf-8," + encodeURIComponent(jsonText);
    var anchor= document.createElement('a');
    anchor.setAttribute('href', data_json);
    anchor.setAttribute('download','jsonFormat.json');
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
}

function jsonToXml(){
    var x2js = new X2JS();  
    var jsonText = document.getElementById('jsonText').value;
    var newXml  =x2js.json2xml_str(JSON.parse(jsonText));
    function formatXml(xml, tab) { // tab = optional indent value, default is tab (\t)
        var formatted = '', indent= '';
        tab = tab || '\t';
        xml.split(/>\s*</).forEach(function(node) {
            if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
            formatted += indent + '<' + node + '>\r\n';
            if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
        });
        return formatted.substring(1, formatted.length-3);
    }
  
    document.getElementById("xmlText").innerHTML=formatXml(newXml, " ");
}

function downloadXml(){
  var xmlData = document.getElementById('xmlText').value;
  var data_str= "data:text/xml;charset=utf-8," + encodeURIComponent(xmlData);
  var anchor= document.createElement('a');
    anchor.setAttribute('href', data_str);
     anchor.setAttribute('download','doc.xml');
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

}

document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    const userfile = document.getElementById('file').files[0];
    const formdata = new FormData();
    formdata.append('userFile',userfile);
    const fullFileName = userfile.name;

    fetch('https://httpbin.org/post',{
        method:'POST',
        body: formdata,
})
.then(res=> res.json())
.then(data => {
    // Check if the file is XML or JSON based on the file extension
    if (fullFileName.endsWith('.xml')) {
        // Handle XML data
        document.getElementById('xmlText').value = data['files']['userFile'];
    } else if (fullFileName.endsWith('.json')) {
        // Handle JSON data
        document.getElementById('jsonText').value = data['files']['userFile'];
    } else {
        console.log('Unsupported file format');
    }
})
.catch(err=> console.log(err));

})
