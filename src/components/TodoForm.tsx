import * as elements from "typed-html";

const TodoForm = () => {
	return (
		<form
			class="flex flex-row space-x-3"
			hx-post="/todos"
			hx-swap="beforebegin"
			_="on submit target.reset()"
		>
			<input type="text" name="content" class="border border-black" />
			<button type="submit">Add</button>
		</form>
	);
}

export default TodoForm;