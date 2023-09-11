import * as elements from "typed-html";

const BaseHtml = ({ children }: elements.Children) => /*html*/ `
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>THE BETH STACK</title>
		<script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
		<script src="https://unpkg.com/htmx.org@1.9.3" integrity="sha384-lVb3Rd/Ca0AxaoZg5sACe8FJKF0tnUgR2Kd7ehUOG5GCcROv5uBIZsOqovBAcWua" crossorigin=""></script>
		<link href="/styles.css" rel="stylesheet">
	</head>

	${children}
`;

export default BaseHtml;
