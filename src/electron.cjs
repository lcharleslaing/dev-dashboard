const windowStateManager = require('electron-window-state');
const { app, BrowserWindow, ipcMain } = require('electron');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');
const path = require('path');

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;


const { Menu } = require('electron');

const nativeImage = require('electron').nativeImage;

function createWindow() {
	// create window state
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	// Load the icon image
	const iconPath = path.join(__dirname, 'static\icon.png');
	const appIcon = nativeImage.createFromPath(iconPath);

	// create browser window
	const mainWindow = new BrowserWindow({
		// window options
		title: 'Your App Title', // Set your desired title here
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
		icon: appIcon,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// set window state
	windowState.manage(mainWindow);

	// Set the title and prevent it from being changed by the loaded content
	mainWindow.webContents.on('page-title-updated', (event) => {
		event.preventDefault();
		mainWindow.setTitle('Developer Dashboard'); // Set your desired title here
	});

	// set window state
	windowState.manage(mainWindow);

	// create menu template
	const menuTemplate = [{
		label: 'File', submenu: [{ label: 'New' }, { label: 'Open' }, { label: 'Save' }, { label: 'Save As' }, { type: 'separator' }, { label: 'Quit', role: 'quit' }]
	},
	{
		label: 'Edit',
		submenu: [
			{ label: 'Undo', role: 'undo' },
			{ label: 'Redo', role: 'redo' },
			{ type: 'separator' },
			{ label: 'Cut', role: 'cut' },
			{ label: 'Copy', role: 'copy' },
			{ label: 'Paste', role: 'paste' },
			{ label: 'Select All', role: 'selectAll' }
		]
	},
	{
		label: 'Help',
		submenu: [
			{ label: 'About' }
		]
	}
	];

	// set application menu
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);

	// load URL
	mainWindow.loadURL('http://example.com');

	// return window
	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻',
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});
