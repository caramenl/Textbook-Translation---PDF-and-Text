function uploadPDF() {
    const fileInput = document.getElementById('pdfFile');
    const language = document.getElementById('language').value;
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('language', language);

    fetch('/translate_pdf', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = 'data:application/pdf;base64,' + data.translated_pdf;
            downloadLink.download = 'translated_pdf.pdf';
            downloadLink.style.display = 'block';
        })
        .catch(error => console.error('Error uploading PDF:', error));
}

function translateText() {
    const text = document.getElementById('text').value;
    const language = document.getElementById('language').value;
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${encodeURIComponent(text)}&language=${encodeURIComponent(language)}`,
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('translatedText').innerText = data;
            document.getElementById('pdfText').value = data;
        });
}

function generatePDF() {
    const text = document.getElementById('pdfText').value;
    if (text) {
        fetch('/generate_pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(text)}`,
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'translated_text.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error generating PDF:', error));
    } else {
        alert('Please translate text first.');
    }
}
