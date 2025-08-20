import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, Dataset
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report
from torch.nn.utils.rnn import pad_sequence
from collections import Counter
from itertools import chain

# https://docs.pytorch.org/docs/stable/index.html
# https://www.geeksforgeeks.org/deep-learning/long-short-term-memory-networks-using-pytorch/
# https://www.geeksforgeeks.org/machine-learning/time-series-forecasting-using-recurrent-neural-networks-`rnn`-in-tensorflow/

# Constant values for testing model
GRAPHS = True
LSTM = False

# Mood Dataset
class MoodSequenceDataset(Dataset):
    def __init__(self, sequences, targets):
        self.sequences = sequences
        self.targets = targets

    def __len__(self):
        return len(self.sequences)

    def __getitem__(self, index):
        return self.sequences[index], self.targets[index]

# LSTM Model that (should) work better if there is more data
class EmotionLSTM(nn.Module):
    def __init__(self, vocab_size, embedding_dim=32, hidden_dim=32, output_dim=0):
        super(EmotionLSTM, self).__init__() # Initialize the LSTM model
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=0) # Lookup table for token embeddings
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True) # Long Short-Term Memory layer
        self.fully_connected = nn.Sequential(
            nn.Linear(hidden_dim, 32),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(32, output_dim)) 
        
    def forward(self, x):
        embedded = self.embedding(x) # Convert token indices to embeddings
        _, (hidden, _) = self.lstm(embedded) # Pass embeddings through LSTM 
        out = self.fully_connected(hidden.squeeze(0)) # Get the last hidden state and apply linear layer
        return out


# Simple feed forward neural network to address overfitting of LSTM
class EmotionNN(nn.Module):
    def __init__(self, vocab_size, embedding_dim=32, hidden_dim=32, output_dim=5):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=0)
        self.fully_connected = nn.Sequential(
            nn.Linear(embedding_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden_dim, output_dim)
        )

    def forward(self, x):
        embedded = self.embedding(x) 
        pooled = embedded.mean(dim=1)  
        return self.fully_connected(pooled)
    
# Helper functions for building vocabulary and encoding sequences
def build_vocab(sequences):
    flatend_seq = list(chain.from_iterable(sequences))
    counter = Counter(flatend_seq)
    vocab = {token: index+1 for index, token in enumerate(counter.keys())}
    vocab['<PAD>'] = 0
    return vocab

def encode_sequences(sequences, vocab):
    return [[vocab[token] for token in seq if token in vocab] for seq in sequences]

def collate_fn(batch):
    sequences, targets = zip(*batch)
    sequences = pad_sequence([torch.tensor(s) for s in sequences], batch_first=True)
    targets = torch.tensor(targets)
    return sequences, targets

# Save the model to the specified filepath location or defaults to current folder and named "mood_model.pth"
def save_model(model, vocab, filepath="mood_model.pth"):
    torch.save({
        'model_state_dict': model.state_dict(),
        'vocab': vocab
    }, filepath)
    print(f"Model saved to {filepath}")

# Load the model from a saved filepath with specified model class - for current dataset, EmotionNN is used
def load_model(filepath="mood_model.pth", embedding_dim=32, hidden_dim=32, output_dim=5):
    checkpoint = torch.load(filepath, map_location=torch.device('cpu'))
    vocab = checkpoint['vocab']
    vocab_size = len(vocab)
    print("Vocab size is: ", vocab_size)
    if(LSTM):
        model = EmotionLSTM(vocab_size=vocab_size, embedding_dim=embedding_dim, hidden_dim=hidden_dim, output_dim=output_dim)
    else:
        model = EmotionNN(vocab_size=vocab_size, embedding_dim=embedding_dim, hidden_dim=hidden_dim, output_dim=output_dim)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()
    print(f"Model loaded from {filepath}")
    return model, vocab

# Maps mood from a 0-4 scale to a 0-2 scale for better accuracy
# Difference between Worse and Bad/Best and Good 
# are not that important than general upward or downward trends
def to_sentiment(mood):
    if mood in [0, 1]:
        return 0  # Negative
    elif mood == 2:
        return 1  # Neutral
    else:
        return 2  # Positive

# Creates the sequence of yesterdays events/emotion/mood/sleep and todays events/emotion/mood/sleep
# and the targets (next day mood) for each sequence
def create_sequence(emotion_labels, events_per_entry, mood_labels, sleep_labels):
    sequences = [[f"yesterday_mood_{mood_yesterday}", f"yesterday_emotion_{emotion_yesterday}, sleep_yesterday_{sleep_yesterday}"] + yesterday_events + 
        [f"today_mood_{mood_today}", f"today_emotion_{emotion_today}", f"sleep_today_{sleep_today}"] + today_events
        for mood_yesterday, mood_today, emotion_yesterday, emotion_today, yesterday_events, today_events, sleep_today, sleep_yesterday
        in zip(mood_labels[:-2], mood_labels[1:-1], emotion_labels[:-2], emotion_labels[1:-1], events_per_entry[:-2], events_per_entry[1:-1], sleep_labels[1:-1], sleep_labels[:-2])]
    targets = mood_labels[2:]
    return sequences, targets
    
