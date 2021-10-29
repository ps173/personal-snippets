const textarea = document.createElement("template");
textarea.innerHTML = `
  <div class="editor">
   <textarea class="editor-body" cols="60" rows="10" wrap="off"> # Heading !!</textarea>
   <pre><code id="highlighting-content" class="language-markup" aria-hidden="true"></code></pre>
</div>
`;

class CodeEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(textarea.content.cloneNode(true));

    this.textareaElement = this.shadowRoot.querySelector("textarea");
    this.textareaValue = this.textareaElement.value;
    this.highlightedContent = this.shadowRoot.querySelector(
      "#highlighting-content"
    );

    this.textareaElement.addEventListener(
      "keyup",
      function (e) {
        this.update(e);
      }.bind(this)
    );
  }

  update(e) {
    this.textareaValue = e.target.value;
    this.highlightedContent.innerHTML = this.textareaValue;
    Prism.highlightElement(this.highlightedContent);
  }

  connectedCallback() {
    this.highlightedContent.innerHTML = this.textareaValue;
    Prism.highlightElement(this.highlightedContent);
  }
}

customElements.define("code-editor", CodeEditor);
