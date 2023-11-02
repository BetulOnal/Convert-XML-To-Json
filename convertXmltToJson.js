function xmlToJson(){
    var x2js = new X2JS();  
    var xmlText = document.getElementById("xmlText").value;
    var jsonObj = x2js.xml_str2json(xmlText);
    document.getElementById("jsonText").innerHTML=JSON.stringify(jsonObj,null,2);
}

function downloadJson(){
    var jsonText = document.getElementById('jsonText').value;
    var data_json = "data:text/json;charset=utf-8," + jsonText;
    var anchor= document.createElement('a');
    anchor.setAttribute('href', data_json);
    anchor.setAttribute('download','jsonFormat.json');
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

}