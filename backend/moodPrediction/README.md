# Code Manual nn_emotion

Project: Discovering Relationships via Exploratory Analysis of Mood and Sleep using LLMs and Statistical Models (DREAMS (LLMs))

Author: Darian Hamel

Purpose: Predict next-day mood from journal-derived features.

## Overview

This README is specifically for nn_emotion. 

Currently to run with the synthetic dataset and get all the results - run `python3 test.py`

PLEASE NOTE: You must do the emotion and event extraction as found in `test.py` and feed that into the model correctly - follow the same flow as seen. 

Some performance may be seen in predictions by improving/modifying the event_labels to be more granular to capture more depth of events.

```python
emotion_labels, events_per_entry = extract_emotion_events(journal_entries)

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
```

This code trains a neural network to predict the next day’s mood using sequences of events, emotions, and sleep data extracted from journal entries. It supports two model types:

* LSTM-based model (for when the dataset is large enough)

* Feed-forward neural network (performs better on smaller datasets)

The prediction output is a probability distribution over five mood classes:
* 0=Worst, 1=Bad, 2=Neutral, 3=Good, 4=Best.
    * Note: This could be mapped to the 3 mood classes.

# How the Model Works

## 1. Feature Engineering:

Uses yesterday’s mood, emotion, sleep, and events + today’s mood, emotion, sleep, and events to create sequences.

The target is the next day’s mood.

## 2. Vocabulary Creation:

Tokens are created for all features (e.g., "yesterday_mood_3", "today_emotion_happy").

A vocabulary maps each token to an integer for model input.

## 3. Encoding & Padding:

Sequences are encoded using the vocabulary.

Sequences are padded to match batch length using PyTorch’s pad_sequence.

## 4. Model Selection:

EmotionNN (feed forward) for smaller datasets.

EmotionLSTM for larger datasets.

## 5. Training & Validation:

Data is split into training and validation sets (default 85/15 split) - this was best as the dataset was small but could be reduced to a 70/30 split as data size increases.

Uses AdamW optimizer and cross-entropy loss.

Tracks training and validation loss to monitor overfitting/underfitting.

## 6. Evaluation:

Generates precision, recall, F1-scores for each mood class.

Maps mood into negative/neutral/positive sentiment for an alternate evaluation.

Optional graph plotting to visualize accuracy and probability distributions.

## 7. Prediction:

After training, the model predicts the probability of each mood given the last journal entry.

Results are shown as top-k probable moods.

# Running the Code
`emotion_labels`, `events_per_entry`, `mood_labels` and `sleep_labels` are all lists - with an expected minimum length of 3 and that they are correctly aligned with each other.

Increase the `epochs` will increase the training on the specific set of data, but be careful and watch the loss graphs carefully as you can easily overfit the data increasing this.


## Train from Scratch:
* If you wanted a new model, you would call this function
```python
model, vocab = train_model(
    emotion_labels, events_per_entry, mood_labels, sleep_labels, 
    num_epochs=50, batch_size=4
)
```

## Continue Training
* If you already have a trained model, call the function as such and adjust the `epochs` if necessary
```python
model, vocab = continue_training(
    model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels,
    num_epochs=10
)
```

## Predictions of next mood
Creating the input sequence can be done by calling `create_input_sequence` and taking the last sequence that is returned

This will return a list of the 5 moods and the probability of each prediction.
```python
predictions = predict_next_mood(model, vocab, last_sequence)
```

# Saving and Loading the Model
## At the end of training:
* After training the model, you may want to save it so that it does not need to be retrained, do so with the `save_model(model, vocab, file_path)` method as seen below
```python
model, vocab = train_model(emotion_labels, events_per_entry, mood_labels, sleep_labels)
save_model(model, vocab, "mood_model.pth")
```

## To load and predict:
* In order to load the saved model call the `load_model(file_path)` with the path to the file and then you can predict the mood or continue training the model
```python
model, vocab = load_model("mood_model.pth", model_class=EmotionNN)
predictions = predict_next_mood(model, vocab, last_sequence)
```

## To continue training:
* You might want to save after if the training was beneficial - if so, use the `save_model(model, vocab, file_path)` method
```python
model, vocab = load_model("mood_model.pth", model_class=EmotionNN)
model, vocab = continue_training(model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels)
# save_model(model, vocab, "mood_model.pth")
```

# File Structure
* Model Classes: EmotionLSTM, EmotionNN
* Dataset Handling: MoodSequenceDataset, build_vocab, encode_sequences, collate_fn
* Training: train_model, continue_training, __train_model
    * __train_model is meant to be a private method, called by train_model and continue_training
* Evaluation: evaluate_model, evaluate_model_post_training, pre_evaluate_model
* Prediction: predict_next_mood
* Helpers: create_sequence, split_sequences, plot_loss, to_sentiment