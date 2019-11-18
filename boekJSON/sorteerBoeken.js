//JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if(this.readyState==4 && this.status == 200){
    sorteerBoekObj.data = JSON.parse(this.responseText);
    sorteerBoekObj.sorteren();
  }
}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();

//een tabelkop in markup uitvoeren uit een array
const maakTabelKop = (arr) => {
  let kop = "<tabel><tr>";
  arr.forEach((item) => {
    kop += "<th>" + item + "</th>"
  });
  kop += "<tr>";
  return kop;
}
const maakTabelRij = (arr) => {
  let rij = "<tr>";
  arr.forEach((item) => {
    rij += "<td>" + item + "</td>"
  });
  rij += "</tr>";
  return rij;
}


// opject dat de boeken uitvoert en ook sorteert en data bevat
let sorteerBoekObj = {
  data: "",    //komt van xmlhttp.onreadystatechange

  //data sorteren
  sorteren: function() {
    this.data.sort( (a,b) => a.titel > b.titel ? 1 : -1 );
    this.uitvoeren(this.data);
  },

 //de data in een tabel uitvoeren
  uitvoeren: function(data) {
    let uitvoer = maakTabelKop(["titel","auteur(s)", "cover", "uitgave", "bladzijdeden", "taal", "EAN"]);
    for( let i=0; i<data.length; i++){
      let imgElement = "<img src='" + data[i].cover + "' width=>100 >";
      uitvoer += maakTabelRij([data[i].titel, data[i].titel, imgElement,data[i].uitgave, data[i].paginas, data[i].taal, data[i].ean]);

    }

    document.getElementById('uitvoer').innerHTML = uitvoer;
  }
}
