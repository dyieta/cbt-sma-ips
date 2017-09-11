// Initialize your app

        
var myApp = new Framework7({
     animateNavBackIcon:true,
    template7Pages: true,
precompileTemplates: true,
    
    
    
    
    
});




// Export selectors engine
var $$ = Dom7;

var x=0;
var idmapel=null;

var nomor_urut=1;

 var mapel=null;

var waktu=null;
var gambar=null;
var jumlah_soal=null;
var nama_mapel=null;
var arrayjawaban=null;
var soal='';
var timeinterval=null;
var tryout='1';
var aktivasi='';
var lihat='';
 var audio;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
          myApp.addNotification({
        title: 'Genta Smart',
        message: 'memilih notif'
    });
    });
});

myApp.onPageInit('soal', function (page) {
    // run createContentPage func after link was clicked
      $$('.create-page').on('click', function () {
     alert("sle");
    });
    
  
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}


$$(document).on('page:init', '.page[data-page="soal-pages"]', function (e) {
    var mySwiper = $$('.swiper-container')[0].swiper;  
    
var deadline = new Date(Date.parse(new Date()) + waktu * 60 * 1000);
initializeClock('clockdiv', deadline); 

    
mySwiper.on('slideChangeStart', function () {
document.getElementById("enomor").innerHTML = " &nbsp; No. " + (mySwiper.activeIndex+1);
nomor_urut=mySwiper.activeIndex+1;
    
    

var jawaban=arrayjawaban[nomor_urut]["jawab"];  
$$('#ba').removeClass('active'); 
$$('#bb').removeClass('active');
$$('#bc').removeClass('active');
$$('#bd').removeClass('active');
$$('#be').removeClass('active');
    
    if (jawaban=="A"){
       $$('#ba').addClass('active'); 
    }else if (jawaban=="B"){
       $$('#bb').addClass('active'); 
    }else if (jawaban=="C"){
       $$('#bc').addClass('active'); 
    }else if (jawaban=="D"){
       $$('#bd').addClass('active'); 
    }else if (jawaban=="E"){
       $$('#be').addClass('active'); 
    }

    
   if (aktivasi=='false' &&  lihat=='true'){
         myApp.prompt('masukkan kode yang ada di dalam buku', 'Aktivasi', function (value) {
         if (value=="SM74D"){
             ubahaktivasi();
       myApp.alert('aktivasi berhasil','SELAMAT');
             }else{
                 myApp.alert('kode salah','ERROR');
             }
    });
       
   }

})      

})

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      
     
    if (t.total <= 0) {
      clearInterval(timeinterval);
        ubahlihat();
        myApp.alert('Waktu habis!!', 'Info', function () {
        myApp.popup('.popup-about');
    });
       
	   
    }
  }

  updateClock();
   timeinterval = setInterval(updateClock, 1000);
}
   
    
    



function pilihmapel(x) {
	idmapel=x;
	
    
 


tampilmapel();
    
    
  
    
}


function pilihtryout(x) {
    $$('#btry1').removeClass('active');
    $$('#btry2').removeClass('active');
	
    if (x=='1'){
        $$('#btry1').addClass('active'); 
        tryout='1';
    }else if (x=='2'){
        $$('#btry2').addClass('active'); 
        tryout='2';
    }
    
 
    
    
}

function next(){
    x=x+1;
    
}

   var db = window.openDatabase("CBTSMAIPSDb", "1.0", "cbt sma ips Database",  3*1024*1024);

  document.addEventListener("deviceready", onDeviceReady, false);





    // Populate the database 
    //
    function populateDB(tx) {
 
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, nama,soal,waktu,gambar)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbaktivasi (id unique, aktif,lihat)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbjawab (id unique,nomor INTEGER,idmapel INTEGER, kunci TEXT,gambar TEXT,jawab TEXT,tryout TEXT)');
         //tx.executeSql('CREATE TABLE IF NOT EXISTS tbjawaban (id INTEGER PRIMARY KEY,idmapel INTEGER , kunci TEXT,gambar TEXT,jawab TEXT)');
       


    
    
    }

    // Query the 
    //
    

    // Transaction error 
    //
    function errorCB(err) {
       //alert("Error processing SQL: "+err.code);
        
    }

    // Transaction success callback
    //
   

    // PhoneGap is ready
    //
    function onDeviceReady() {
      
        db.transaction(populateDB, errorCB, successCB);
    }

function successCB() {
       db.transaction(function (tx) {
 
        tx.executeSql('select * from tbjawab', [], querySuccesscekdata, errorCB);

       })
}

