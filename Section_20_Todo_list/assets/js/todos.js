// Check off specific todos by clicking.
$('li').click(function() {
    $(this).toggleClass('completed');
});

$('span').click(function(event) {
    console.log('clicked span');
    event.stopPropagation();
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });

})

$('ul').click(function() {
    console.log('clicked ul');
});

$('#container').click(function() {
    console.log('clicked span');
});

$('body').click(function() {
    console.log('clicked body');
});