

// Code goes here


// Made a change

var toDoList = {
      todos: [], 
    
      addTodos : function(todoText){
          this.todos.push({
            todoText: todoText, 
            completed: false
          }); 
      }, 
      changeTodos : function(position, todoText){
          // this.todos[position] = todoText; 
          this.todos[position].todoText = todoText; 
      }, 
      deleteTodos: function(position){
          this.todos.splice(position, 1); 
      }, 
      toggleCompleted: function(position){
          var todo = this.todos[position]; 
          todo.completed = !todo.completed; 
      },
      toggleAll: function(){
        
        var totalTodos = this.todos.length; 
        var completedTodos = 0;
        this.todos.forEach(function(todo){
              if(todo.completed === true){
                completedTodos++;
              }
        }); 
        
        this.todos.forEach(function(todo){
            if(completedTodos === totalTodos){
              todo.completed = false; 
            }else{
              todo.completed = true; 
            }
        });
      }

      /*trying to display completed todos only*/ 
      // completedTodos: function(){
      //       var totalTodos = this.todos.length; 
      //       var completedTodos = 0;
      //       var completedTodosItems = document.querySelector('.todoListItem');
      //   this.todos.forEach(function(todo){
      //         if(todo.completed === true){
      //           completedTodos++;
      //           completedTodosItems.classList.add('completed-todos');
      //         }
      //   });
      // }   
}

var displayToDosButton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('toggleAllButton');

var handlers = {
   
    addTodos: function(){
                  var addToDoTextinput = document.getElementById('addToDoTextInput');
                      if(event.which === 13){
                            if(addToDoTextinput.value === '' ){
                                return false; 
                                // alert('To do item Cannot be empty!');
                            }else{ 
                            toDoList.addTodos(addToDoTextInput.value);
                            addToDoTextinput.value = '';     
                      }
                    }
                    view.displayTodos(); 
    }, 
    changeTodo: function(){
        
                    var changeToDoPositionInput   = document.getElementById('changetoDoPositionInput'); 
                    var changeToDoTextInput       = document.getElementById('changetoDoTextInput'); 
                           if(changeToDoPositionInput.value ==='' && changetoDoTextInput.value ==='' ){
                                  return false;      
                           }else{
                                  toDoList.changeTodos(changeToDoPositionInput.valueAsNumber, changetoDoTextInput.value);
                                  changeToDoPositionInput.value = '';
                                  changetoDoTextInput.value     = '';
                           }
                      view.displayTodos();
                
    }, 
    deleteToDo: function(position){
                    /*New Delete functionality with the button delete*/
                    toDoList.deleteTodos(position);
                    view.displayTodos();
                    footer.itemsLeft();
    }, 
    // toggleCompleted: function(){
                    

    //                 var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    //                 if(toggleCompletedPositionInput.value === ''){
    //                     return false; 
    //                 }else{
    //                     toDoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    //                     toggleCompletedPositionInput.value ='';    
    //                 }
    //                 view.displayTodos();
    // }, 
     toggleAll: function(){
                    toDoList.toggleAll();
                    view.displayTodos();
    } 
}; 

var view = {
        displayTodos: function(){
                var todosUl = document.querySelector('ul');
                todosUl.innerHTML= '';
          
                toDoList.todos.forEach(function(todo, position){
                        var todoLi = document.createElement('li');
                            todoLi.className = 'todoListItem';
                        var todoView = document.createElement('div'); 
                            todoView.className = 'view';
                        var todoLiLabel = document.createElement('label');
                            todoLiLabel.contentEditable = 'true'; 
                            
                        var todoTextWithCompletion = '';
                        var checkbox = document.getElementsByClassName('toggleCompleted');

                        if(todo.completed === true){
                            var checkboxes = document.querySelectorAll('input[type=checkbox]'); 
                            todoLi.classList.add('done');
                            todoTextWithCompletion =  todo.todoText;
                            footer.itemsLeft(); 
                        }else{
                            todoTextWithCompletion =  todo.todoText;
                            footer.itemsLeft();
                        }

                        todoView.id = position;     
                        todoLiLabel.textContent = todoTextWithCompletion;
                        todosUl.appendChild(todoLi);
                        todoLi.appendChild(todoView);                      
                        var todoCheckBox = todoView.appendChild(this.createToggleCompletedCheckBox());
                            todoView.appendChild(todoLiLabel);
                            todoView.appendChild(this.createDeleteButton());
                                                                  
          },this);
        }, 
      createDeleteButton(){
                      var deleteButton = document.createElement('button');
                      deleteButton.textContent = 'X'; 
                      deleteButton.className = 'deleteButton'; 
                      return deleteButton; 
      },
      createToggleCompletedCheckBox(){
                  var checkbox = document.createElement('input');
                      checkbox.type = 'checkbox';
                      checkbox.name = 'name';
                      checkbox.value = 'value';
                      checkbox.id = 'checkbox';
                      checkbox.checked = ''; 
                      // checkbox.onclick = this.toggleCompleted();
                      checkbox.className = 'toggleCompleted'; 
                      return checkbox;
      },
      setupEventListeners: function(){
                      var todosUl = document.querySelector('ul');
                      var todoLi = document.querySelectorAll('.todoListItem');  

                      todosUl.addEventListener('click', function(event){
                      //demo console.log  
                      //console.log(event.target.parentNode.id);
                      //get the element that was clicked on; 
                      var elementClicked = event.target; 
                      //check if element clicked it's a delete Button
                      if(elementClicked.className === 'deleteButton'){
                            handlers.deleteToDo(parseInt(elementClicked.parentNode.id));
                      }
                      if(elementClicked.className === 'toggleCompleted'){
                            var checkboxes = document.querySelectorAll('input[type=checkbox]'); 
                            var listItems  = document.querySelectorAll('.todoListItem'); 

                            for(let i=0; i<listItems.length; i++){
                              checkboxes[i].addEventListener('change', function(){
                                if(this.checked){
                                  listItems[i].classList.add('done'); 
                                }else{
                                  listItems[i].classList.remove('done');  
                                }
                              }); 
                            }

                            // listItem = handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
                            // this.classList.toggle('done'); 
                       }
                      }, this);        
      }
}; 

var footer ={

      itemsLeft: function(){
                  var footer = document.querySelector('footer');
                  var todoCount = toDoList.todos.length; 
                  var todoNumber = document.querySelector('strong'); 
                  var todoItemsCompleted = 0; 
                  var todoItemsActive =0;
                  if(todoCount > 0){  
                      footer.classList.add('show-footer');
                      //get number of items
                         for(var i= 0; i < todoCount; i++){
                            var todoItemsLeft = todoCount;
                            todoNumber.textContent = todoCount;

                         } 
                  }else{
                      footer.classList.remove('show-footer'); 
                  }
      }


      //trying to display completed items only
      // itemsCompleted: function(){
      //                  var todoItemsCompletedButton = querySelector('.completedTodos');                         
      //                       todoItemsCompletedButton.addEventListener('click', function(){
      //                           toDolist.completedTodos();
      //                           view.displayTodos(); 
      //                       });   
      // }

}

      view.setupEventListeners();
     

