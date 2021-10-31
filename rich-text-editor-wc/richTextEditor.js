const editor = document.createElement("template");
editor.innerHTML = `
  <style>
    .editor{
        padding: 2%;
        border: 1px solid black;
        min-width: 100px;
        min-height: 200px;
        width: 500px;
        height: auto;
        font-family: sans-serif;
        font-size: 1.2rem;
        color: black;
        resize: both;
        overflow: auto;
    }
  </style>
  <div>
    <div class="editor-controls">
      <button id="bold" action="bold"><b>Bold</b></button>
      <button id="italic" action="italic"><em>Italic</em></button>
      <button id="lists" action="insertunorderedlist">List</button>
    </div>
    <div contenteditable=true class="editor">
    </div>
  </div>
`;

class RichTextEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(editor.content.cloneNode(true));
    this.controlButtons = this.shadowRoot.querySelectorAll("button");
    this.editor = this.shadowRoot.querySelector(".editor");
  }
  format(command, value) {
    document.execCommand(command, false, value);
  }
  connectedCallback() {
    this.controlButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.getAttribute("action");
        this.format(action);
      });
    });
    this.editor.innerHTML = this.innerHTML;
  }
}

customElements.define("rich-text-editor", RichTextEditor);
