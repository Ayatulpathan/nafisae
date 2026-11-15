"""
NAFISAÉ - AI Virtual Try-On Microservice
FastAPI Zero-Cost Local Inference Service
"""

import io
import base64
import requests
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image

from inference.vton import VirtualTryOnPipeline

app = FastAPI(
    title="NAFISAÉ Virtual Try-On API",
    description="Zero-Cost Local Open-Source AI Virtual Try-On Service",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pipeline = VirtualTryOnPipeline()

@app.get("/")
def root():
    return {
        "brand": "NAFISAÉ",
        "service": "AI Virtual Try-On Microservice",
        "status": "ONLINE",
        "docs_url": "/docs"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "zero_cost_guarantee": True,
        "telemetry": pipeline.get_telemetry()
    }

@app.get("/gpu-status")
def gpu_status():
    return pipeline.get_telemetry()

@app.post("/api/vton")
async def run_tryon(
    person_image: UploadFile = File(..., description="Full-body or upper-body photograph of the user"),
    garment_image: UploadFile = File(None, description="Optional uploaded image of garment"),
    garment_url: str = Form(None, description="Direct URL or relative path of catalogue garment"),
    category: str = Form("dresses", description="Garment category: dresses, corsets, bodys, coats, jackets, pants"),
    steps: int = Form(30, description="Denoising steps"),
    denoise_strength: float = Form(0.85, description="Diffusion denoising strength (0.1 - 1.0)")
):
    try:
        # Read person image
        person_bytes = await person_image.read()
        person_pil = Image.open(io.BytesIO(person_bytes)).convert("RGB")
        
        # Read garment image from upload or URL
        if garment_image is not None and garment_image.filename:
            garment_bytes = await garment_image.read()
            garment_pil = Image.open(io.BytesIO(garment_bytes)).convert("RGBA")
        elif garment_url:
            # If relative path or local URL, attempt fetch
            if garment_url.startswith("http://") or garment_url.startswith("https://"):
                res = requests.get(garment_url, timeout=10)
                if res.status_code != 200:
                    raise HTTPException(status_code=400, detail=f"Failed to fetch garment from URL: {garment_url}")
                garment_pil = Image.open(io.BytesIO(res.content)).convert("RGBA")
            else:
                # Fallback swatch if local relative URL
                garment_pil = Image.new("RGBA", (500, 700), (30, 30, 30, 255))
        else:
            raise HTTPException(status_code=400, detail="Either garment_image file or garment_url must be provided.")

        # Execute Virtual Try-On
        output_image, meta = pipeline.execute_tryon(
            person_img=person_pil,
            garment_img=garment_pil,
            category=category,
            steps=steps,
            denoise_strength=denoise_strength
        )

        # Encode result to base64 PNG
        buffered = io.BytesIO()
        output_image.save(buffered, format="PNG", quality=95)
        img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        data_uri = f"data:image/png;base64,{img_b64}"

        return JSONResponse(content={
            "success": True,
            "result_image": data_uri,
            "metadata": meta
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Try-on inference error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
