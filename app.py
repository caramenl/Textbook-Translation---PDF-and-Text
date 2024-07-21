<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Translator and PDF Generator</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <h1>Text Translator and PDF Generator</h1>
    <form id="translateForm" method="POST" action="/translate">
        <label for="text">Text to Translate:</label>
        <textarea id="text" name="text" rows="4" cols="50"></textarea><br><br>
        <label for="language">Target Language:</label>
        <select id="language" name="language">
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
        </select><br><br>
        <button type="button" onclick="translateText()">Translate</button>
    </form>
    <p id="translatedText"></p>

    <form id="pdfForm" enctype="multipart/form-data">
        <label for="pdfFile">Upload PDF to Translate:</label>
        <input type="file" id="pdfFile" name="file" accept="application/pdf"><br><br>
        <button type="button" onclick="uploadPDF()">Upload and Translate PDF</button>
    </form>
    <a id="downloadLink" style="display: none;">Download Translated PDF</a>

    <script src="static/js/script.js"></script>
</body>
</html>