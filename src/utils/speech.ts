// Keep track of whether voices have been loaded
let voicesLoaded = false;
let availableVoices: SpeechSynthesisVoice[] = [];

// Load voices when they become available
function loadVoices() {
  return new Promise<void>((resolve) => {
    const loadVoicesHandler = () => {
      availableVoices = window.speechSynthesis.getVoices();
      voicesLoaded = true;
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoicesHandler);
      resolve();
    };

    // Check if voices are already available
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoicesHandler();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoicesHandler);
    }
  });
}

// Initialize voices when the module loads
if (typeof window !== 'undefined') {
  loadVoices();
}

export async function speakResponse(text: string, isMuted: boolean, isListening: boolean) {
  if (isMuted || isListening) {
    window.speechSynthesis.cancel();
    return;
  }

  try {
    // Ensure voices are loaded
    if (!voicesLoaded) {
      await loadVoices();
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Detect if text contains non-Latin characters
    const hasNonLatin = /[^\u0000-\u007F]/.test(text);
    
    if (hasNonLatin) {
      const languageCode = detectLanguage(text);
      
      // Find the best matching voice
      const matchingVoice = findBestMatchingVoice(languageCode);

      if (matchingVoice) {
        utterance.voice = matchingVoice;
        utterance.lang = matchingVoice.lang;
      }
    }

    // Split text into smaller chunks for better mobile support
    const chunks = splitTextIntoChunks(text);
    
    // Speak each chunk sequentially
    for (const chunk of chunks) {
      const chunkUtterance = new SpeechSynthesisUtterance(chunk);
      if (utterance.voice) {
        chunkUtterance.voice = utterance.voice;
        chunkUtterance.lang = utterance.lang;
      }
      
      // Wait for each chunk to finish before speaking the next
      await new Promise<void>((resolve) => {
        chunkUtterance.onend = () => resolve();
        window.speechSynthesis.speak(chunkUtterance);
      });
    }
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
}

function findBestMatchingVoice(languageCode: string): SpeechSynthesisVoice | null {
  // First try to find Google voices
  let voice = availableVoices.find(v => 
    v.name.toLowerCase().includes('google') && 
    v.lang.startsWith(languageCode)
  );

  // Then try Microsoft voices
  if (!voice) {
    voice = availableVoices.find(v => 
      v.name.toLowerCase().includes('microsoft') && 
      v.lang.startsWith(languageCode)
    );
  }

  // Finally, try any matching language
  if (!voice) {
    voice = availableVoices.find(v => 
      v.lang.startsWith(languageCode)
    );
  }

  return voice || null;
}

function splitTextIntoChunks(text: string): string[] {
  // Split text into sentences or by punctuation
  const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  // Further split long chunks
  return chunks.reduce((acc: string[], chunk) => {
    if (chunk.length > 100) {
      // Split by commas or other natural breaks
      const subChunks = chunk.split(/([,;])/);
      return [...acc, ...subChunks.filter(sc => sc.trim())];
    }
    return [...acc, chunk];
  }, []);
}

function detectLanguage(text: string): string {
  // Basic language detection based on Unicode ranges
  const scripts = {
    Devanagari: /[\u0900-\u097F]/,
    Telugu: /[\u0C00-\u0C7F]/,
    Kannada: /[\u0C80-\u0CFF]/,
    Tamil: /[\u0B80-\u0BFF]/,
    Malayalam: /[\u0D00-\u0D7F]/,
    Bengali: /[\u0980-\u09FF]/,
    Gujarati: /[\u0A80-\u0AFF]/
  };

  if (scripts.Devanagari.test(text)) return 'hi-IN';
  if (scripts.Telugu.test(text)) return 'te-IN';
  if (scripts.Kannada.test(text)) return 'kn-IN';
  if (scripts.Tamil.test(text)) return 'ta-IN';
  if (scripts.Malayalam.test(text)) return 'ml-IN';
  if (scripts.Bengali.test(text)) return 'bn-IN';
  if (scripts.Gujarati.test(text)) return 'gu-IN';

  return 'en-US';
}