<script lang="ts">
    import { onMount } from "svelte";
    import { todos } from './store.js';
    let text = "";
    let responseText = "";

    function fetchText() {
        // send message to the extension asking for the selected text
        tsvscode.postMessage({ type: "onFetchText", value: "" });
    }

    function apiQuery() {
        // send message to the extension asking for the selected text
        tsvscode.postMessage({ type: "onApiQueryText", value: "" });
    }


    onMount(() => {
        // Listen for messages from the extension
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "onSelectedText": {
                    // code here...
                    text = message.value;
                    break;
                }
                case "onApiQueryText": {
                    // code here...
                    responseText += text + "\n";
                    break;
                }
            }
        });
    });
</script>

<h1>Sidebar Panel</h1>
<label for="text"><b>Selected text</b></label>
<textarea
    rows="15"
    id="text"
    style="resize: vertical;"
    minlength="30"
    bind:value={text}
/>
<button on:click={fetchText}>fetch text</button>
<button on:click={apiQuery}>API Query</button>
<hr />
<textarea
    rows="15"
    id="responseText"
    style="resize: vertical;"
    minlength="30"
    bind:value={responseText}
/>


<h1>Todos:</h1>

{#each $todos as item}  
  <p>{item.title}</p>
{/each}