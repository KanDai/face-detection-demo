if (!navigator.mediaDevices) {
    document.querySelector('#js-unsupported').classList.add('is-show')
}

if (window.FaceDetector == undefined) {
    console.log('Face Detection unsupported');
    document.querySelector('#js-unsupported').classList.add('is-show')
}

const video = document.querySelector('#js-video')
const pwan = document.getElementById('js-pwan')

const setStyle = (height, top, left) => {
    pwan.style.display = "block"
    pwan.style.top = top
    pwan.style.height = height
    pwan.style.left = left
}

const checkImage = () => {
    const faceDetector = new FaceDetector()
    faceDetector.detect(video)
        .then(faces => {
            if ( faces.length > 0 ) {
                for (let face of faces){
                    setStyle(
                        Math.floor(face.boundingBox.height) + 'px',
                        Math.floor(face.boundingBox.top) + 'px',
                        Math.floor(face.boundingBox.left) + 'px'
                    )
                }
            }
        }).catch((e) => {
            console.error("Face Detection failed, boo.");
        })
}

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: {
            facingMode: 'user'
        }
    })
    .then(function(stream) {
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
            video.play()
            setInterval(checkImage ,1000)
        }
    })
    .catch(function(err) {
        alert('Error!!')
    })
