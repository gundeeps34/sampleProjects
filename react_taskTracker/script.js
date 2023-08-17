document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  const addTaskBtn = document.getElementById('addTaskBtn');

  addTaskBtn.addEventListener('click', () => {
    const taskName = document.getElementById('taskName').value;
    const dateTime = document.getElementById('dateTime').value;

    if (taskName.trim() === '' || dateTime.trim() === '') {
      alert('Please enter a task name and date/time.');
      return;
    }

    const taskId = Date.now();
    const formattedDateTime = formatDateTime(dateTime);
    const taskItem = createTaskItem(taskId, taskName, formattedDateTime);
    taskList.appendChild(taskItem);

    document.getElementById('taskName').value = '';
    document.getElementById('dateTime').value = '';
  });

  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.closest('.task-item');
      taskList.removeChild(taskItem);
    }
  });

  function createTaskItem(id, name, dateTime) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <div class="task-info">
        <span class="task-name">${name}</span>
        <span class="task-datetime">${dateTime}</span>
      </div>
      <button class="delete-btn">Delete</button>
    `;
    return taskItem;
  }

  function formatDateTime(dateTime) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    return new Date(year, month - 1, day, hour, minute).toLocaleString('en-US', options);
  }

  // Add the pre-defined tasks
  const tasks = [
    {
      id: 1,
      text: 'Complete Project Proposal',
      day: '2023-05-10T09:00',
      reminder: false
    },
    {
      id: 2,
      text: 'Buy Groceries',
      day: '2023-05-11T18:00',
      reminder: true
    },
    {
      id: 3,
      text: 'Attend Yoga Class',
      day: '2023-05-12T07:30',
      reminder: true
    }
  ];

  tasks.forEach((task) => {
    const taskItem = createTaskItem(task.id, task.text, task.day);
    taskList.appendChild(taskItem);
  });
});
