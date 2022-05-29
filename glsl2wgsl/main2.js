import init, { greet, do_parse } from "./glsl2wgsl.js";

var editor1 = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    theme: "dracula",
    lineWrapping: true,
    matchBrackets: true,
});

editor1.setSize(null, "1000");

var editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
    lineNumbers: true,
    theme: "dracula",
    lineWrapping: true,
    // indentUnit: 4,
    // mode: "rust",

    matchBrackets: true,
});

editor2.setSize(null, "1000");

init()
    .then(() => {
        greet("WebAssembly")



    });

window.convertToWgsl = function convertToWgsl() {
    let t = editor1.getValue();
    let savior = do_parse(t);
    editor2.setValue(savior);
}