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
    type: "GET",
    dataType: "json",
    cache: false
});

/**
 *
 * event watchers
 */

$(document).on('click', '.offerBook', function(e){
    e.preventDefault();
    alert('This would take you to a form to sell this book')
    return null;
});

$(document).on('click', '.gotoVendor', function(e){
    e.preventDefault();
    alert('This would take you to ' + $(this).text() + ' to buy this book')
    return null;
});

$(document).on('click', '.seeOffers', function(e){
    //e.preventDefault();
    //alert('This would take you a list of offers to buy this book')
    //return null;
});
$(document).on('click', '.courseLink', function(e){
    e.preventDefault();
    alert('This would take you to the course site for ' + $(this).text())
    return null;
});

$(document).on('click', '.mailTolink', function(e){
    e.preventDefault();
    alert('This would take you to your email client to message ' + $(this).text())
    return null;
});

$(document).on('click', 'a.booksControl', function(e){
    e.preventDefault();
    $('.activeItem').removeClass('activeItem');
    $(this).closest('li.courseItem').addClass('activeItem')
    $('.active').removeClass('active');
    $(this).closest('li').addClass('active')
    $('.pane').hide();
    $(this).closest('.courseItem').find('.pane').hide();
    $(this).closest('.courseItem').find('.booksPane').slideToggle( 'slow');
});

$(document).on('click', 'a.infoControl', function(e){
    e.preventDefault();
    $('.activeItem').removeClass('activeItem');
    $(this).closest('li.courseItem').addClass('activeItem')
    $('.active').removeClass('active');
    $('.pane').hide();
    $(this).closest('li').addClass('active')
    $(this).closest('.courseItem').find('.pane').hide();
    $(this).closest('.courseItem').find('.infoPane').slideToggle( 'slow');
});
