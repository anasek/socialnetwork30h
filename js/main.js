"use strict";
(function() {
    var group;
    var ix;

    $.ajax({
        url     : "js/data/data.json",
        method  : "get",
        dataType: "json",
        success : function(data) {
            group = data;
            showAllUsers();
            justDoIt();
        },
        error   : function(data) {
            console.log('error', data);
        }
    });

/////
    function showAllUsers() {
        for(var i = 0; i < group.length; i++) {
            var userId = group[i].id;
            var userName = group[i].firstName;
            var userSurname = group[i].surname;
            if(group[i].age === null){
                group[i].age = '/';
            }
            $('.users ul').append('<li id="' + userId + '"><a href="javascript:void(0)">' + userName + ' ' + userSurname + ', ' + group[i].age + '</a></li>');
        }
    }

    function displayFriends(array, containerUl) {
        for(var i = 0; i < array.length; i++) {
            containerUl.append('<li>' + array[i] + '</li>');
        }
    }

    function createUserProfile(ix, chosenUser) {
        $('.user-info h2').html(chosenUser).addClass('addition');
        $('.user-info h3').html('Age: ' + group[ix].age + ', ' + group[ix].gender).addClass('addition');
        $('.friends h5').html(group[ix].firstName + ' has ' + group[ix].friends.length + ' friend(s):');
        $('.friends-of-friends h2').html(group[ix].firstName + "'s friends of friends");
        $('.suggested-friends h2').html("Suggested friends");
    }

////
    function justDoIt() {

        $(".users li").click(function() {
            var LiId = ($(this).attr('id'));
            (function getChosenUserIndex() {
                for(var i = 0; i < group.length; i++) {
                    if(LiId.includes(group[i].id)){
                        ix = i;
                    }
                }
            }());
            var chosenUser = group[ix].firstName + ' ' + group[ix].surname;
            var userFriends = group[ix].friends;
            var userFriendsArr = [];
            var friendsFriendNames = [];
            var friendsOfNotFriends = [];
            var potentialSuggFriends = []; ///svi zajednički prijatelji izabranog korisnika i nepoznatih ljudi
            $('.friends ul').html('');
            $('.friends-of-friends ul').html('');
            $('.suggested-friends ul').html('');
            $('.row').css({'border-bottom': 'lightblue 2px solid', 'margin-bottom': '10px'});
            createUserProfile(ix, chosenUser);



//////////////////////////////////////////

            for(var i = 0; i < group.length; i++) {
                if(userFriends.includes(group[i].id)){
                    userFriendsArr.push(group[i].firstName + ' ' + group[i].surname);
                    var friendsOfFriends = group[i].friends;

                    for(var j = 0; j < group.length; j++) {
                        if(friendsOfFriends.includes(group[j].id) && !userFriends.includes(group[j].id)){
                            friendsFriendNames.push(group[j].firstName + ' ' + group[j].surname);
                        }
                    }
                }
            }

            for(var n = 0; n < group.length; n++) {
                if(!(userFriends.includes(group[n].id))){
                    friendsOfNotFriends = group[n].friends;
                    for(var p = 0; p < friendsOfNotFriends.length; p++) {
                        if((userFriends.includes(friendsOfNotFriends[p]))){
                            potentialSuggFriends.push(group[n].firstName+' '+group[n].surname);
                        }
                    }
                }
            }


            //ukloni odabranog korisnika iz liste prijatelji prijatelja
          function removeChosenUser(arr) {
            for(var k = 0; k < arr.length; k++) {
                if(arr.includes(chosenUser)){
                    var index = arr.indexOf(chosenUser);
                    arr.splice(index, 1)
                }}
            }
            removeChosenUser(friendsFriendNames);
            removeChosenUser(potentialSuggFriends);

            var friendsOfFriendsNoDuplicated = friendsFriendNames.reduce(function(a, b) {
                if(a.indexOf(b) < 0) a.push(b);
                return a;
            }, []);

            var suggestedFr = potentialSuggFriends.reduce(function(acc, el, i, arr) {
                if(arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
                return acc;
            }, []);


            displayFriends(userFriendsArr, $('.friends ul'));
            displayFriends(friendsOfFriendsNoDuplicated, $('.friends-of-friends ul'));
            if(suggestedFr.length > 0){
                displayFriends(suggestedFr, $('.suggested-friends ul'))
            }
            else {
                $('.suggested-friends ul').append('<li>Nobody to suggest.</li>');
            }

        });
    }

}());
