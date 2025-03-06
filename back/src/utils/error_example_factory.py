from typing import Any


def error_example_factory(example: Any) -> dict:
    return {
        "application/json": {
            "example": {"detail": example},
        },
    }
