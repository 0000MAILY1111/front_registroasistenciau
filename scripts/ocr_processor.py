"""
OCR Processor for Enrollment Forms
This script processes enrollment form images and extracts structured data.
It will be called from the Next.js backend API route.
"""

import sys
import json
import re
from PIL import Image
import pytesseract

def extract_enrollment_data(image_path):
    """
    Extract enrollment data from an image using OCR
    
    Args:
        image_path: Path to the enrollment form image
        
    Returns:
        dict: Structured enrollment data
    """
    try:
        # Load image
        image = Image.open(image_path)
        
        # Perform OCR
        text = pytesseract.image_to_string(image, lang='spa')
        
        # Parse the extracted text
        data = parse_enrollment_text(text)
        
        return data
    except Exception as e:
        return {"error": str(e)}

def parse_enrollment_text(text):
    """
    Parse OCR text to extract structured enrollment data
    
    Args:
        text: Raw OCR text
        
    Returns:
        dict: Structured enrollment data
    """
    data = {
        "registrationNumber": "",
        "studentName": "",
        "career": "",
        "semester": "",
        "location": "",
        "subjects": [],
        "schedule": []
    }
    
    lines = text.split('\n')
    
    # Extract registration number
    for line in lines:
        if "Registro" in line or "No." in line:
            match = re.search(r'\d{9,}', line)
            if match:
                data["registrationNumber"] = match.group()
                # Extract name from the same line
                name_match = re.search(r'\d{9,}-(.+)', line)
                if name_match:
                    data["studentName"] = name_match.group(1).strip()
    
    # Extract career
    for line in lines:
        if "Carrera" in line or "INGENIERIA" in line:
            match = re.search(r'\d+-\d+\s+(.+)', line)
            if match:
                data["career"] = match.group().strip()
    
    # Extract location
    for line in lines:
        if "Lugar" in line:
            parts = line.split(':')
            if len(parts) > 1:
                data["location"] = parts[1].strip()
    
    # Extract semester
    for line in lines:
        if "BOLETA" in line and "/" in line:
            match = re.search(r'(\d+/\d+)', line)
            if match:
                data["semester"] = match.group(1)
    
    # Extract subjects from the bottom list
    subject_pattern = r'([A-Z]{3}\d{3})'
    subjects_found = re.findall(subject_pattern, text)
    
    for subject_code in subjects_found:
        data["subjects"].append({
            "code": subject_code,
            "name": f"Materia {subject_code}",
            "classroom": "TBD"
        })
    
    return data

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = extract_enrollment_data(image_path)
    print(json.dumps(result, ensure_ascii=False))
