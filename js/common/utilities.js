
"use strict";

var utilities = (function($) {

    function SetContainerBackgroundImage(container, imagePath, mode) {
        mode = typeof(mode) != 'undefined' ? mode : 'contain';
        container.css({
            'background-image'       : 'url(' + imagePath + ')',
            'background-repeat'      : 'no-repeat',
            'background-position'    : 'center center',
            '-webkit-background-size': mode,
            'background-size'        : mode,
            'opacity'                : '1'
        });
    }

    function GetWidthOfVerticalScrollBar(){
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "scrollbar-measure";
        document.body.appendChild(scrollDiv);

        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    }



    return {
        GetWidthOfVerticalScrollBar:GetWidthOfVerticalScrollBar,
        IsExisty: function(valueToCheck) {
            var result = valueToCheck !== null && typeof valueToCheck  !== 'undefined'  && valueToCheck.length > 0;
            return result;
        },

        CheckMedia: function() {
            return Number($('.media-checker').css('z-index'));
        },

        ClearPixelMeasure: function(property) {

            return Number(property.replace('px', ''));
        },

        AddPixelMeasure: function(numberValue) {
            return numberValue.toString() + 'px';
        },

        ValidateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        ClearQueryStringFromUrl: function(url) {
            return url.split("?")[0];
        },

        EqualizeElementsHeightByRow: function(element, callback, args) {


            var rowArray = [];
            var maxHeight = 0;
            if(typeof(element)==='string'){
                var elementAsIsCalled = element;
                element = $(element); //try to find element by query
                if(element.length ===0){
                    console.log('(Routine: Equalize by height) element \''+(elementAsIsCalled)+'\' not found');
                    return;
                }
            }
            var count = element.length;



            $(element).css('height', 'auto'); //reset height of elements

            $(element).each(function(index) {
                if(index === 0){ //first element in block
                    rowArray.push($(this))
                }
                if($(this).offset().top === rowArray[0].offset().top){
                    rowArray.push($(this));

                }
                else {
                    maxHeight = FindMaxHeight(rowArray);
                    $(rowArray).each(function(index) {
                        $(this).height(maxHeight);
                    });
                    rowArray = [];
                    rowArray.push($(this));
                    maxHeight = 0;
                }
                if(index === count - 1){
                    if(maxHeight === 0){
                        maxHeight = FindMaxHeight(rowArray);
                    }
                    $(rowArray).each(function(index) {
                        $(this).height(maxHeight);
                    });
                }
            });

            function FindMaxHeight(arrayOfElements) {
                var maxHeight = 0;
                $(arrayOfElements).each(function(index) {
                    if($(this).height() > maxHeight){
                        maxHeight = $(this).height();
                    }
                });
                return maxHeight;
            }

            if(typeof(callback) === 'function'){
                if(!this.IsExisty(args)){
                    callback();
                }
                else {
                    calback(args);
                }
            }
        },
        MoveExistingImagesToContainerBackground: function() {

            $('.background-image-listener').each(function(index) {
                var targetImage = $(this).find('img.background-image-source');
                var imagePath = targetImage.attr('src');
                SetContainerBackgroundImage($(this), imagePath);
                targetImage.remove();
            });
        },

        MoveExistingImagesToContainerBackgroundCover: function() {
            $('.background-image-listener-cover').each(function(index) {

                var targetImage = $(this).find('img.background-image-source');
                var imagePath = targetImage.attr('src');
                SetContainerBackgroundImage($(this), imagePath, 'cover');
                targetImage.remove();
            });
        },
        NoSingleWordInLastRow      : function(selector) {
            selector.each(function(index) {
                $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/, '&nbsp;$1'));
            });
        },
        RandomBetween              : function(startNumInclusive, endNumInclusive) {
            return Math.floor(Math.random() * endNumInclusive) + startNumInclusive;
        },
        ParseUrl                   : function(url) {
            var parser = document.createElement('a');
            var searchObject = {};
            var queries;
            var split;
            var i;
            // Let the browser do the work
            parser.href = url;
            // Convert query string to object
            queries = parser.search.replace(/^\?/, '').split('&');
            for(i = 0; i < queries.length; i++) {
                split = queries[i].split('=');
                searchObject[split[0]] = split[1];
            }
            return {
                protocol    : parser.protocol,
                host        : parser.host,
                hostname    : parser.hostname,
                port        : parser.port,
                pathname    : parser.pathname,
                search      : parser.search,
                searchObject: searchObject,
                hash        : parser.hash
            };
        },
        ShuffleArray               : function(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while(0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

    }
}(jQuery));

