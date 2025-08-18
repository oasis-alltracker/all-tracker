from prefixspan import PrefixSpan

# https://pypi.org/project/prefixspan/

# PrefixSpan algorithm for finding frequent patterns in sequences with minimum length of 3
def run_prefixspan(emotions_per_entry, min_support=3, pattern_length_min=3):
    windows = sliding_windows(emotions_per_entry, window_size=4) # Sliding windows of size 4

    sequences = [e for e in windows if isinstance(e, list) and len(e) > 0] # filter out empty sequences
    ps = PrefixSpan(sequences) # PrefixSpan instance with the sequences
    patterns = ps.frequent(min_support) # Get frequent patterns with minimum support
    patterns = [(support, pattern) for support, pattern in patterns if len(pattern) >= pattern_length_min] # filter patterns by length
    return sorted(patterns, key=lambda x: -x[0])  # sort by support descending 


def sliding_windows(sequence, window_size=4, step=1): # Create sliding windows of a given size
    return [sequence[i:i+window_size] for i in range(0, len(sequence)-window_size+1, step)] # Return windows of the sequence with specified size and step

