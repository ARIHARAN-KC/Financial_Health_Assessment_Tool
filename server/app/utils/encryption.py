from cryptography.fernet import Fernet
from app.core.config import settings
import base64
import hashlib


def _get_fernet_key() -> bytes:
    """
    Derives a stable Fernet key from SECRET_KEY
    """
    digest = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
    return base64.urlsafe_b64encode(digest)


fernet = Fernet(_get_fernet_key())


def encrypt_value(value: str) -> str:
    if value is None:
        return value
    return fernet.encrypt(value.encode()).decode()


def decrypt_value(value: str) -> str:
    if value is None:
        return value
    return fernet.decrypt(value.encode()).decode()
