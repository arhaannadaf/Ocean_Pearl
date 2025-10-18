from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objs as go
import json
import plotly.utils
from prophet import Prophet
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import os
import joblib
import re 
import nltk 
from nltk.corpus import stopwords 
from nltk.stem.porter import PorterStemmer 
from wordcloud import WordCloud
import io
import base64

app = Flask(__name__)

script_dir = os.path.dirname(os.path.abspath(__file__))
# 2. Join this script's directory with the relative path to the CSV file.
CSV_PATH = os.path.join(script_dir, "data", "processed", "Ocean_Pearl_Order_Data_WithCustomer.csv")


# --- 1. Load Models and Preprocessing Objects ---
try:
    # Define paths to the saved model and vectorizer
    
    model_path = os.path.join(script_dir,'Models', 'svm_model.pkl')
    vectorizer_path = os.path.join(script_dir,'Models', 'tfidf_vectorizer.pkl')

    # Load the model and vectorizer using joblib
    svm_model = joblib.load(model_path)
    tfidf_vectorizer = joblib.load(vectorizer_path)
    
    # Load NLTK stopwords
    nltk.download('stopwords', quiet=True)
    stop_words = set(stopwords.words("english"))
    stop_words.remove("not")
    stop_words.remove("no")
    stop_words.remove("nor")
    port_stem = PorterStemmer()

    print("✅ Models and preprocessing tools loaded successfully!")

except Exception as e:
    print(f"❌ Error loading models: {e}")
    svm_model = None
    tfidf_vectorizer = None

# --- 2. Preprocessing Function ---
def stemming(content):
    if not isinstance(content, str):
        return ""
    stemmed_content = re.sub("[^a-zA-Z]", " ", content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stop_words]
    stemmed_content = " ".join(stemmed_content)
    return stemmed_content

# --- 3. Sentiment Analysis Function (with Probability Logic) ---
def analyze_sentiment(feedback_text):
    if not all([svm_model, tfidf_vectorizer]) or not isinstance(feedback_text, str):
        return "N/A"

    stemmed_feedback = stemming(feedback_text)
    vectorized_feedback = tfidf_vectorizer.transform([stemmed_feedback])
    prediction_proba = svm_model.predict_proba(vectorized_feedback)
    positive_probability = prediction_proba[0][1]

    if positive_probability > 0.65:
        return 'Positive'
    elif positive_probability < 0.45:
        return 'Negative'
    else:
        return 'Neutral'


# -------------------------
# Load + Clean Data
# -------------------------
def load_data():
    df = pd.read_csv(CSV_PATH)
    df.columns = df.columns.str.strip()

    for col in df.select_dtypes(['object']).columns:
        df[col] = df[col].str.strip()

    date_cols = ['OrderDate']
    time_cols = ['OrderTime']
    numeric_cols = ['Quantity']
    financial_cols = ['Price', 'CostPrice', 'Revenue', 'Profit']
    categorical_cols = ['DishName', 'Category', 'CustomerName', 'OrderID']

    for col in date_cols:
        if col in df.columns: df[col] = pd.to_datetime(df[col], format="%d-%m-%Y", errors="coerce")
    for col in time_cols:
        if col in df.columns: df[col] = df[col].astype(str)
    for col in numeric_cols:
        if col in df.columns: df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)
    for col in financial_cols:
        if col in df.columns:
            df[col] = df[col].astype(str).str.replace(r'[^\d\.]', '', regex=True)
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0).astype(float)
    for col in categorical_cols:
        if col in df.columns: df[col] = df[col].fillna('Unknown').astype(str)

    if 'Revenue' not in df.columns or df['Revenue'].sum() == 0:
        df['Revenue'] = df['Quantity'] * df['Price']
    if 'Profit' not in df.columns or df['Profit'].sum() == 0:
        df['Profit'] = df['Revenue'] * 0.2
        
    df.dropna(subset=['OrderDate'], inplace=True)
    return df

# -------------------------
# KPI & Chart Builders (RESTORED)
# -------------------------
def create_kpis(df):
    total_revenue = df['Revenue'].sum()
    total_orders = df.shape[0]
    kpis = {
        "total_revenue": f"₹{total_revenue:,.0f}",
        "total_profit": f"₹{df['Profit'].sum():,.0f}",
        "total_orders": f"{total_orders:,}",
        "unique_customers": f"{df['CustomerName'].nunique():,}",
        "avg_order_value": f"₹{(total_revenue / total_orders):,.0f}" if total_orders > 0 else "₹0"
    }
    return kpis

