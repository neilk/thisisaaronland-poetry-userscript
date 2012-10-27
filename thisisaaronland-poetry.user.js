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
  function splitText() {
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
   * Given a jQuery node representing a tweet, find the subelements representing
   * the tweet contents, and break them into multiple lines according to separator
   * @param jQuery
   */
  function breakLines($tweet) {
    $tweet.find('.js-tweet-text')
        .filter(function(){ return $(this).data(brokenAlreadyKey) !== true; })
        .data(brokenAlreadyKey, true)
        .contents()
        .filter(function(){ return this.nodeType === NODE_TEXT; })
        .map(splitText);
  }

  /**
   * Given a jQuery node representing a tweet, return true if it belongs to the
   * account we are interested in (matches accountName in scope)
   * @param jQuery
   * @return boolean
   */
  function isAccount($tweet) {
    return $tweet.find('.username').text().indexOf(accountName) !== -1;
  }

  /**
   * main function to run the script
   */
  return function(){
    // console.log(scriptName);
    $('.tweet').each( function() {
      var $tweet = $(this);
      if (isAccount($tweet)) {
        breakLines($tweet);
      }
    } );
    setTimeout(twitter_thisisaaronland_poetry, 100);
  };

}(jQuery);

jQuery(window).load(function(){
   twitter_thisisaaronland_poetry();
});

