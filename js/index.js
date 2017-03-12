'use strict';

var apiUrl = 'https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

var makeTwitterLink = function makeTwitterLink(text) {
  var params = new URLSearchParams();
  params.append('hashtags', 'quotes');
  params.append('related', 'freecodecamp');
  params.append('text', text);
  return 'https://twitter.com/intent/tweet?' + params;
};

var renderQuote = function renderQuote(quote) {
  return '\n    <div class="quote-content">\n      ' + quote.content + '\n    </div>\n    <div class="quote-author">\n      <p>' + quote.title + '</p>\n    </div>\n  ';
};

var render = function render(quote) {
  var html = renderQuote(quote);
  var $root = document.getElementById('root');
  $root.innerHTML = html;

  var quoteText = document.querySelector('.quote-content p').innerText;
  var $twitterLink = document.querySelector('.twitter-button a');
  $twitterLink.href = makeTwitterLink('“' + quoteText + '” —' + quote.title);
};

var updateQuote = function updateQuote() {
  var fetchOpts = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  };
  fetch(apiUrl, fetchOpts).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data[0];
  }).then(render);
};

var setupEventHandlers = function setupEventHandlers() {
  var $newQuoteButton = document.querySelector('.new-quote-button');

  $newQuoteButton.addEventListener('click', updateQuote);
};

var init = function init() {
  updateQuote();
  setupEventHandlers();
};

init();