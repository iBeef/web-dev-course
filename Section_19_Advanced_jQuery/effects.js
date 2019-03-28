// $('button').click('click', function() {
//     $('div').fadeToggle(500);
//     // $('div').fadeOut(1000, function() {
//     // $('div').fadeIn(1000, function() {
//         // Will be called when the fade out is completed.
//         // console.log("Fade Completed");
//         // $(this).remove();
//     // });
//     // Will be called as soon as the fade out is initiated.
//     // console.log("Fade Completed");
// });

$('button').click('click', function() {
    // $('div').slideDown();
    // $('div').slideUp();
    $('div').slideToggle(1000, function() {
        console.log('Slide is done!');
        $(this).remove();
    });
});