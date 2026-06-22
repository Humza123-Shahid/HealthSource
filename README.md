# Skin Disease Detection System

A deep learning project that detects skin conditions from images using a fine-tuned ResNet50V2 model, served via a FastAPI backend and accessed through an in-browser camera interface.

---

## Project Overview

The system can classify **12 skin conditions**:
`Acne`, `Blackheads`, `Dark-Spots`, `Dry-Skin`, `Enlarged-Pores`, `Eyebags`, `Normal Skin`, `Not-Skin`, `Oily-Skin`, `Skin-Redness`, `Whiteheads`, `Wrinkles`

After prediction, it also displays recommended cure products per detected condition.

---

## Project Files

| File | Purpose |
|------|---------|
| `ChosenAlgorithm.ipynb` | Train the ResNet50V2 model on the skin disease dataset |
| `makeapiusingcluade.ipynb` | Load the trained model and run a FastAPI server via ngrok |
| `predicitonbymodel.ipynb` | Simple file-upload UI to test predictions |
| `takepiccallapi.ipynb` | Camera-based UI that captures a photo and shows predictions + cure products |

---

## Required Resources

Download these before running on a new device and upload them to your Google Drive:

| Resource | Google Drive Link |
|----------|------------------|
| Dataset (Skin-Disease folder) | [Dataset Folder](https://drive.google.com/drive/folders/1jUE5QA9hzvwy4xqaRpSDDsLFmVePEzQf?usp=drive_link) |
| Trained Model (`.keras` file) | [Trained Model](https://drive.google.com/file/d/1bHUkXOuTTzGr0bhD5a7iv_1Eya-0cSgL/view?usp=drive_link) |
| Products for Cure (images) | [Products Folder](https://drive.google.com/drive/folders/1dTnNZt1HVGG_QrpSrOi_DHlQmem-iAJq?usp=drive_link) |

---

## Setup Instructions (Google Colab)

All notebooks are designed to run on **Google Colab**. Follow the steps below on any new device/account.

### Step 1 — Copy Resources to Your Google Drive

1. Open each Google Drive link above.
2. Right-click the folder/file → **"Add shortcut to Drive"** or **"Make a copy"** → save to `My Drive`.
3. Organize your Drive so the paths match:
   ```
   My Drive/
   ├── Dataset/
   │   └── Skin-Disease/         ← dataset folder contents go here
   │       ├── train/
   │       ├── valid/
   │       └── test/
   ├── skin_disease_resnet50v2.keras   ← trained model file
   └── Products-for-Cure-Updated/     ← cure products folder contents go here
   ```

### Step 2 — Open Notebooks in Google Colab

1. Go to [colab.research.google.com](https://colab.research.google.com)
2. Click **File → Upload notebook** and upload the `.ipynb` files, or open them directly from Drive if you've already moved them there.

### Step 3 — Enable GPU (Recommended)

In Colab: **Runtime → Change runtime type → Hardware accelerator → T4 GPU** → Save.

---

## Running Each Notebook

### Option A — Skip Training (Use Pre-trained Model)

If you already have the trained model (`skin_disease_resnet50v2.keras`), skip `ChosenAlgorithm.ipynb` entirely and go straight to **Step 4**.

---

### Option B — Train from Scratch

#### `ChosenAlgorithm.ipynb` — Model Training

1. Open the notebook in Colab.
2. Mount Google Drive when prompted:
   ```python
   from google.colab import drive
   drive.mount('/content/drive')
   ```
3. Run all cells in order. The notebook will:
   - Copy the dataset from Drive to Colab local storage
   - Re-split data (70% train / 15% valid / 15% test)
   - Train ResNet50V2 in 3 phases (head warm-up → fine-tune top 30 layers → fine-tune top 80 layers)
   - Evaluate using Test-Time Augmentation (TTA)
   - Save the model as `skin_disease_resnet50v2.keras` and back it up to Drive

> **Training time**: ~1–2 hours on a T4 GPU depending on dataset size.

---

### Step 4 — Start the API Server

#### `makeapiusingcluade.ipynb` — Run FastAPI Backend

1. Open in Colab with GPU runtime.
2. Mount Drive and run the first cell to copy the model:
   ```python
   from google.colab import drive
   drive.mount('/content/drive')
   import shutil
   shutil.copy("/content/drive/MyDrive/skin_disease_resnet50v2.keras", "/content/skin_disease_resnet50v2.keras")
   ```
3. Run the install cell:
   ```
   !pip install fastapi uvicorn python-multipart pyngrok nest-asyncio opencv-python-headless
   ```
4. **Set your ngrok token** — replace the placeholder in this cell:
   ```python
   NGROK_AUTH_TOKEN = "YOUR_NGROK_TOKEN_HERE"
   ```
   Get a free token at [dashboard.ngrok.com](https://dashboard.ngrok.com) → Auth → Your Authtoken.

5. Run the remaining cells. The last cell will print something like:
   ```
   Public API URL: https://xxxx-xx-xx-xxx-xx.ngrok-free.app
   Predict route : https://xxxx-xx-xx-xxx-xx.ngrok-free.app/predict?use_tta=false
   Docs          : https://xxxx-xx-xx-xxx-xx.ngrok-free.app/docs
   ```
6. **Copy the Public API URL** — you'll need it in the next step.

> **Keep this notebook running** while using the UI notebooks. The server stops when the cell is interrupted.

---

### Step 5 — Use the UI

#### `predicitonbymodel.ipynb` — File Upload UI

1. Open in Colab.
2. Find this line in the code and replace the URL with your ngrok URL from Step 4:
   ```javascript
   const response = await fetch("https://YOUR-NGROK-URL.ngrok-free.app/predict?use_tta=false", {
   ```
3. Run the cell. An upload widget will appear — select a skin image and click **Analyze Image**.

---

#### `takepiccallapi.ipynb` — Camera UI with Cure Products

1. Open in Colab.
2. Mount Drive and ensure `Products-for-Cure-Updated` is at:
   ```
   /content/drive/MyDrive/Products-for-Cure-Updated/
   ```
3. Find these two lines and replace with your ngrok URL:
   ```javascript
   fetch('https://YOUR-NGROK-URL.ngrok-free.app/predict', {
   ```
4. Run all cells. A camera interface will appear — click **Open Camera**, take a photo, and click **Analyze**.
5. Results show the top predicted condition + confidence scores + recommended cure products.

---

## API Endpoints

Once the server is running, the following endpoints are available:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Upload image as `multipart/form-data`. Query param: `use_tta=true/false` |
| `/predict_base64` | POST | Send image as base64 JSON payload (for mobile apps) |
| `/health` | GET | Check if server is running and model is loaded |
| `/docs` | GET | Interactive Swagger API documentation |

### Example `/predict` request (curl):
```bash
curl -X POST "https://YOUR-NGROK-URL.ngrok-free.app/predict?use_tta=false" \
  -F "file=@your_skin_image.jpg"
```

### Example response:
```json
{
  "success": true,
  "prediction": "Acne",
  "confidence": 0.823,
  "top_5": [
    {"class_name": "Acne", "confidence": 0.823},
    {"class_name": "Oily-Skin", "confidence": 0.091},
    {"class_name": "Blackheads", "confidence": 0.045},
    {"class_name": "Skin-Redness", "confidence": 0.021},
    {"class_name": "Whiteheads", "confidence": 0.012}
  ]
}
```

---

## Important Notes

- **ngrok URL changes every session**: Each time you restart `makeapiusingcluade.ipynb`, you get a new ngrok URL. Remember to update it in the UI notebooks.
- **Keep the API notebook running**: The server is only active while that Colab session is alive. Colab sessions timeout after ~12 hours of inactivity.
- **TTA (Test-Time Augmentation)**: Setting `use_tta=true` runs 8 augmented inference passes and averages them for ~2-4% better accuracy, but is slower. Use `use_tta=false` for speed.
- **Skin detection check**: The API automatically rejects images with insufficient skin pixels and returns `{"success": false, "detail": "..."}`.

---

## Dependencies

All installed automatically in the notebooks via `pip`:

```
tensorflow >= 2.x
fastapi
uvicorn
python-multipart
pyngrok
nest-asyncio
opencv-python-headless
Pillow
numpy
scikit-learn
matplotlib
seaborn
flask-cors
```

---

## Troubleshooting

**Model not found error**
Make sure `skin_disease_resnet50v2.keras` was copied correctly from Drive to `/content/` before starting the API server.

**ngrok tunnel error / "too many connections"**
Run `ngrok.kill()` before starting a new tunnel, or restart the Colab runtime.

**Camera not working in UI**
Colab's HTML widgets require browser camera permissions. Allow camera access when prompted. Use Chrome for best compatibility.

**"No skin detected" on a valid photo**
The image may have poor lighting or low skin pixel ratio. Try a clearer, well-lit photo with the skin condition clearly visible.

**Drive path errors**
Double-check that your folder names in Drive exactly match the paths used in the notebooks:
- `MyDrive/Dataset/Skin-Disease/`
- `MyDrive/skin_disease_resnet50v2.keras`
- `MyDrive/Products-for-Cure-Updated/`
