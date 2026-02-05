import json
from typing import Dict
from pathlib import Path


BENCHMARK_FILE = Path(__file__).resolve().parent.parent / "data" / "industry_benchmarks.json"


class BenchmarkingService:
    @staticmethod
    def load_benchmarks() -> Dict:
        try:
            with open(BENCHMARK_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    @staticmethod
    def compare(metrics: Dict[str, float], industry: str) -> Dict[str, str]:
        benchmarks = BenchmarkingService.load_benchmarks()
        industry_data = benchmarks.get(industry.lower())

        if not industry_data:
            return {"benchmark": "Industry data not available"}

        comparison = {}
        for key, benchmark_value in industry_data.items():
            actual = metrics.get(key)
            if actual is None:
                continue

            if actual >= benchmark_value:
                comparison[key] = "Above industry average"
            else:
                comparison[key] = "Below industry average"

        return comparison
