const { openBrowser, goto, textBox, into, write, $, click, closeBrowser } = require('taiko');
(async () => {
    try {
	await openBrowser();
        await goto("http://localhost:3000/");
        await write("Yeni todo.....",into(textBox({placeholder:"Keep Note......." })));
        await click($(`//*[text()='Create']`));
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
