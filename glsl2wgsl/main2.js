

import init, { greet, do_parse } from "./glsl2wgsl.js";
// import CodeMirror from "../dist/codemirror-examples.js";
{/* <script src="../dist/codemirror-examples.js"></script> */ }

// const CodeMirror = require('../dist/codemirror-examples.js');

// var editor1 = CodeMirror.fromTextArea(document.getElementById("code"), {
//     lineNumbers: true,
//     // theme: "dracula",
//     // lineWrapping: true,
//     // indentUnit: 4,
//     // mode: "text/rust",
//     // mode: "text/x-csrc",

//     matchBrackets: true,
// });

// editor1.setSize(null, "1000");

// var editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
//     lineNumbers: true,
//     // theme: "dracula",
//     // lineWrapping: true,
//     // indentUnit: 4,
//     // mode: "rust",

//     matchBrackets: true,
// });

// editor2.setSize(null, "1000");

var css = $('textarea[mode="text/x-c"]');
var html = $('textarea[mode="rust"]');

var editor1 = css.editor();
editor1.setSize(null, "1000");


var editor2 = html.editor();
editor2.setSize(null, "1000");

init()
    .then(() => {
        greet("WebAssembly")



    });

// window.convertCode = function convertCode() {





//     // let t = document.getElementById("glslarea");
//     let t = editor1.getValue();
//     // // let tt = t.innerHTML.valueOf();
//     // let tt = t.value;
//     let savior = do_parse(t);
//     // let s = "ahhh \n no!";
//     // editor2.setValue(s);

//     editor2.setValue(savior);

//     // document.getElementById("code").innerHTML = savior;
// }

window.dum = function dum() {
    let t = editor1.getValue();
    let savior = do_parse(t);
    editor2.setValue(savior);
}