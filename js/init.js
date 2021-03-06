(function($) {
    $(function() {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    }); // end of document ready
})(jQuery); // end of jQuery name space

var userPosts = new Firebase("https://jlipschitzfire.firebaseio.com/userPosts");
var userProfile = new Firebase("https://jlipschitzfire.firebaseio.com/userProfile");
var displayUserName = "";
var displayUserUrl = "";
var sessionStorageUrl = "";


function createCard() {
    //on firebase something like userPosts.on('next')
    var db = {
        "card": [{
            "user": "username",
            "image-url": "http://materializecss.com/images/sample-1.jpg",
            "card_title": "Card Title",
            "card_subtitle": "Card Subtitle"
        }, {
            "user": "username",
            "image-url": "http://materializecss.com/images/sample-1.jpg",
            "card_title": "Card Title",
            "card_subtitle": "Card Subtitle",
        }, {
            "user": "username",
            "image-url": "http://materializecss.com/images/sample-1.jpg",
            "card_title": "Card Title",
            "card_subtitle": "Card Subtitle",
        }]
    };

    $.each(db.card, function(key, data) {
        console.log(data);
        $('.insertCards').append('<div class="content col s10" >' + '<div class="card"><div class="card-image"><img src="' + data['image-url'] + '"></div>' 
        	+ '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + data.card_title + '</span>' 
        	+ '<p class="card-subtitle grey-text text-darken-2">' + data.card_subtitle + '</p>' + '<button>View More</button>' + '</div></div></div>');
    });

}


var filter = {
    clearPostDiv: function() {
        $("#postHolder").empty();
    },

    sortByClothes: function() {
        filter.clearPostDiv();

        userPosts.orderByChild("category").equalTo("Clothing").on("child_added", function(snapshot) {
            var thisCat = snapshot.val();
            $("#postHolder").append('<div class="content col s4" >' + '<div class="card"><div class="card-image"><img src="' + thisCat.picUrl 
            	+ '"></div>' + '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + thisCat.itemDescr 
            	+ '</span>' + '<p class="card-subtitle grey-text text-darken-2">' + thisCat.itemDescr + '</p>' 
            	+ '<button class ="btn waves-effect waves-light bidButton">Bid on this</button> <img id="userThankImgCard" src="' + thisCat.userPicture + '" >' 
            	+ '</div></div></div>')
        });

    },

    sortByElectronics: function() {
        filter.clearPostDiv();

        userPosts.orderByChild("category").equalTo("Toys/Electronics").on("child_added", function(snapshot) {
            var thisCat = snapshot.val();
            $("#postHolder").append('<div class="content col s4" >' + '<div class="card"><div class="card-image"><img src="' + thisCat.picUrl 
            	+ '"></div>' + '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + thisCat.itemDescr 
            	+ '</span>' + '<p class="card-subtitle grey-text text-darken-2">' + thisCat.itemDescr + '</p>' 
            	+ '<button class ="btn waves-effect waves-light bidButton">Bid on this</button> <img id="userThankImgCard" src="' + thisCat.userPicture + '" >' 
            	+ '</div></div></div>')
        });
    },

    sortByOther: function() {
        filter.clearPostDiv();

        userPosts.orderByChild("category").equalTo("Other").on("child_added", function(snapshot) {
            var thisCat = snapshot.val();
            $("#postHolder").append('<div class="content col s4" >' + '<div class="card"><div class="card-image"><img src="' + thisCat.picUrl 
            	+ '"></div>' + '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + thisCat.itemDescr 
            	+ '</span>' + '<p class="card-subtitle grey-text text-darken-2">' + thisCat.itemDescr + '</p>' 
            	+ '<button class ="btn waves-effect waves-light bidButton">Bid on this</button> <img id="userThankImgCard" src="' + thisCat.userPicture + '" >' 
            	+ '</div></div></div>')
        });
    },

    sortByFood: function() {
        filter.clearPostDiv();

        userPosts.orderByChild("category").equalTo("Food").on("child_added", function(snapshot) {
            var thisCat = snapshot.val();
            $("#postHolder").append('<div class="content col s4" >' + '<div class="card"><div class="card-image"><img src="' + thisCat.picUrl 
            	+ '"></div>' + '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + thisCat.itemDescr 
            	+ '</span>' + '<p class="card-subtitle grey-text text-darken-2">' + thisCat.itemDescr + '</p>' 
            	+ '<button class ="btn waves-effect waves-light bidButton">Bid on this</button> <img id="userThankImgCard" src="' + thisCat.userPicture + '" >' 
            	+ '</div></div></div>')
        });
    },
    sortByAll: function() {
       filter.clearPostDiv();

       userPosts.orderByChild("category").on("child_added", function(snapshot) {
           var thisCat = snapshot.val();
           $("#postHolder").append('<div class="content col s4" >' + '<div class="card"><div class="card-image"><img src="' + thisCat.picUrl 
               + '"></div>' + '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + thisCat.itemDescr 
               + '</span>' + '<p class="card-subtitle grey-text text-darken-2">' + thisCat.itemDescr + '</p>' 
               + '<button class ="btn waves-effect waves-light bidButton">Bid on this</button> <img id="userThankImgCard" src="' + thisCat.userPicture + '" >' 
               + '</div></div></div>')
       });
   },

    clearModalForm: function() {
        $("#email").val("")
        $("#describeItem")[0].value;
        $("#pictureUrl").val("");
        // picUrl clear
    },
};

