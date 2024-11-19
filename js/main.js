document.addEventListener('DOMContentLoaded', () => {
    let todoApp = {
        dinSyssla: document.getElementById('dinSyssla'),
        addButton: document.querySelector('.add'),
        sysslorList: document.getElementById('sysslor'),
        completedList: document.getElementById('completedSysslor'),
        errorDiv: document.getElementById('errorDiv'),
        errorDiv2: document.getElementById('errorDiv2'),

        init: function() {
            this.addButton.addEventListener('click', this.addNewItem.bind(this));
            this.dinSyssla.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') { // Keypress enter
                    this.addNewItem();
                }
            });
            this.sysslorList.addEventListener('click', this.handleButtons.bind(this));
            this.completedList.addEventListener('click', this.handleButtons.bind(this));
            document.getElementById('resetButton').addEventListener('click', this.reset.bind(this));
        },

        // New list item
        addNewItem: function() {
            let newItem = this.dinSyssla.value.trim();
            if (newItem) {
                let newListItem = this.createListItem(newItem); // Create the list item
                if (newListItem) {
                    this.sysslorList.appendChild(newListItem); // Append to 'Att göra'
                    this.dinSyssla.value = ''; // Clear the input
                    this.hideError(this.errorDiv);
                }
            } else { 
                this.showError(this.errorDiv); // Show error if empty
            }
        },

        // Display task and buttons
        createListItem: function(newItem) {
            let trimmedItem = newItem.trim();
            if (trimmedItem) {
                let newListItem = document.createElement('li');

                let newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.value = trimmedItem;
                newInput.disabled = true; // Disable editing initially
                newListItem.appendChild(newInput);

                // Ändra button
                let changeButton = document.createElement('button');
                changeButton.textContent = 'Ändra';
                changeButton.classList.add('change');

                // Färdig button
                let completeButton = document.createElement('button');
                completeButton.textContent = 'Färdig';
                completeButton.classList.add('complete');

                // Radera button
                let removeButton = document.createElement('button');
                removeButton.textContent = 'Radera';
                removeButton.classList.add('remove');

                // Append buttons to the list item
                newListItem.appendChild(changeButton);
                newListItem.appendChild(completeButton);
                newListItem.appendChild(removeButton);

                return newListItem;
            } else {
                return null;
            }
        },

        // Move task to 'Färdiga' list
        moveTaskToCompleted: function(taskContainer) {
            let taskInput = taskContainer.querySelector('input');
            let newItem = taskInput.value.trim();

            if (newItem) {
                let completedTask = taskContainer.cloneNode(true); // Clone the task item
                let buttons = completedTask.querySelectorAll('button');

                buttons.forEach(button => {
                    if (button.classList.contains('complete')) {
                        button.remove(); // Remove the 'Färdig' button for completed tasks
                        this.hideError(this.errorDiv2);
                    }
                });

                this.completedList.appendChild(completedTask); // Move to 'Färdiga'
                taskContainer.remove(); // Remove from 'Att göra'
            } else {
                this.showError(this.errorDiv2); // Show error if task is empty
            }
        },

        // Execute actions of buttons
        handleButtons: function(e) {
            let taskContainer = e.target.parentElement;

            if (taskContainer.tagName === 'LI') {
                if (e.target.classList.contains('complete')) {
                    this.moveTaskToCompleted(taskContainer); // Complete task
                } else if (e.target.classList.contains('remove')) {
                    taskContainer.remove(); // Remove task
                } else if (e.target.classList.contains('change')) {
                    let taskInput = taskContainer.querySelector('input');
                    taskInput.disabled = !taskInput.disabled; // Enable/disable editing
                }
            }
        },

        // Reset button functionality
        reset: function() {
            this.dinSyssla.value = '';
            this.hideError(this.errorDiv);
            this.hideError(this.errorDiv2);
            this.sysslorList.innerHTML = ''; // Clear 'Att göra' list
            this.completedList.innerHTML = ''; // Clear 'Färdiga' list
        },

        // Show error messages
        showError: function(errorElement) {
            errorElement.style.display = 'block';
        },

        // Hide error messages
        hideError: function(errorElement) {
            errorElement.style.display = 'none';
        }
    };

    todoApp.init();
});
