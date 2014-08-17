function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    var result = /^(?:rgb)?\s*\(?\s*([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s*,\s*([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\s*,\s*([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\)?$/i.exec(rgb);
    return result ?
        "#" + 
        toHex(parseInt(result[1], 10)) + 
        toHex(parseInt(result[2], 10)) + 
        toHex(parseInt(result[3], 10))
        : null;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        "rgb(" + 
        parseInt(result[1], 16) + 
        ", " + 
        parseInt(result[2], 16) + 
        ", " + 
        parseInt(result[3], 16) + 
        ")"
    : null;
}

function saveToClipboard(str) {
    var textArea = document.createElement("textarea");
    textArea.style.cssText = "position:absolute;left:-100%";
    document.body.appendChild(textArea);
    textArea.value = str;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}

function convert(info, tab) {
	var selection = info.selectionText;
	var rgb = hexToRgb(selection);
	if (rgb) {
        saveToClipboard(rgb);
	} else {
        var hex = rgbToHex(selection);
        if (hex) {
            saveToClipboard(hex);
        } else {
            alert(chrome.i18n.getMessage("error_on_convert", selection));
        }
    }
}

chrome.contextMenus.create({
	"title": chrome.i18n.getMessage("context_menu_title"),
	"contexts": ["selection"],
	"onclick": convert
});
