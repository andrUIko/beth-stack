import Elysia, { t } from "elysia";

export const contentModel = (app: Elysia) => {
	return app.model({
			content: t.Object({
				content: t.String()
			})
		}
	)
}