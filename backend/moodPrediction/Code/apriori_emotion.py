import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

# https://www.geeksforgeeks.org/machine-learning/implementing-apriori-algorithm-in-python/

# Apriori algorithm for finding frequent itemsets and association rules in emotion-event data
# Prints frequent itemsets and association rules with minimum support and confidence
def apriori_emotion_event_associations(df, min_supp=0.1, min_confidence=0.3, max_len=3):
    transactions = [
        ['mood_' + str(mood)] + list(set(events)) 
        for mood, events in zip(df['Mood'], df['Events'])
    ]
    # Convert transactions to a one-hot encoded DataFrame
    transaction_encoder = TransactionEncoder()
    transaction_encoder_array = transaction_encoder.fit(transactions).transform(transactions) 
    df_encoded = pd.DataFrame(transaction_encoder_array, columns=transaction_encoder.columns_)

    frequent_itemsets = apriori(df_encoded, min_support=min_supp, use_colnames=True, max_len=max_len)
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=min_confidence)

    print_results(frequent_itemsets, rules)

# Helper function to print frequent itemsets and rules
def print_results(frequent_itemsets, rules):
    print("\nFrequent Itemsets:")
    print(frequent_itemsets.shape[0])
    print(frequent_itemsets.head())

    print("\nAssociation Rules:")
    print(rules.shape[0])
    print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']].sort_values('confidence', ascending=False).head(5))

    # Is emotion in antecedent (joy -> events)
    # Antecedent thing or event that existed before or logically precedes another.
    joy_rules = rules[
        rules['antecedents'].apply(lambda x: ('mood_4' or 'mood_3') in x)
    ]

    # Or emotion is consequent (events -> joy)
    # Consequent thing that follows logically from another.
    joy_triggering_rules = rules[
        rules['consequents'].apply(lambda x: ('mood_4' or 'mood_3') in x)
    ]

    # Display top 10 rules for joy in antecedents and consequents
    print("\nTop 10 rules for joy in antecedents and consequents:")
    if(len(joy_rules) == 0):
        print("No rules found for joy in antecedents.")
    else:
        print(joy_rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']].sort_values('confidence', ascending=False).head(10))
    if(len(joy_triggering_rules) == 0):
        print("No rules found for joy in consequents.")
    else:
        print(joy_triggering_rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']].sort_values('confidence', ascending=False).head(10))


    print("\nAll antecedent/consequent items used:")
    items = set().union(*rules['antecedents'].tolist(), *rules['consequents'].tolist())
    print(items)
