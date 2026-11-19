// A habit's emoji icon (relaunch). Kept short so a client can't store an
// arbitrary string here; one emoji can be several code units (ZWJ sequences,
// skin tones), so the cap is generous.
const MAX_EMOJI_LENGTH = 16;

function isValidEmoji(emoji) {
  return (
    typeof emoji === "string" &&
    emoji.trim() !== "" &&
    emoji.trim().length <= MAX_EMOJI_LENGTH
  );
}

module.exports = { isValidEmoji, MAX_EMOJI_LENGTH };
