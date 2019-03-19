var todos = ["Buy new turtle"];

setTimeout(function () {


    var input = prompt("What would you like to do?");

    while (input !== "quit") {
        if (input === "list") {
            console.log(todos);
        } else if (input === "new") {
            var newTodo = prompt("Enter a new Todo.");
            todos.push(newTodo);
        }
        input = prompt("What would you like to do?");
    }
    console.log("Ok you quit the app.")

}, 500);