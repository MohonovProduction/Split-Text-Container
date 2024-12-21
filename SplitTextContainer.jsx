// SplitTextContainer.jsx

#target illustrator

(function () {
    if (app.documents.length === 0) {
        alert("No documents are open. Please open a document and try again.");
        return;
    }

    var doc = app.activeDocument;

    // Create a dialog panel
    var dialog = new Window('dialog', 'Split Text Container | by Michael Mohonov');

    // Add a label for the input field
    dialog.add('statictext', undefined, 'Enter separator text:');

    // Add an input field for the separator
    var separatorInput = dialog.add('edittext', undefined, ',');  // Default is a comma
    separatorInput.characters = 20;  // Set the width of the input field

    // Add a button to the dialog
    var splitButton = dialog.add('button', undefined, 'Split Text');

    var splitByLineBreaksButton = dialog.add('button', undefined, 'Split Text by line breaks');

    // Function that splits the text when the button is clicked
    splitButton.onClick = function () {
        // Ensure user has selected a text container
        if (app.selection.length !== 1 || !(app.selection[0] instanceof TextFrame)) {
            alert("Please select a single text container.");
            return;
        }

        var textFrame = app.selection[0];

        // Get the separator entered by the user
        var separator = separatorInput.text;

        // If the separator is empty, alert the user
        if (!separator) {
            alert("Please enter a separator.");
            return;
        }

        var originalText = textFrame.contents;

        // Split the text by the separator entered by the user
        var textParts = originalText.split(separator);

        if (textParts.length <= 1) {
            alert("The text does not contain the separator character.");
            return;
        }

        // Store the original position of the text frame
        var originalPosition = textFrame.position;
        var originalLayer = textFrame.layer;

        // Remove the original text container
        textFrame.remove();

        // Create new text layers for each split part
        for (var i = 0; i < textParts.length; i++) {
            var newTextFrame = doc.textFrames.add();
            newTextFrame.contents = textParts[i].replace(/^\s+|\s+$/g, ""); // Remove leading and trailing whitespace
            newTextFrame.position = [originalPosition[0], originalPosition[1] - i * 20]; // Offset new frames vertically
            newTextFrame.layer = originalLayer;
        }

        alert("Text has been split into " + textParts.length + " parts.");
        dialog.close(); // Close the dialog after action
    };

    splitByLineBreaksButton.onClick = function () {
        // Ensure user has selected a text container
        if (app.selection.length !== 1 || !(app.selection[0] instanceof TextFrame)) {
            alert("Please select a single text container.");
            return;
        }

        var textFrame = app.selection[0];

        // Get the separator entered by the user
        var separator = '\r';

        var originalText = textFrame.contents;

        // Split the text by the separator entered by the user
        var textParts = originalText.split(separator);

        if (textParts.length <= 1) {
            alert("The text does not contain the separator character.");
            return;
        }

        // Store the original position of the text frame
        var originalPosition = textFrame.position;
        var originalLayer = textFrame.layer;

        // Remove the original text container
        textFrame.remove();

        // Create new text layers for each split part
        for (var i = 0; i < textParts.length; i++) {
            var newTextFrame = doc.textFrames.add();
            newTextFrame.contents = textParts[i].replace(/^\s+|\s+$/g, ""); // Remove leading and trailing whitespace
            newTextFrame.position = [originalPosition[0], originalPosition[1] - i * 20]; // Offset new frames vertically
            newTextFrame.layer = originalLayer;
        }

        alert("Text has been split into " + textParts.length + " parts.");
        dialog.close(); // Close the dialog after action
    }

    // Show the dialog window
    dialog.show();
})();