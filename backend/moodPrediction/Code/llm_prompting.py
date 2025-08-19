from transformers import pipeline
from sklearn.metrics import classification_report

# Initialize generator once (can swap model as needed)
generator = pipeline(
    task="text2text-generation", 
    model="google/flan-t5-base",  
    device=-1  
)

# Prompt message template for the LLM
prompt_template = (
    "Yesterday: sleep={sleep_yesterday}, mood={mood_yesterday}, events: {events_yesterday}, yesterday's journal: {yesterday_journal}\n"
    "Today: sleep={sleep_today}, mood={mood_today}, events: {events_today}, today's journal: {today_journal}\n"
    "What will tomorrow's mood be (0–2)? 0 for negative, 1 for neutral, 2 for positive. "
    "Just answer with a number in that range."
)

# Function to predict next day's mood using LLM
# Takes sleep, mood, events, and journal entries for yesterday and today
# Returns predicted mood as an integer (0, 1, or 2)
def predict_next_mood(sleep_yesterday, mood_yesterday, events_yesterday, yesterday_journal, sleep_today, mood_today, events_today, today_journal):
    prompt = prompt_template.format(
        sleep_yesterday=sleep_yesterday,
        mood_yesterday=mood_yesterday,
        events_yesterday=", ".join(events_yesterday),
        yesterday_journal=yesterday_journal,
        sleep_today=sleep_today,
        mood_today=mood_today,
        events_today=", ".join(events_today),
        today_journal=today_journal,
    )
    output = generator(prompt, max_new_tokens=10, do_sample=False)[0]["generated_text"].strip()
    try:
        val = int(output.split()[0])
        return max(0, min(2, val))  # clamp to 0-2 range as we want mapped moods
    except ValueError:
        return None

# Function to predict moods for a sequence of days using the LLM
# Takes lists of sleep scores, mood scales, events per entry, and journal entries
# Returns (and prints) a classification report comparing predicted moods to actual moods
# Uses the predict_next_mood function to generate predictions
def predict_moods_llm(sleep_scores, mood_scales, events_per_entry, journal_entries):
    preds, truth = [], []
    for i in range(2, len(mood_scales)):
        pred = predict_next_mood(
            sleep_scores[i-2], mood_scales[i-2], events_per_entry[i-2], journal_entries[i-2],
            sleep_scores[i-1], mood_scales[i-1], events_per_entry[i-1], journal_entries[i-1]
        )
        if pred is not None:
            preds.append(pred)
            truth.append(mood_scales[i])
    report = classification_report(truth, preds, digits=2, zero_division=0)
    print(report)
    return report

