// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';


  var frm = {
    txtResi: document.getElementById('txtResi'),
    vResi: document.getElementById('vResi'),
    vStatus: document.getElementById('vStatus'),
    vService: document.getElementById('vService'),
    vTanggalDikirim: document.getElementById('vTanggalDikirim'),
    vDikirimOleh: document.getElementById('vDikirimOleh'),
    vDikirimKe: document.getElementById('vDikirimKe')
  }


 document.getElementById('btnCek').addEventListener('click', function() {
    loadDoc();
  });


 function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.status);
    if (this.readyState == 4 && this.status == 200) {
     //document.getElementById("demo").innerHTML = this.responseText;
      var data = JSON.parse(this.responseText);
      localStorage.setItem('resi', JSON.stringify(data));
      console.log(data);
      frm.vResi.value = data.gen_info.awb;
      frm.vService.value = data.gen_info.service;
      frm.vTanggalDikirim.value = data.gen_info.date;
      frm.vDikirimOleh.value = data.gen_info.shipper;
      frm.vDikirimKe.value = data.gen_info.receiver;
    } 

    // else {
    //    var data = localStorage.getItem('resi');
    //    data = JSON.parse(data);
    //    frm.vResi.value = data.gen_info.awb;
    //   frm.vService.value = data.gen_info.service;
    //   frm.vTanggalDikirim.value = data.gen_info.date;
    //   frm.vDikirimOleh.value = data.gen_info.shipper;
    //   frm.vDikirimKe.value = data.gen_info.receiver;
    // }
    
  };
  xhttp.open("GET", "https://wahidganteng.ga/process/api/131a752508b0aad50227e1a65527d363/cek-resi?jasa=jne&resi="+frm.txtResi.value, true);
  xhttp.send();
}

  //TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
