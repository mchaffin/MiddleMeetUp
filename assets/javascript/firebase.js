///////// ** Firebase Configuration **//////////////
var config = {
    apiKey: "AIzaSyBIaYZCktWCryF8cMhxK-XUNzIJibtquU0",
    authDomain: "middlemeetup-a2868.firebaseapp.com",
    databaseURL: "https://middlemeetup-a2868.firebaseio.com",
    projectId: "middlemeetup-a2868",
    storageBucket: "middlemeetup-a2868.appspot.com",
    messagingSenderId: "482753535895"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  ///////// ** End Firebase Configuration **//////////////

  /**Snapshot to array function
   * function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};
   * 
   * 
   */

/**To Use snapshotToArray to pull all data:
 * firebase.database().ref('/posts').on('value', function(snapshot) {
    console.log(snapshotToArray(snapshot));
});
 */