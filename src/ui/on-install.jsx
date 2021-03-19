import { Checkmark, Clipboard } from "./icons";
import { Body } from "./ui";

export function Html({ name }) {
  return (
    <Body name={name} style="opacity: 0">
      <h1>{name}</h1>
      <p>
        Enabled sites have their code font reset to <code>monospace</code>, so
        they'll respect your browser's font settings. (Your font looks like
        this.)
      </p>
      <h2>Customize Font</h2>
      <ol>
        <li>
          Navigate to <strong>Customize fonts</strong> under{" "}
          <strong>Appearance</strong> in Chrome settings, or{" "}
          <Copyable value="chrome://settings/fonts" />
        </li>
        <li>
          Change <strong>Fixed-width font</strong> to whatever you like
        </li>
      </ol>
      <h2>Disable sites</h2>
      <ol>
        <li>
          Navigate to <strong>{name}</strong> under <strong>Extensions</strong>,
          or <Copyable id="extensions-url" />
        </li>
        <li>
          Under <strong>Site Access</strong>, enable or disable hostnames.
        </li>
      </ol>
      <script src="on-install.js"></script>
    </Body>
  );
}

function Copyable({ ...rest }) {
  return (
    <div class="copyable">
      <input type="text" readonly {...rest} />
      <button>
        <Clipboard width="16" height="16" />
        <Checkmark width="16" height="16" hidden />
      </button>
    </div>
  );
}

function measureText(text) {
  const sentinel = document.createElement("span");
  sentinel.style.opacity = 0;
  sentinel.style.pointerEvents = "none";
  sentinel.style.position = "fixed";
  sentinel.textContent = text;
  document.body.appendChild(sentinel);
  const { offsetWidth } = sentinel;
  document.body.removeChild(sentinel);
  return offsetWidth;
}

export function run() {
  document.querySelector(
    "#extensions-url"
  ).value = `chrome://extensions/?id=${chrome.runtime.id}`;

  for (const {
    firstElementChild: input,
    lastElementChild: button,
  } of document.querySelectorAll(".copyable")) {
    const width = measureText(input.value);
    input.style.width = `${width}px`;

    button.addEventListener("click", () => {
      input.select();
      document.execCommand("copy");

      // swap icons
      const { firstElementChild, lastElementChild } = button;
      firstElementChild.setAttribute("hidden", "");
      lastElementChild.removeAttribute("hidden");
    });
  }

  document.body.style.opacity = 1;
}
