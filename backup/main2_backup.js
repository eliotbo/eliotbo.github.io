

import init, { greet, do_parse } from "./target/glsl2wgsl.js";

var editor1 = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    // theme: "dracula",
    // lineWrapping: true,
    // indentUnit: 4,
    // mode: "text/rust",

    matchBrackets: true,
});

editor1.setSize(null, "1000");

var editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
    lineNumbers: true,
    // theme: "dracula",
    // lineWrapping: true,
    // indentUnit: 4,
    mode: "rust",

    matchBrackets: true,
});

editor2.setSize(null, "1000");

init()
    .then(() => {
        greet("WebAssembly")



    });

window.dum = function dum() {





    // let t = document.getElementById("glslarea");
    let t = editor1.getValue();
    // // let tt = t.innerHTML.valueOf();
    // let tt = t.value;
    let savior = do_parse(t);

    editor2.setValue(savior);

    // document.getElementById("code").innerHTML = savior;
}