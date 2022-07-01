document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //test to make sure function works
    // console.log('its working');

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteUrl').value;

    //stores the pages
    var syncpacket = {
        name: siteName,
        url: siteURL
    }

    //Test if syncpages is null 
    if(localStorage.getItem('syncpages')== null){
        var sarraypacket = [];
        sarraypacket.push(syncpacket);
        //send to syncpages local storage
        localStorage.setItem('syncpages', JSON.stringify(sarraypacket));//conversion to JSON, computer language
    }else{
        //get syncpages from the localstorage (where we sent the files to)
        // we need to convert back to language we will understand, objects cant be stored in json format.
        var sarraypacket = JSON.parse(localStorage.getItem('syncpages')); 
        //add syncpages back to array
        sarraypacket.push(syncpacket);
        //Re-set back to storage
        localStorage.setItem('syncpages', JSON.stringify(sarraypacket));

    }
    //local storage test
    // localStorage.setItem('test', 'Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test', 'Hello World');

    // test if syncpages works
    // console.log(syncpacket);
    fetchsyncpages();

    e.preventDefault();
    
}

function fetchsyncpages(){
    //get bookmarks from localstorage
    var sarraypacket = JSON.parse(localStorage.getItem('syncpages'));
    var syncpagesresults = document.getElementById('syncpagesresults');


    //build output for the pages
    syncpagesresults.innerHTML = '';
    for(var i = 0; i < sarraypacket.length; i++){
        var name = sarraypacket[i].name;
        var url = sarraypacket[i].url;

        syncpagesresults.innerHTML += '<div class ="well">'+
                                       '<h4>'+name+'<h4>'
                                       '</div>'
    }

    // console.log(sarraypacket)
}