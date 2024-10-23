import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {

	// Register the Sidebar Panel
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"myextension-sidebar",
			sidebarProvider
		)
	);

	// Register a custom command
	context.subscriptions.push(vscode.commands.registerCommand('myextension.askquestion', () => {
		vscode.window.showInformationMessage("Ask question!");
		// let response = await vscode.window.showInformationMessage("How are you doing?", "Good", "Bad");
		// if (response === "Bad") {
		// 	vscode.window.showInformationMessage("I'm sorry");
		// }
	}));

	context.subscriptions.push(vscode.commands.registerCommand('myextension.sayhello', () => {
		vscode.window.showInformationMessage("Hello World!");
	}));
	
	let bytes = 0;

	// button.addEventListener("click", () => aborter.abort());

	async function logChunks(url, aborter) {
		try {
			const response = await fetch(url, {
				// signal: aborter.signal	,	
				method: 'POST', 
				body: JSON.stringify({ model: 'codellama:7b', prompt: 'Hi' }),
				headers: {
					'content-type': 'application/json',
				}
			}); 
			for await (const chunk of response.body) {
				// if (signal.aborted) throw signal.reason;
				bytes += chunk.length;
				//chunk of response.body to json
				const json = await new Response(chunk).json();
				logConsumer(json)
				logConsumer( "response:" + json.response );
				// logConsumer(`Chunk: ${chunk}. Read ${bytes} characters.`);
			}
		} catch (e) {
			if (e instanceof TypeError) {
				console.log(e);
				logConsumer("TypeError: Browser may not support async iteration");
			} else {
				logConsumer(`Error in async iterator: ${e}.`);
			}
		}
	}
	
	function logConsumer(message:String) {
		console.log(message);
	}

	let disposable = vscode.commands.registerCommand('myextension.api', async () => {
		// Get our PAT session.
		 
		const apiURL = "http://localhost:11434/api/generate";

		try {
			const aborter = new AbortController();

			logChunks(apiURL, aborter);

			vscode.window.showInformationMessage(`Reponse from API: ${apiURL}`);
		} catch (e: any) {
			if (e.message === 'Unauthorized') {
				vscode.window.showErrorMessage('Failed to get profile. You need to use a PAT that has access to all organizations. Please sign out and try again.');
			}
			throw e;
		}
	});

	context.subscriptions.push(disposable);

}



// this method is called when your extension is deactivated
export function deactivate() { }


// const req = await fetch(apiURL, {
// 	method: 'POST',
// 	headers: {
// 		// authorization: `Basic ${Buffer.from(`:${session.accessToken}`).toString('base64')}`,
// 		// eslint-disable-next-line @typescript-eslint/naming-convention
// 		'content-type': 'application/json',
// 	},
// 	body: JSON.stringify({ model: 'codellama:7b', prompt: 'Hi' }),
// });
// if (!req.ok) {
// 	throw new Error(req.statusText);
// }
// console.info(req.body);
// const res = await req.json() as { model:String, created_at:String, response:String, done:Boolean};