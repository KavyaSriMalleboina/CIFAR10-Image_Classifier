# CIFAR-10 Image Classifier

A full-stack image classification application that uses a **Convolutional Neural Network (CNN)** built with PyTorch to classify images into the 10 categories of the CIFAR-10 dataset.

The trained model is integrated with a **FastAPI backend** and a simple **HTML/CSS/JavaScript frontend**. Users can upload a `.jpg` image and receive the predicted class along with the model's top-5 probability scores.

## Live Demo

**https://cifar10-image-classifier-95e3.onrender.com**



## Demo

The application allows a user to:

1. Select a `.jpg` image.
2. Preview the uploaded image.
3. Send the image to the FastAPI backend.
4. Run the trained CNN model for inference.
5. Display the predicted class.
6. Display the top-5 prediction probabilities as a bar chart.

## Classes

The model classifies images into the following 10 CIFAR-10 categories:

* ✈️ Airplane
* 🚗 Automobile
* 🐦 Bird
* 🐱 Cat
* 🦌 Deer
* 🐶 Dog
* 🐸 Frog
* 🐴 Horse
* 🚢 Ship
* 🚚 Truck

## Tech Stack

### Machine Learning

* Python
* PyTorch
* Torchvision
* CNN
* CIFAR-10

### Backend

* FastAPI
* Uvicorn
* Pillow
* Python Multipart

### Frontend

* HTML
* CSS
* JavaScript
* Bootstrap
* Chart.js

## Project Structure

```text
CIFAR10_CNN/
│
├── Backend/
│   ├── main.py
│   └── model.py
│
├── Data/
│
├── Frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Models/
│   ├── cifar10_cnn.pth
│   └── class_names.json
│
├── Notebooks/
│   └── Image_Classification.ipynb
│
├── .gitignore
├── README.md
└── requirements.txt
```

## Model Architecture

The classifier is a custom CNN implemented using PyTorch.

The convolutional feature extractor contains four convolution blocks:

```text
Input Image
    ↓
Conv2D → BatchNorm → ReLU → MaxPool
    ↓
Conv2D → BatchNorm → ReLU → MaxPool
    ↓
Conv2D → BatchNorm → ReLU → MaxPool
    ↓
Conv2D → BatchNorm → ReLU → MaxPool
    ↓
Adaptive Average Pooling
    ↓
Flatten
    ↓
Dropout
    ↓
Linear
    ↓
ReLU
    ↓
Dropout
    ↓
Linear
    ↓
10 Classes
```

The final layer produces predictions for the 10 CIFAR-10 classes.

## How Prediction Works

The frontend sends the uploaded image to the FastAPI `/predict` endpoint.

```text
Image Upload
     ↓
Frontend JavaScript
     ↓
POST /predict
     ↓
FastAPI
     ↓
Image Preprocessing
     ↓
PyTorch CNN
     ↓
Softmax Probabilities
     ↓
Top-5 Predictions
     ↓
JSON Response
     ↓
Frontend
     ↓
Prediction + Probability Chart
```

The backend resizes the uploaded image to `32 × 32`, converts it to a tensor, and applies CIFAR-10 normalization before passing it to the model.

The API returns the predicted class and the top-5 probability values.

## API

### `POST /predict`

Accepts an image file and returns the model prediction.

### Example Response

```json
{
    "predicted_class": "dog",
    "result": {
        "dog": 82.41,
        "cat": 7.36,
        "horse": 4.82,
        "deer": 3.14,
        "frog": 2.27
    }
}
```

The exact probability values depend on the uploaded image.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/KavyaSriMalleboina/CIFAR10-Image_Classifier.git
cd CIFAR10_CNN
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI backend

From the `Backend` directory:

```bash
cd Backend
uvicorn main:app --reload
```

The API will run at:

```text
http://localhost:8000
```

### 5. Open the frontend

Open:

```text
Frontend/index.html
```

You can also use VS Code Live Server to serve the frontend locally.

## Model Files

The trained model is stored in:

```text
Models/cifar10_cnn.pth
```

The CIFAR-10 class names are stored in:

```text
Models/class_names.json
```

The backend loads these files during startup.

## Project Goals

This project was built to understand and demonstrate the complete workflow of deploying a machine learning model as a usable application:

* Training a CNN using PyTorch
* Saving a trained model
* Loading the model for inference
* Building an API with FastAPI
* Handling image uploads
* Connecting a frontend to a machine learning backend
* Returning prediction probabilities
* Visualizing model predictions
* Deploying the application for public access

## Future Improvements

* Improve model accuracy
* Add confidence visualization for all classes
* Add drag-and-drop image uploading
* Improve mobile responsiveness
* Add image validation and error handling
* Containerize the application using Docker
* Improve deployment configuration

## Author

**Kavya**

B.Tech Computer Science | Data Science

This project was built as a hands-on machine learning and deployment project, combining deep learning with backend API development and frontend integration.