def build_charts(df):
    df = df.copy()
    charts = {}
    df["OrderMonth"] = df["OrderDate"].dt.to_period("M").astype(str)
    trend = df.groupby("OrderMonth", as_index=False)["Revenue"].sum()
    fig1 = px.line(trend, x="OrderMonth", y="Revenue", title="Revenue Over Time", markers=True, template="plotly_white", color_discrete_sequence=["#4F46E5"])
    if len(trend) < 24: fig1.update_traces(text=trend['Revenue'], texttemplate='%{text:,.0f}', textposition='top center')
    fig1.update_traces(hovertemplate="Month: %{x}<br>Revenue: ₹%{y:,}")
    fig1.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", yaxis_tickformat=',.0f')
    charts["revenue_trend"] = json.dumps(fig1, cls=plotly.utils.PlotlyJSONEncoder)

    cat = df.groupby("Category", as_index=False)["Revenue"].sum().sort_values("Revenue", ascending=False)
    fig2 = px.bar(cat, x="Category", y="Revenue", title="Revenue by Category", template="plotly_white", color="Revenue", color_continuous_scale="Tealgrn", text_auto='.2s')
    fig2.update_traces(hovertemplate="Category: %{x}<br>Revenue: ₹%{y:,}", textangle=0)
    fig2.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", yaxis_tickformat=',.0f', uniformtext_minsize=8, uniformtext_mode='hide')
    charts["revenue_by_category"] = json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder)

    df["OrderDay"] = df["OrderDate"].dt.day_name()
    order_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    profit_day = df.groupby("OrderDay")["Profit"].mean().reindex(order_days).fillna(0).reset_index()
    fig3 = go.Figure(go.Scatterpolar(r=profit_day["Profit"], theta=profit_day["OrderDay"], fill="toself", name="Avg Profit", line_color="#4F46E5", fillcolor="rgba(79,70,229,0.2)", hovertemplate="Day: %{theta}<br>Avg Profit: ₹%{r:,}"))
    fig3.update_layout(template="plotly_white", title="Average Profit by Weekday", paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", polar=dict(radialaxis=dict(showticklabels=True, ticks='', gridcolor="#e5e7eb", tickformat=',.0f'), angularaxis=dict(gridcolor="#e5e7eb")))
    charts["profit_by_day"] = json.dumps(fig3, cls=plotly.utils.PlotlyJSONEncoder)

    top_products = df.groupby("DishName")["Revenue"].sum().nlargest(10).reset_index()
    fig4 = px.bar(top_products, x="Revenue", y="DishName", orientation="h", title="Top 10 Products by Revenue", template="plotly_white", color="Revenue", color_continuous_scale="Blues", text_auto='.2s')
    fig4.update_traces(hovertemplate="Dish: %{y}<br>Revenue: ₹%{x:,}")
    fig4.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", xaxis_tickformat=',.0f', yaxis={'categoryorder':'total ascending'})
    charts["top_products"] = json.dumps(fig4, cls=plotly.utils.PlotlyJSONEncoder)
    
    return charts

# -------------------------
# Routes
# -------------------------
@app.route("/", methods=["GET", "POST"])
def dashboard():
    df = load_data()
    start_date = df["OrderDate"].min()
    end_date = df["OrderDate"].max()
    if request.method == "POST":
        start_date = pd.to_datetime(request.form.get("start_date", start_date))
        end_date = pd.to_datetime(request.form.get("end_date", end_date))
        filtered_df = df[(df["OrderDate"] >= start_date) & (df["OrderDate"] <= end_date)]
        if request.form.get("dishname", "All") != "All": filtered_df = filtered_df[filtered_df["DishName"] == request.form.get("dishname")]
        if request.form.get("category", "All") != "All": filtered_df = filtered_df[filtered_df["Category"] == request.form.get("category")]
    else: filtered_df = df.copy()
    kpis, charts = create_kpis(filtered_df), build_charts(filtered_df)
    return render_template("dashboard.html", kpis=kpis, charts=charts, dishnames=["All"] + sorted(df["DishName"].unique().tolist()), categories=["All"] + sorted(df["Category"].unique().tolist()), start_date=start_date.strftime("%Y-%m-%d"), end_date=end_date.strftime("%Y-%m-%d"))

@app.route('/forecasting', methods=["GET", "POST"])
def forecasting():
    df = load_data()
    forecast_period = int(request.form.get("forecast_period", 90)) if request.method == 'POST' else 90
    daily_sales = df.groupby('OrderDate')['Revenue'].sum().reset_index()
    prophet_df = daily_sales.rename(columns={'OrderDate': 'ds', 'Revenue': 'y'})
    if len(prophet_df) < 2: return render_template('forecasting.html', chart_json='{}', kpis={}, selected_period=forecast_period)
    m = Prophet(); m.fit(prophet_df)
    future = m.make_future_dataframe(periods=forecast_period)
    forecast = m.predict(future)
    predicted_data = forecast.iloc[-forecast_period:]
    total_predicted_revenue = predicted_data['yhat'].sum()
    confidence_range = (predicted_data['yhat_upper'].sum() - predicted_data['yhat_lower'].sum()) / 2
    confidence_pct = (confidence_range / total_predicted_revenue) * 100 if total_predicted_revenue > 0 else 0
    last_period_revenue = prophet_df['y'].tail(forecast_period).sum()
    growth_pct = ((total_predicted_revenue - last_period_revenue) / last_period_revenue) * 100 if last_period_revenue > 0 else 0
    forecast_kpis = {"predicted_revenue": f"₹{total_predicted_revenue:,.0f}", "growth": f"{growth_pct:+.1f}%", "confidence": f"± {confidence_pct:.1f}%", "period": str(forecast_period)}
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=prophet_df['ds'], y=prophet_df['y'], mode='lines', name='Historical Sales', line=dict(color='#4F46E5')))
    fig.add_trace(go.Scatter(x=forecast['ds'], y=forecast['yhat'], mode='lines', name='Forecast', line=dict(color='#10b981', dash='dash')))
    fig.add_trace(go.Scatter(x=forecast['ds'], y=forecast['yhat_upper'], fill=None, mode='lines', line_color='rgba(26,150,65,0.2)', name='Confidence Upper', showlegend=False))
    fig.add_trace(go.Scatter(x=forecast['ds'], y=forecast['yhat_lower'], fill='tonexty', mode='lines', line_color='rgba(26,150,65,0.2)', name='Confidence Lower', showlegend=False))
    fig.update_layout(title=f"Revenue Forecast for Next {forecast_period} Days", template="plotly_white", paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", yaxis_title="Revenue (₹)", xaxis_title="Date")
    chart_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return render_template('forecasting.html', chart_json=chart_json, kpis=forecast_kpis, selected_period=forecast_period)

@app.route('/top-dishes', methods=["GET", "POST"])
def top_dishes():
    df = load_data()
    sort_by = 'Revenue'
    limit = 10
    selected_category = 'All'

    if request.method == "POST":
        sort_by = request.form.get('sort_by', 'Revenue')
        limit_str = request.form.get('limit', '10')
        limit = int(limit_str) if limit_str.isdigit() else 10
        selected_category = request.form.get('category', 'All')

    # Filter by category if one is selected
    filtered_df = df[df['Category'] == selected_category] if selected_category != 'All' else df.copy()

    # Aggregate performance data
    dish_performance = filtered_df.groupby(['DishName', 'Category']).agg(
        Quantity=('Quantity', 'sum'),
        Revenue=('Revenue', 'sum'),
        Profit=('Profit', 'sum'),
        AvgPrice=('Price', 'mean')
    ).reset_index()

    dish_performance['ProfitMargin'] = (dish_performance['Profit'] / dish_performance['Revenue'] * 100).fillna(0)

    # Determine the column to sort by
    sort_column = {'Revenue': 'Revenue', 'Profit': 'Profit', 'Quantity': 'Quantity'}.get(sort_by, 'Revenue')

    # Get top and worst performing dishes
    top_dishes_df = dish_performance.sort_values(by=sort_column, ascending=False).head(limit)
    worst_dishes_df = dish_performance.sort_values(by=sort_column, ascending=True).head(limit)

    # KPIs for overall best dishes (not affected by filters)
    top_kpis = {
        'top_revenue_dish': df.loc[df['Revenue'].idxmax()]['DishName'] if not df.empty else 'N/A',
        'top_profit_dish': df.loc[df['Profit'].idxmax()]['DishName'] if not df.empty else 'N/A',
        'top_quantity_dish': df.loc[df['Quantity'].idxmax()]['DishName'] if not df.empty else 'N/A'
    }

    return render_template(
        'top_dishes.html',
        top_dishes=top_dishes_df.to_dict('records'),
        worst_dishes=worst_dishes_df.to_dict('records'),
        categories=['All'] + sorted(df['Category'].unique().tolist()),
        selected_category=selected_category,
        sort_by=sort_by,
        limit=limit,
        top_kpis=top_kpis
    )

@app.route('/customers')
def customers():
    df = load_data()
    customer_data = df.groupby('CustomerName').agg(total_spend=('Revenue', 'sum'), visit_count=('OrderDate', 'nunique')).reset_index()
    spend_threshold = customer_data['total_spend'].quantile(0.80)
    high_value_customers = customer_data[customer_data['total_spend'] >= spend_threshold]
    frequent_customers = customer_data[customer_data['visit_count'] > 1]
    last_month = df['OrderDate'].max() - pd.Timedelta(days=30)
    recent_customers_df = df[df['OrderDate'] >= last_month]
    first_visits_df = df.groupby('CustomerName')['OrderDate'].min().reset_index()
    merged_df = pd.merge(recent_customers_df, first_visits_df, on='CustomerName', suffixes=('', '_first'))
    new_customers_count = len(merged_df[merged_df['OrderDate_first'] >= last_month]['CustomerName'].unique())
    returning_customers_count = len(merged_df[merged_df['OrderDate_first'] < last_month]['CustomerName'].unique())
    segments = {"high_value_customers": {"count": len(high_value_customers), "avg_spend": high_value_customers['total_spend'].mean() if len(high_value_customers) > 0 else 0}, "frequent_customers": {"count": len(frequent_customers), "avg_visits": frequent_customers['visit_count'].mean() if len(frequent_customers) > 0 else 0}, "new_customers": new_customers_count, "returning_customers": returning_customers_count}
    charts = {}
    pie_fig = px.pie(names=['New Customers', 'Returning Customers'], values=[new_customers_count, returning_customers_count], title='New vs. Returning Customers (Last 30 Days)', color_discrete_sequence=["#4F46E5", "#10b981"])
    pie_fig.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc")
    charts['new_vs_returning_chart'] = json.dumps(pie_fig, cls=plotly.utils.PlotlyJSONEncoder)
    hist_fig = px.histogram(customer_data, x='total_spend', title='Distribution of Total Spend per Customer', labels={'total_spend': 'Total Spend (₹)'}, color_discrete_sequence=["#f97316"])
    hist_fig.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc")
    charts['customer_spend_dist'] = json.dumps(hist_fig, cls=plotly.utils.PlotlyJSONEncoder)
    return render_template('customers.html', segments=segments, charts=charts)

@app.route('/menu-engineering')
def menu_engineering():
    df = load_data()
    dish_performance = df.groupby('DishName').agg(
        quantity_sold=('Quantity', 'sum'),
        total_revenue=('Revenue', 'sum'),
        total_profit=('Profit', 'sum')
    ).reset_index()

    dish_performance = dish_performance[dish_performance['total_revenue'] > 0]
    dish_performance['profit_margin'] = (dish_performance['total_profit'] / dish_performance['total_revenue']) * 100
    
    avg_quantity = dish_performance['quantity_sold'].mean()
    avg_margin = dish_performance['profit_margin'].mean()

    def categorize_dish(row):
        if row['profit_margin'] >= avg_margin and row['quantity_sold'] >= avg_quantity:
            return '⭐ Star'
        elif row['profit_margin'] >= avg_margin and row['quantity_sold'] < avg_quantity:
            return '❓ Puzzle'
        elif row['profit_margin'] < avg_margin and row['quantity_sold'] >= avg_quantity:
            return '🐴 Plowhorse'
        else:
            return '🐶 Dog'
    dish_performance['category'] = dish_performance.apply(categorize_dish, axis=1)

    # --- FIX: Changed 'text' to 'hover_name' to declutter the chart ---
    fig = px.scatter(
        dish_performance,
        x='quantity_sold',
        y='profit_margin',
        hover_name='DishName',  # This now shows the name on hover
        color='category',
        title='Menu Engineering Matrix',
        labels={'quantity_sold': 'Popularity (Quantity Sold)', 'profit_margin': 'Profitability (Margin %)'},
        category_orders={'category': ['⭐ Star', '❓ Puzzle', '🐴 Plowhorse', '🐶 Dog']},
        color_discrete_map={
            '⭐ Star': '#16a34a', '❓ Puzzle': '#0284c7',
            '🐴 Plowhorse': '#ea580c', '🐶 Dog': '#dc2626'
        }
    )
    
    fig.add_vline(x=avg_quantity, line_dash="dash", line_color="grey", annotation_text="Avg Popularity")
    fig.add_hline(y=avg_margin, line_dash="dash", line_color="grey", annotation_text="Avg Profitability")
    
    # The line that tried to position the text is no longer needed
    # fig.update_traces(textposition='top center', textfont_size=8)
    
    fig.update_layout(
        paper_bgcolor="#f8fafc",
        plot_bgcolor="#f8fafc",
        legend_title_text='Category'
    )

    chart_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return render_template('menu_engineering.html', chart_json=chart_json)

@app.route('/combo-analysis', methods=["GET", "POST"])
def combo_analysis():
    # Set default values for the filters
    min_support = 0.01
    min_confidence = 0.2
    num_rules = 15

    if request.method == "POST":
        min_support = float(request.form.get('min_support', 0.01))
        min_confidence = float(request.form.get('min_confidence', 0.2))
        num_rules = int(request.form.get('num_rules', 15))

    df = load_data()
    
    # Ensure there's enough data for the analysis to be meaningful
    if df['OrderID'].nunique() < 50:
        return render_template('combo_analysis.html', rules=None, error_message="Not enough unique orders to generate meaningful insights.")

    transactions = df.groupby('OrderID')['DishName'].apply(list).values.tolist()
    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    df_onehot = pd.DataFrame(te_ary, columns=te.columns_)

    rules = None
    try:
        # Generate frequent itemsets based on user's min_support
        frequent_itemsets = apriori(df_onehot, min_support=min_support, use_colnames=True)
        
        if not frequent_itemsets.empty:
            # Generate rules based on user's min_confidence
            rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=min_confidence)
            
            if not rules.empty:
                # Format the rules for better display
                rules['antecedents'] = rules['antecedents'].apply(lambda x: ', '.join(list(x)))
                rules['consequents'] = rules['consequents'].apply(lambda x: ', '.join(list(x)))
                
                # Sort by Lift and Confidence to show the most interesting rules first
                rules = rules.sort_values(by=['lift', 'confidence'], ascending=False).head(num_rules)
                
                # Format numbers for readability in the table
                rules['support'] = rules['support'].apply(lambda x: f"{x:.2%}")
                rules['confidence'] = rules['confidence'].apply(lambda x: f"{x:.2%}")
                rules['lift'] = rules['lift'].apply(lambda x: f"{x:.2f}x")

    except Exception as e:
        print(f"Error in combo analysis: {e}")
        return render_template('combo_analysis.html', rules=None, error_message=f"An error occurred: {e}")

    return render_template('combo_analysis.html',
                           rules=rules.to_dict('records') if rules is not None and not rules.empty else None,
                           min_support=min_support,
                           min_confidence=min_confidence,
                           num_rules=num_rules)

