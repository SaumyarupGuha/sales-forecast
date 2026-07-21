from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("walmart_sales_forecaster.pkl")

# Load the CSV data for dashboard statistics
df = pd.read_csv("data/merged_walmart_data.csv")

# Pydantic Schemas
class PredictionRequest(BaseModel):
    Store: int
    Dept: int
    IsHoliday: int

    Temperature: float
    Fuel_Price: float

    MarkDown1: float
    MarkDown2: float
    MarkDown3: float
    MarkDown4: float
    MarkDown5: float

    CPI: float
    Unemployment: float

    Type: int
    Size: int

    Year: int
    Month: int
    Week: int
    Quarter: int

    Lag_1: float
    Lag_4: float
    Lag_52: float

    Rolling_4: float
    Rolling_12: float
    Rolling_52: float


@app.get("/")
def home():
    return {
        "message": "Walmart Sales Forecasting API Running"
    }


@app.post("/predict")
def predict(data: PredictionRequest):
    input_df = pd.DataFrame([data.model_dump()])
    prediction = model.predict(input_df)[0]
    return {
        "predicted_sales": round(float(prediction), 2)
    }


@app.get("/dashboard/stats")
def get_dashboard_stats():
    # Total Revenue
    total_revenue = float(df["Weekly_Sales"].sum())
    
    # Top 10 Stores by Sales
    top_stores = df.groupby("Store")["Weekly_Sales"].sum().nlargest(10)
    top_stores_list = [
        {"store": int(store), "sales": float(sales)} 
        for store, sales in top_stores.items()
    ]
    
    # Top 10 Departments by Sales
    top_departments = df.groupby("Dept")["Weekly_Sales"].sum().nlargest(10)
    top_departments_list = [
        {"department": int(dept), "sales": float(sales)} 
        for dept, sales in top_departments.items()
    ]
    
    # Holiday Impact
    holiday_impact = df.groupby("IsHoliday")["Weekly_Sales"].mean()
    non_holiday_avg = float(holiday_impact.get(0, 0))
    holiday_avg = float(holiday_impact.get(1, 0))
    impact_percentage = ((holiday_avg - non_holiday_avg) / non_holiday_avg * 100) if non_holiday_avg > 0 else 0
    
    return {
        "total_revenue": round(total_revenue, 2),
        "top_stores": top_stores_list,
        "top_departments": top_departments_list,
        "holiday_impact": {
            "non_holiday_avg": round(non_holiday_avg, 2),
            "holiday_avg": round(holiday_avg, 2),
            "impact_percentage": round(impact_percentage, 2)
        }
    }