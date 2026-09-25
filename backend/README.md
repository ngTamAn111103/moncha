uv init --bare
uv add fastapi "uvicorn[standard]"
source .venv/bin/activate

uv run uvicorn main:app --reload