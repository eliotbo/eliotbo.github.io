/*
The MIT License (MIT)
Copyright (c) 2018 Dan Hollenbeck (https://github.com/dhollenbeck)
*/

// CodeMirror HTMLHint Integration
(function (mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror"], mod);
	else // Plain browser env
		mod(CodeMirror);
})

	(function (CodeMirror) {
		'use strict';

		function lintHtml(html) {
			var errors, found = [];
			if (!window.HTMLHint) return found;
			errors = HTMLHint.default.verify(html, ruleSets);
			errors.forEach(function(error) {
				var startLine = error.line - 1;
				var endLine = error.line - 1;
				var startCol = error.col - 1;
				var endCol = error.col;
				var from = CodeMirror.Pos(startLine, startCol);
				var to = CodeMirror.Pos(endLine, endCol);
				var err = {
					from: from,
					to: to,
					message: error.message,
					severity: error.type
				};
				var ignore = isSpecialChars(error) &&  isHandlebarsExpression(error);

				if (!ignore) found.push(err);
			});
			return found;
		}

		function lintHandlebars(html) {
			var errors, found = [];
			if (!window.Handlebars || !window.HandlebarsProve) return found;
			errors = window.HandlebarsProve.verifySync(html);
			errors.forEach(function(error) {
				var from = CodeMirror.Pos(error.start.line, error.start.column);
				var to = CodeMirror.Pos(error.end.line, error.end.column);

				found.push({
					from: from,
					to: to,
					message: error.message,
					severity: error.severity
				});
			});
			return found;
		}


		/*
		col: 20
evidence: "<h1 class="foobar">>{{echo 'hello world'}}</h1>"
line: 2
message: "Special characters must be escaped : [ > ]."
raw: ">{{echo 'hello world'}}"
rule: {id: "spec-char-escape", description: "Special characters must be escaped.", link: "https://github.com/yaniswang/HTMLHint/wiki/spec-char-escape"}
type: "error"
		*/

		function isSpecialChars(error) {
			return error.rule.id === 'spec-char-escape';
		}

		function isHandlebarsExpression(error) {
			var pos = error.col;
			var line = error.evidence;
			var left = line.substring(0, pos);
			var right = line.substring(pos);
			var isOpenExpression = isHandlebarsExpressionOpen(left);
			var isCloseExpression = isHandlebarsExpressionClose(right);
			return isOpenExpression || isCloseExpression;
		}

		function isHandlebarsExpressionOpen (str) {
			var posOpen = str.lastIndexOf('{{');
			var posClose = str.lastIndexOf('}}');
			if (posOpen === -1) return false;
			if (posOpen && posClose === -1) return true;
			if (posOpen > posClose) return true;
			return false;
		}
		function isHandlebarsExpressionClose (str) {
			var posOpen = str.indexOf('{{');
			var posClose = str.indexOf('}}');
			if (posClose === -1) return false;
			if (posClose && posOpen === -1) return true;
			if (posClose < posOpen) return true;
			return false;
		}

		function linterSync(html) {
			var found = [], messages1, messages2;

			if (!window.HTMLHint) console.warn('handlebars-lint.js: could not detect window.HTMLHint');
			if (!window.Handlebars) console.warn('handlebars-lint.js: could not detect window.Handlebars');
			if (!window.HandlebarsProve) console.warn('handlebars-lint.js: could not detect window.HandlebarsProve');

			// html linting
			messages1 = lintHtml(html);
			messages1.forEach(function(message) {
				message.message = 'HTML: ' + message.message;
				found.push(message);
			});

			// Handlebars linting
			if (found.length === 0) {
				messages2 = lintHandlebars(html);
				messages2.forEach(function(message) {
					message.message = 'HANDLEBARS: ' + message.message;
					found.push(message);
				});
			}
			return found;
		}

		function linterAsync(html, next) {
			var errors = linterSync(html);
			next(errors);
		}
		linterAsync.async = true;

		// register either sync or async linter
		// CodeMirror.registerHelper("lint", "html", linterSync);
		CodeMirror.registerHelper("lint", "html", linterAsync);
	});

// ruleSets for HTMLLint
var ruleSets = {
	"tagname-lowercase": true,
	"attr-lowercase": true,
	"attr-value-double-quotes": true,
	"doctype-first": false,
	"tag-pair": true,
	"spec-char-escape": true,
	"id-unique": true,
	"src-not-empty": true,
	"attr-no-duplication": true
};
