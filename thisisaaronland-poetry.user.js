// ==UserScript==
// @name        Twitter ThisIsAaronLand Poetry
// @namespace   http://neilk.net/thisisaaronland-poetry.user.js
// @version     0.1
// @description @thisisaaronland writes multiline tweet poetry; read them that way
// @include     http://*.twitter.com/*
// @include     https://*.twitter.com/*
// @copyright   2012+, Neil Kandalgaonkar
// @license     GPLv3 or greater http://www.gnu.org/licenses/gpl.html
// ==/UserScript==
var twitter_thisisaaronland_poetry = function($) {
  function is_account($tweet, accountName) {
    return $tweet.find('.stream-item-header').text().indexOf('thisisaaronland') !== -1;
  }

  function break_lines($tweet, separator) {
    var $content = $tweet.find('.js-tweet-text').first();
    var lines = $content.text().split('/');
    $content.replaceWith( lines.join('<br/>') );
  }

  return function(){
    $('.tweet').each( function() {
      var $tweet = $(this);
      if (is_account($tweet)) {
        break_lines($tweet);
      }
    } );
    setTimeout(twitter_thisisaaronland_poetry, 10000);
  };

}(jQuery);

jQuery(window).load(function(){
   twitter_thisisaaronland_poetry();
});

