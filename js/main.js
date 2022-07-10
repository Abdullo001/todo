const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const todos = [];

elList.addEventListener('click', (evt) => {
	if (evt.target.matches('button')) {
		let deletedId = evt.target.dataset.todoId;

		let findedItem = todos.findIndex((el) => el.id == deletedId);

		todos.splice(findedItem, 1);
		render(todos, elList);
	}
	if (evt.target.matches('input')) {
		let checkedId = evt.target.dataset.todoId;

		let findedTodo = todos.find((el) => el.id == checkedId);
		findedTodo.isComplete = !findedTodo.isComplete;

		render(todos, elList);
	}
});

function render(list, node) {
	node.innerHTML = '';
	let ctodo = 0;
	list.forEach((el) => {
		let item = document.createElement('li');
		let chbox = document.createElement('input');
		chbox.type = 'checkbox';
		let text = document.createElement('span');
		text.textContent = el.name;
		let btn = document.createElement('button');
		btn.textContent = 'Delete';
		btn.dataset.todoId = el.id;
		chbox.dataset.todoId = el.id;

		item.appendChild(chbox);
		item.appendChild(text);
		item.appendChild(btn);
		node.appendChild(item);

		if (el.isComplete) {
			text.style.textDecoration = 'line-through';
			chbox.checked = true;

			ctodo += 1;
		}

		let comTodo = document.querySelector('.complete-todo');
		comTodo.textContent = ctodo;
	});

	let uncomp = document.querySelector('.unComplete-todo');
	uncomp.textContent = list.length - ctodo;
	const spanAll = document.querySelector('.all-todo');

	spanAll.textContent = list.length;
}

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	let elInputval = elInput.value;

	let obj = {
		id: todos.length ? todos[todos.length - 1].id + 1 : 0,
		name: elInputval,
		isComplete: false,
	};

	todos.push(obj);
	render(todos, elList);
	elInput.value = '';
});
