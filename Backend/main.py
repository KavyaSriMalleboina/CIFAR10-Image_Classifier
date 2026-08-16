from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import __main__
from model import CIFAR10

__main__.CIFAR10 = CIFAR10

import torch
from torchvision import transforms
from PIL import Image
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "Models" / "cifar10_cnn.pth"
CLASS_NAMES_PATH = BASE_DIR / "Models" / "class_names.json"

model = torch.load(
    MODEL_PATH,
    map_location=device,
    weights_only=False
)

model = model.to(device)
model.eval()

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize(
        (0.4914, 0.4822, 0.4465),
        (0.2470, 0.2435, 0.2616)
    )
])

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    image_bytes = await image.read()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image_tensor)

        probabilities = torch.softmax(outputs, dim=1)

        probabilities = probabilities[0]
        result = dict()

        top_probabilities, top_indices = torch.topk(probabilities, 5)

        for probability,index in zip(top_probabilities,top_indices):
            result[class_names[index.item()]] = round(probability.item() * 100, 2)

        predicted_class = class_names[top_indices[0].item()]

        return{  
            "predicted_class": predicted_class,
            "result": result
        }
