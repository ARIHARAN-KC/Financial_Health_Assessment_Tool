import pandas as pd
from typing import Union
from io import BytesIO
from PyPDF2 import PdfReader


class FileParser:
    @staticmethod
    def parse_csv(file_bytes: bytes) -> pd.DataFrame:
        return pd.read_csv(BytesIO(file_bytes))

    @staticmethod
    def parse_xlsx(file_bytes: bytes) -> pd.DataFrame:
        return pd.read_excel(BytesIO(file_bytes))

    @staticmethod
    def parse_pdf(file_bytes: bytes) -> pd.DataFrame:
        """
        Assumes PDF is a text-based financial export.
        MVP: Extracts tables-like text → structured later
        """
        reader = PdfReader(BytesIO(file_bytes))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)

        # Very basic parser (MVP)
        rows = []
        for line in text.splitlines():
            parts = line.split()
            if len(parts) >= 2:
                rows.append(parts)

        return pd.DataFrame(rows)

    @staticmethod
    def parse_file(
        file_bytes: bytes,
        filename: str
    ) -> pd.DataFrame:
        if filename.endswith(".csv"):
            return FileParser.parse_csv(file_bytes)
        elif filename.endswith(".xlsx"):
            return FileParser.parse_xlsx(file_bytes)
        elif filename.endswith(".pdf"):
            return FileParser.parse_pdf(file_bytes)
        else:
            raise ValueError("Unsupported file format")
