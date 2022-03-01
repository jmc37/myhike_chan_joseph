function read_display_quote(){
    // console.log("inside the function")

    // get into the right collection 
    db.collection("quotes").doc("tuesday")
    .onSnapshot(tuesdayDoc => {
        console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
    })
}
read_display_quote();

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;
                var level = doc.data().level;   // 
                var details = doc.data().details; 
                var pictures = doc.data().pictures;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-level').innerHTML = level;
                newcard.querySelector('.card-image').src = pictures;

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");

function insertName(){
// Check that user is logged in
firebase.auth().onAuthStateChanged( user =>{
    if (user){
        console.log(user.uid);  //let me know who is the user that logged in to get the uid
        currentUser = db.collection("users").doc(user.uid) // will go to the firestore and go to the document of user
        currentUser.get().then(userDoc=>{
            //get the user name
            var user_Name= userDoc.data().name;
            console.log(user_Name);
            $("#name-goes-here").text(user_Name);
        })
    }
})
}
insertName();