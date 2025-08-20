import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder

# Custom dataset using only sleep and mood scores
class SleepMoodDataset(Dataset):
    def __init__(self, sleep_scores, mood_scores):
        self.sequences, self.targets = self.create_sequences(sleep_scores, mood_scores)
        flat_tokens = [token for seq in self.sequences for token in seq]
        self.encoder = LabelEncoder()
        self.encoder.fit(flat_tokens)

        # Encode sequences
        self.encoded_sequences = [self.encoder.transform(seq) for seq in self.sequences]
        self.encoded_sequences = torch.tensor(self.encoded_sequences, dtype=torch.long)

        # Convert targets to tensor
        self.targets = torch.tensor(self.targets, dtype=torch.long)

    def create_sequences(self, sleep_scores, mood_scores):
        sequences = []
        targets = []
        for i in range(2, len(mood_scores)):
            seq = [
                "sleep_yesterday_" + str(sleep_scores[i - 2]),
                "mood_yesterday_" + str(mood_scores[i - 2]),
                "sleep_today_" + str(sleep_scores[i - 1]),
                "mood_today_" + str(mood_scores[i - 1])
            ]
            sequences.append(seq)
            targets.append(mood_scores[i])
        return sequences, targets

    def __len__(self):
        return len(self.encoded_sequences)

    def __getitem__(self, idx):
        return self.encoded_sequences[idx], self.targets[idx]


# Feed Forward Neural Network
class SleepMoodNN(nn.Module):
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
        embedded = self.embedding(x)  # (batch, seq_len, emb)
        pooled = embedded.mean(dim=1)  
        return self.fully_connected(pooled)


def to_sentiment(mood):
    if mood in [0, 1]:
        return 0  # Negative
    elif mood == 2:
        return 1  # Neutral
    else:
        return 2  # Positive


# Training and evaluation
# Train function
# Takes as input a list of mood and sleep labels (assumes that they are aligned)
# Creates the sequences, encodes them for the model and splits into training/validation data
# Loads the data for the NN and then trains on the training data
# Evaluates the NN on the validation data and predicts the mood for the next day based on the last entry in sequences
def train_model_simple(sleep_scores, mood_scores, num_epochs=50, batch_size=4):
    return __train_model(model=None, mood_scores=mood_scores, sleep_scores=sleep_scores, init=True, num_epochs=num_epochs, batch_size=batch_size)


def continue_training_simple(model, mood_scores, sleep_scores, num_epochs=10, batch_size=4):
    return __train_model(model=model, mood_scores=mood_scores, sleep_scores=sleep_scores, init=False, num_epochs=num_epochs, batch_size=batch_size)



# Train function
# Takes as input a list of mood and sleep labels (assumes that they are aligned)
# Creates the sequences, encodes them for the model and splits into training/validation data
# Loads the data for the NN and then trains on the training data
# Evaluates the NN on the validation data and predicts the mood for the next day based on the last entry in sequences
def __train_model(model, mood_scores, sleep_scores, init=True, num_epochs=10, batch_size=4):
    dataset = SleepMoodDataset(sleep_scores, mood_scores)
    split = int(0.85 * len(dataset))
    train_set = torch.utils.data.Subset(dataset, range(0, split))
    val_set = torch.utils.data.Subset(dataset, range(split, len(dataset)))
    train_loader = DataLoader(train_set, batch_size=batch_size, shuffle=False)
    val_loader = DataLoader(val_set, batch_size=batch_size, shuffle=False)

    if(init):
        model = SleepMoodNN(vocab_size=len(dataset.encoder.classes_))

    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
    optimizer = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)
    train_losses, val_losses = [], []

    model.train()
    for epoch in range(num_epochs):
        total_loss = 0
        for batch_x, batch_y in train_loader:
            optimizer.zero_grad()
            output = model(batch_x)
            loss = criterion(output, batch_y)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        train_losses.append(total_loss)

        val_loss = 0
        model.eval()
        with torch.no_grad():
            for batch_x, batch_y in val_loader:
                val_output = model(batch_x)
                val_loss += criterion(val_output, batch_y).item()
        model.train()
        val_losses.append(val_loss)

    evaluate_model(model, val_loader)
    return model




def evaluate_model(model, dataloader):
    model.eval()
    all_preds, all_targets, all_confidences, all_prob_distributions = [], [], [], []
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
    print("\nRNN (LSTM) Report:")
    print("Precision = True Positive / (True Positive + False Positive)")
    print("Recall = True Positive / (True Positive + False Negative)")
    print("F1-Score = 2 * (Precision * Recall) / (Precision + Recall)")
    print(classification_report(all_targets, all_preds, labels=[0,1,2,3,4], target_names=mood_names, zero_division=0))

    mapped_targets = [to_sentiment(target) for target in all_targets]


    print("\nMapped Sentiment Report:")
    probs_tensor = torch.tensor(all_prob_distributions)  # [N, 5]
    sentiment_probs = torch.zeros((probs_tensor.shape[0], 3))
    sentiment_probs[:, 0] = probs_tensor[:, 0] + probs_tensor[:, 1]  # Negative
    sentiment_probs[:, 1] = probs_tensor[:, 2]                       # Neutral
    sentiment_probs[:, 2] = probs_tensor[:, 3] + probs_tensor[:, 4]  # Positive

    # Weighted sentiment score: Negative = -1, Neutral = 0, Positive = +1

    # Round weighted scores to nearest sentiment class for predicted sentiment
    weighted_preds = torch.argmax(sentiment_probs, dim=1).tolist() 
    sentiment_names = ["Negative", "Neutral", "Positive"]
    # Convert probabilities to sentiment-level
    probs_tensor = torch.tensor(all_prob_distributions)  # [N, 5]
    sentiment_probs = torch.zeros((probs_tensor.shape[0], 3))
    sentiment_probs[:, 0] = probs_tensor[:, 0] + probs_tensor[:, 1]  # Negative
    sentiment_probs[:, 1] = probs_tensor[:, 2]                       # Neutral
    sentiment_probs[:, 2] = probs_tensor[:, 3] + probs_tensor[:, 4]  # Positive

    # Weighted sentiment score: Negative = -1, Neutral = 0, Positive = +1

    # Round weighted scores to nearest sentiment class for predicted sentiment
    weighted_preds = torch.argmax(sentiment_probs, dim=1).tolist() 
    print(classification_report(mapped_targets, weighted_preds, labels=[0,1,2], target_names=["Negative", "Neutral", "Positive"], zero_division=0))

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


def evaluate_model_post_training_simple(model, mood_scores, sleep_scores):
    dataset = SleepMoodDataset(sleep_scores, mood_scores)
    val_loader = DataLoader(dataset, batch_size=4, shuffle=False)
    evaluate_model(model, val_loader)


def pre_evaluate_model_simple(model, mood_scores, sleep_scores):
    dataset = SleepMoodDataset(sleep_scores, mood_scores)
    split = int(0.85 * len(dataset))
    val_set = torch.utils.data.Subset(dataset, range(split, len(dataset)))
    val_loader = DataLoader(val_set, batch_size=4, shuffle=False)

    evaluate_model(model, val_loader)
