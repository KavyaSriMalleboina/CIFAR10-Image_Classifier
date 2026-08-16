function handleImageUpload() {
    const imageInput = document.getElementById('imageInput').files[0];

    if (imageInput) {
        const uploadedImage = document.getElementById('uploadedImage');

        uploadedImage.src = URL.createObjectURL(imageInput);
        uploadedImage.style.display = 'block';

        async function callModelAPI() {
            const formData = new FormData();
            formData.append('image', imageInput);

            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData
            });

            console.log("1. API response received:", response.status);

            const result = await response.json();

            console.log("2. JSON received:", result);

            document.getElementById("predictionResult").style.display = "block";

            console.log("3. Prediction:", result.predicted_class);


            const predicted_class = result.predicted_class;
            const probabilities = result.result;

            document.getElementById("predictedClass").textContent = `Prediction: ${predicted_class}`;
            console.log("4. Prediction text inserted");

            const classes = Object.keys(probabilities);
            const values = Object.values(probabilities);

            const canvas = document.createElement("canvas");

            document.getElementById("probabilityChart").innerHTML = "";
            document.getElementById("probabilityChart").appendChild(canvas);

            new Chart(canvas, {
                type: "bar",

                data: {
                    labels: Object.keys(probabilities),

                    datasets: [{
                        label: "Probability",
                        data: Object.values(probabilities),
                        backgroundColor: "rgba(0, 149, 255, 0.6)",
                        borderColor: "rgb(0, 149, 255)",
                        borderWidth: 1
                    }]
                },

                options: {
                    indexAxis: "y",

                    responsive: true,
                    maintainAspectRatio: false,

                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: "Probability (%)"
                            }
                        }
                    },

                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        callModelAPI();
    }
    else {
        alert("Please select an image file to upload.");
    }
}

document.getElementById('uploadButton').addEventListener('click', handleImageUpload);