function grabFormInput() {
    //get user form input
    var getFormInput = {
        userName: displayUserName,
        userPicture: displayUserUrl,
        category: $("#selectCategory option:selected").text(),
        email: $("#email").val(),
        itemDescr: $("#describeItem")[0].value,
        picUrl: $("#pictureUrl").val(),
    }
    console.log(getFormInput.username)
    console.log(getFormInput.userPicture)
    console.log(getFormInput.category)
    console.log(getFormInput.email)
    console.log(getFormInput.itemDescr)
    console.log(getFormInput.picUrl)


    //push into our firebase 
    userPosts.push(getFormInput)
    console.log("push worked inside grabFormInput")
        //open thank you modal
    sessionStorage.setItem("userItem", getFormInput.picUrl);
    $("#userThankImg").attr("src", sessionStorage.getItem("userItem"))
    //clear form input
    filter.clearModalForm();
    giveModal.hideModal();
};

userPosts.on("child_added", function(snapshot, prevChildKey) {
    //add cards to get page
    var cardPost = snapshot.val();
    console.log("Name: " + cardPost.userName);
    console.log("category: " + cardPost.category);
    console.log("Item Picture: " + cardPost.picUrl);
    console.log("Givers Email Address: " + cardPost.email);
    console.log("Item Description: " + cardPost.itemDescr);
    console.log("Users Picture: " + cardPost.userPicture);
    console.log("Post key: " + prevChildKey);

    $("#postHolder").append('<div class="content col s4" >' + '<div class="card"><div class="card-image"><img src="' + cardPost.picUrl + '"></div>' 
    	+ '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + cardPost.itemDescr + '</span>' 
    	+ '<p class="card-subtitle grey-text text-darken-2">' + cardPost.itemDescr + '</p>' 
    	+ '<button class="btn waves-effect waves-light bidButton">Bid on this</button> <img id="userThankImgCard" src="" >' + '</div></div></div>')
});

var thankYou = {
    showModal: function() {
        $('#thanksModal').openModal();
    },
    hideModal: function() {
        $('#thanksModal').closeModal();
    }
};
var giveModal = {
    showModal: function() {
        $('#giveModal').openModal();
    },
    hideModal: function() {
        $('#giveModal').closeModal();
    }
};
$(document).ready(function() {

    $('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');
    $('select').material_select();
    /*upload image js handler
    $('.dropify').dropify({
        messages: {
            'default': '',
            'replace': 'Drag and drop or click to replace',
            'remove': 'Remove',
            'error': 'Ooops, something wrong appended.'
        }
    });
    */
    //modal popup js handler
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
    });

    //modal event listeners
    $('#giveButton').on('click', function() {
        giveModal.showModal();
    });
    $('#giveButtonClose').on('click', function() {
        grabFormInput();
        thankYou.showModal();
        return false;
    });
});


function signinCallback(resp) {
    gapi.client.load('plus', 'v1', function() {
        gapi.client.plus.people.get({
            userId: 'me'
        }).execute(getProfileInfo);
    });
} 

//grab user info once logged in
function getProfileInfo(person) {
    // var url = "http://profiles.google.com/s2/photos/profile/" + userid + "?sz=" + size";
    console.log(person.displayName);
    console.log(person.image.url);
    //set local storage to be displayed on modals
    sessionStorage.setItem("googlePicture", person.image.url);
    $("#giveUserPic").attr("src", sessionStorage.getItem("googlePicture"));
    //set local variable to usernames to be stored in userPosts on firebase
    displayUserName = person.displayName;
    displayUserUrl = person.image.url;


}

//sort filters
$(document).ready(function() {

    $("#sortByClothes").on('click', function() {
        filter.sortByClothes();
    });
    $("#sortByElectronics").on('click', function() {
        filter.sortByElectronics();
    });
    $("#sortByOther").on('click', function() {
        filter.sortByOther();
    });
    $("#sortByFood").on('click', function() {
        filter.sortByFood();
    });
    $("#sortByAll").on('click', function() {
        filter.sortByAll();
    });
});