# Splits the sequences into a training set and a validation set
# Adjust split_ratio to train on more/less data, as data grows you can adjust this ratio down
def split_sequences(sequences, targets, split_ratio=0.85):
    split_idx = int(len(sequences) * split_ratio)
    X_train, X_val = sequences[:split_idx], sequences[split_idx:]
    y_train, y_val = targets[:split_idx], targets[split_idx:]
    return X_train, y_train, X_val, y_val

# Helper to map the loss of the model to determine under/overfitting
# If Training loss and validation loss both decrease, model is learning well
# If Training loss decreases and validation loss increases, model is overfitting
# If Training loss increases and validation loss decreases, model is underfitting
def plot_loss(train_losses, val_losses):
    plt.figure(figsize=(8, 4))
    plt.plot(train_losses, label='Train Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training vs Validation Loss Curve')
    plt.legend()
    plt.grid(True)
    plt.show()


def train_model(emotion_labels, events_per_entry, mood_labels, sleep_labels, num_epochs=50, batch_size=4):
    return __train_model(model=None, vocab=[],emotion_labels=emotion_labels, events_per_entry=events_per_entry, mood_labels=mood_labels, sleep_labels=sleep_labels, init=True, num_epochs=num_epochs, batch_size=batch_size)


def continue_training(model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels, num_epochs=10, batch_size=4):
    return __train_model(model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels, init=False, num_epochs=num_epochs, batch_size=batch_size)
        

# Train function
# Takes as input a list of emotions, events, mood and sleep labels (assumes that they are aligned)
# Creates the sequences, encodes them for the model and splits into training/validation data
# Loads the data for the NN and then trains on the training data
# Evaluates the NN on the validation data and predicts the mood for the next day based on the last entry in sequences
# If GRAPHS is set to true, will display graphs of the validation/training loss and the predicted/actual moods with confidence of prediction
def __train_model(model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels, init, num_epochs=50, batch_size=4):
    sequences, targets = create_sequence(emotion_labels, events_per_entry, mood_labels, sleep_labels)
    if(init):
        vocab = build_vocab(sequences)
    else:
        pass # Do Nothing
    encoded = encode_sequences(sequences, vocab)
    encoded_seq = encoded

    X_train, y_train, X_val, y_val = split_sequences(encoded_seq, targets)

    # train_dataset = MoodSequenceDataset(encoded_seq, targets)
    train_dataset = MoodSequenceDataset(X_train, y_train)
    val_dataset = MoodSequenceDataset(X_val, y_val)
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=False, collate_fn=collate_fn)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, collate_fn=collate_fn)

    if(init):
        if(LSTM): # For testing purposes, or if data grows enough for LSTM to become effective
            model = EmotionLSTM(vocab_size=len(vocab), output_dim=5)
        else: # Performs better on smaller datasets
            model = EmotionNN(vocab_size=len(vocab), output_dim=5)

    
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01) # This optimizer can be changed but I found the best results with AdamW

    train_losses, val_losses = [], []
    model.train()
    for epoch in range(num_epochs):
        total_loss = 0
        num_batches = 0
        for batch_x, batch_y in train_loader:
            optimizer.zero_grad()
            output = model(batch_x)
            loss = criterion(output, batch_y)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            num_batches += 1

        avg_train_loss = total_loss / num_batches
        train_losses.append(avg_train_loss)
        # print(f"Epoch {epoch+1}/{num_epochs} - Avg Train Loss: {avg_train_loss:.4f}")

        val_loss = 0
        val_batches = 0
        model.eval()
        with torch.no_grad():
            for batch_x, batch_y in val_loader:
                val_output = model(batch_x)
                val_loss += criterion(val_output, batch_y).item()
                val_batches += 1
        avg_val_loss = val_loss / val_batches
        val_losses.append(avg_val_loss)
        print(f"Epoch {epoch+1}/{num_epochs} - Avg Val Loss: {avg_val_loss:.4f}")
        model.train()

    # evaluate_model(model, val_loader)

    print("Prediction for next mood based on last journal entry:")
    predictions = predict_next_mood(model, vocab, sequences[-1])
    mood_names = ["Worst", "Bad", "Neutral", "Good", "Best"]
    for mood_idx, prob in predictions:
        print(f"{mood_names[mood_idx]}: {prob:.2f}")

    if(GRAPHS):
        plot_loss(train_losses, val_losses)
    
    return model, vocab

