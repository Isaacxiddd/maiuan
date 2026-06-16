#!/usr/bin/env python3
"""Script para resetear el estado del orquestador a cero."""
import json
from pathlib import Path

STATE_FILE = Path.home() / ".claude" / "mcp_logs" / "requirements_state.json"

def reset():
    STATE_FILE.write_text(json.dumps({
        "project_name": "",
        "phase": "FASE_1_REQUISITOS",
        "requirements_defined": False,
        "architecture_defined": False,
        "acceptance_criteria_defined": False,
        "human_approved": False,
        "plan_approved": False,
        "status": "BLOQUEADO",
        "blocked_reason": "No hay requisitos definidos",
        "requirements": "",
        "timestamp": "",
        "architecture": "",
        "acceptance_criteria": ""
    }, indent=2, ensure_ascii=False))
    print("[reset_project] Estado reseteado a FASE_1. Listo para nuevo proyecto.")

if __name__ == "__main__":
    reset()
