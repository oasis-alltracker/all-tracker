from transformers import pipeline
import json
import pandas as pd
import matplotlib.pyplot as plt
from apriori_emotion import apriori_emotion_event_associations
from prefixspan_emotion import run_prefixspan
from nn_emotion import train_model, continue_training, pre_evaluate_model, evaluate_model_post_training, save_model, load_model
from nn_simplest import train_model_simple, continue_training_simple, evaluate_model_post_training_simple, pre_evaluate_model_simple
from llm_prompting import predict_moods_llm
from stats_all import run_all_statistical_models
from sklearn.preprocessing import MultiLabelBinarizer
from precomputed_data import events_per_entry, emotion_labels, events_per_entry_alex, emotion_labels_alex, events_per_entry_brooke, emotion_labels_brooke, events_per_entry_cameron, emotion_labels_cameron
from precomputed_data import events_per_entry_isabella, emotion_labels_isabella, events_per_entry_jamal, emotion_labels_jamal, events_per_entry_taylor, emotion_labels_taylor
from journal_entries import journal_entries, mood_scales, sleep_score, journal_entries_alex, mood_scales_alex, sleep_score_alex, journal_entries_brooke, mood_scales_brooke, sleep_score_brooke, journal_entries_cameron, mood_scales_cameron, sleep_score_cameron
from journal_entries import journal_entries_isabella, mood_scales_isabella, sleep_score_isabella, journal_entries_jamal, mood_scales_jamal, sleep_score_jamal, journal_entries_taylor, mood_scales_taylor, sleep_score_taylor
# https://huggingface.co/docs/transformers/en/main_classes/pipelines
# https://docs.pytorch.org/docs/stable/index.html

SAVED = True
save_path = "precomputed_data.py"


# To gain events from the day, we use zero-shot classification to categorize the journal entries into predefined categories.
# This is simplified to assess if the different methods can be applied to the events detected in the entries.
event_labels = [
    "Working on tasks and projects",
    "Creative activities like art or writing",
    "Learning something new or studying",
    "Solving problems or working on personal projects",
    "Spending time with friends or socializing",
    "Helping others or caregiving responsibilities",
    "Receiving kindness or positive gestures from others",
    "Experiencing conflict or negative social situations",
    "Exercising or moving your body",
    "Spending time outdoors or in nature",
    "Commuting or traveling to places",
    "Cooking meals or preparing food",
    "Cleaning or organizing the living space",
    "Taking care of personal hygiene or grooming",
    "Watching TV, movies, or online videos",
    "Playing games or engaging in playful activities",
    "Relaxing, resting, or taking downtime",
    "Writing in a journal or reflecting on experiences",
    "Practicing meditation or mindfulness exercises",
    "Romantic activities or intimate moments",
    "Celebrating special occasions or events",
    "Running errands or doing administrative tasks",
    "Listening to music or singing",
    "Interacting with pets or caring for animals",
    "Shopping in stores or online",
    "Spending time with family or parenting activities",
    "Managing work stress or deadlines",
    "Handling finances or paying bills",
    "Spiritual or religious activities",
    "Appreciating art, concerts, or cultural events",
    "Going to healthcare appointments or taking medication",
    "Processing emotions or focusing on mental health",
    "Working on personal growth or setting goals",
    "Uncategorized"
]


# Extract emotion labels and events from journal entries using emotion classification and zero-shot classification
# Returns a list of emotion labels and a list of events per entry
def extract_emotion_events(journal_entries):
    emotion_labels_list = []
    events_per_entry_list = []
    for entry in journal_entries:
        results = emotion_classifier(entry)[0]
        top = max(results, key=lambda x: x['score'])
        emotion_labels_list.append(top['label'])
        
        result = zero_shot_classifier(entry, event_labels)
        filtered_events = [label for label, score in zip(result['labels'], result['scores']) if score > threshold]
        if not filtered_events:
            filtered_events = ['Uncategorized']
        events_per_entry_list.append(filtered_events)
    return emotion_labels_list, events_per_entry_list

# Analyze mood data by counting occurrences of each mood class and plotting the distribution
# Displays a bar chart with percentage labels on top of each bar
def analyze_mood_data(all_mood_scores):
    counts = [all_mood_scores.count(i) for i in range(5)]
    total = sum(counts)

    percentages = [(count / total) * 100 for count in counts]

    # Plot
    fig, ax = plt.subplots()
    bars = ax.bar(range(5), counts, color='skyblue')

    # Add percentage labels on top of bars
    for bar, pct in zip(bars, percentages):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, height + 0.5, f'{pct:.1f}%', ha='center', va='bottom')

    ax.set_xlabel('Mood Class (0=Worst, 4=Best)')
    ax.set_ylabel('Count')
    ax.set_title('Mood Distribution with Percentage Labels')
    plt.show()

