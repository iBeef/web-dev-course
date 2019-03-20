var todos = ["Buy new turtle"];

setTimeout(function () {


    var input = prompt("What would you like to do?");

    while (input !== "quit") {
        if (input === "list") {
            listTodos();
        } else if (input === "new") {
            addTodo();
        } else if (input === "delete") {
            deleteTodo();
        }
        input = prompt("What would you like to do?");
    }
    console.log("Ok you quit the app.")

    function listTodos() {
        console.log("**********");
        todos.forEach(function(todo, i) {
            console.log(i + ": " + todo);
        });
        console.log("**********");
    }
    function addTodo() {
        var newTodo = prompt("Enter a new Todo.");
        todos.push(newTodo);
    }

    function deleteTodo() {
        var index = prompt("Enter the index of the todo to delete.");
        todos.splice(index, 1);
        console.log("Deleted todo");
    }    

}, 500);