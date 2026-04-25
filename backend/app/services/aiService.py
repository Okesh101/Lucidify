import os
import json
import time
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError, ServerError
from groq import Groq


load_dotenv()

# Choose model provider: "gemini" or "groq"
AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini")

if AI_PROVIDER == "gemini":
    gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
elif AI_PROVIDER == "groq":
    groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
else:
    raise ValueError("Invalid AI_PROVIDER")


def ai_extract(system_prompt: str, user_prompt: str, retries=3) -> dict:
    """Extract structured JSON from user input using the configured LLM."""
    for attempt in range(retries):
        try:
            if AI_PROVIDER == "gemini":
                return _extract_gemini(system_prompt, user_prompt)
            else:
                return _extract_groq(system_prompt, user_prompt)
        except ServerError as e:
            if '503' in str(e) and attempt < retries - 1:
                time.sleep(5)
                continue
            raise
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
                continue
            raise


def _extract_gemini(system_prompt: str, user_prompt: str) -> dict:
    model = gemini_client.models.generate_content(
        model="gemini-3.1-pro-preview",
        contents=f"{system_prompt}\n\n---\n\n{user_prompt}",
        config={
            "temperature": 0.1,           # Low temp for deterministic JSON
            "response_mime_type": "application/json"  # Force JSON output
        }
    )
    # The response is already parsed as JSON by the SDK when mime_type is set
    return model.parsed if model.parsed else json.loads(model.text)


def _extract_groq(system_prompt: str, user_prompt: str) -> dict:
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.1,
        response_format={"type": "json_object"}   # Groq supports JSON mode
    )
    raw = response.choices[0].message.content
    return json.loads(raw)


