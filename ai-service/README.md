# NAFISAÉ AI Virtual Try-On Service (VTON)

> **Zero-Cost, Open-Source Virtual Fitting Engine**  
> Built for the NAFISAÉ high-fashion platform. Zero paid external APIs. Zero credit card subscriptions.

---

## 1. Architecture Overview

NAFISAÉ's virtual try-on engine operates on two complementary tiers:

1. **Local Neural Diffusion Tier (NVIDIA CUDA / PyTorch)**:
   - Uses open-source Try-On architectures (**CatVTON** or **IDM-VTON**).
   - Weights run 100% locally on your machine.
   - Zero API billing, zero recurring subscription cost, total privacy (client photos never leave your private machine or server).

2. **Zero-Cost Procedural Layering Fallback**:
   - Executes instantaneously on any CPU (Windows, macOS, Linux).
   - Generates realistic multi-layered garment composites with perspective alignment, shadow casting, and high-key editorial lighting enhancement.
   - Guarantees developers and clients can test full interactive workflows without requiring a dedicated high-end GPU.

---

## 2. Quickstart Setup

### Step 1: Create Python Virtual Environment

```bash
cd ai-service
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Linux / macOS:
source venv/bin/activate
```

### Step 2: Install Open-Source Dependencies

```bash
pip install -r requirements.txt
```

*(For GPU CUDA support, ensure you install the CUDA-enabled PyTorch build for your CUDA driver version via [pytorch.org](https://pytorch.org/get-started/locally/)).*

### Step 3: Run the Microservice

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The service will start on `http://localhost:8000`.  
- Interactive API Docs: `http://localhost:8000/docs`
- Health & GPU Telemetry: `http://localhost:8000/health`

---

## 3. Integrating Real Weights (CatVTON / IDM-VTON)

To run heavy full-diffusion VTON:
1. Clone or download open-source checkpoints from Hugging Face into `ai-service/models/`:
   ```bash
   git lfs install
   git clone https://huggingface.co/zhengchong/CatVTON ai-service/models/CatVTON
   ```
2. Hardware recommendations:
   - **Minimum**: NVIDIA RTX 3060 (12GB VRAM) or RTX 4060 Ti (16GB VRAM)
   - **Recommended**: NVIDIA RTX 3090 / 4090 (24GB VRAM)
3. Zero cost: Hugging Face model downloads and local PyTorch execution are 100% free.

---

## 4. API Endpoints

- `GET /health`: Engine status, CUDA availability, device telemetry.
- `GET /gpu-status`: Live VRAM usage, allocated memory, model architecture.
- `POST /api/vton`:
  - `person_image`: Multipart image file of person
  - `garment_image` or `garment_url`: Garment image
  - `category`: `dresses` | `corsets` | `bodys` | `coats` | `jackets` | `pants`
  - Returns: `{ success: true, result_image: "data:image/png;base64,...", metadata: {...} }`