# Evaluation
# Evaluates the model based on prediction to the actual value
# Outputs two classification report with Precision, Recall and F1 Score for Mapped and Un-Mapped Moods
# along with graphs if GRAPHS is set to true
def evaluate_model(model, dataloader):
    model.eval()
    all_preds, all_targets, all_confidences = [], [], []
    all_prob_distributions = []  # full probability vector for each sample
    with torch.no_grad():
        for batch_x, batch_y in dataloader:
            outputs = model(batch_x)
            preds = torch.argmax(outputs, dim=1)
            probs = F.softmax(outputs, dim=1)
            all_preds.extend(preds.tolist())
            all_targets.extend(batch_y.tolist())
            all_confidences.extend(torch.max(probs, dim=1).values.tolist())
            all_prob_distributions.extend(probs.tolist())


    mood_names = ["Worst", "Bad", "Neutral", "Good", "Best"]
    print("\nNeural Network (with added Context) Report:")
    print("Precision = True Positive / (True Positive + False Positive)")
    print("Recall = True Positive / (True Positive + False Negative)")
    print("F1-Score = 2 * (Precision * Recall) / (Precision + Recall)")
    print(classification_report(all_targets, all_preds, labels=[0,1,2,3,4],target_names=mood_names, zero_division=0))

    mapped_targets = [to_sentiment(target) for target in all_targets]
    print("\nMapped Sentiment Report:")
    probs_tensor = torch.tensor(all_prob_distributions) 
    sentiment_probs = torch.zeros((probs_tensor.shape[0], 3))
    sentiment_probs[:, 0] = probs_tensor[:, 0] + probs_tensor[:, 1]  # Negative
    sentiment_probs[:, 1] = probs_tensor[:, 2]                       # Neutral
    sentiment_probs[:, 2] = probs_tensor[:, 3] + probs_tensor[:, 4]  # Positive


    # Round weighted scores to nearest sentiment class for predicted sentiment
    weighted_preds = torch.argmax(sentiment_probs, dim=1).tolist() 
    print(classification_report(mapped_targets, weighted_preds, labels=[0,1,2], target_names=["Negative", "Neutral", "Positive"], zero_division=0))
    
    if(GRAPHS):
        sentiment_names = ["Negative", "Neutral", "Positive"]

        # Plotting
        x = list(range(len(mapped_targets)))
        plt.figure(figsize=(14, 6))

        # Plot actual mapped sentiment
        plt.plot(x, mapped_targets, label='Actual Sentiment', color='blue', marker='o', markersize=4)

        # Plot weighted predicted sentiment (rounded)
        plt.plot(x, weighted_preds, label='Weighted Predicted Sentiment', color='orange', marker='x', markersize=4)

        # Mark correct vs incorrect predictions (based on weighted sentiment)
        for i, (true_sent, pred_sent) in enumerate(zip(mapped_targets, weighted_preds)):
            color = 'green' if true_sent == pred_sent else 'red'
            marker = 'o' if true_sent == pred_sent else 'x'
            plt.scatter(i, pred_sent, color=color, s=50, zorder=5, marker=marker)

            # Annotate with sentiment probabilities in percent
            probs_pct = [f"{prob*100:.0f}%" for prob in sentiment_probs[i]]
            plt.text(
                i, pred_sent + 0.1,
                f"Neg:{probs_pct[0]}, Neu:{probs_pct[1]}, Pos:{probs_pct[2]}",
                ha='center', va='bottom', fontsize=6, rotation=45
            )

        plt.xlabel("Sample Index")
        plt.ylabel("Sentiment (0=Negative, 1=Neutral, 2=Positive)")
        plt.yticks(range(3), sentiment_names)
        plt.ylim(-0.3, 2.3)
        plt.title("Actual vs Weighted Predicted Sentiment with Class Probabilities")
        plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()

# Evaluates the model on the entire set of data without splitting
# If used on data that the model has been trained on it will give optimistic metrics as the model has seen the inputs
def evaluate_model_post_training(model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels):
    sequences, targets = create_sequence(emotion_labels, events_per_entry, mood_labels, sleep_labels)

    encoded = encode_sequences(sequences, vocab)
    X = encoded
    y = targets

    val_dataset = MoodSequenceDataset(X, y)
    val_loader = DataLoader(val_dataset, batch_size=4, shuffle=False, collate_fn=collate_fn)

    evaluate_model(model, val_loader)

# Evaluates the model on the training split of data
def pre_evaluate_model(model, vocab, emotion_labels, events_per_entry, mood_labels, sleep_labels):
    sequences, targets = create_sequence(emotion_labels, events_per_entry, mood_labels, sleep_labels)

    encoded = encode_sequences(sequences, vocab)
    X = encoded
    y = targets

    _, _, X_val, y_val = split_sequences(X, y)

    val_dataset = MoodSequenceDataset(X_val, y_val)
    val_loader = DataLoader(val_dataset, batch_size=4, shuffle=False, collate_fn=collate_fn)

    evaluate_model(model, val_loader)


# Inference
# Predicts the mood based on the input sequence, 
# This needs to be generated to be the same as the other sequences
# Creating the input sequence can be done by calling create_input_sequence
# and taking the last sequence that is returned
def predict_next_mood(model, vocab, input_seq, top_k=5):
    model.eval()
    encoded = [vocab.get(token, 0) for token in input_seq]
    tensor = torch.tensor(encoded).unsqueeze(0)
    with torch.no_grad():
        logits = model(tensor)
        probs = F.softmax(logits, dim=1).squeeze(0)
        top_probs, top_indices = torch.topk(probs, top_k)
        return list(zip(top_indices.cpu().numpy(), top_probs.cpu().numpy()))