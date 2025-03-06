from pydantic import BaseModel, Field


class BookMainImage(BaseModel):
    url: str = Field(description="Main book photo url")
