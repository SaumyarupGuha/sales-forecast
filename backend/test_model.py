import joblib

cols = joblib.load("feature_columns.pkl")

print(cols)
print(len(cols))


model = joblib.load("walmart_sales_forecaster.pkl")

print(type(model))