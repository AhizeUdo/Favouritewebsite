document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //test to make sure function works
    // console.log('its working');

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteUrl').value;

    //user has to input information into the form or else page will alert "fill form "
    if(!validateForm(siteName,siteURL)){
        return false;
    }
    
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

    //clear form 
    document.getElementById('myForm').reset();
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

        syncpagesresults.innerHTML +=  '<div class ="card visitpagearea">'+
                                       '<div class="card-header">'+'Feautured Page'+
                                       '<div class="card-body">'+
                                       '<h5 class="card-title">'+'<h1>'+name+'</h1>'+'</h5>'+'<hr>'+
                                       '<p>'+'<a class = "btn btn-primary" href="'+url+'">Visit</a>'+'</p>'+
                                       '<a onclick = "deletesyncPage(\''+url+'\')" class = "btn btn-danger">Delete</a>'+
                                       '</div>'+
                                       '</div>'+
                                       '</div>'+
                                       '<br>';
                                    //    '<div class ="well">'+
                                    //    '<h5>'+name+
                                    //    '<a class = "btn btn-default" href="'+url+'">Visit</a>'+
                                    //    '<a onclick = "deletesyncPage(\''+url+'\')" class = "btn btn-danger">Delete</a>'+
                                    //    '</h5>'+
                                    //    '</div>';
    }

    // console.log(sarraypacket)
}



//function to validate form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill the form...');
        return false;
    } 

    //using regex to check for unwanted values or entries in user input
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression); 


    //make ssure user enters valid url 
    if(!siteURL.match(regex)){
        alert('Please enter a valid URL ');
        return false;
    }

    return true;

}

function deletesyncPage(url){
    //get pages
    var sarraypacket = JSON.parse(localStorage.getItem('syncpages'));

    //loop throught the pages 
    for(var i = 0; i < sarraypacket.length; i++){
        //remove from packet array
        if(sarraypacket[i].url == url){
            sarraypacket.splice(i, 1);
        }
    }
    // re-set to localstorage
    localStorage.setItem('syncpages', JSON.stringify(sarraypacket));
    //re-fetch pages
    fetchsyncpages();
    //fetchsyncpages//

}
