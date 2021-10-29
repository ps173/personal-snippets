const textarea = document.createElement("template");
textarea.innerHTML = `
  <style>
  .editor {
    display: grid;
    grid-template-columns: auto 95%;
    max-width : 550px;
  }
  .editor-body{
    line-height: 1.5rem;
    font-size : 1.2rem;
    border : 1px solid black;
    outline : none;
    whitespace : nowrap;
  }
  .line-numbers{
    margin-top : 5px
  }
  .line-numbers pre{
    font-size : 1.2rem;
    margin : 0px;
  }
  </style>
  <div class="editor">
   <div class="line-numbers"></div>
   <textarea class="editor-body" cols="60" rows="10" wrap="off"> what happens if i add text already </textarea>
  </div>
  <div class="linenumbersInfoDisplay"></div>
`;

class CustomTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(textarea.content.cloneNode(true));

    this.textareaElement = this.shadowRoot.querySelector("textarea");
    this.textfieldvalue = this.textareaElement.value;
    this.linenumbers = this.shadowRoot.querySelector(".line-numbers");
    this.linenumbersInfoDisplay = this.shadowRoot.querySelector(
      ".linenumbersInfoDisplay"
    );

    // Getting the current line
    // https://stackoverflow.com/questions/9185630/find-out-the-line-row-number-of-the-cursor-in-a-textarea
    this.currentLine = this.textareaElement.value
      .substr(0, this.textareaElement.selectionStart)
      .split("\n");
    this.currentLinenumber = this.currentLine.length;
    this.totalLineNumbers = this.textareaElement.value.split("\n").length;
    this.currentColumnInfo =
      this.currentLine[this.currentLine.length - 1].length;

    this.textareaElement.addEventListener(
      "keydown",
      function (e) {
        this.updateLineNumber(e);
      }.bind(this)
    );
    this.textareaElement.addEventListener(
      "keyup",
      function (e) {
        this.updateLineNumber(e);
      }.bind(this)
    );
  }

  connectedCallback() {
    this.totalLineNumbers = this.textareaElement.value.split("\n").length;
    const childPre = document.createElement("pre");
    childPre.innerText = this.totalLineNumbers;
    this.linenumbers.appendChild(childPre);
    this.linenumbersInfoDisplay.innerHTML = `Total Lines : ${this.totalLineNumbers}  Current Line : ${this.currentLinenumber}  Cols : ${this.currentColumnInfo} `;
  }

  updateLineNumber() {
    this.currentLine = this.textareaElement.value
      .substr(0, this.textareaElement.selectionStart)
      .split("\n");
    this.currentLinenumber = this.currentLine.length;
    this.currentColumnInfo =
      this.currentLine[this.currentLine.length - 1].length;

    //  Updating the total number of lines
    if (this.currentLinenumber > this.totalLineNumbers) {
      this.totalLineNumbers = this.textareaElement.value.split("\n").length;
      const childPre = document.createElement("pre");
      childPre.innerText = this.totalLineNumbers;
      this.linenumbers.appendChild(childPre);
    }

    //  Displaying at end
    this.linenumbersInfoDisplay.innerHTML = `Total Lines : ${this.totalLineNumbers}  Current Line : ${this.currentLinenumber}  Cols : ${this.currentColumnInfo} `;
  }
}

customElements.define("custom-textarea", CustomTextarea);
