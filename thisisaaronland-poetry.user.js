// ==UserScript==
// @name        Twitter ThisIsAaronLand Poetry
// @namespace   http://neilk.net/thisisaaronland-poetry.user.js
// @version     0.1
// @description @thisisaaronland writes multiline tweet poetry; read them that way
// @match       http://*.twitter.com/*
// @match       https://*.twitter.com/*
// @copyright   2012+, Neil Kandalgaonkar
// @license     GPLv3 or greater http://www.gnu.org/licenses/gpl.html
// ==/UserScript==
var twitter_thisisaaronland_poetry = function($) {

  var NODE_TEXT = 3; // DOM node type

  var scriptName = 'thisisaaronland-poetry';
  var accountName = '@thisisaaronland';
  var separator = ' / ';
  var brokenAlreadyKey = scriptName;

  /**
   * Given a text node in the DOM as 'this', and a string 'separator' in scope,
   * replace the text node in the DOM, with several text nodes
   * interspersed with BR tags where the separators were
   */
  function inPlaceTextSplit() {
    var parent = this.parentNode;
    var insertionPoint = this.nextSibling;
    var lines = $(this).text().split(separator);
    if (lines.length > 1) {
      for(var i = 0; i < lines.length; i++) {
        if (i > 0) {
          parent.insertBefore(document.createElement('br'), insertionPoint);
        }
        parent.insertBefore(document.createTextNode(lines[i]), insertionPoint);
      }
      parent.removeChild(this);
    }
  }

  /**
   * Given a jQuery node representing a tweet (or the user's bio, which has a similar format)
   * break the lines of the tweet content, if we haven't done so already
   * @param jQuery
   */
  function breakLines($tweet) {
    $tweet.find('.js-tweet-text, .bio')
        .filter(function(){ return $(this).data(brokenAlreadyKey) !== true; })
        .data(brokenAlreadyKey, true)
        .contents()
        .filter(function(){ return this.nodeType === NODE_TEXT; })
        .map(inPlaceTextSplit);
  }

  /**
   * Given a jQuery node representing a tweet, return true if it belongs to the
   * account we are interested in
   * @param jQuery
   * @return boolean
   */
  function isRightAccount($tweet) {
    return $tweet.find('.username').text().indexOf(accountName) !== -1;
  }

  /**
   * main function to run the script
   */
  return function(){
    // console.log(scriptName);
    $('.tweet, .profile-card, .profile-modal').each( function() {
      var $tweet = $(this);
      if (isRightAccount($tweet)) {
        breakLines($tweet);
      }
    } );
    setTimeout(twitter_thisisaaronland_poetry, 100);
  };

}(jQuery);

jQuery(window).load(function(){
   twitter_thisisaaronland_poetry();
});

