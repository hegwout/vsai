# VSAI

VS Extension + Ollama + Code Generation

## Install Ollama

Download and install the Ollama : https://ollama.com/download

## Start the API Server

ollama run codellama:7b

## Test API

```sh
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "codellama:7b",
  "prompt": "Hi"
}'
```

## VS Extension

* Ref: https://github.com/sfabio01/vscode-extension-template

### Install extension on VSCODE

```sh
npm i
```

Press F5 to install the extension and launch the vs with the extension

