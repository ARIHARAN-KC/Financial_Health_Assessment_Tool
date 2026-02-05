import httpx
from typing import Dict, Any
from fastapi import HTTPException

from app.core.config import settings

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


class ClaudeClient:
    def __init__(self):
        self.api_key = settings.API_KEY
        self.model = settings.MODEL

    async def generate(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> Dict[str, Any]:

        if not self.api_key:
            return {
                "content": "AI insights are temporarily unavailable. Please review the metrics provided.",
                "raw": None,
            }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "SME Financial Health Platform",
        }

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": temperature,
        }

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                OPENROUTER_URL,
                headers=headers,
                json=payload,
            )

            if response.status_code >= 400:
                return {
                    "content": "AI insights could not be generated at this time. Please refer to the calculated metrics.",
                    "raw": response.text,
                }

            data = response.json()

        return {
            "content": data["choices"][0]["message"]["content"],
            "raw": data,
        }


claude_client = ClaudeClient()
