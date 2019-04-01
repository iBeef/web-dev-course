// Check off specific todos by clicking.
$('ul').on('click', 'li', function() {
    $(this).toggleClass('completed');
});

$('ul').on('click', 'span', function(event) {
    console.log('clicked span');
    event.stopPropagation();
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });

})

$("input[type='text']").keypress(function(event) {
    if( event.which === 13) {
        todoText = $(this).val();
        $(this).val('');
        $('ul').append(`<li><span><i class="fa fa-trash-alt"></i></span>${todoText}</li>`)
    }
});

$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle();
})