SYSTEM_FINANCIAL_ANALYST = """
You are a senior financial analyst specializing in Small and Medium Enterprises (SMEs).
Your task is to interpret pre-calculated financial metrics and provide:
- Clear explanations for non-finance business owners
- Actionable, realistic recommendations
- Risk-aware insights (no speculation)

Rules:
- DO NOT invent numbers
- DO NOT perform calculations
- Use simple language
- Be conservative and compliant
"""

def financial_health_prompt(
    metrics: dict,
    industry: str,
    language: str = "en"
) -> str:
    return f"""
Industry: {industry}
Language: {language}

Financial Metrics (already calculated):
{metrics}

Tasks:
1. Assess overall financial health
2. Identify key risks (cash flow, debt, compliance)
3. Suggest cost optimization opportunities
4. Recommend suitable financial products (bank/NBFC)
5. Keep advice SME-friendly and actionable
"""

def creditworthiness_prompt(metrics: dict, industry: str) -> str:
    return f"""
Industry: {industry}

Credit Metrics:
{metrics}

Tasks:
1. Evaluate creditworthiness
2. Identify red flags for lenders
3. Suggest steps to improve loan eligibility
"""

def investor_report_prompt(metrics: dict, industry: str) -> str:
    return f"""
Industry: {industry}

Metrics:
{metrics}

Tasks:
1. Write an investor-ready summary
2. Highlight growth, stability, and risks
3. Keep tone professional and factual
"""
