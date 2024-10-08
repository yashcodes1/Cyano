const inPut = document.querySelector('input');
const Slang = document.querySelector('#slang');
const Norm = document.querySelector('#Norm'); 
const Short = document.querySelector('#Short');
const Emoj = document.querySelector('#Emoji');
const Long = document.querySelector('#Long');
const Sent = document.querySelector('#Sent'); 
const Threat = document.querySelector('#Threat');
const One = document.querySelector('#One');
const Spiri = document.querySelector('#Spiri');
const Home = document.querySelector('#Home');
const AnotherPrediction = document.querySelector('#Add'); 
const logoElement = document.getElementById('Logo'); 
const link = document.getElementById('theme-link'); 

var inPutActual = inPut.value;
let allPredictions = []; 
let topPredictions = []; 
let removedPredictions = []; 
let currentPredictionIndex = 1; 
let historyPredictions = []; 

document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const resultDiv = document.getElementById('result');
    Short.addEventListener('click', () => {
        const subject = encodeURIComponent("Check out this content!");
        const body = encodeURIComponent("Hi,\n\nI wanted to share this with you:\n\n[Insert your content here]\n\nBest regards,\n[Your Name]");
    
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
        
        window.location.href = mailtoLink;
    });
    
    async function loadModel() {
        const modelURL = 'model/model.json';
        const metadataURL = 'model/metadata.json';

        const model = await tmImage.load(modelURL, metadataURL);
        return model;
    }

    async function classifyImage(model, image) {
        const prediction = await model.predict(image, false);
        return prediction;
    }

    
    Slang.addEventListener('click', () => {
        imageUpload.click(); 
    });
    

    imageUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                
                logoElement.src = img.src;
                logoElement.style.width = '400px'; 
                logoElement.style.height = '400px';

                const model = await loadModel();
                const predictions = await classifyImage(model, img);

                
                const sortedPredictions = predictions.sort((a, b) => b.probability - a.probability);

               
                allPredictions = sortedPredictions;
                topPredictions = allPredictions.slice(0, 3); 

          
                displayPredictions();
                currentPredictionIndex = 1; 
            };
        }
    });

    
    function displayPredictions() {
        const mostLikely = topPredictions[0];

       
        let confidenceMessage = '';
        const probabilityPercent = (mostLikely.probability * 100).toFixed(2);
        if (mostLikely.probability >= 0.75) {
            confidenceMessage = "(Very Confident)";
        } else if (mostLikely.probability >= 0.60) {
            confidenceMessage = "(Mixed Confidence)";
        } else {
            confidenceMessage = "(Leading Prediction, but not confident)";
        }

      
        const resultsHTML = `
            <div>
                <strong>Most Likely Prediction:</strong> ${mostLikely.className}: ${probabilityPercent}% ${confidenceMessage}
            </div>
        `;

        resultDiv.innerHTML = resultsHTML;
    }

   
    AnotherPrediction.addEventListener('click', () => {
        
        if (currentPredictionIndex < topPredictions.length) {
            const nextPrediction = topPredictions[currentPredictionIndex];
            const nextProbabilityPercent = (nextPrediction.probability * 100).toFixed(2);

           
            resultDiv.innerHTML += `
                <div style="margin-top: 10px; color: lightgrey;">
                    <strong>Next Highest Prediction:</strong> ${nextPrediction.className}: ${nextProbabilityPercent}%
                </div>
            `;

            currentPredictionIndex++; 
        } else if (currentPredictionIndex < allPredictions.length) {
           
            const nextPrediction = allPredictions[currentPredictionIndex];
            const nextProbabilityPercent = (nextPrediction.probability * 100).toFixed(2);

           
            resultDiv.innerHTML += `
                <div style="margin-top: 10px; color: lightgrey;">
                    <strong>Next Highest Prediction:</strong> ${nextPrediction.className}: ${nextProbabilityPercent}%
                </div>
            `;

            currentPredictionIndex++; 
        } else {
           
            resultDiv.innerHTML += `
                <div style="margin-top: 10px; color: gray;">
                    No further predictions available.
                </div>
            `;
        }
    });

  
    Norm.addEventListener('click', () => {
  
        if (currentPredictionIndex > 1) {
            const predictions = resultDiv.innerHTML.split('<div');
            predictions.pop();
            resultDiv.innerHTML = predictions.join('<div');
            currentPredictionIndex--;
        } else {
            resultDiv.innerHTML += `
                <div style="margin-top: 10px; color: gray;">
                    No predictions left to remove.
                </div>
            `;
        }
    });


});

document.getElementById('image-upload').addEventListener('change', function(event) {
    const fileInput = event.target;
    const fileName = fileInput.files[0].name;
    const label = document.querySelector('.file-input-label');
    
    inPut.value = fileName;
});




Home.addEventListener('click', () => {
    let predictionText = "Full Predictions:\n";
    allPredictions.forEach(prediction => {
        const probabilityPercent = (prediction.probability * 100).toFixed(2);
        predictionText += `${prediction.className}: ${probabilityPercent}%\n`;
    });

    const blob = new Blob([predictionText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'predictions.txt'; 
    link.click();

    URL.revokeObjectURL(link.href);


});

Slang.addEventListener('click', () => {
    imageUpload.click(); 

});

Emoj.addEventListener('click', () => {
        allPredictions = [];
        topPredictions = [];
        removedPredictions = [];
        currentPredictionIndex = 1;
        inPut.value = ''; 
        logoElement.src = 'dino.webp'; 
        location.reload();

});







/////





let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    link.href = "hlight.css";
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    link.href = "home.css";
  localStorage.setItem('darkMode', null);
}
if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); 
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {  
    disableDarkMode(); 
  }
});