function querySuccesscekdata(tx, results) {
    
    var len = results.rows.length;
   if (len==0){
        db.transaction(populateDATA, errorCB, successinsertData);
   }  
  

}

  function populateDATA(tx) {
       tx.executeSql('INSERT INTO tbaktivasi (id, aktif,lihat) VALUES (1, "false","false")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (1, "Matematika","40","120","matematika2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (2, "Bahasa Indonesia","50","120","bahasaindonesia2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (3, "Bahasa Inggris","120","30","bahasainggris2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (4, "Ekonomi","40","120","akutansi")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (5, "Geografi","50","120","geo2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (6, "Sosiologi","50","120","sosiologi2")');
      
       tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("1","1","","C","1","mips0101","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("2","2","","D","1","mips0102","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("3","3","","A","1","mips0103","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("4","4","","B","1","mips0104","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("5","5","","C","1","mips0105","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("6","6","","E","1","mips0106","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("7","7","","A","1","mips0107","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("8","8","","A","1","mips0108","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("9","9","","C","1","mips0109","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("10","10","","C","1","mips0110","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("11","11","","A","1","mips0111","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("12","12","","E","1","mips0112","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("13","13","","C","1","mips0113","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("14","14","","A","1","mips0114","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("15","15","","E","1","mips0115","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("16","16","","D","1","mips0116","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("17","17","","A","1","mips0117","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("18","18","","A","1","mips0118","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("19","19","","D","1","mips0119","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("20","20","","B","1","mips0120","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("21","21","","C","1","mips0121","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("22","22","","A","1","mips0122","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("23","23","","B","1","mips0123","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("24","24","","B","1","mips0124","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("25","25","","C","1","mips0125","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("26","26","","D","1","mips0126","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("27","27","","B","1","mips0127","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("28","28","","B","1","mips0128","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("29","29","","E","1","mips0129","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("30","30","","D","1","mips0130","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("31","31","","B","1","mips0131","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("32","32","","A","1","mips0132","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("33","33","","A","1","mips0133","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("34","34","","B","1","mips0134","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("35","35","","A","1","mips0135","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("36","36","","D","1","mips0136","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("37","37","","E","1","mips0137","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("38","38","","C","1","mips0138","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("39","39","","A","1","mips0139","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("40","40","","C","1","mips0140","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("41","1","","B","2","mips0201","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("42","2","","A","2","mips0202","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("43","3","","B","2","mips0203","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("44","4","","B","2","mips0204","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("45","5","","D","2","mips0205","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("46","6","","E","2","mips0206","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("47","7","","C","2","mips0207","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("48","8","","B","2","mips0208","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("49","9","","C","2","mips0209","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("50","10","","D","2","mips0210","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("51","11","","D","2","mips0211","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("52","12","","D","2","mips0212","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("53","13","","C","2","mips0213","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("54","14","","E","2","mips0214","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("55","15","","A","2","mips0215","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("56","16","","B","2","mips0216","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("57","17","","B","2","mips0217","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("58","18","","D","2","mips0218","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("59","19","","C","2","mips0219","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("60","20","","B","2","mips0220","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("61","21","","B","2","mips0221","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("62","22","","B","2","mips0222","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("63","23","","C","2","mips0223","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("64","24","","D","2","mips0224","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("65","25","","D","2","mips0225","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("66","26","","D","2","mips0226","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("67","27","","B","2","mips0227","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("68","28","","B","2","mips0228","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("69","29","","C","2","mips0229","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("70","30","","A","2","mips0230","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("71","31","","C","2","mips0231","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("72","32","","C","2","mips0232","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("73","33","","B","2","mips0233","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("74","34","","E","2","mips0234","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("75","35","","B","2","mips0235","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("76","36","","C","2","mips0236","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("77","37","","C","2","mips0237","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("78","38","","A","2","mips0238","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("79","39","","B","2","mips0239","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("80","40","","D","2","mips0240","1")');


tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("81","1","","C","1","bi0101","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("82","2","","A","1","bi0102","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("83","3","","E","1","bi0103","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("84","4","","B","1","bi0104","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("85","5","","D","1","bi0105","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("86","6","","A","1","bi0106","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("87","7","","D","1","bi0107","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("88","8","","D","1","bi0108","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("89","9","","E","1","bi0109","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("90","10","","A","1","bi0110","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("91","11","","C","1","bi0111","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("92","12","","E","1","bi0112","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("93","13","","C","1","bi0113","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("94","14","","E","1","bi0114","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("95","15","","C","1","bi0115","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("96","16","","B","1","bi0116","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("97","17","","E","1","bi0117","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("98","18","","E","1","bi0118","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("99","19","","A","1","bi0119","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("100","20","","A","1","bi0120","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("101","21","","D","1","bi0121","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("102","22","","B","1","bi0122","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("103","23","","C","1","bi0123","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("104","24","","C","1","bi0124","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("105","25","","B","1","bi0125","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("106","26","","B","1","bi0126","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("107","27","","E","1","bi0127","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("108","28","","A","1","bi0128","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("109","29","","D","1","bi0129","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("110","30","","B","1","bi0130","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("111","31","","A","1","bi0131","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("112","32","","B","1","bi0132","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("113","33","","A","1","bi0133","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("114","34","","B","1","bi0134","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("115","35","","B","1","bi0135","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("116","36","","E","1","bi0136","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("117","37","","D","1","bi0137","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("118","38","","E","1","bi0138","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("119","39","","C","1","bi0139","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("120","40","","A","1","bi0140","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("121","41","","D","1","bi0141","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("122","42","","A","1","bi0142","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("123","43","","B","1","bi0143","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("124","44","","E","1","bi0144","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("125","45","","E","1","bi0145","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("126","46","","A","1","bi0146","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("127","47","","A","1","bi0147","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("128","48","","A","1","bi0148","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("129","49","","D","1","bi0149","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("130","50","","B","1","bi0150","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("131","1","","A","2","bi0201","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("132","2","","B","2","bi0202","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("133","3","","D","2","bi0203","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("134","4","","A","2","bi0204","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("135","5","","A","2","bi0205","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("136","6","","E","2","bi0206","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("137","7","","B","2","bi0207","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("138","8","","A","2","bi0208","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("139","9","","A","2","bi0209","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("140","10","","C","2","bi0210","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("141","11","","B","2","bi0211","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("142","12","","B","2","bi0212","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("143","13","","C","2","bi0213","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("144","14","","A","2","bi0214","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("145","15","","A","2","bi0215","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("146","16","","A","2","bi0216","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("147","17","","A","2","bi0217","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("148","18","","C","2","bi0218","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("149","19","","D","2","bi0219","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("150","20","","B","2","bi0220","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("151","21","","A","2","bi0221","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("152","22","","C","2","bi0222","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("153","23","","E","2","bi0223","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("154","24","","C","2","bi0224","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("155","25","","A","2","bi0225","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("156","26","","C","2","bi0226","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("157","27","","D","2","bi0227","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("158","28","","B","2","bi0228","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("159","29","","B","2","bi0229","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("160","30","","B","2","bi0230","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("161","31","","C","2","bi0231","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("162","32","","E","2","bi0232","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("163","33","","A","2","bi0233","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("164","34","","D","2","bi0234","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("165","35","","A","2","bi0235","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("166","36","","D","2","bi0236","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("167","37","","B","2","bi0237","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("168","38","","B","2","bi0238","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("169","39","","C","2","bi0239","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("170","40","","B","2","bi0240","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("171","41","","A","2","bi0241","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("172","42","","B","2","bi0242","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("173","43","","B","2","bi0243","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("174","44","","E","2","bi0244","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("175","45","","C","2","bi0245","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("176","46","","E","2","bi0246","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("177","47","","C","2","bi0247","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("178","48","","E","2","bi0248","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("179","49","","E","2","bi0249","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("180","50","","E","2","bi0250","2")');


tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("181","1","","C","1","bing0101","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("182","2","","A","1","bing0102","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("183","3","","E","1","bing0103","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("184","4","","C","1","bing0104","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("185","5","","B","1","bing0105","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("186","6","","C","1","bing0106","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("187","7","","A","1","bing0107","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("188","8","","A","1","bing0108","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("189","9","","A","1","bing0109","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("190","10","","D","1","bing0110","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("191","11","","E","1","bing0111","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("192","12","","E","1","bing0112","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("193","13","","A","1","bing0113","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("194","14","","C","1","bing0114","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("195","15","","B","1","bing0115","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("196","16","","E","1","bing0116","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("197","17","","C","1","bing0117","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("198","18","","D","1","bing0118","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("199","19","","C","1","bing0119","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("200","20","","D","1","bing0120","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("201","21","","A","1","bing0121","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("202","22","","B","1","bing0122","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("203","23","","A","1","bing0123","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("204","24","","B","1","bing0124","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("205","25","","B","1","bing0125","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("206","26","","C","1","bing0126","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("207","27","","B","1","bing0127","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("208","28","","E","1","bing0128","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("209","29","","A","1","bing0129","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("210","30","","C","1","bing0130","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("211","31","","C","1","bing0131","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("212","32","","C","1","bing0132","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("213","33","","D","1","bing0133","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("214","34","","B","1","bing0134","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("215","35","","E","1","bing0135","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("216","36","","D","1","bing0136","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("217","37","","C","1","bing0137","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("218","38","","A","1","bing0138","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("219","39","","A","1","bing0139","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("220","40","","C","1","bing0140","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("221","41","","B","1","bing0141","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("222","42","","B","1","bing0142","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("223","43","","E","1","bing0143","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("224","44","","A","1","bing0144","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("225","45","","B","1","bing0145","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("226","46","","C","1","bing0146","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("227","47","","E","1","bing0147","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("228","48","","E","1","bing0148","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("229","49","","A","1","bing0149","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("230","50","","E","1","bing0150","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("231","1","","D","2","bing0201","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("232","2","","B","2","bing0202","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("233","3","","E","2","bing0203","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("234","4","","A","2","bing0204","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("235","5","","D","2","bing0205","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("236","6","","A","2","bing0206","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("237","7","","C","2","bing0207","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("238","8","","E","2","bing0208","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("239","9","","A","2","bing0209","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("240","10","","A","2","bing0210","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("241","11","","E","2","bing0211","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("242","12","","E","2","bing0212","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("243","13","","C","2","bing0213","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("244","14","","E","2","bing0214","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("245","15","","D","2","bing0215","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("246","16","","E","2","bing0216","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("247","17","","B","2","bing0217","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("248","18","","A","2","bing0218","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("249","19","","C","2","bing0219","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("250","20","","A","2","bing0220","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("251","21","","E","2","bing0221","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("252","22","","B","2","bing0222","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("253","23","","D","2","bing0223","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("254","24","","A","2","bing0224","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("255","25","","A","2","bing0225","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("256","26","","E","2","bing0226","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("257","27","","B","2","bing0227","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("258","28","","B","2","bing0228","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("259","29","","D","2","bing0229","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("260","30","","B","2","bing0230","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("261","31","","C","2","bing0231","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("262","32","","C","2","bing0232","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("263","33","","D","2","bing0233","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("264","34","","E","2","bing0234","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("265","35","","A","2","bing0235","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("266","36","","E","2","bing0236","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("267","37","","E","2","bing0237","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("268","38","","D","2","bing0238","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("269","39","","A","2","bing0239","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("270","40","","C","2","bing0240","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("271","41","","E","2","bing0241","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("272","42","","D","2","bing0242","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("273","43","","B","2","bing0243","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("274","44","","C","2","bing0244","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("275","45","","B","2","bing0245","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("276","46","","E","2","bing0246","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("277","47","","C","2","bing0247","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("278","48","","B","2","bing0248","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("279","49","","B","2","bing0249","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("280","50","","E","2","bing0250","3")');


tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("281","1","","A","1","eko0101","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("282","2","","D","1","eko0102","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("283","3","","D","1","eko0103","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("284","4","","B","1","eko0104","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("285","5","","E","1","eko0105","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("286","6","","D","1","eko0106","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("287","7","","A","1","eko0107","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("288","8","","C","1","eko0108","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("289","9","","E","1","eko0109","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("290","10","","C","1","eko0110","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("291","11","","E","1","eko0111","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("292","12","","E","1","eko0112","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("293","13","","B","1","eko0113","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("294","14","","C","1","eko0114","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("295","15","","A","1","eko0115","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("296","16","","E","1","eko0116","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("297","17","","D","1","eko0117","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("298","18","","C","1","eko0118","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("299","19","","C","1","eko0119","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("300","20","","D","1","eko0120","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("301","21","","B","1","eko0121","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("302","22","","C","1","eko0122","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("303","23","","D","1","eko0123","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("304","24","","E","1","eko0124","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("305","25","","A","1","eko0125","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("306","26","","B","1","eko0126","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("307","27","","C","1","eko0127","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("308","28","","D","1","eko0128","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("309","29","","E","1","eko0129","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("310","30","","A","1","eko0130","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("311","31","","B","1","eko0131","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("312","32","","C","1","eko0132","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("313","33","","E","1","eko0133","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("314","34","","E","1","eko0134","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("315","35","","A","1","eko0135","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("316","36","","C","1","eko0136","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("317","37","","C","1","eko0137","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("318","38","","D","1","eko0138","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("319","39","","E","1","eko0139","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("320","40","","A","1","eko0140","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("321","1","","E","2","eko0201","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("322","2","","B","2","eko0202","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("323","3","","C","2","eko0203","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("324","4","","D","2","eko0204","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("325","5","","E","2","eko0205","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("326","6","","A","2","eko0206","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("327","7","","B","2","eko0207","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("328","8","","C","2","eko0208","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("329","9","","D","2","eko0209","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("330","10","","E","2","eko0210","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("331","11","","B","2","eko0211","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("332","12","","B","2","eko0212","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("333","13","","B","2","eko0213","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("334","14","","B","2","eko0214","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("335","15","","E","2","eko0215","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("336","16","","B","2","eko0216","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("337","17","","C","2","eko0217","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("338","18","","D","2","eko0218","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("339","19","","E","2","eko0219","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("340","20","","A","2","eko0220","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("341","21","","D","2","eko0221","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("342","22","","A","2","eko0222","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("343","23","","A","2","eko0223","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("344","24","","D","2","eko0224","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("345","25","","D","2","eko0225","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("346","26","","D","2","eko0226","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("347","27","","E","2","eko0227","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("348","28","","A","2","eko0228","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("349","29","","B","2","eko0229","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("350","30","","C","2","eko0230","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("351","31","","A","2","eko0231","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("352","32","","D","2","eko0232","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("353","33","","C","2","eko0233","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("354","34","","D","2","eko0234","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("355","35","","B","2","eko0235","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("356","36","","A","2","eko0236","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("357","37","","C","2","eko0237","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("358","38","","E","2","eko0238","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("359","39","","C","2","eko0239","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("360","40","","E","2","eko0240","4")');


tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("361","1","","A","1","geo0101","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("362","2","","E","1","geo0102","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("363","3","","A","1","geo0103","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("364","4","","D","1","geo0104","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("365","5","","A","1","geo0105","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("366","6","","C","1","geo0106","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("367","7","","A","1","geo0107","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("368","8","","B","1","geo0108","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("369","9","","B","1","geo0109","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("370","10","","B","1","geo0110","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("371","11","","A","1","geo0111","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("372","12","","D","1","geo0112","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("373","13","","D","1","geo0113","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("374","14","","B","1","geo0114","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("375","15","","E","1","geo0115","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("376","16","","B","1","geo0116","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("377","17","","E","1","geo0117","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("378","18","","A","1","geo0118","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("379","19","","A","1","geo0119","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("380","20","","D","1","geo0120","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("381","21","","D","1","geo0121","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("382","22","","B","1","geo0122","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("383","23","","B","1","geo0123","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("384","24","","A","1","geo0124","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("385","25","","C","1","geo0125","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("386","26","","A","1","geo0126","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("387","27","","E","1","geo0127","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("388","28","","E","1","geo0128","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("389","29","","E","1","geo0129","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("390","30","","C","1","geo0130","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("391","31","","B","1","geo0131","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("392","32","","D","1","geo0132","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("393","33","","A","1","geo0133","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("394","34","","C","1","geo0134","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("395","35","","A","1","geo0135","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("396","36","","E","1","geo0136","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("397","37","","D","1","geo0137","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("398","38","","C","1","geo0138","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("399","39","","E","1","geo0139","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("400","40","","B","1","geo0140","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("401","41","","B","1","geo0141","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("402","42","","D","1","geo0142","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("403","43","","C","1","geo0143","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("404","44","","D","1","geo0144","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("405","45","","B","1","geo0145","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("406","46","","E","1","geo0146","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("407","47","","D","1","geo0147","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("408","48","","E","1","geo0148","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("409","49","","C","1","geo0149","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("410","50","","B","1","geo0150","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("411","1","","D","2","geo0201","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("412","2","","C","2","geo0202","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("413","3","","C","2","geo0203","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("414","4","","C","2","geo0204","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("415","5","","A","2","geo0205","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("416","6","","B","2","geo0206","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("417","7","","A","2","geo0207","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("418","8","","A","2","geo0208","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("419","9","","B","2","geo0209","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("420","10","","B","2","geo0210","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("421","11","","C","2","geo0211","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("422","12","","A","2","geo0212","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("423","13","","C","2","geo0213","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("424","14","","E","2","geo0214","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("425","15","","D","2","geo0215","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("426","16","","C","2","geo0216","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("427","17","","D","2","geo0217","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("428","18","","C","2","geo0218","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("429","19","","B","2","geo0219","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("430","20","","B","2","geo0220","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("431","21","","A","2","geo0221","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("432","22","","E","2","geo0222","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("433","23","","A","2","geo0223","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("434","24","","E","2","geo0224","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("435","25","","C","2","geo0225","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("436","26","","E","2","geo0226","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("437","27","","C","2","geo0227","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("438","28","","D","2","geo0228","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("439","29","","A","2","geo0229","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("440","30","","E","2","geo0230","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("441","31","","A","2","geo0231","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("442","32","","C","2","geo0232","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("443","33","","E","2","geo0233","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("444","34","","B","2","geo0234","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("445","35","","A","2","geo0235","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("446","36","","B","2","geo0236","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("447","37","","A","2","geo0237","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("448","38","","A","2","geo0238","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("449","39","","C","2","geo0239","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("450","40","","E","2","geo0240","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("451","41","","E","2","geo0241","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("452","42","","D","2","geo0242","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("453","43","","C","2","geo0243","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("454","44","","E","2","geo0244","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("455","45","","D","2","geo0245","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("456","46","","B","2","geo0246","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("457","47","","B","2","geo0247","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("458","48","","A","2","geo0248","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("459","49","","A","2","geo0249","5")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("460","50","","A","2","geo0250","5")');


tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("461","1","","A","1","sosio0101","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("462","2","","C","1","sosio0102","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("463","3","","E","1","sosio0103","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("464","4","","E","1","sosio0104","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("465","5","","A","1","sosio0105","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("466","6","","B","1","sosio0106","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("467","7","","C","1","sosio0107","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("468","8","","B","1","sosio0108","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("469","9","","C","1","sosio0109","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("470","10","","D","1","sosio0110","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("471","11","","A","1","sosio0111","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("472","12","","D","1","sosio0112","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("473","13","","D","1","sosio0113","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("474","14","","B","1","sosio0114","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("475","15","","A","1","sosio0115","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("476","16","","A","1","sosio0116","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("477","17","","B","1","sosio0117","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("478","18","","D","1","sosio0118","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("479","19","","C","1","sosio0119","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("480","20","","A","1","sosio0120","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("481","21","","A","1","sosio0121","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("482","22","","B","1","sosio0122","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("483","23","","A","1","sosio0123","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("484","24","","B","1","sosio0124","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("485","25","","B","1","sosio0125","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("486","26","","C","1","sosio0126","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("487","27","","B","1","sosio0127","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("488","28","","D","1","sosio0128","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("489","29","","A","1","sosio0129","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("490","30","","A","1","sosio0130","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("491","31","","A","1","sosio0131","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("492","32","","C","1","sosio0132","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("493","33","","A","1","sosio0133","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("494","34","","B","1","sosio0134","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("495","35","","B","1","sosio0135","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("496","36","","D","1","sosio0136","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("497","37","","A","1","sosio0137","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("498","38","","D","1","sosio0138","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("499","39","","C","1","sosio0139","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("500","40","","A","1","sosio0140","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("501","41","","B","1","sosio0141","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("502","42","","D","1","sosio0142","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("503","43","","E","1","sosio0143","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("504","44","","E","1","sosio0144","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("505","45","","B","1","sosio0145","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("506","46","","A","1","sosio0146","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("507","47","","C","1","sosio0147","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("508","48","","C","1","sosio0148","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("509","49","","A","1","sosio0149","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("510","50","","E","1","sosio0150","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("511","1","","C","2","sosio0201","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("512","2","","E","2","sosio0202","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("513","3","","E","2","sosio0203","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("514","4","","D","2","sosio0204","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("515","5","","C","2","sosio0205","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("516","6","","C","2","sosio0206","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("517","7","","E","2","sosio0207","6")'); 
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("518","8","","C","2","sosio0208","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("519","9","","D","2","sosio0209","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("520","10","","C","2","sosio0210","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("521","11","","D","2","sosio0211","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("522","12","","E","2","sosio0212","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("523","13","","B","2","sosio0213","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("524","14","","E","2","sosio0214","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("525","15","","C","2","sosio0215","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("526","16","","D","2","sosio0216","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("527","17","","E","2","sosio0217","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("528","18","","C","2","sosio0218","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("529","19","","C","2","sosio0219","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("530","20","","C","2","sosio0220","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("531","21","","D","2","sosio0221","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("532","22","","B","2","sosio0222","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("533","23","","A","2","sosio0223","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("534","24","","D","2","sosio0224","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("535","25","","A","2","sosio0225","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("536","26","","C","2","sosio0226","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("537","27","","D","2","sosio0227","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("538","28","","D","2","sosio0228","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("539","29","","A","2","sosio0229","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("540","30","","C","2","sosio0230","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("541","31","","A","2","sosio0231","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("542","32","","D","2","sosio0232","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("543","33","","E","2","sosio0233","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("544","34","","C","2","sosio0234","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("545","35","","D","2","sosio0235","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("546","36","","E","2","sosio0236","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("547","37","","A","2","sosio0237","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("548","38","","B","2","sosio0238","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("549","39","","A","2","sosio0239","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("550","40","","E","2","sosio0240","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("551","41","","D","2","sosio0241","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("552","42","","E","2","sosio0242","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("553","43","","C","2","sosio0243","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("554","44","","E","2","sosio0244","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("555","45","","A","2","sosio0245","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("556","46","","D","2","sosio0246","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("557","47","","A","2","sosio0247","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("558","48","","E","2","sosio0248","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("559","49","","E","2","sosio0249","6")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("560","50","","E","2","sosio0250","6")');

      
  }

function successinsertData() {
   // alert("sukses insert");
}



function tampilmapel() {
   db.transaction(querytampilmapel, errorCB);    

}

function querytampilmapel(tx) {
  
tx.executeSql('SELECT * FROM DEMO where ID=?', [idmapel], querySuccesstampilmapel, errorCB);

}

function querySuccesstampilmapel(tx, results) {
      myApp.showIndicator();
    mapel = new Array();
    var len = results.rows.length;

      
        for (var i=0; i<len; i++){
       
            mapel[i] = {"id": results.rows.item(i).id,"nama":results.rows.item(i).nama,"soal":results.rows.item(i).soal,"waktu":results.rows.item(i).waktu,"gambar":results.rows.item(i).gambar};
        }
    
  
   mainView.router.load({url:'konfirmasi.html', context:{nama: mapel[0]['nama'],soal: mapel[0]['soal'],waktu: mapel[0]['waktu'],gambar: mapel[0]['gambar']}});
   
 
     idmapel=mapel[0]['id'];

     nama_mapel=mapel[0]['nama'];

     waktu=mapel[0]['waktu'];
    
     jumlah_soal=mapel[0]['soal'];
    gambar=mapel[0]['gambar'];
   
 
   
      myApp.hideIndicator();
  
}







 
function tampilsoal() {
   db.transaction(querytampilsoal, errorCB);    

}

function querytampilsoal(tx) {
 
tx.executeSql(' SELECT * FROM tbjawab where idmapel=? and tryout=?', [idmapel,tryout], querySuccesstampilsoal, errorCB);

}

function querySuccesstampilsoal(tx, results) {
      myApp.showIndicator();
    var jawaban='';
    var tjawab='';
    var ejawab='';
    
    soal='';
    document.getElementById("fjawaban").innerHTML = '';
    arrayjawaban = new Array();
    var len = results.rows.length;
    
        for (var i=0; i<len; i++){
             tjawab=results.rows.item(i).jawab;
            if (tjawab==null){
                ejawab='<span class="badge color-red">_</span>';
            }else{
                ejawab='<span class="badge color-blue">'+tjawab+'</span>';
            }
            
            arrayjawaban[i] = {"id": results.rows.item(i).id,"kunci":results.rows.item(i).kunci,"jawab":results.rows.item(i).jawab,"gambar":results.rows.item(i).gambar};
             soal=soal+ '<div class="swiper-slide"  style="overflow: auto;"><div class="swiper-zoom-container"><img src="image/'+results.rows.item(i).gambar+'.jpg" style="width:100%; height: auto;" ></div></div> ';
            jawaban=jawaban + '<li> '  +
                                                        '<a href="#" class="item-link close-panel" onclick="kenomor(\'' + (i+1) + '\')"> ' +
                                                        '<div class="item-content">'+
                                                        '<div class="item-inner">'+
                                                        '<div class="item-title">No. '+(i+1)+'</div>'+
                                                        '<div class="item-after" id="ejawab'+(i+1)+'">' +
                                                        ejawab +
                                                        '</div>'+
                                                        '</div>'+
                                                        '</div>'+
                                                        '</a>'+
                                                        '</li>';
        }
  
  kesoal();
    document.getElementById("fjawaban").innerHTML = jawaban;
      myApp.hideIndicator();
 
}



function mulai(){

//tampilsoal();
  
  db.transaction(function (tx) {
            tx.executeSql('update tbjawab set jawab=null where idmapel="'+idmapel+'" and tryout="'+tryout+'"', [], querySuccesshapussoal, errorCB);

 });



       
}

function querySuccesshapussoal(tx, results){
hapus();
}

function hapus(){
         db.transaction(function (tx) {
            tx.executeSql('Select * from tbjawab where idmapel="'+idmapel+'" and tryout="'+tryout+'"', [], querySuccesstampilsoal, errorCB);

 }); 
}

function maju(){
     var mySwiper = $$('.swiper-container')[0].swiper;
     
   
    mySwiper.slideNext();
   
}

function mundur(){
     var mySwiper = $$('.swiper-container')[0].swiper;
    
   
    mySwiper.slidePrev();
   
}

function kesoal() {
    audio = new Audio();
     if ((idmapel=='3') && (tryout='1'))  {
         audio = new Audio('audio/listening1.ogg');
        audio.play();
    } else  if ((idmapel=='3') && (tryout='2'))  {
         audio = new Audio('audio/listening2.ogg');
        audio.play();
    } 
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '   <div class="navbar-inner">' +
        '       <div class="left" ><a href="#" class="link open-panel" data-panel="left"><i class="f7-icons">bars</i> <div id="enomor">&nbsp; No. 1</div></a></div>' +
        '       <div class="center labeltext" id="clockdiv"><span class="days" hidden></span><span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span></div>' +
        '       <div class="right">' +
        '          <a href="#" class="button button-fill color-lightblue " onclick="tampil_popup()">Selesai' +
        '          </a>' +
        '        </div>' +
        '      </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="soal-pages" class="page">' +
       
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
      
        '<div class="swiper-custom " >' +
        '<div class="swiper-container swiper-init" data-speed="400" data-space-between="40" data-pagination=".swiper-pagination" data-paginationHide="true" data-zoom="true" data-zoomMax="3" data-zoomMin="1" data-zoomToggle="true" >' +
      
        '<div class="swiper-wrapper " >' +
        soal +
   
        '</div>' +
     
   
        '</div>' +
        '    </div>' +
        
      
        '</div>' +
        '       <div class="toolbar">' +
        '           <div class="toolbar-inner">' +
        '           <a href="#" class="button  "  onclick="mundur()"> <i class="f7-icons">left</i> </a>' +
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'A' + '\')" id="ba">A</a>' +
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'B' + '\')" id="bb">B</a>'+
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'C' + '\')" id="bc">C</a>'+
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'D' + '\')" id="bd">D</a>' +
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'E' + '\')" id="be">E</a>'+
        '           <a href="#" class="button  " onclick="maju()"><i class="f7-icons">right</i></a>'  +             
               '</div>'+
           ' </div>'+
        '  </div>' +
        '</div>' 

    );
    
   
	return;
}

function pilih_jawab(a){
    
       var mySwiper = $$('.swiper-container')[0].swiper;  
       var no_soal=mySwiper.activeIndex+1;
        var idsoal=arrayjawaban[no_soal-1]["id"];
       db.transaction(function (tx) {
           tx.executeSql('update tbjawab set jawab="'+a+'" where id="'+idsoal+'"', [], querySuccessjawabsoal, errorCB);
       })
    arrayjawaban[no_soal]["jawab"]=a;
    document.getElementById("ejawab"+no_soal).innerHTML = '<span class="badge color-blue">'+a+'</span>';

    $$('#ba').removeClass('active'); 
    $$('#bb').removeClass('active');
    $$('#bc').removeClass('active');
    $$('#bd').removeClass('active');
    $$('#be').removeClass('active');
    
    if (a=="A"){
       $$('#ba').addClass('active'); 
    }else if (a=="B"){
       $$('#bb').addClass('active'); 
    }else if (a=="C"){
       $$('#bc').addClass('active'); 
    }else if (a=="D"){
       $$('#bd').addClass('active'); 
    }else if (a=="E"){
       $$('#be').addClass('active'); 
    }
}

function querySuccessjawabsoal(){
  
}

function tampil_popup(){

   myApp.confirm('Tampilkan nilai?', 'Konfirmasi', function () {
       audio.pause();
        tampilnilai();
        myApp.popup('.popup-about');
       clearInterval(timeinterval);
       ubahlihat();
    });
}

function kenomor(nomor){

    var mySwiper = $$('.swiper-container')[0].swiper;  
    mySwiper.slideTo(nomor-2, 300, false);
    mySwiper.slideNext();
 
}

function tampilnilai(){

//tampilsoal();
  


  db.transaction(function (tx) {
            tx.executeSql('Select * from tbjawab where idmapel="'+idmapel+'" and tryout="'+tryout+'"', [], querySuccesstampilnilai, errorCB);

 });
       
}

function querySuccesstampilnilai(tx, results) {
      myApp.showIndicator();

    var len = results.rows.length;
    var benar=0;
    var salah=0;
    var kosong=0;
    var kunci='';
    var jawab='';
        for (var i=0; i<len; i++){
             jawab=results.rows.item(i).jawab;
             kunci=results.rows.item(i).kunci;
            
            if (kunci==jawab){
                benar=benar+1;
            }
            
            if (jawab==null){
                kosong=kosong+1;
            }
       
          if (jawab!=kunci && jawab!=null){
              salah=salah+1;
          }
        }
  
    //alert('benar:' + benar + ' salah:' + salah + ' kosong' + kosong + ' jumlah:' + jumlah_soal);
   

    
    var nilai=benar/jumlah_soal*100;
    document.getElementById("enilai").innerHTML = nilai;
     document.getElementById("ebenar").innerHTML = benar;
     document.getElementById("esalah").innerHTML = salah;
     document.getElementById("ekosong").innerHTML = kosong;
      myApp.hideIndicator();

}


cekaktif();
function cekaktif(){
       db.transaction(function (tx) {
 
tx.executeSql(' SELECT * FROM tbaktivasi', [], querySuccesstampilaktivasi, errorCB);

})
}

function querySuccesstampilaktivasi(tx, results) {
      myApp.showIndicator();
  
   
   
            var len = results.rows.length;
     
    
        for (var i=0; i<len; i++){
             aktivasi=results.rows.item(i).aktif;
             lihat=results.rows.item(i).lihat;
          
        }
  

      myApp.hideIndicator();

}

function ubahlihat(){
       db.transaction(function (tx) {
 
tx.executeSql('update tbaktivasi set lihat="true"', [], querySuccessubahlihat, errorCB);

})
}

function querySuccessubahlihat(tx, results) {
      myApp.showIndicator();
  
   
   
      lihat='true';
  

      myApp.hideIndicator();

}

function ubahaktivasi(){
       db.transaction(function (tx) {
 
tx.executeSql('update tbaktivasi set aktif="true"', [], querySuccessubahaktivasi, errorCB);

})
}

function querySuccessubahaktivasi(tx, results) {
      myApp.showIndicator();
  
     
   
      aktivasi='true';
 
 
      myApp.hideIndicator();

}