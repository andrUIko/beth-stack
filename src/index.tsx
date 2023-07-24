import Elysia, { t } from "elysia";
import html from "@elysiajs/html";
import * as elements from "typed-html";
import { db } from "./db";
import { todos } from "./db/schema";
import { eq } from "drizzle-orm";
import BaseHtml from "./components/BaseHtml";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";
import { contentModel } from "./models/Content.model";
import { idModel } from "./models/Id.model";

const app = new Elysia()
	.use(html())
	.use(contentModel)
	.use(idModel)
	.get('/', ({ html }) => html(
		<BaseHtml>
			<body class="flex w-full h-screen justify-center items-center" 
				hx-get="/todos"
				hx-trigger="load"
				hx-swap="innerHTML"
			/>
		</BaseHtml>
	))
	.get("/styles.css", () => Bun.file(`./static/styles.css`))
	.get("/todos",
		async () => {
			const data = await db.select().from(todos).all()
			return <TodoList todos={data}/>
		}
	)
	.post("/todos", 
	async ({ body }) => {
			const newTodo = await db.insert(todos).values(body).returning().get();
			return <TodoItem {...newTodo} />;
		},
		{ body: 'content' }
	)
	.post("/todos/toggle/:id",
		async ({ params }) => {
			const oldTodo = await db
				.select()
				.from(todos)
				.where(eq(todos.id, params.id))
				.get();
			const newTodo = await db
				.update(todos)
				.set({ completed: !oldTodo.completed })
				.where(eq(todos.id, params.id))
				.returning()
				.get();
			return <TodoItem { ...newTodo } />;
		},
		{ params: 'id' }
	)
	.delete("/todos/:id",
		async ({ params }) => {
			await db.delete(todos).where(eq(todos.id, params.id)).run()
		},
		{ params: 'id' }
	)
	.listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