# Analyze events data by calculating frequency of each event on high and low mood days
# Computes the percentage of days each event occurs on high mood days, low mood days, and overall
# Also calculates lift values to see how much more likely an event is to occur on high or low mood days compared to overall
# Prints out the results from the analysis
def analyze_events_data(all_users_events):
    mlb = MultiLabelBinarizer(classes=event_labels)
    event_matrix = mlb.fit_transform(all_users_events)
    events_df = pd.DataFrame(event_matrix, columns=event_labels)
    mood_series = pd.Series(all_mood_scores, name='Mood')
    mood_events_df = pd.concat([mood_series, events_df], axis=1)

    # Filter for high and low mood days
    high_mood_df = mood_events_df[mood_events_df['Mood'] >= 3].drop(columns=['Mood'])
    low_mood_df = mood_events_df[mood_events_df['Mood'] <= 1].drop(columns=['Mood'])
    all_events_df = mood_events_df.drop(columns=['Mood'])
    print("Number of high mood days:", len(high_mood_df))
    print("Number of low mood days:", len(low_mood_df))
    print("Total Number of days:", len(all_events_df))

    # Total counts
    total_days = len(mood_events_df)
    high_days = len(high_mood_df)
    low_days = len(low_mood_df)

    # Frequency counts
    high_counts = high_mood_df.sum()
    low_counts = low_mood_df.sum()
    total_counts = all_events_df.sum()

    # Frequencies (percent of days with event)
    high_freq = high_counts / high_days
    low_freq = low_counts / low_days
    total_freq = total_counts / total_days

    # Lift: how much more likely an event happens on high mood days
    lift_high = high_freq / total_freq
    lift_low = low_freq / total_freq

    # Results DataFrame
    results_df = pd.DataFrame({
        'High Mood %': (high_freq * 100).round(2),
        'Low Mood %': (low_freq * 100).round(2),
        'Overall %': (total_freq * 100).round(2),
        'Lift (High Mood)': lift_high.round(2),
        'Lift (Low Mood)': lift_low.round(2)
    }).sort_values('Lift (High Mood)', ascending=False)

    print(results_df)

# Compute and save precomputed data for events and emotions
# This function extracts events and emotions from journal entries and saves them to a file
# It creates a Python file with lists of events and emotions for each user
# This allowed for faster testing and development without needing to re-extract data each time
def compute_data():
    def write_list(var_name, data_list):
        f.write(f"{var_name} = ")
        json.dump(data_list, f, ensure_ascii=False, indent=2)
        f.write("\n\n")
    
    events_per_entry = []
    events_per_entry_alex = []
    events_per_entry_brooke = []
    events_per_entry_cameron = []
    events_per_entry_isabella = []
    events_per_entry_jamal = []
    events_per_entry_taylor = []

    # Get top emotion per entry
    emotion_labels = []
    emotion_labels_alex = []
    emotion_labels_brooke = []
    emotion_labels_cameron = []
    emotion_labels_isabella = []
    emotion_labels_jamal = []
    emotion_labels_taylor = []

    emotion_labels, events_per_entry = extract_emotion_events(journal_entries)
    emotion_labels_alex, events_per_entry_alex = extract_emotion_events(journal_entries_alex)
    emotion_labels_brooke, events_per_entry_brooke = extract_emotion_events(journal_entries_brooke)
    emotion_labels_cameron, events_per_entry_cameron = extract_emotion_events(journal_entries_cameron)
    emotion_labels_isabella, events_per_entry_isabella = extract_emotion_events(journal_entries_isabella)
    emotion_labels_jamal, events_per_entry_jamal = extract_emotion_events(journal_entries_jamal)
    emotion_labels_taylor, events_per_entry_taylor = extract_emotion_events(journal_entries_taylor)


    with open(save_path, "w", encoding="utf-8") as f:
        f.write("# Precomputed events_per_entry and emotion_labels lists\n")
        f.write("# This file is auto-generated. Do not edit manually unless you know what you're doing.\n\n")

        # Helper function to write list as valid Python syntax

        # Save each list
        write_list("events_per_entry", events_per_entry)
        write_list("emotion_labels", emotion_labels)

        write_list("events_per_entry_alex", events_per_entry_alex)
        write_list("emotion_labels_alex", emotion_labels_alex)

        write_list("events_per_entry_brooke", events_per_entry_brooke)
        write_list("emotion_labels_brooke", emotion_labels_brooke)

        write_list("events_per_entry_cameron", events_per_entry_cameron)
        write_list("emotion_labels_cameron", emotion_labels_cameron)

        write_list("events_per_entry_isabella", events_per_entry_isabella)
        write_list("emotion_labels_isabella", emotion_labels_isabella)

        write_list("events_per_entry_jamal", events_per_entry_jamal)
        write_list("emotion_labels_jamal", emotion_labels_jamal)

        write_list("events_per_entry_taylor", events_per_entry_taylor)
        write_list("emotion_labels_taylor", emotion_labels_taylor)

    print(f"Saved precomputed lists to {save_path}")


