declare const X2JS: any;

const date :Date = new Date();
const formattedDate:string = date.toLocaleDateString();
document.getElementById('currentDate')!.innerHTML="Date: " + formattedDate;
var dayOfWeek:number = date.getDay();
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

const xmlToJson = (): void => {
    const x2js = new X2JS();
    const xmlText: string = (document.getElementById("xmlText") as HTMLInputElement).value;
    const jsonObj = x2js.xml_str2json(xmlText);
    document.getElementById("jsonText")!.innerHTML = JSON.stringify(jsonObj, null, 2);
  };


const downloadJson = (): void => {
  const jsonText: string = (document.getElementById('jsonText') as HTMLInputElement).value;
  const dataJson: string = "data:text/json;charset=utf-8," + encodeURIComponent(jsonText);

  const anchor: HTMLAnchorElement = document.createElement('a');
  anchor.setAttribute('href', dataJson);
  anchor.setAttribute('download', 'jsonFormat.json');

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

const jsonToXml = (): void => {
    const x2js = new X2JS();
    const jsonText: string = (document.getElementById('jsonText') as HTMLInputElement).value;
    const newXml: string = x2js.json2xml_str(JSON.parse(jsonText));
  
    const formatXml = (xml: string, tab: string = '\t'): string => {
        let formatted = '';
        let indent = '';
      
        xml.split(/>\s*</).forEach((node) => {
          if (node.startsWith('/')) {
            // Decrease indent by one 'tab'
            indent = indent.substring(tab.length);
          }
          formatted += `${indent}<${node}>\r\n`;
          if (!node.endsWith('/') && !node.startsWith('?')) {
            // Increase indent if the node is not self-closing or processing instruction
            indent += tab;
          }
        });
        return formatted.substring(1, formatted.length - 3);
      };      
    document.getElementById("xmlText")!.innerHTML = formatXml(newXml, " ");
  };

const downloadXml = (): void => {
  const xmlData: string = (document.getElementById('xmlText') as HTMLInputElement).value;
  const dataStr: string = "data:text/xml;charset=utf-8," + encodeURIComponent(xmlData);

  const anchor: HTMLAnchorElement = document.createElement('a');
  anchor.setAttribute('href', dataStr);
  anchor.setAttribute('download', 'doc.xml');

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

document.getElementById('form')!.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const userFile: File | null = (document.getElementById('file') as HTMLInputElement).files?.[0] || null;

  if (userFile) {
    const formData: FormData = new FormData();
    formData.append('userFile', userFile);

    const fullFileName: string = userFile.name;

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if the file is XML or JSON based on the file extension
        if (fullFileName.endsWith('.xml')) {
          // Handle XML data
          (document.getElementById('xmlText') as HTMLInputElement).value = data['files']['userFile'];
        } else if (fullFileName.endsWith('.json')) {
          // Handle JSON data
          (document.getElementById('jsonText') as HTMLInputElement).value = data['files']['userFile'];
        } else {
          console.log('Unsupported file format');
        }
      })
      .catch((err) => console.log(err));
  }
});


  
  

  