@app.route('/peak-hours')
def peak_hours():
    print("\n--- Debugging Peak Hours Analysis ---")
    try:
        # Step 1: Load the data
        df = load_data()
        print(f"1. After load_data(), DataFrame shape is: {df.shape}")
        if df.empty:
            print("   ERROR: load_data() returned an empty DataFrame. Halting.")
            return render_template('peak_hours.html', chart_json='{}')

        # Step 2: Check for 'OrderTime' column and show a sample
        if 'OrderTime' in df.columns:
            print(f"2. 'OrderTime' column found. First 5 values: {df['OrderTime'].head().to_list()}")
        else:
            print("   ERROR: 'OrderTime' column NOT FOUND in the DataFrame. Halting.")
            return render_template('peak_hours.html', chart_json='{}')

        # Step 3: Convert to hour and check for errors
        df['hour'] = pd.to_datetime(df['OrderTime'], format='%H:%M', errors='coerce').dt.hour
        print(f"3. After time conversion: Valid hours found: {df['hour'].notna().sum()}, Invalid (NaN) hours: {df['hour'].isna().sum()}")

        # Step 4: Drop invalid rows and check the new shape
        df.dropna(subset=['hour', 'OrderDate'], inplace=True)
        print(f"4. After dropping invalid rows, DataFrame shape is: {df.shape}")
        if df.empty:
            print("   ERROR: DataFrame is empty after dropping invalid time/date values. Halting.")
            return render_template('peak_hours.html', chart_json='{}')

        # Step 5: Create the pivot table and check it
        df['hour'] = df['hour'].astype(int)
        df['DayOfWeek'] = df['OrderDate'].dt.day_name()
        pivot = df.groupby(['DayOfWeek', 'hour'])['OrderID'].nunique().unstack(fill_value=0)
        days_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        pivot = pivot.reindex(days_order)
        print(f"5. Pivot table created successfully. Shape: {pivot.shape}")
        
        # Create and return the chart
        fig = go.Figure(data=go.Heatmap(z=pivot.values, x=pivot.columns, y=pivot.index, colorscale='Blues'))
        fig.update_layout(title='Customer Traffic by Day and Hour', xaxis_title='Hour of Day (24h format)', yaxis_title='Day of Week', paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc")
        chart_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        print("--- Debugging Complete: Chart sent to template. ---")
        return render_template('peak_hours.html', chart_json=chart_json)

    except Exception as e:
        print(f"AN UNEXPECTED ERROR OCCURRED: {e}")
        import traceback
        traceback.print_exc()
        return f"An error occurred: {e}"
    
# Alternative @app.route('/sentiment') function
@app.route('/sentiment')
def sentiment():
    if svm_model is None or tfidf_vectorizer is None:
        return "Sentiment models are not loaded. Please check the server logs.", 500

    df = load_data()
    feedback_df = df[df['Feedback'].notna() & (df['Feedback'] != 'Unknown') & (df['Feedback'] != '')].copy()

    if feedback_df.empty:
        return "No feedback available to analyze.", 200

    X_tfidf = tfidf_vectorizer.transform(feedback_df['Feedback'])
    
    # --- FIX: Using predict_proba() to get confidence scores ---
    try:
        probabilities = svm_model.predict_proba(X_tfidf)
    except Exception as e:
        return f"Error: This model may not support probability estimates. Please use the simple fix. Details: {e}", 500

    def get_sentiment_from_proba(prob_array):
        # prob_array[0] is prob of Negative, prob_array[1] is prob of Positive
        prob_positive = prob_array[1]
        if prob_positive > 0.6:  # Threshold for Positive
            return 'Positive'
        elif prob_positive < 0.4: # Threshold for Negative
            return 'Negative'
        else: # In-between is Neutral
            return 'Neutral'

    feedback_df['Sentiment'] = [get_sentiment_from_proba(p) for p in probabilities]
    
    # (The rest of the function for KPIs, Charts, etc. is the same as in Option 1)
    sentiment_counts = feedback_df['Sentiment'].value_counts(normalize=True).mul(100).round(1)
    kpis = {
        'positive_pct': sentiment_counts.get('Positive', 0),
        'neutral_pct': sentiment_counts.get('Neutral', 0),
        'negative_pct': sentiment_counts.get('Negative', 0)
    }
    charts = {}
    sentiment_counts_df = feedback_df['Sentiment'].value_counts().reset_index()
    fig_pie = px.pie(sentiment_counts_df, names='Sentiment', values='count', title='Overall Feedback Sentiment', color='Sentiment', color_discrete_map={'Positive': '#16a34a', 'Neutral': '#64748b', 'Negative': '#dc2626'})
    fig_pie.update_traces(textposition='inside', textinfo='percent+label'); fig_pie.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc")
    charts['pie_chart'] = json.dumps(fig_pie, cls=plotly.utils.PlotlyJSONEncoder)
    sentiment_by_dish = feedback_df.groupby('DishName')['Sentiment'].value_counts().unstack().fillna(0)
    for sentiment_col in ['Positive', 'Neutral', 'Negative']:
        if sentiment_col not in sentiment_by_dish.columns: sentiment_by_dish[sentiment_col] = 0
    top_positive = sentiment_by_dish.sort_values('Positive', ascending=False).head(7)
    top_negative = sentiment_by_dish.sort_values('Negative', ascending=False).head(7)
    fig_pos = px.bar(top_positive, y=top_positive.index, x='Positive', title='Dishes with Most Positive Feedback', text_auto=True, color_discrete_sequence=['#16a34a'])
    fig_pos.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", yaxis_title="Dish", xaxis_title="Positive Count")
    charts['positive_dishes_chart'] = json.dumps(fig_pos, cls=plotly.utils.PlotlyJSONEncoder)
    fig_neg = px.bar(top_negative, y=top_negative.index, x='Negative', title='Dishes with Most Negative Feedback', text_auto=True, color_discrete_sequence=['#dc2626'])
    fig_neg.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc", yaxis_title="Dish", xaxis_title="Negative Count")
    charts['negative_dishes_chart'] = json.dumps(fig_neg, cls=plotly.utils.PlotlyJSONEncoder)
    text = " ".join(review for review in feedback_df.Feedback); wordcloud = WordCloud(width=800, height=400, background_color="white", colormap="viridis").generate(text)
    img = io.BytesIO(); wordcloud.to_image().save(img, format='PNG'); img.seek(0)
    wordcloud_image = base64.b64encode(img.getvalue()).decode()
    recent_feedback = feedback_df.tail(10).to_dict('records')
    return render_template('sentiment.html', kpis=kpis, charts=charts, recent_feedback=recent_feedback, wordcloud_image=wordcloud_image)

@app.route('/price-modeling', methods=["GET", "POST"])
def price_modeling():
    df = load_data()
    dishes = sorted(df['DishName'].unique())
    
    selected_dish = dishes[0]
    elasticity_factor = -1.2  # A common value for restaurant items
    price_change_percent = 0.0

    if request.method == 'POST':
        selected_dish = request.form['dish_name']
        elasticity_factor = float(request.form['elasticity_factor'])
        price_change_percent = float(request.form.get('price_change_percent', 0))

    # --- Analysis for the selected dish ---
    dish_df = df[df['DishName'] == selected_dish]
    
    # Calculate current metrics
    current_avg_price = dish_df['Price'].mean()
    avg_cost_price = dish_df['CostPrice'].mean()
    total_quantity = dish_df['Quantity'].sum()
    current_total_revenue = dish_df['Revenue'].sum()
    current_total_profit = dish_df['Profit'].sum()

    # --- Generate Scenarios for the Chart ---
    scenarios = []
    # Generate a range of scenarios from -25% to +50% price change
    for change in range(-25, 51, 5):
        price_change_ratio = change / 100.0
        new_price = current_avg_price * (1 + price_change_ratio)
        
        # Simulate the change in quantity based on elasticity
        # A positive elasticity factor means demand increases with price (luxury goods, not typical for restaurants)
        # A negative factor (e.g., -1.2) means a 10% price increase causes a 12% drop in sales
        quantity_change_ratio = price_change_ratio * elasticity_factor
        projected_quantity = total_quantity * (1 + quantity_change_ratio)
        if projected_quantity < 0:
            projected_quantity = 0
        
        projected_revenue = new_price * projected_quantity
        projected_profit = (new_price - avg_cost_price) * projected_quantity
        
        scenarios.append({
            'price_change': change,
            'new_price': new_price,
            'projected_revenue': projected_revenue,
            'projected_profit': projected_profit
        })

    scenario_df = pd.DataFrame(scenarios)

    # --- Calculate metrics for the user-selected price change ---
    selected_price_change_ratio = price_change_percent / 100.0
    projected_price = current_avg_price * (1 + selected_price_change_ratio)
    selected_quantity_change = selected_price_change_ratio * elasticity_factor
    projected_quantity = total_quantity * (1 + selected_quantity_change)
    if projected_quantity < 0:
        projected_quantity = 0

    projected_revenue = projected_price * projected_quantity
    projected_profit = (projected_price - avg_cost_price) * projected_quantity

    results = {
        "current": {
            "avg_price": current_avg_price,
            "quantity": total_quantity,
            "revenue": current_total_revenue,
            "profit": current_total_profit,
        },
        "projected": {
            "new_price": projected_price,
            "quantity": projected_quantity,
            "revenue": projected_revenue,
            "profit": projected_profit,
        },
        "impact": {
            "revenue": projected_revenue - current_total_revenue,
            "profit": projected_profit - current_total_profit,
        }
    }

    # --- Create Interactive Chart ---
    charts = {}
    fig = go.Figure()
    # Revenue Line
    fig.add_trace(go.Scatter(x=scenario_df['price_change'], y=scenario_df['projected_revenue'], mode='lines+markers', name='Projected Revenue', line=dict(color='#4F46E5')))
    # Profit Line
    fig.add_trace(go.Scatter(x=scenario_df['price_change'], y=scenario_df['projected_profit'], mode='lines+markers', name='Projected Profit', line=dict(color='#10b981')))
    
    # Highlight the point of maximum profit
    max_profit_point = scenario_df.loc[scenario_df['projected_profit'].idxmax()]
    fig.add_annotation(
        x=max_profit_point['price_change'], y=max_profit_point['projected_profit'],
        text="Optimal Profit", showarrow=True, arrowhead=1, ax=0, ay=-40
    )

    # Highlight the selected point
    fig.add_vline(x=price_change_percent, line_width=2, line_dash="dash", line_color="orange", annotation_text="Your Selection")

    fig.update_layout(
        title=f"Price Change vs. Projected Revenue & Profit for {selected_dish}",
        xaxis_title="Price Change (%)",
        yaxis_title="Amount (₹)",
        template="plotly_white",
        paper_bgcolor="#f8fafc",
        plot_bgcolor="#f8fafc"
    )
    charts['price_elasticity_chart'] = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return render_template('price_modeling.html',
                           dishes=dishes,
                           selected_dish=selected_dish,
                           elasticity_factor=elasticity_factor,
                           price_change_percent=price_change_percent,
                           results=results,
                           charts=charts)


@app.route('/expenses', methods=["GET", "POST"])
def expenses():
    df = load_data()
    start_date = df["OrderDate"].min()
    end_date = df["OrderDate"].max()

    filtered_df = df.copy()
    if request.method == "POST":
        start_date = pd.to_datetime(request.form.get("start_date", start_date))
        end_date = pd.to_datetime(request.form.get("end_date", end_date))
        filtered_df = df[(df["OrderDate"] >= start_date) & (df["OrderDate"] <= end_date)]
        if request.form.get("category", "All") != "All":
            filtered_df = filtered_df[filtered_df["Category"] == request.form.get("category")]

    # --- Economic Analysis ---
    dish_analysis = filtered_df.groupby('DishName').agg(
        TotalQuantity=('Quantity', 'sum'),
        TotalRevenue=('Revenue', 'sum'),
        TotalCost=('CostPrice', 'sum')
    ).reset_index()

    # Avoid division by zero
    dish_analysis = dish_analysis[dish_analysis['TotalRevenue'] > 0]

    dish_analysis['TotalProfit'] = dish_analysis['TotalRevenue'] - dish_analysis['TotalCost']
    dish_analysis['ProfitMargin'] = (dish_analysis['TotalProfit'] / dish_analysis['TotalRevenue']) * 100
    dish_analysis['CostRatio'] = (dish_analysis['TotalCost'] / dish_analysis['TotalRevenue']) * 100
    
    total_costs = dish_analysis['TotalCost'].sum()
    dish_analysis['CostPercentage'] = (dish_analysis['TotalCost'] / total_costs) * 100 if total_costs > 0 else 0

    # --- Pros and Cons Logic ---
    def get_pros_cons(row):
        pros = []
        cons = []
        if row['ProfitMargin'] > dish_analysis['ProfitMargin'].mean():
            pros.append("High Profit Margin")
        if row['TotalQuantity'] > dish_analysis['TotalQuantity'].mean():
            pros.append("Popular")
        if row['CostRatio'] < dish_analysis['CostRatio'].mean():
            pros.append("Efficient Cost")
        
        if row['ProfitMargin'] < dish_analysis['ProfitMargin'].quantile(0.25):
            cons.append("Low Profit Margin")
        if row['TotalQuantity'] < dish_analysis['TotalQuantity'].quantile(0.25):
            cons.append("Unpopular")
        if row['CostRatio'] > dish_analysis['CostRatio'].quantile(0.75):
            cons.append("High Cost Ratio")
            
        return {'pros': pros, 'cons': cons}

    dish_analysis['Analysis'] = dish_analysis.apply(get_pros_cons, axis=1)
    dish_analysis = dish_analysis.sort_values(by='CostRatio', ascending=False)


    # --- KPIs ---
    total_cogs = dish_analysis['TotalCost'].sum()
    total_revenue_kpi = dish_analysis['TotalRevenue'].sum()
    gross_profit = total_revenue_kpi - total_cogs
    
    expense_kpis = {
        "total_cogs": f"₹{total_cogs:,.0f}",
        "gross_profit": f"₹{gross_profit:,.0f}",
        "most_costly_item": dish_analysis.iloc[0]['DishName'] if not dish_analysis.empty else "N/A",
        "least_profitable_item": dish_analysis.sort_values(by='ProfitMargin').iloc[0]['DishName'] if not dish_analysis.empty else "N/A"
    }

    # --- Chart: Cost Composition Treemap ---
    charts = {}
    fig_treemap = px.treemap(dish_analysis, 
                             path=[px.Constant("All Dishes"), 'DishName'], 
                             values='TotalCost',
                             color='CostRatio',
                             color_continuous_scale='Reds',
                             title='Cost Composition by Dish (Size = Total Cost, Color = Cost Ratio %)')
    fig_treemap.update_layout(paper_bgcolor="#f8fafc", plot_bgcolor="#f8fafc")
    charts['cost_composition'] = json.dumps(fig_treemap, cls=plotly.utils.PlotlyJSONEncoder)


    return render_template('expenses.html',
                           kpis=expense_kpis,
                           charts=charts,
                           dishes=dish_analysis.to_dict('records'),
                           categories=["All"] + sorted(df['Category'].unique().tolist()),
                           start_date=start_date.strftime("%Y-%m-%d"),
                           end_date=end_date.strftime("%Y-%m-%d"),
                           selected_category=request.form.get('category', 'All'))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)