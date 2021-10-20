function handleFiles(file) {
    const url = "https://api.cloudinary.com/v1_1/adas/image/upload"
    let button =  document.getElementById('uploadButton')
    let loader =  document.getElementById('loader')
    let imgSrc =  document.getElementById('imgSrc')
    document.getElementById('img').src = 'https://i.gifer.com/BvMu.gif'
    loader.hidden = true;
    const formData = new FormData();
    formData.append("upload_preset", "devices");
    formData.append("file", file[0]);
    fetch(url, {
    method: "POST",
    body: formData
    })
    .then((response) => {
        return response.text()
    })
    .then((data) => {
        button.innerHTML = '<i class="fas fa-edit"></i> Изменить'
        loader.hidden = false;
        document.getElementById('img').src = JSON.parse(data).url
    });
}


function savePDF(orientation) {
    html2canvas(document.getElementsByClassName('page')[0], {
        useCORS: true,
        logging : true, 
        onrendered: function(canvas) {
            var img = new Image();
            img.onload = function() {
                img.onload = null;
                document.body.appendChild(img);
            };

            img.onerror = function() {
                img.onerror = null;
                if(window.console.log) {
                    window.console.log("Not loaded image from canvas.toDataURL");
                } else {
                    alert("Not loaded image from canvas.toDataURL");
                }
            };

            imageString = canvas.toDataURL('image/png');
        }
    }).then(canvas => {
        var doc = new jsPDF({
            orientation: orientation,
            format: 'a4',
        });
        doc.addImage(canvas.toDataURL(), 'PNG', 0, 0);
        doc.save('test.pdf');
    })
    

}