# Main Function
if __name__ == "__main__":
    if(not SAVED):
        # Load emotion classification model
        emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)
        # Load zero-shot classification model
        zero_shot_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        threshold = 0.1  # Threshold for confidence filtering
        compute_data()
    else:
        print("Data has been generated already, loading the model and continuing with analysis")
        model, vocab = load_model("mood_model.pth")



    # Use apriori algorithm to find associations between emotions and events
    print("==" * 40)
    apriori_emotion_event_associations(pd.DataFrame({'Mood': mood_scales, 'Emotion': emotion_labels,'Events': events_per_entry}))
    print("\nEnd of Apriori Associations\n")
    print("==" * 40)

    # Use PrefixSpan to find frequent patterns in the emotion labels (Sequential Pattern Mining)
    prefix_patterns = run_prefixspan(mood_scales, pattern_length_min=3)
    print("\nTop frequent patterns from PrefixSpan:")
    for support, pattern in prefix_patterns[:10]:
        print(f"Support: {support}, Pattern: {pattern}")
    print("\nEnd of PrefixSpan patterns\n")


    # This is the main part of the project where we train a neural network to predict future emotions based on past entries
    # This was the best performing model in terms of accuracy and generalization
    # Train a Neural Network with emotion and event context to predict future emotions based on past entries
    print("==" * 40)
    print("\nStarting Dataset for ")
    if(not SAVED):
        model, vocab = train_model(emotion_labels, events_per_entry, mood_scales, sleep_score)
        model, vocab = continue_training(model, vocab, emotion_labels_alex, events_per_entry_alex, mood_scales_alex, sleep_score_alex, num_epochs=10, batch_size=4)
        model, vocab = continue_training(model, vocab, emotion_labels_cameron, events_per_entry_cameron, mood_scales_cameron, sleep_score_cameron, num_epochs=10, batch_size=4)
        model, vocab = continue_training(model, vocab, emotion_labels_isabella, events_per_entry_isabella, mood_scales_isabella, sleep_score_isabella, num_epochs=10, batch_size=4)
        model, vocab = continue_training(model, vocab, emotion_labels_jamal, events_per_entry_jamal, mood_scales_jamal, sleep_score_jamal, num_epochs=10, batch_size=4)
        model, vocab = continue_training(model, vocab, emotion_labels_taylor, events_per_entry_taylor, mood_scales_taylor, sleep_score_taylor, num_epochs=10, batch_size=4)
        print("\nRetesting model after additional training")
    print("\nEvaluating model after training on split data vs unsplit data")
    pre_evaluate_model(model, vocab, emotion_labels, events_per_entry, mood_scales, sleep_score)
    evaluate_model_post_training(model, vocab, emotion_labels, events_per_entry, mood_scales, sleep_score)
    print("Testing on an unseen dataset... Hopefully better than 33% accuaracy... Leave out Brooke")
    evaluate_model_post_training(model, vocab, emotion_labels_brooke, events_per_entry_brooke, mood_scales_brooke, sleep_score_brooke)
    print("==" * 40)
    print("\nEnd of Neural Network Forecaster Training\n")

    if(not SAVED):
        print("Saving model...")
        save_model(model, vocab, "mood_model.pth")


    # Train a random forest classifier and evaluate its performance along with trying other statistical models
    print("==" * 40)
    results = run_all_statistical_models(events_per_entry, emotion_labels, sleep_score, mood_scales)
    print(results)

    all_mood_scores = mood_scales + mood_scales_alex + mood_scales_brooke + mood_scales_cameron + mood_scales_isabella + mood_scales_jamal + mood_scales_taylor
    analyze_mood_data(all_mood_scores)


    all_users_events = events_per_entry + events_per_entry_alex + events_per_entry_brooke + events_per_entry_cameron + events_per_entry_isabella + events_per_entry_jamal + events_per_entry_taylor
    analyze_events_data(all_users_events)


    # Train a simple feed forward neural network to predict moods based on sleep scores
    print("==" * 40)
    print("\nStarting Dataset")
    model = train_model_simple(mood_scales, sleep_score)
    model = continue_training_simple(model, mood_scales_alex, sleep_score_alex, num_epochs=10, batch_size=4)
    model = continue_training_simple(model, mood_scales_cameron, sleep_score_cameron, num_epochs=10, batch_size=4)
    model = continue_training_simple(model, mood_scales_isabella, sleep_score_isabella, num_epochs=10, batch_size=4)
    model = continue_training_simple(model, mood_scales_jamal, sleep_score_jamal, num_epochs=10, batch_size=4)
    model = continue_training_simple(model, mood_scales_taylor, sleep_score_taylor, num_epochs=10, batch_size=4)
    print("\nRetesting model after additional training")
    print("\nEvaluating model after training on split data vs unsplit data")
    pre_evaluate_model_simple(model, mood_scales, sleep_score)
    evaluate_model_post_training_simple(model, mood_scales, sleep_score)
    evaluate_model_post_training_simple(model, mood_scales_brooke, sleep_score_brooke)
    print("==" * 40)



    print("\n\nLLM Prompting Reports:")
    predict_moods_llm(sleep_score, mood_scales, events_per_entry, journal_entries)
    predict_moods_llm(sleep_score_brooke, mood_scales_brooke, events_per_entry_brooke, journal_entries_brooke)
