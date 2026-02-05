from typing import Literal


Language = Literal["en", "hi"]


LANGUAGE_INSTRUCTIONS = {
    "en": "Respond in clear, simple English.",
    "hi": "Respond in simple Hindi suitable for Indian business owners.",
}


def apply_language(system_prompt: str, language: Language) -> str:
    instruction = LANGUAGE_INSTRUCTIONS.get(language, LANGUAGE_INSTRUCTIONS["en"])
    return f"{system_prompt}\n\n{instruction}"
