/*global $:false */
/*jshint strict:false */
/**
 * Show spinner whenever ajax activity starts
 */
$(document).ajaxStart(function(){
    $('#spinner').show();
});

/**
 * Hide spinner when ajax activity stops
 */
$(document).ajaxStop(function(){
    $('#spinner').hide();
});

/**
 * set up global ajax options
 */
$.ajaxSetup({
    type: 'GET',
    dataType: 'json',
    cache: false
});

/**
 *
 * event watchers
 */

$(document).on('click', 'a.collapse-nav', function(e){
    e.preventDefault();
    if ($('.in').length) {
       $('.navbar-toggle').click();
    }
});

$(document).on('click', '.courseLink', function(e){
    e.preventDefault();
    window.alert('This would take you to the course site for ' + $(this).text());
    return null;
});

$(document).on('click', '.mailTolink', function(e){
    e.preventDefault();
    window.alert('This would take you to your email client to message ' + $(this).text());
    return null;
});

$(document).on('click', 'a.booksControl', function(e){
    e.preventDefault();
    $('.pane').hide();
    $('.activeItem').removeClass('activeItem');
    $(this).closest('li.courseItem').addClass('activeItem');
    $('.active').removeClass('active');
    $(this).closest('li').addClass('active');
    $(this).closest('.courseItem').find('.pane').hide();
    $(this).closest('.courseItem').find('.booksPane').slideDown( 'slow');
});

$(document).on('click', 'a.infoControl', function(e){
    e.preventDefault();
    $('.activeItem').removeClass('activeItem');
    $(this).closest('li.courseItem').addClass('activeItem');
    $('.active').removeClass('active');
    $('.pane').hide();
    $(this).closest('li').addClass('active');
    $(this).closest('.courseItem').find('.pane').hide();
    $(this).closest('.courseItem').find('.infoPane').slideDown( 'slow');
});

$('#sellModal').on('show.bs.modal', function (e) {
  var $book = $(e.relatedTarget).closest('.book');
  $('#modalBookTitle').text($book.find('.bookTitle').text());
  $('#modalBookAuthor').text($book.find('.authorCopy').text());
  $('#modalPrice').val('0');
  var bookNote = $.trim($book.find('.bookNote').text());
  var bookPrice = $.trim($book.find('.bookPrice').text());
  $('#modalBookNotes').val(bookNote);
  if (bookPrice) {
   $('#modalPrice').val(bookPrice);
  }
  else {
     $('#modalBookPrice').val();
  }
  
});