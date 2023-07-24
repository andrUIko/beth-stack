import Elysia, { t } from "elysia";

export const idModel = (app: Elysia) => {
	return app.model({
			id: t.Object({
				id: t.Numeric()
			})
		}
	)
}